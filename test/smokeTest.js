// Check that the status code is 200
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Parse the response JSON
let responseData = pm.response.json();

// Check that the IBAN is valid
pm.test("IBAN is valid", function () {
    pm.expect(responseData.valid).to.be.true;
});

// Check that the correct IBAN number is returned
pm.test("Correct IBAN number", function () {
    pm.expect(responseData.iban).to.equal("DE89370400440532013000");
});

// Check that the correct country code is returned
pm.test("Country code is Germany (DE)", function () {
    pm.expect(responseData.iban_data.country_code).to.equal("DE");
});

// Check that the bank name is correct
pm.test("Bank name is Commerzbank", function () {
    pm.expect(responseData.bank_data.name).to.equal("Commerzbank");
});

//Performance 
pm.test("Response time is less than 200ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(200);
});

