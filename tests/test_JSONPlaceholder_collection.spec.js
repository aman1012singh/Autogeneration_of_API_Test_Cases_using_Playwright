
                import { test, expect } from '@playwright/test';

                test.describe('API Tests for JSONPlaceholder_collection.json', () => {
                    
                    test('Get User', async ({ request }) => {
                        const requestOptions = {
                            headers: {},
                            
                        };

                        const response = await request.get('https://jsonplaceholder.typicode.com/users', requestOptions);

                        // Playwright assertions based on Postman tests
                            expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBe(true);
if (Array.isArray(responseBody)) {
                                expect(responseBody.some(item => 'id' in item)).toBeTruthy();
                            } else {
                                expect(responseBody).toHaveProperty('id');
                            }
if (Array.isArray(responseBody)) {
                                expect(responseBody.some(item => 'name' in item)).toBeTruthy();
                            } else {
                                expect(responseBody).toHaveProperty('name');
                            }
if (Array.isArray(responseBody)) {
                                expect(responseBody.some(item => 'email' in item)).toBeTruthy();
                            } else {
                                expect(responseBody).toHaveProperty('email');
                            }
                if (Array.isArray(responseBody)) {
                            expect(responseBody[0].name).toBe('Leanne Graham');
                        } else {
                            expect(responseBody.name).toBe('Leanne Graham');
                        }
                if (Array.isArray(responseBody)) {
                            expect(responseBody[0].email).toBe('Sincere@april.biz');
                        } else {
                            expect(responseBody.email).toBe('Sincere@april.biz');
                        }
                    });
                    
                    
                    test('Get Posts', async ({ request }) => {
                        const requestOptions = {
                            headers: {},
                            
                        };

                        const response = await request.get('https://jsonplaceholder.typicode.com/posts', requestOptions);

                        // Playwright assertions based on Postman tests
                            expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBe(true);
if (Array.isArray(responseBody)) {
                                expect(responseBody.some(item => 'id' in item)).toBeTruthy();
                            } else {
                                expect(responseBody).toHaveProperty('id');
                            }
if (Array.isArray(responseBody)) {
                                expect(responseBody.some(item => 'title' in item)).toBeTruthy();
                            } else {
                                expect(responseBody).toHaveProperty('title');
                            }
if (Array.isArray(responseBody)) {
                                expect(responseBody.some(item => 'body' in item)).toBeTruthy();
                            } else {
                                expect(responseBody).toHaveProperty('body');
                            }
                    });
                    
                    
                    test('Create Post', async ({ request }) => {
                        const requestOptions = {
                            headers: {},
                            data: "\"raw\""
                        };

                        const response = await request.post('https://jsonplaceholder.typicode.com/posts', requestOptions);

                        // Playwright assertions based on Postman tests
                            expect(response.status()).toBe(201);
    const responseBody = await response.json();
if (Array.isArray(responseBody)) {
                                expect(responseBody.some(item => 'id' in item)).toBeTruthy();
                            } else {
                                expect(responseBody).toHaveProperty('id');
                            }
    if (Array.isArray(responseBody)) {
                            expect(responseBody[0].id).toBe(101);
                        } else {
                            expect(responseBody.id).toBe(101);
                        }
                    });
                    
                    
                });
            