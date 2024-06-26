
                import { test, expect } from '@playwright/test';

                test.describe('API Tests for JSONPlaceholder_collection.json', () => {
                    
                    test('Get User', async ({ request }) => {
                        const response = await request.get('https://jsonplaceholder.typicode.com/users', {
                            headers: {},
                            data: null
                        });
                        expect(response.status()).toBe(200);
                        const responseBody = await response.json();
                         // Playwright assertions based on Postman tests
                        
                    });
                    
                    test('Get Posts', async ({ request }) => {
                        const response = await request.get('https://jsonplaceholder.typicode.com/posts', {
                            headers: {},
                            data: null
                        });
                        expect(response.status()).toBe(200);
                        const responseBody = await response.json();
                         // Playwright assertions based on Postman tests
                        
                    });
                    
                    test('Create Post', async ({ request }) => {
                        const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
                            headers: {},
                            data: "raw"
                        });
                        expect(response.status()).toBe(201);
                        const responseBody = await response.json();
                         // Playwright assertions based on Postman tests
                        
                    });
                    
                });
            