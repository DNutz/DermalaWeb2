AWS.config.update({ region: "us-west-2" });

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-west-2:536ec215-5b07-4fae-be00-b2003966883a",
    RoleArn: "arn:aws:iam::140021010944:role/Cognito_DynamoPoolUnauth"
});

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

function readItem() {
  var table = "DermalaLogin";
  var email = document.getElementById("email-input").value;
  var password = document.getElementById("password-input").value;

  var params = {
      TableName: table,
      Key:{
          "email": email
      }
  };
  docClient.get(params, function(err, data) {
      document.getElementById("required1").className = "hidden help-block";
      if (err) {
          s = "Unable to read item: " + "\n" + JSON.stringify(err, undefined, 2);
          console.log(s);
          document.getElementById("required1").className = "help-block";
      } else {
          s = "GetItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
          //alert(s);
          if (data.Item === undefined){
            document.getElementById("required1").className = "help-block";
          }
          else if (data.Item.password !== password){
            document.getElementById("required1").className = "hidden help-block";
            document.getElementById("required2").className = "help-block";
          }
          else {
            sessionStorage.setItem('dermalaEmail', data.Item.email);
            sessionStorage.setItem('dermalaDisplayName', data.Item.dname);
            location.href = "index.html";
          }
      }
  });
}

function login() {
  email = document.getElementById("email-input").value;
  password = document.getElementById("password-input").value;
  failed = false;
  if (email == ""){
      document.getElementById("required1").className = "help-block";
      failed = true;
  }
  if (password == ""){
      document.getElementById("required2").className = "help-block";
      failed = true;
  }
  if (!failed){
    readItem();
  }
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