# Auto-generation of API Test Cases using Playwright

## Introduction

This project aims to automate the process of generating API test cases from Postman collections using Playwright. The goal is to streamline API testing by converting existing Postman collections into executable Playwright test scripts, making it easier to validate APIs with minimal manual intervention.

## Explanation

The project leverages Playwright, a powerful end-to-end testing framework, to perform API testing. By parsing Postman collections, the script auto-generates test cases that can be executed using Playwright's robust testing features. This automation saves time and reduces errors in writing manual test cases.

## Description and Working of Each File

### 1. `convertCollections.js`

This script is responsible for reading Postman collections, extracting the API request details, and generating corresponding Playwright test scripts.

**Key Functions:**
- Reads the list of files in the `collections` directory.
- Parses each collection file to extract API requests.
- Generates Playwright test scripts based on the extracted requests.
- Saves the generated scripts in the `tests` directory with a `.spec.js` extension.

### 2. `collections/`

This directory contains the Postman collection files (in JSON format) that will be converted into Playwright test scripts.

### 3. `tests/`

This directory stores the generated Playwright test scripts. Each script corresponds to a Postman collection file and contains test cases for the API requests defined in the collection.

### 4. `package.json`

This file manages the project's dependencies and scripts. It includes Playwright as a dependency and defines a test script to run the generated test cases.

### 5. `playwright.config.js`

This configuration file customizes Playwright's settings, such as test directory, test file patterns, and other configurations.

## Workflow of Code

1. **Setup:**
   - Install the required dependencies (`@playwright/test`).
   - Ensure the project is configured to use ES modules by setting `"type": "module"` in `package.json`.

2. **Convert Collections:**
   - Execute `convertCollections.js` to read and parse Postman collections.
   - Generate Playwright test scripts and save them in the `tests` directory.

3. **Run Tests:**
   - Use the command `npx playwright test` to run the generated test scripts.
   - Playwright executes the test cases, validating the APIs based on the Postman          collections.

## Learning from the Project

- **Automation Benefits:** Automating the conversion of Postman collections into test scripts saves time and reduces manual effort.
- **Playwright Proficiency:** Understanding how to leverage Playwright for API testing, including making HTTP requests and performing assertions.
- **Project Structuring:** Learning to structure a project to support automated testing and ES module syntax.
- **Error Handling:** Handling errors effectively when reading files and parsing JSON data.

## Conclusion

This project demonstrates the power of automation in API testing by converting Postman collections into Playwright test scripts. It highlights the efficiency gains and error reduction that can be achieved through automation. By integrating Playwright, this project provides a robust framework for validating APIs, making it a valuable tool for developers and testers.

---

