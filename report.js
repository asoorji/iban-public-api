const fs = require('fs');

fs.readFile('regression-report.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    
    const report = JSON.parse(data);
    const summary = {
        totalTests: report.run.stats.tests,
        totalFailures: report.run.stats.failures,
        totalPassed: report.run.stats.passes,
        startTime: report.run.stats.start,
        endTime: report.run.stats.end
    };
    
    console.log('Test Summary Report');
    console.log('-------------------');
    console.log(`Total Tests: ${summary.totalTests}`);
    console.log(`Passed: ${summary.totalPassed}`);
    console.log(`Failed: ${summary.totalFailures}`);
    console.log(`Start Time: ${summary.startTime}`);
    console.log(`End Time: ${summary.endTime}`);
});
