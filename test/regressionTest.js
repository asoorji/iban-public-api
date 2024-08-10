//Check Response Status Code:
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Validate Response Schema
pm.test("Response schema is valid", function () {
    const schema = {
        "type": "object",
        "properties": {
            "data": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "iban_data": {
                            "type": "object",
                            "properties": {
                                "iban": { "type": "string" },
                                "ISO_country_code": { "type": "string" },
                                "checksum": { "type": "string" },
                                "bank_code": { "type": "string" },
                                "account_number": { "type": "string" }
                            },
                            "required": ["iban", "ISO_country_code", "checksum", "bank_code", "account_number"]
                        },
                        "swift_data": {
                            "type": "object",
                            "properties": {
                                "swift": { "type": "string" },
                                "name": { "type": "string" },
                                "zip": { "type": "string" },
                                "city": { "type": "string" },
                                "branch": { "type": "string" },
                                "address": { "type": "string" },
                                "country": { "type": "string" },
                                "country_code": { "type": "string" }
                            },
                            "required": ["swift", "name", "city", "country", "country_code"]
                        }
                    },
                    "required": ["iban_data", "swift_data"]
                }
            },
            "links": {
                "type": "object"
            },
            "meta": {
                "type": "object"
            }
        },
        "required": ["data", "links", "meta"]
    };
    
    pm.response.to.have.jsonSchema(schema);
});

// Check Data Consistency:
pm.test("Data contains valid IBAN", function () {
    const responseData = pm.response.json();
    pm.expect(responseData.data).to.be.an('array').that.is.not.empty;
    responseData.data.forEach(item => {
        pm.expect(item.iban_data.iban).to.match(/^DE[0-9]{20}$/);
    });
});

