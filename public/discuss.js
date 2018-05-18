AWS.config.update({ region: "us-west-2" });

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-west-2:536ec215-5b07-4fae-be00-b2003966883a",
    RoleArn: "arn:aws:iam::140021010944:role/Cognito_DynamoPoolUnauth"
});

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

function readTopic(topic) {
    var params = {
        TableName: "DermalaPosts",
        KeyConditionExpression: "topic =:topic",
        ExpressionAttributeValues: {
            ":topic": topic
        },
        ScanIndexForward: false
    };
    docClient.query(params, function (err, data) {
        if (err) {
            s = "Unable to read item: " + "\n" + JSON.stringify(err, undefined, 2);
            console.log(s);
        } else {
            s = "GetItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
            // alert(s);
            sessionStorage.setItem("dermalaPosts", JSON.stringify(data));
            // sessionStorage.setItem("dermalaPostsPage", "1");
            postsarray = JSON.parse(sessionStorage.getItem("dermalaPosts")).Items;
            // alert(postsarray[1].content);
            // title = [];
            // author = [];
            // date = [];
            // content = [];
            for (i = 0; i < postsarray.length; ++i) {
                if (postsarray[i]) {
                    var title = postsarray[i].title;
                    var author = postsarray[i].author;
                    var date = postsarray[i].date;
                    // var content = postsarray[i].content;
                    // var comments = postsarray[i].comments;
                    var position = i;
                    // var f = function() {showPost(JSON.parse(JSON.stringify(title)), JSON.parse(JSON.stringify(author)), JSON.parse(JSON.stringify(date)), JSON.parse(JSON.stringify(content)));};
                    clone = document.getElementById("post-row").content.cloneNode(true);
                    clone.getElementById("postd1").innerHTML = title;
                    // clone.getElementById("postd1").setAttribute("title", title);
                    // clone.getElementById("postd1").setAttribute("author", author);
                    // clone.getElementById("postd1").setAttribute("date", date);
                    // clone.getElementById("postd1").setAttribute("content", content);
                    clone.getElementById("postd1").setAttribute("position", position);
                    // clone.getElementById("postd1").setAttribute("comments", comments);
                    clone.getElementById("postd1").onclick = function () { showPost(this.getAttribute("position")); };
                    clone.getElementById("postd2").innerHTML = author;
                    dateObject = new Date(date);
                    clone.getElementById("postd3").innerHTML = dateObject.toLocaleDateString() + " " + dateObject.toLocaleTimeString();
                    document.getElementById("post-table-body").appendChild(clone);
                }
                else {
                    break;
                }
            }
        }
    });
}

function topicInfo() {
    var params = {
        TableName: "DermalaPosts",
        KeyConditionExpression: "topic =:topic",
        ExpressionAttributeValues: {
            ":topic": "Ask an Expert"
        }
    };
    docClient.query(params, function (err, data) {
        if (err) {
            s = "Unable to read item: " + "\n" + JSON.stringify(err, undefined, 2);
            alert(s);
        } else {
            s = "GetItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
            // alert(s);
            document.getElementById("numposts1").innerHTML = data.Count;
            dateObject = new Date(data.Items[1].date);
            document.getElementById("date1").innerHTML = dateObject.toLocaleDateString() + " " + dateObject.toLocaleTimeString();
        }
    });
    params = {
        TableName: "DermalaPosts",
        KeyConditionExpression: "topic =:topic",
        ExpressionAttributeValues: {
            ":topic": "Skincare"
        }
    };
    docClient.query(params, function (err, data) {
        if (err) {
            s = "Unable to read item: " + "\n" + JSON.stringify(err, undefined, 2);
            alert(s);
        } else {
            s = "GetItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
            // alert(s);
            document.getElementById("numposts2").innerHTML = data.Count;
            dateObject = new Date(data.Items[1].date);
            document.getElementById("date2").innerHTML = dateObject.toLocaleDateString() + " " + dateObject.toLocaleTimeString();
        }
    });
    params = {
        TableName: "DermalaPosts",
        KeyConditionExpression: "topic =:topic",
        ExpressionAttributeValues: {
            ":topic": "Acne"
        }
    };
    docClient.query(params, function (err, data) {
        if (err) {
            s = "Unable to read item: " + "\n" + JSON.stringify(err, undefined, 2);
            alert(s);
        } else {
            s = "GetItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
            // alert(s);
            document.getElementById("numposts3").innerHTML = data.Count;
            dateObject = new Date(data.Items[1].date);
            document.getElementById("date3").innerHTML = dateObject.toLocaleDateString() + " " + dateObject.toLocaleTimeString();
        }
    });
    params = {
        TableName: "DermalaPosts",
        KeyConditionExpression: "topic =:topic",
        ExpressionAttributeValues: {
            ":topic": "Microbiome"
        }
    };
    docClient.query(params, function (err, data) {
        if (err) {
            s = "Unable to read item: " + "\n" + JSON.stringify(err, undefined, 2);
            alert(s);
        } else {
            s = "GetItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
            // alert(s);
            document.getElementById("numposts4").innerHTML = data.Count;
            dateObject = new Date(data.Items[1].date);
            document.getElementById("date4").innerHTML = dateObject.toLocaleDateString() + " " + dateObject.toLocaleTimeString();
        }
    });
}

