
function tab1Select() {
  document.getElementById("MStab").className = "tablinks active";
  document.getElementById("MAtab").className = "tablinks";
  document.getElementById("Microbiome and Skin").className = "tabContent container-fluid";
  document.getElementById("Microbiome and Acne").className = "tabContent container-fluid hidden";
}

function tab2Select() {
  document.getElementById("MAtab").className = "tablinks active";
  document.getElementById("MStab").className = "tablinks";
  document.getElementById("Microbiome and Acne").className = "tabContent container-fluid";
  document.getElementById("Microbiome and Skin").className = "tabContent container-fluid hidden";
}

function logCurrentPage(){
  sessionStorage.setItem("dermalaPage", location.href);
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