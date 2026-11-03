// universal script for everything

let path = window.location.pathname;
window.parent.postMessage(window.location.pathname);
let tokens2 = parseInt(localStorage.casinoTokens)
if (!localStorage.ikonpng) {
  localStorage.setItem("ikonpng", "/ikon.png");
}
if (localStorage.ikonpng == "/premiumikon.png") {
  localStorage.setItem("ikonpng", "/starikon.png")
}
let icon = localStorage.ikonpng
if (localStorage.ikonpng == "/randomikon.png") {
  let icons = ["ogikon", "rmikon", "star", "znikon", "bdikon", "pubikon"]
  icons.forEach(function (icon) {
    if (!localStorage.boughtItems.includes(icon)) {
      icons.splice(icons.indexOf(icon), 1)
    }
  });
  icon = `/${icons[Math.floor(Math.random() * icons.length)]}.png`;
}
if (document.getElementById("topthing")) {
    document.getElementById("topthing").innerHTML = `<div class=center><img id='topicon' src='/ikony${icon}' width=200><hr width='100%' color='#38393f' size='3'><h2><div id='topthingthings'><a style='margin-left: 7px;' id='wiersz' href='/wiersz'>Wiersz</a><a style='margin-left: 7px;' id='extra' href='/extra'>Różne fajne rzeczy</a><a style='margin-left: 7px;' id='gry/' href='/gry/'>Fajne gry</a><a style='margin-left: 7px;' id='kasyno/' href='/kasyno'>Kasyno</a><a style='margin-left: 7px;' id='system/' href='/system/'>Ciekawy system</a></div><hr width='100%;' color='#38393f' size='3'><i style='color:gray;'> NAD TYM SĄ PRZYCISKI DO PRZYCIŚNIĘCIA</i></h2></div>`
  if (document.getElementById(path.substring(1, path.length))) {
    document.getElementById(path.substring(1, path.length)).remove();
  } else {
    console.log("id " + window.location.pathname + " doesn't exist");
  }
} else {
  console.log("no topthing");
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let thing = urlParams.get("s");
let cameFromQr = false;
if (queryString.includes("qr")) {
  cameFromQr = true;
  localStorage.setItem("lastQrType", "gen" + urlParams.get("gen"));
  if (localStorage.qrVisits) {
    localStorage.setItem("qrVisits", parseInt(localStorage.qrVisits) + 1);
  } else {
    localStorage.setItem("qrVisits", 1);
  }
}
function check() {
  if (document.getElementById("topthing")) {
    if (thing == "f") {
      document.getElementById("topthing").style.display = "none";
      if (document.getElementById("bottomthing")) {
        document.getElementById("bottomthing").style.display = "none";
      }
    } else {
      document.getElementById("topthing").style.display = "initial";
    }
  }
}
check();
// session counter
if (localStorage.cameFromQr == undefined) {
  if (cameFromQr) {
    localStorage.setItem("cameFromQr", "gen" + urlParams.get("gen"));
  } else {
    localStorage.setItem("cameFromQr", false);
  }
}
if (localStorage.sessions) {
} else {
  localStorage.setItem("sessions", "0");
}
function getCookie(name) {
  // stolen
  let value = "; " + document.cookie; // Use var instead of const
  let parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}

let sessions = localStorage.getItem("sessions");

if (getCookie("firstVisitInSession") == "false") {
  console.log("Same session");
} else {
  console.log("New session");
  sessions = parseInt(sessions) + 1;
  localStorage.setItem("sessions", sessions);

  //fetch("http://192.168.123.63:8888/getrandom", {
	//	cache: 'no-cache'
	//})
	//.then(response => response.text())
  //.then(data => {
  //  console.log("Added visit to server");

  //})
  //.catch(console.log("<b>Serwer zepsuty pewnie wyłączony</b>"));
}

document.addEventListener("visibilitychange", function () {
  document.cookie =
    "firstVisitInSession=false; SameSite=lax; max-age=30; path=/";
});

function removeTags(str) {
  return str.replace(/<[^>]+>/g, "");
}
let popupnumber = 0;
let lastpopupid;


async function nopermissionnotification() {
  if (Notification?.permission == "granted" && Notification?.permission != "default") {
    if (document.getElementById("notificationtext")) {
      document.getElementById("notificationtext").innerHTML =
        "<b>Włącz powiadomienia na nowe wiadomości (Włączone)</b>";
    }
    const img = "ikon.png";
    let allMessages = "error";
    fetch("/allMessages.json", {
      cache: 'no-cache'
    })
    .then(response => response.text())
    .then(data => {
      allMessages = JSON.parse(data)
    })
    .catch(allMessages = ["Error, nie można wziąść najnowszej wiadomości"]);
    await sleep(500);
    if (allMessages == "error") {
      allMessages = ["Error, nie można wziąść najnowszej wiadomości"]
    }
    let newestmessage = removeTags(allMessages[allMessages.length - 1]);
    if (
      localStorage.lastMessageRead != allMessages[allMessages.length - 1] &&
      allMessages[0] != "Error"
    ) {
      const notification = new Notification("Nowa wiadomość!", {
        body: newestmessage,
        icon: img,
      });
      localStorage.setItem(
        "lastMessageRead",
        allMessages[allMessages.length - 1],
      );
    } else {
      console.log("Not going to annoy with notification");
    }
  }
}
async function notification() {
  Notification.requestPermission().then(async (result) => {
    if (result == "granted") {
      if (document.getElementById("notificationtext")) {
        document.getElementById("notificationtext").innerHTML =
          "<b>Włącz powiadomienia na nowe wiadomości (Włączone)</b>";
      }
      const img = "ikon.png";
      let allMessages = "error";
      fetch("/allMessages.json", {
        cache: 'no-cache'
      })
      .then(response => response.text())
      .then(data => {
        allMessages = JSON.parse(data)
      })
      .catch(allMessages = ["Error, nie można wziąść najnowszej wiadomości"]);
      await sleep(500);
      if (allMessages == "error") {
        allMessages = ["Error, nie można wziąść najnowszej wiadomości"]
      }
      let newestmessage = removeTags(allMessages[allMessages.length - 1]);
      if (
        localStorage.lastMessageRead != allMessages[allMessages.length - 1] &&
        allMessages[0] != "Error"
      ) {
        const notification = new Notification("Nowa wiadomość!", {
          body: newestmessage,
          icon: img,
        });
        localStorage.setItem(
          "lastMessageRead",
          allMessages[allMessages.length - 1],
        );
      } else {
        console.log("Not going to annoy with notification");
      }
    }
  });
}
nopermissionnotification();

let allVersions = ["Nieznany error"]
fetch("/versions.json", {
		cache: 'no-cache'
	})
	.then(response => response.text())
	.then(data => {
		console.log("Setting allVersions")
		allVersions = JSON.parse(data)
	})
	.catch(allVersions = ["Error, nie można wziąść wersji"]);


setTimeout(function () {
  document.querySelectorAll("iframe").forEach(function (iframe) {
    if (iframe.src.includes("bottomthing")) {
      iframe.height = iframe.scrollHeight + 150;
      iframe.style.overflow = "hidden";
      iframe.scrollable = "no";
      let frame_document = iframe.contentWindow.document
      let version_text = frame_document.getElementById("version_text")
      frame_document.getElementById("licenses").addEventListener("click", function () {
        createnewpopup("licensepopup", `<iframe src='/licenses.html' width=600px scrolling='yes' id='versionthing' frameborder='0'></iframe>`, "", "false");
        get("licensepopup").querySelector("iframe").width = `${get("licensepopup").clientWidth}px`
        get("licensepopup").querySelector("iframe").height = `${get("licensepopup").querySelector("iframe").clientHeight + 75}px`
      });
      version_text.innerText = `wersja ${allVersions[allVersions.length - 1].split(" ")[0]}`;
      version_text.addEventListener("click", function () {
        createnewpopup("versionpopup", "<iframe src='/versionthing' width=600px scrolling='yes' id='versionthing' frameborder='0'></iframe>", "");
        get("versionpopup").querySelector("iframe").width = `${get("versionpopup").clientWidth}px`
        get("versionpopup").querySelector("iframe").height = `${get("versionpopup").querySelector("iframe").clientHeight + 15}px`
      });
    }
  });
}, 500);

let old_domain_text = "https://maciejhub.github.io";
let new_domain_text = "https://maciej.pub";

if (window.location.origin == new_domain_text && localStorage.sessions < 1) {
  console.log("Transferring data...")
  window.addEventListener("message", function (e) {
    if (e.origin == old_domain_text) {
      let data = JSON.parse(e.data);
      localStorage.clear();

      for (const key in data) {
        localStorage.setItem(key, data[key]);
      }

      if (localStorage.sessions < 1 || !localStorage.sessions) {
        localStorage.setItem("sessions", 1)
      } else {
        createnewpopup("domainpopup", "maciej hub ma nową domenę! Teraz zamiast wchodzenia na stronę <a href='https://maciejhub.github.io'>maciejhub.github.io</a> to wchodzi się na <a href='https://maciej.pub'>maciej.pub</a>.", "")
      }
    }
  });
  let old_domain = document.createElement("iframe")
  old_domain.width = "0px";
  old_domain.height = "0px";
  old_domain.style.border = "none";
  old_domain.src = old_domain_text;
  document.body.appendChild(old_domain);
}