function Topics() {
    document.getElementById("breadcrumb2").className = "breadcrumb-item hidden";
    dtable = document.getElementById("discussion-table");
    while (dtable.firstChild) {
        dtable.removeChild(dtable.firstChild);
    }
    clone = document.getElementById("topic-table").content.cloneNode(true);
    dtable.appendChild(clone);
    document.getElementById("createbtn").className = "btn btn-primary hidden";
    topicInfo();
    //alert("Topics!");
}

function addPostTable() {
    dtable = document.getElementById("discussion-table");
    while (dtable.firstChild) {
        dtable.removeChild(dtable.firstChild);
    }
    clone = document.getElementById("post-table").content.cloneNode(true);
    dtable.appendChild(clone);
}

function addBreadcrumb(text, func) {
    document.getElementById("itembtn2").innerHTML = text;
    document.getElementById("breadcrumb2").className = "breadcrumb-item";
    document.getElementById("itembtn2").onclick = func;
}

function AAE() {
    addBreadcrumb("Ask an Expert", function () { AAE(); });
    addPostTable();
    //now get posts from database and display them
    //dtable.appendChild();
    //alert("AAE!");
    document.getElementById("createbtn").className = "btn btn-primary";
    readTopic("Ask an Expert");
}

function Skincare() {
    addBreadcrumb("Skincare", function () { Skincare(); });
    addPostTable();
    //alert("Skincare!");
    document.getElementById("createbtn").className = "btn btn-primary";
    readTopic("Skincare");
}

function Acne() {
    addBreadcrumb("Acne", function () { Acne(); });
    addPostTable();
    //alert("Acne!");
    document.getElementById("createbtn").className = "btn btn-primary";
    readTopic("Acne");
}

function Microbiome() {
    addBreadcrumb("Microbiome", function () { Microbiome(); });
    addPostTable();
    //alert("Microbiome!");
    document.getElementById("createbtn").className = "btn btn-primary";
    readTopic("Microbiome");
}

function createTable() {
    dtable = document.getElementById("discussion-table");
    while (dtable.firstChild) {
        dtable.removeChild(dtable.firstChild);
    }
    clone = document.getElementById("create-table").content.cloneNode(true);
    dtable.appendChild(clone);
}

function createPost() {
    dname = sessionStorage.getItem("dermalaDisplayName");
    if (dname) {
        title = document.getElementById("title-input").value;
        content = document.getElementById("content-input").value;
        topic = document.getElementById("itembtn2").innerHTML;
        comment1 = { "content": "I like this post", "dname": "Liker#1" };
        comment2 = { "content": "I like this post more", "dname": "Liker#2" };
        var params = {
            TableName: "DermalaPosts",
            Item: {
                "title": title,
                "content": content,
                "author": dname,
                "topic": topic,
                "date": Date.now(),
                "comments": [comment1, comment2]
            }
        };
        docClient.put(params, function (err, data) {
            if (err) {
                //document.getElementById('textarea').innerHTML = "Unable to add item: " + "\n" + JSON.stringify(err, undefined, 2);
                s = "Unable to add item: " + "\n" + JSON.stringify(err, undefined, 2);
                alert(s);
            } else {
                //document.getElementById('textarea').innerHTML = "PutItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
                s = "PutItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
                // alert(s);
                if (topic === "Ask an Expert") {
                    AAE();
                }
                else if (topic === "Skincare") {
                    Skincare();
                }
                else if (topic === "Acne") {
                    Acne();
                }
                else if (topic === "Microbiome") {
                    Microbiome();
                }
                else {
                    Topics();
                }
            }
        });
    }
    else {
        document.getElementById("help").className = "help-block";
    }
}

