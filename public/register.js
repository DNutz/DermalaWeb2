AWS.config.update({ region: "us-west-2" });

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-west-2:536ec215-5b07-4fae-be00-b2003966883a",
    RoleArn: "arn:aws:iam::140021010944:role/Cognito_DynamoPoolUnauth"
});

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

function createItem() {
    e = document.getElementById("email-input").value;
    p = document.getElementById("password-input").value;
    d = document.getElementById("dname-input").value;
    var params = {
        TableName: "DermalaLogin",
        Item: {
            "email": e,
            "password": p,
            "dname": d
        }
    };
    docClient.put(params, function (err, data) {
        if (err) {
            //document.getElementById('textarea').innerHTML = "Unable to add item: " + "\n" + JSON.stringify(err, undefined, 2);
            s = "Unable to add item: " + "\n" + JSON.stringify(err, undefined, 2);
            console.log(s);
        } else {
            //document.getElementById('textarea').innerHTML = "PutItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
            s = "PutItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
            // alert("Account creation success!");
            location.href = "login.html";
        }
    });
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function register() {
    email = document.getElementById("email-input").value;
    password = document.getElementById("password-input").value;
    dname = document.getElementById("dname-input").value;
    //alert(email);
    //alert(password);
    failed = false;
    if (validateEmail(email)) {
        document.getElementById("required3").className = "hidden help-block";
    }
    else {
        document.getElementById("required3").className = "help-block";
        failed = true;
    }
    if (password == "") {
        document.getElementById("required4").className = "help-block";
        failed = true;
    }
    else {
        document.getElementById("required4").className = "hidden help-block";
    }
    if (dname == "") {
        document.getElementById("required1").className = "help-block";
        failed = true;
    }
    else {
        document.getElementById("required1").className = "hidden help-block";
    }
    if (!failed) {
        document.getElementById("inUse1").className = "hidden help-block";
        document.getElementById("inUse2").className = "hidden help-block";
        //search database for email and display name to see if free
        available();
    }
}

function available() {
    var table = "DermalaLogin";
    var email = document.getElementById("email-input").value;
    var dname = document.getElementById("dname-input").value;

    var params = {
        TableName: table,
        KeyConditionExpression: "email =:email",
        ExpressionAttributeValues: {
            ":email": email
        }
    };

    var params2 = {
        TableName: table,
        FilterExpression: "dname =:dname",
        ExpressionAttributeValues: {
            ":dname": dname
        }
    };
    //query for email
    docClient.query(params, function (err, data) {
        if (err) {
            s = "Unable to read item: " + "\n" + JSON.stringify(err, undefined, 2);
            console.log(s);
            document.getElementById("inUse1").className = "hidden help-block";
        } else {
            s = "GetItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
            if (data.Items[0] !== undefined) {
                // email already in use
                document.getElementById("inUse1").className = "help-block";
                // alert("email already in use");
            }
            else {
                document.getElementById("inUse1").className = "hidden help-block";
                // alert("email available");
                //scan for display name
                docClient.scan(params2, function (err, data) {
                    if (err) {
                        s = "Unable to read item: " + "\n" + JSON.stringify(err, undefined, 2);
                        console.log(s);
                        document.getElementById("inUse2").className = "hidden help-block";
                    } else {
                        s = "GetItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
                        // alert(s);
                        if (data.Item !== undefined || data.Items[0] !== undefined) {
                            // dname already in use
                            document.getElementById("inUse2").className = "help-block";
                            // alert("dname already in use");
                        }
                        else {
                            document.getElementById("inUse2").className = "hidden help-block";
                            // alert("dname available");
                            createItem();
                        }
                    }
                });
            }
        }
    });

}

function welcome() {
    var dname = sessionStorage.getItem("dermalaDisplayName");
    var email = sessionStorage.getItem("dermalaDisplayName");
    if (dname && email) {
        var li = document.createElement("li");
        li.className = "nav-item";
        var a = document.createElement("a");
        a.className = "nav-link";
        a.href = "account.html";
        var text2 = document.createTextNode("My Account");
        a.appendChild(text2);
        li.appendChild(a);
        document.getElementById("nav-list").replaceChild(li, document.getElementById("sign-in"));
    }
}