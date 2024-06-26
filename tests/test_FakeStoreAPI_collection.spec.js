
                import { test, expect } from '@playwright/test';

                test.describe('API Tests for FakeStoreAPI_collection.json', () => {
                    
                    test('Get Product', async ({ request }) => {
                        const response = await request.get('https://fakestoreapi.com/products', {
                            headers: {},
                            data: null
                        });
                        expect(response.status()).toBe(200);
                        const responseBody = await response.json();
                         // Playwright assertions based on Postman tests
                        
                    });
                    
                    test('Delete Product', async ({ request }) => {
                        const response = await request.delete('https://fakestoreapi.com/products/1', {
                            headers: {},
                            data: null
                        });
                        expect(response.status()).toBe(200);
                        const responseBody = await response.json();
                         // Playwright assertions based on Postman tests
                        
                    });
                    
                });
            