function showPost(position) {
    var post = JSON.parse(sessionStorage.getItem("dermalaPosts"))
    post = post.Items[position];
    var title = post.title;
    var author = post.author;
    var date = post.date;
    var content = post.content;
    var numDate = parseInt(date);
    var clone = document.getElementById("post-view").content.cloneNode(true);
    clone.getElementById("th1").innerHTML = title;
    clone.getElementById("th2").innerHTML = "by "+author;
    var dateObject = new Date(numDate);
    clone.getElementById("th3").innerHTML = dateObject.toLocaleDateString() + " " + dateObject.toLocaleTimeString();
    clone.getElementById("td1").innerHTML = content.replace(/(?:\r\n|\r|\n)/g, '<br>');
    var tbody = clone.getElementById("post-view-body");
    tbody.setAttribute("position", position);
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    td.setAttribute("colspan", "3");
    var ta = document.createElement("textarea")
    ta.setAttribute("rows", "3");
    ta.setAttribute("style", "margin-bottom: 10px");
    ta.setAttribute("id", "comment-area");
    td.appendChild(ta);
    var div = document.createElement("div")
    div.className = "hidden help-block";
    div.setAttribute("id", "comment-help");
    div.innerHTML = "You must be logged in to comment";
    td.appendChild(div);
    var btn = document.createElement("button");
    btn.className = "btn btn-primary";
    // btn.onclick = "newComment(); return false;";
    btn.setAttribute("onclick", "newComment(); return false;");
    btn.innerHTML = "Comment";
    td.appendChild(btn);
    tr.appendChild(td);
    tbody.appendChild(tr);
    var dposts = JSON.parse(sessionStorage.getItem("dermalaPosts")).Items;
    var comments = dposts[position].comments;
    for (var i = 0; i < comments.length; i++) {
        tr = document.createElement("tr");
        td = document.createElement("td");
        td.setAttribute("colspan", "2");
        td.innerHTML = comments[i].content.replace(/(?:\r\n|\r|\n)/g, '<br>');
        tr.appendChild(td);
        var td2 = document.createElement("td");
        td2.setAttribute("colspan", "1");
        td2.innerHTML = "by "+comments[i].dname;
        tr.appendChild(td2);
        tbody.appendChild(tr);
    }
    var dtable = document.getElementById("discussion-table");
    while (dtable.firstChild) {
        dtable.removeChild(dtable.firstChild);
    }
    dtable.appendChild(clone);
}

function newComment() {
    var dname = sessionStorage.getItem("dermalaDisplayName");
    var email = sessionStorage.getItem("dermalaEmail");
    if (dname && email){
        document.getElementById("comment-help").className = "hidden help-block";
        var tbody = document.getElementById("post-view-body");
        var post = JSON.parse(sessionStorage.getItem("dermalaPosts"))
        post = post.Items[tbody.getAttribute("position")];
        var table = "DermalaPosts";
        var topic = post.topic;
        var date = post.date;
        var comments = post.comments;
        comments.push({"content":document.getElementById("comment-area").value,"dname":dname});
        console.log(comments);
        var params = {
            TableName: table,
            Key: {
                "topic": topic,
                "date": date
            },
            UpdateExpression: "set comments = :c",
            ExpressionAttributeValues: {
                ":c": comments
            },
            ReturnValues: "UPDATED_NEW"
        };

        docClient.update(params, function (err, data) {
            if (err) {
                var s = "Unable to update item: " + "\n" + JSON.stringify(err, undefined, 2);
                console.log(s);
            } else {
                var s = "UpdateItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
                console.log(s);
                var params = {
                    TableName: "DermalaPosts",
                    KeyConditionExpression: "topic =:topic",
                    ExpressionAttributeValues: {
                        ":topic": topic
                    },
                    ScanIndexForward: false
                };
                docClient.query(params, function (err, data) {
                    if (err) {
                        s = "Unable to read item: " + "\n" + JSON.stringify(err, undefined, 2);
                        console.log(s);
                    } else {
                        s = "GetItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
                        sessionStorage.setItem("dermalaPosts", JSON.stringify(data));
                        showPost(tbody.getAttribute("position"));
                    }
                });
            }
        });
    }
    else {
        document.getElementById("comment-help").className = "help-block";
    }
}

function logCurrentPage() {
    sessionStorage.setItem("dermalaPage", location.href);
}

function welcome() {
    var dname = sessionStorage.getItem("dermalaDisplayName");
    var email = sessionStorage.getItem("dermalaDisplayName");
    if (dname && email) {
        var ju = document.getElementById("joinUs");
        ju.removeChild(ju.childNodes[5]);
        var h2 = document.createElement("h2");
        h2.className = "text-white"
        var text = document.createTextNode("Welcome " + dname + "!");
        h2.appendChild(text);
        ju.appendChild(h2);
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

function cancel() {
    document.getElementById("itembtn2").click();
}