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
            id: "shirt size",
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
            id: "fr due",
            alias: "fr due by",
            dataType: tableau.dataTypeEnum.date
        }, {
            id: "nr due",
            alias: "nr due by",
            dataType: tableau.dataTypeEnum.date
        }, {
            id: "escalated",
            alias: "escalated",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "fr escalated",
            alias: "fr escalated",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "nr escalated",
            alias: "nr escalated",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "review",
            alias: "review",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "internally escalated",
            alias: "internally escalated",
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
        }, {
            id: "cc",
            alias: "cc emails",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "fwd",
            alias: "fwd emails",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "reply_cc",
            alias: "reply cc emails",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "ticket_cc",
            alias: "ticket cc",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "requester_id",
            alias: "requester id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "responder_id",
            alias: "responder id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "company_id",
            alias: "company id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "support_email",
            alias: "support email",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "to_emails",
            alias: "to emails",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "product_id",
            alias: "product id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "association_type",
            alias: "association type",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "spam",
            alias: "spam",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "email_config_id",
            alias: "email config id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "associated_tickets_count",
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
                            "shirt size": tickets[i].custom_fields.cf_cs_shirt_size,
                            "severity": tickets[i].custom_fields.cf_severity,
                            "priority": tickets[i].priority,
                            "source": tickets[i].source,
                            "due": tickets[i].due_by,
                            "fr due": tickets[i].fr_due_by,
                            "nr due": tickets[i].nr_due_by,
                            "escalated": tickets[i].fr_escalated,
                            "fr escalated": tickets[i].fr_escalated,
                            "nr escalated": tickets[i].nr_escalated,
                            "review": tickets[i].custom_fields.cf_review_with_assignee,                    
                            "internally escalated": tickets[i].custom_fields.cf_cs_internally_escalated_incidents,
                            "status": tickets[i].status,
                            "group id": tickets[i].group_id,
                            "created": tickets[i].created_at,
                            "updated": tickets[i].updated_at,
                            "tags": tickets[i].tags,
                            "cc": tickets[i].cc_emails,
                            "fwd": tickets[i].fwd_emails,
                            "reply_cc": tickets[i].reply_cc_emails,
                            "ticket_cc": tickets[i].ticket_cc_emails,
                            "requester_id": tickets[i].requester_id,
                            "responder_id": tickets[i].responder_id,
                            "company_id": tickets[i].company_id,
                            "support_email": tickets[i].support_email,
                            "to_emails": tickets[i].to_emails,
                            "product_id": tickets[i].product_id,
                            "association_type": tickets[i].association_type,
                            "spam": tickets[i].spam,
                            "email_config_id": tickets[i].email_config_id,
                            "associated_tickets_count": tickets[i].associated_tickets_count,
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