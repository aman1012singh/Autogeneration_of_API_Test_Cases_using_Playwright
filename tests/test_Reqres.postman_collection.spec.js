
                import { test, expect } from '@playwright/test';

                test.describe('API Tests for Reqres.postman_collection.json', () => {
                    
                    test('Get Single User', async ({ request }) => {
                        const requestOptions = {
                            headers: {},
                            
                        };

                        const response = await request.get('https://reqres.in/api/users/2', requestOptions);

                        // Playwright assertions based on Postman tests
                        
                    });
                    
                    
                    test('Delete Product', async ({ request }) => {
                        const requestOptions = {
                            headers: {},
                            
                        };

                        const response = await request.get('https://reqres.in/api/users/23', requestOptions);

                        // Playwright assertions based on Postman tests
                        
                    });
                    
                    
                });
            