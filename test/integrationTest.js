//INTEGRATION TEST

//Tests for IBAN Validation Request:
pm.test("IBAN is valid", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.valid).to.eql(true);
});

pm.test("IBAN response contains expected fields", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('iban');
    pm.expect(jsonData).to.have.property('iban_data');
    pm.expect(jsonData).to.have.property('bank_data');
});


//Tests for Bank Data Retrieval Request:
pm.test("Response contains data array", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('data').that.is.an('array');
});

pm.test("Data array items have correct structure", function () {
    var jsonData = pm.response.json();
    jsonData.data.forEach(function(item) {
        pm.expect(item).to.have.property('iban_data');
        pm.expect(item).to.have.property('swift_data');
    });
});

pm.test("Pagination links are present", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('links');
    pm.expect(jsonData.links).to.have.property('next');
    pm.expect(jsonData.links).to.have.property('prev');
});
