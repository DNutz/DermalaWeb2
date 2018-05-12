function logout() {
    sessionStorage.removeItem("dermalaDisplayName");
    sessionStorage.removeItem("dermalaEmail");
    location.href = "index.html";
}

function loadInfo() {
    var dname = sessionStorage.getItem("dermalaDisplayName")
    var email = sessionStorage.getItem("dermalaEmail");
    if (dname){
        document.getElementById("dname").innerHTML = dname;
    }
    else {
        document.getElementById("dname").innerHTML = "Error, not logged in.";
        document.getElementById('dname').style = "display: inline; color: red;"
    }
    if (email){
        document.getElementById("email").innerHTML = email;
    }
    else {
        document.getElementById("email").innerHTML = "Error, not logged in.";
        document.getElementById('email').style = "display: inline; color: red;"
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