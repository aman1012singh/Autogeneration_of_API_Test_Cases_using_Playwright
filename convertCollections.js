
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const collectionsDir = path.join(__dirname, 'collections');

function convertPostmanTests(events) {
    const convertedTests = [];

    events.forEach(event => {
        if (event.listen === 'test') {
            event.script.exec.forEach(line => {
                // Convert pm.expect assertions
                if (line.includes('pm.expect')) {
                    let playwrightLine = line
                        .replace(/pm\.expect\((.*?)\)\.to\.have\.status\((.*?)\);/g, 'expect(response.status()).toBe($2);')
                        .replace(/pm\.expect\((.*?)\)\.to\.equal\((.*?)\);/g, (match, p1, p2) => {
                            let propertyPath = p1.trim().replace(/^pm\.expect\((.*?)\)\.to\.equal\((.*?)\);$/, '$1');
                        const adjustedPath = propertyPath.replace(/^[^.]+\./, ''); // Remove leading 'user.'
                        // Check if responseBody is an array or object
                        const isArrayResponse = adjustedPath.includes('responseBody[0]');
                        
                        return `if (Array.isArray(responseBody)) {
                            expect(responseBody[0].${adjustedPath}).toBe(${p2});
                        } else {
                            expect(responseBody.${adjustedPath}).toBe(${p2});
                        }`
                    })

                        .replace(/pm\.expect\((.*?)\)\.to\.include\((.*?)\);/g, 'expect($1).toContain($2);')
                        .replace(/pm\.expect\((.*?)\)\.to\.be\.an\((.*?)\);/g, 'expect(Array.isArray($1)).toBe(true);')

                    // Handle the .to.have.property case for arrays and objects
                    if (line.includes('to.have.property')) {
                        const match = line.match(/pm\.expect\((.*?)\)\.to\.have\.property\((.*?)\);/);
                        if (match) {
                            const property = match[2].replace(/['"]/g, ''); // remove quotes
                            playwrightLine = `if (Array.isArray(responseBody)) {
                                expect(responseBody.some(item => '${property}' in item)).toBeTruthy();
                            } else {
                                expect(responseBody).toHaveProperty('${property}');
                            }`;
                        }
                    }

                    convertedTests.push(playwrightLine);
                }
                // Convert pm.response assertions
                else if (line.includes('pm.response')) {
                    let playwrightLine = line
                        .replace(/pm\.response\.to\.have\.status\((.*?)\);/g, 'expect(response.status()).toBe($1);')
                        .replace(/pm\.response\.json\(\)/g, 'await response.json()')
                        .replace(/pm\.response\.text\(\)/g, 'await response.text()')
                        .replace(/pm\.response\.headers/g, 'response.headers');

                    // Manually measure response time
                

                    convertedTests.push(playwrightLine);
                }
            });
        }
    });

    return convertedTests.join('\n');
}


async function convertCollections() {
    try {
        // Read the list of files in the 'collections' directory
        const files = await fs.readdir(collectionsDir);

        // Iterate through each collection file
        for (const file of files) {
            const collectionFile = path.join(collectionsDir, file);
            // Read the content of the collection file
            const collectionData = await fs.readFile(collectionFile, 'utf8');
            const collection = JSON.parse(collectionData);

            // Parse the collection to extract requests and associated tests
            const requests = collection.item.map(item => {
                const postmanTests = item.event || [];
                const convertedTests = convertPostmanTests(postmanTests);

                 // Build request options dynamically
                 const requestOptions = {};
                 if (item.request.header && item.request.header.length > 0) {
                     requestOptions.headers = item.request.header.reduce((acc, header) => {
                         acc[header.key] = header.value;
                         return acc;
                     }, {});
                 }
 
                 let bodyContent = null;
                 if (item.request.body) {
                     const bodyType = Object.keys(item.request.body)[0];
                     bodyContent = item.request.body[bodyType];
                     if (bodyType === 'raw') {
                         bodyContent = bodyContent;
                     } else {
                         bodyContent = JSON.stringify(bodyContent);
                     }
                 }
 
                 return {
                     name: item.name,
                     method: item.request.method,
                     url: item.request.url.raw,
                     options: requestOptions,
                     body: bodyContent,
                     tests: convertedTests
                 };
            });
            // Generate Playwright test script
            const testScript = `
                import { test, expect } from '@playwright/test';

                test.describe('API Tests for ${path.basename(collectionFile)}', () => {
                    ${requests.map(request => `
                    test('${request.name}', async ({ request }) => {
                        const requestOptions = {
                            headers: ${JSON.stringify(request.options.headers || {})},
                            ${request.body ? `data: ${JSON.stringify(request.body)}` : ''}
                        };

                        const response = await request.${request.method.toLowerCase()}('${request.url}', requestOptions);

                        // Playwright assertions based on Postman tests
                        ${request.tests}
                    });
                    
                    `).join('')}
                });
            `;

            // Write the generated test script to a file in the 'tests' directory
            const testFileName = `test_${path.basename(collectionFile, '.json')}.spec.js`;
            const testFilePath = path.join(__dirname, 'tests', testFileName);
            await fs.writeFile(testFilePath, testScript);
        }
    } catch (err) {
        console.error('Error converting collections:', err);
    }
}

// Run the conversion function
convertCollections();
