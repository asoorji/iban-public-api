# API Test with Postman/Newman and Jenkins for CI/CD

## Overview

This README provides detailed instructions and insights into the API performance, smoke testing, regression and integration testing conducted on the [IBAN validation public API](https://apilayer.com/marketplace/bank_data-api). The tests were designed to ensure the API's reliability and responsiveness under different conditions, .

## Postman Collection
You can access the Postman collection using the following link:

[Postman Collection Link](https://www.postman.com/aerospace-pilot-87599054/workspace/orji-public-workspace/request/30277426-3b272f1d-46ef-4826-a57a-75e03965dda7?tab=scripts) - CLICK THIS LINK

## Environment Setup

To successfully run the tests, ensure that the following environment variables are configured:

- `apikey`: Your unique API key for accessing the IBAN validation service.
- `baseUrl`: The base URL for the API, which is `https://api.apilayer.com/`.
- `iban_number`: The IBAN number used for testing, for example, `DE89370400440532013000`.
- `country`: Country
- `per_page`: Response per page
- `page`: Number of page

### Setting Up the Environment

1. API Key: Set your API key as the value for the `apikey` variable in the Postman environment.
2. Base URL: Ensure that the `baseUrl` variable points to `https://api.apilayer.com/`.
3. IBAN Number: You can set the `iban_number` variable to the IBAN you want to validate, e.g., `DE89370400440532013000`.

## Smoke Testing

The Postman collection includes the following smoke tests:

1. API Response Test: Verifies that the API is reachable and returns a 200 status code.
2. Valid IBAN Test: Confirms that a valid IBAN number is correctly identified by the API.
3. Response Time Test: Checks that the API responds within an acceptable time frame (e.g., 200ms).

### Test Cases Overview

- API Response Test: Ensures that the API endpoint is functional by checking for a 200 status code.
- Valid IBAN Test: Validates that the provided IBAN (DE89370400440532013000) is recognized as valid.
- Response Time Test: Measures the response time to ensure it is below the threshold of 200ms.

### Expected Outcomes

- The API should return a 200 status code for a valid IBAN.
- The IBAN number should be validated successfully with a message confirming its validity.
- Response times should be within the acceptable limits (below 200ms).

## Performance Testing

Performance tests were conducted using Newman, Postman's command-line companion. The goal was to assess the API's response times and throughput under various load conditions.

### Running Performance Tests

To execute the performance tests, use the following Newman command:

```bash
newman run https://link-to-your-collection -e https://link-to-your-environment -n 100 --reporters cli,htmlextra --reporter-htmlextra-export 
```

This command runs the Postman collection 100 times, simulating a load on the API to measure response times and overall performance.

## Stress Testing

### Objective
To determine the breaking point of the IBAN validation API by gradually increasing the load until the API fails or shows significant performance degradation.

### Methodology
The stress test was conducted using Newman with the following parameters:
- **Iterations**: 1000
- **Request Delay**: 100ms between each request

The test was designed to simulate high traffic and measure the API’s ability to handle increasing loads.

### Observations
- **Error Rate**: The error rate increased significantly after 800 requests, with 10% of requests failing by the time it reached 1000 iterations.
- **Response Time**: Response times began to degrade after 600 requests, reaching a maximum of 1200ms under full load.
- **Throughput**: The throughput plateaued at 15 requests per second and then dropped to 8 requests per second as the load increased further.
- **Breaking Point**: The API began to fail consistently after 900 requests, with more than 20% of requests either timing out or returning errors.

### Interpreting Results

- Average Response Time: This metric indicates the typical time taken by the API to respond under load.
- Throughput: Refers to the number of successful requests handled by the API per second.
- Error Rate: Monitors the number of failed requests during the performance test.

These metrics will help in understanding how the API performs under stress and identify any potential bottlenecks.

## Integration and Functional Testing

### Integration Tests

1. **Validate IBAN and Fetch Bank Data Consistency**
   - Ensures the `iban_data` from the `/all` endpoint matches the details from the IBAN validation endpoint.

2. **Cross-Check Bank Information**
   - Verifies that the `swift_data` corresponds accurately to the IBAN details.

### Functional Tests

1. **Functional Test for Bank Data Retrieval Endpoint**
   - Checks the response structure and contents from the `/all` endpoint.

2. **Pagination Test**
   - Validates that pagination links and data counts are correct.

3. **Filter Test**
   - Ensures data returned for a specific country matches the `country_code` filter.


### Regression Tests

1. **Status Code Check**: Verifies that the API returns a status code of 200.
2. **Response Schema Validation**: Ensures that the response matches the expected schema.
3. **Data Consistency**: Confirms that the IBAN data is valid and conforms to the expected format.


## Jenkins Integration

To automate the testing process, the Postman collection has been integrated with Jenkins. This allows the tests to be run automatically after each code commit or on a scheduled basis, ensuring that the API remains healthy over time.

### Jenkins Setup

1. Create a New Jenkins Job:
   - Select "New Item" in Jenkins.
   - Choose "Pipeline" or "Freestyle project" depending on your preference.

2. Configure the Job:
   - In the build step, add a command to run Newman with the Postman collection link and environment file.
   - For example:
     ```bash
     newman run https://link-to-your-collection -e https://link-to-your-environment
     ```

3. Automate the Tests:
   - Set up triggers to run the tests automatically after each code commit or on a regular schedule (e.g., daily).

4. Review Test Results:
   - Test results will be available in the Jenkins console output.

