// Create main connector function
(function () {
    var myConnector = tableau.makeConnector();
    console.log("connector made")

// Build schema for ticket data points
    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "site",
            alias: "site",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "org",
            alias: "organization",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "subject",
            alias: "subject",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "shirt size",
            alias: "shirt size",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "severity",
            alias: "severity",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "due",
            alias: "due by",
            dataType: tableau.dataTypeEnum.date
        }, {
            id: "escalated",
            alias: "escalated",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "review",
            alias: "review",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "status",
            alias: "status",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "group id",
            alias: "group id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "created",
            alias: "created",
            dataType: tableau.dataTypeEnum.date
        }, {
            id: "updated",
            alias: "updated",
            dataType: tableau.dataTypeEnum.date
        }, {
            id: "tags",
            alias: "tags",
            dataType: tableau.dataTypeEnum.string
        }];
        console.log("schema defined")
        var tableSchema = {
            id: "tickets",
            alias: "tickets",
            columns: cols
        };        

        console.log("schema created")
        schemaCallback([tableSchema]);
    };
    
// Data gathering function
    myConnector.getData = function(table, doneCallback) {
// Call authentication credentials from user submitted input
        var AuthData = JSON.parse(tableau.connectionData),
            name = AuthData.username,
            pass = AuthData.password;
            console.log("credentials gathered")
// GET request to FreshDesk using authentication credentials
        $.ajax({
            url: "https://katanasoftware.freshdesk.com/api/v2/tickets",
            type: "GET",
            dataType: "json",
            headers: {
                "Authorization": "Basic " + btoa(name + ":" + pass)
            },
            contentType: "application/json",
            success: function(response) {
                console.log("ajax success");
// Create array to store gathered data
                var tickets = response,
                    tableData = [];
// Loop through ticket data and assign JSON fields to Schema fields
                    for (var i = 0, len = tickets.length; i < len; i++) {
                        tableData.push({
                            "id": tickets[i].id,
                            "site": tickets[i].custom_fields.cf_site,
                            "org": tickets[i].custom_fields.cf_affected_customers,
                            "subject": tickets[i].subject,
                            "shirt size": tickets[i].custom_fields.cf_cs_shirt_size,
                            "severity": tickets[i].custom_fields.cf_severity,
                            "due": tickets[i].due_by,
                            "escalated": tickets[i].fr_escalated,
                            "review": tickets[i].custom_fields.cf_review_with_assignee,                    
                            "status": tickets[i].status,
                            "group id": tickets[i].group_id,
                            "created": tickets[i].created_at,
                            "updated": tickets[i].updated_at,
                            "tags": tickets[i].tags,
        
                        });
                    }
                    console.log("loop complete");
                    table.appendRows(tableData);
                    doneCallback();

           },
           error: function() {
               console.log("error");
           }

       })
    };
// Register connector
    tableau.registerConnector(myConnector);
})();

// Create function to gather user credentials and run connector on submit
$(window).load(function () {   
    $("#submitButton").click( function () {
        var AuthCred = {
            username: $('#name').val().trim(),
            password: $('#pass').val().trim(),
        };

        tableau.connectionData = JSON.stringify(AuthCred);
        tableau.connectionName = "FreshDesk Data";
        tableau.submit();
    });
});