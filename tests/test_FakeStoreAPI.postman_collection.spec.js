
                import { test, expect } from '@playwright/test';

                test.describe('API Tests for FakeStoreAPI.postman_collection.json', () => {
                    
                    test('Get Product', async ({ request }) => {
                        const requestOptions = {
                            headers: {},
                            
                        };

                        const response = await request.get('https://fakestoreapi.com/products', requestOptions);

                        // Playwright assertions based on Postman tests
                            expect(response.status()).toBe(200);
                    });
                    
                    
                    test('Delete Product', async ({ request }) => {
                        const requestOptions = {
                            headers: {},
                            
                        };

                        const response = await request.delete('https://fakestoreapi.com/products/1', requestOptions);

                        // Playwright assertions based on Postman tests
                            expect(response.status()).toBe(200);
                    });
                    
                    
                });
            