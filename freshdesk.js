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
        }, {
            id: "type",
            alias: "type",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "shirtsize",
            alias: "shirt size",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "severity",
            alias: "severity",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "priority",
            alias: "priority",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "source",
            alias: "source",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "due",
            alias: "due by",
            dataType: tableau.dataTypeEnum.date
        }, {
            id: "frdue",
            alias: "fr due by",
            dataType: tableau.dataTypeEnum.date
        }, {
            id: "nrdue",
            alias: "nr due by",
            dataType: tableau.dataTypeEnum.date
        }, {
            id: "escalated",
            alias: "escalated",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "frescalated",
            alias: "fr escalated",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "nrescalated",
            alias: "nr escalated",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "review",
            alias: "review",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "internallyescalated",
            alias: "internally escalated",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "status",
            alias: "status",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "groupid",
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
        }, {
            id: "cc",
            alias: "cc emails",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "fwd",
            alias: "fwd emails",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "replycc",
            alias: "reply cc emails",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "ticketcc",
            alias: "ticket cc",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "requesterid",
            alias: "requester id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "responderid",
            alias: "responder id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "companyid",
            alias: "company id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "supportemail",
            alias: "support email",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "toemails",
            alias: "to emails",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "productid",
            alias: "product id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "associationtype",
            alias: "association type",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "spam",
            alias: "spam",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "emailconfigid",
            alias: "email config id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "associatedticketscount",
            alias: "associated tickets count",
            dataType: tableau.dataTypeEnum.string
        }, ];
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
                            "type": tickets[i].type,
                            "shirtsize": tickets[i].custom_fields.cf_cs_shirt_size,
                            "severity": tickets[i].custom_fields.cf_severity,
                            "priority": tickets[i].priority,
                            "source": tickets[i].source,
                            "due": tickets[i].due_by,
                            "frdue": tickets[i].fr_due_by,
                            "nrdue": tickets[i].nr_due_by,
                            "escalated": tickets[i].fr_escalated,
                            "frescalated": tickets[i].fr_escalated,
                            "nrescalated": tickets[i].nr_escalated,
                            "review": tickets[i].custom_fields.cf_review_with_assignee,                    
                            "internallyescalated": tickets[i].custom_fields.cf_cs_internally_escalated_incidents,
                            "status": tickets[i].status,
                            "groupid": tickets[i].group_id,
                            "created": tickets[i].created_at,
                            "updated": tickets[i].updated_at,
                            "tags": tickets[i].tags,
                            "cc": tickets[i].cc_emails,
                            "fwd": tickets[i].fwd_emails,
                            "replycc": tickets[i].reply_cc_emails,
                            "ticketcc": tickets[i].ticket_cc_emails,
                            "requesterid": tickets[i].requester_id,
                            "responderid": tickets[i].responder_id,
                            "companyid": tickets[i].company_id,
                            "supportemail": tickets[i].support_email,
                            "toemails": tickets[i].to_emails,
                            "productid": tickets[i].product_id,
                            "associationtype": tickets[i].association_type,
                            "spam": tickets[i].spam,
                            "emailconfigid": tickets[i].email_config_id,
                            "associatedticketscount": tickets[i].associated_tickets_count,
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