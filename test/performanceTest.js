//Load Test and Other performance test was doen with NewMan
//The ReadMe.md file has more details on it

const responseTime = pm.response.responseTime;
const maxResponseTime = 2000; // Set the maximum acceptable response time in milliseconds

pm.test("Response time is within acceptable limits", function () {
    pm.expect(responseTime).to.be.below(maxResponseTime);
});

pm.test("Response status is OK", function () {
    pm.response.to.have.status(200);
});
