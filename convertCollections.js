import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const collectionsDir = path.join(__dirname, 'collections');

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

            // Parse the collection to extract requests
            const requests = collection.item.map(item => {
                return {
                    name: item.name,
                    method: item.request.method,
                    url: item.request.url.raw,
                    headers: item.request.header ? item.request.header.reduce((acc, header) => {
                        acc[header.key] = header.value;
                        return acc;
                    }, {}) : {},
                    body: item.request.body ? JSON.stringify(item.request.body[Object.keys(item.request.body)[0]]) : null
                };
            });

            // Generate Playwright test script
            const testScript = `
                import { test, expect } from '@playwright/test';

                test.describe('API Tests for ${path.basename(collectionFile)}', () => {
                    ${requests.map(request => `
                    test('${request.name}', async ({ request }) => {
                        const response = await request.${request.method.toLowerCase()}('${request.url}', {
                            headers: ${JSON.stringify(request.headers)},
                            data: ${request.body || 'null'}
                        });
                        expect(response.status()).toBe(${request.method === 'POST' ? 201 : 200});
                        const responseBody = await response.json();
                        // Add more detailed assertions here if needed
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
