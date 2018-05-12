function logCurrentPage() {
    sessionStorage.setItem("dermalaPage", location.href);
}

function welcome() {
    var dname = sessionStorage.getItem("dermalaDisplayName");
    var email = sessionStorage.getItem("dermalaDisplayName");
    if (dname && email) {
        var gc = document.getElementById("getConnected");
        gc.removeChild(gc.childNodes[5]);
        var h2 = document.createElement("h2");
        h2.className = "text-white"
        var text = document.createTextNode("Welcome "+dname+"!");
        h2.appendChild(text);
        gc.appendChild(h2);
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