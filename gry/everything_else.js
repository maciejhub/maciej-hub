let done = 0;
let sorting = 0;

get("1").appendChild(get("zepsucnokie"));
get("2").appendChild(get("maciejclicker"));
get("3").appendChild(get("mandarynki"));
get("4").appendChild(get("kart"));
get("5").appendChild(get("nokiatycoon"));
get("6").appendChild(get("zntr"));
get("7").appendChild(get("asmrbulka"));
get("8").appendChild(get("skibidi"));

document.querySelectorAll("iframe").forEach(function (frame) {
  if (frame.src.includes("bottomthing")) {
    return;
  }
  if (screen.orientation.type.includes("landscape")) {
    frame.width = "480px";
    frame.contentWindow.location.reload();
  } else {
    frame.width = "90%";
  }

  frame.addEventListener("load", function () {
    frame.height = `${frame.contentWindow.document.body.scrollHeight + 50}px`;
  });
});

if (localStorage.gamesPlayed == undefined) {
    localStorage.setItem("gamesPlayed", JSON.stringify([0, 0, 0, 0, 0, 0, 0]));
}

const queryString2 = window.location.search;
const urlParams2 = new URLSearchParams(queryString2);
let shared = urlParams2.get("share");
let shared2 = urlParams2.get("share2");

if (shared != null || shared2 != null) {
    if (localStorage.shareVisits) {
        localStorage.setItem("shareVisits", parseInt(localStorage.shareVisits) + 1);
    } else {
        localStorage.setItem("shareVisits", 1);
    }
}

if (shared != null) {
    if (shared != "all") {
        document.getElementById("showallbutton").style.display = "initial";
        document.getElementById("maciejclicker").style.display = "none";
        document.getElementById("skibidi").style.display = "none";
        document.getElementById("zepsucnokie").style.display = "none";
        document.getElementById("mandarynki").style.display = "none";
        document.getElementById("asmrbulka").style.display = "none";
        document.getElementById("nokiatycoon").style.display = "none";
      document.getElementById("kart").style.display = "none";
      document.getElementById("zntr").style.display = "none";
        document.getElementById(shared).style.display = "initial";
    }
}

if (shared2 != null) {
    document.getElementById(shared2).style.display = "initial";
}

function isNumber(char) {
    return /^\d$/.test(char);
}

if (localStorage.lastCodeEntered) {
    console.log("lastCodeEntered exists");
} else {
    localStorage.setItem("lastCodeEntered", "");
}

function showall() {
    document.getElementById("maciejclicker").style.display = "initial";
    document.getElementById("skibidi").style.display = "initial";
    document.getElementById("zepsucnokie").style.display = "initial";
    document.getElementById("mandarynki").style.display = "initial";
    document.getElementById("asmrbulka").style.display = "initial";
  document.getElementById("nokiatycoon").style.display = "initial";
  document.getElementById("zntr").style.display = "initial";
  sorting = 3;
  changesorting();
    document.getElementById("showallbutton").style.display = "none";
}

function hidepopup() {
    document.getElementById("codepopup").style.display = "none";
    document.getElementById("popup").style.display = "none";
    document.getElementById("sharepopup").style.display = "none";
}

function showpopup() {
    document.getElementById("popup").style.display = "initial";
    document.getElementById("codepopup").style.display = "none";
    document.getElementById("sharepopup").style.display = "initial";
}

function showcode() {
    document.getElementById("sharepopup").style.display = "none";
    document.getElementById("codepopup").style.display = "inline";
    document.getElementById("popup").style.display = "inline";
}

let shareurl = "mangos";

async function copylink() {
    shareurl = window.location.origin + "/gry/?share=" + document.getElementById("sharechoose").value;
    navigator.clipboard.writeText(shareurl);
    document.getElementById("copytext").innerHTML = "Link zkopiowany!";
    await sleep(700);
    document.getElementById("copytext").innerHTML = "Kopiuj link";
}

function changesorting() {
    sorting += 1;
    if (sorting > 3) {
        sorting = 1;
    }

    if (sorting == 1) {
        get("1").appendChild(get("zepsucnokie"));
        get("2").appendChild(get("maciejclicker"));
        get("3").appendChild(get("mandarynki"));
        get("4").appendChild(get("nokiatycoon"));
        get("5").appendChild(get("kart"));
        get("6").appendChild(get("asmrbulka"));
        get("7").appendChild(get("skibidi"));
        get("8").appendChild(get("zntr"));
        get("sorting_button").innerText = "Sortowanie: Polecane";
    } else if (sorting == 2) {
        get("1").appendChild(get("maciejclicker"));
        get("2").appendChild(get("skibidi"));
        get("3").appendChild(get("zepsucnokie"));
        get("4").appendChild(get("mandarynki"));
        get("5").appendChild(get("asmrbulka"));
        get("6").appendChild(get("kart"));
        get("7").appendChild(get("nokiatycoon"));
        get("8").appendChild(get("zntr"));
        get("sorting_button").innerText = "Sortowanie: Data wydania (od najstarszego do najnowszego)";
    } else if (sorting == 3) {
        get("1").appendChild(get("zntr"));
        get("2").appendChild(get("maciejclicker"));
        get("3").appendChild(get("nokiatycoon"));
        get("4").appendChild(get("zepsucnokie"));
        get("5").appendChild(get("skibidi"));
        get("6").appendChild(get("asmrbulka"));
        get("7").appendChild(get("kart"));
        get("8").appendChild(get("mandarynki"));
        get("sorting_button").innerText = "Sortowanie: Czas tworzenia (od najwięcej do najmniej)";
    }
}

changesorting();
