// universal script for everything

let rem = parseInt(getComputedStyle(document.documentElement).fontSize);

const display_mode = window.matchMedia('(display-mode: standalone)');
let is_pwa = display_mode.matches;

display_mode.addEventListener('change', function () {
  window.location.reload();
});

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
    document.getElementById("topthing").innerHTML = `<div style='margin-bottom: -1.6rem; font-size: 1rem;' class=center><img id='topicon' src='/ikony${icon}' style='width: 14rem; margin-top: 1rem;'><hr width='100%' color='#38393f' size='3'><div style='font-size: 1.7rem'><div style='margin: 1rem; transform: translateY(0.2rem);' id='topthingthings'><a style='margin-left: 7px;' id='wiersz' href='/wiersz'>Wiersz</a><a style='margin-left: 7px;' id='extra' href='/extra'>Różne fajne rzeczy</a><a style='margin-left: 7px;' id='gry/' href='/gry/'>Fajne gry</a><a style='margin-left: 7px;' id='kasyno/' href='/kasyno'>Kasyno</a><a style='margin-left: 7px;' id='system/' href='/system/'>Ciekawy system</a></div><hr width='100%;' color='#38393f' size='3'><i style='color: gray;'> NAD TYM SĄ PRZYCISKI DO PRZYCIŚNIĘCIA</i></div></div><br>`
  if (document.getElementById(path.substring(1, path.length))) {
    document.getElementById(path.substring(1, path.length)).remove();
  } else {
    console.log("id " + window.location.pathname + " doesn't exist");
  }
} else {
  console.log("no topthing");
}

if (!localStorage.quest) {
  localStorage.setItem("quest", "");
}

if (!localStorage.boughtItems) {
  localStorage.setItem("boughtItems", "[\"none\"]");
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

setTimeout(function () {
  document.querySelectorAll("iframe").forEach(async function (iframe) {
    if (iframe.src.includes("bottomthing")) {
      let allVersions = JSON.parse(await fetch_mch_file("/versions.json"));
      let manifest_ver = "";
      if (is_pwa && sessionStorage.pwa_version) {
        manifest_ver = `${sessionStorage.getItem("pwa_version")}-`;
      }

      iframe.height = iframe.scrollHeight + 150;
      iframe.style.overflow = "hidden";
      iframe.scrollable = "no";
      let frame_document = iframe.contentWindow.document
      let version_text = frame_document.getElementById("version_text")
      frame_document.getElementById("licenses").addEventListener("click", function () {
        createnewpopup("licensepopup", `<iframe src='/iframes/licenses.html' scrolling='yes' id='versionthing' frameborder='0'></iframe>`, "", "false");
        get("licensepopup").querySelector("iframe").style.width = `${get("licensepopup").clientWidth}px`
        get("licensepopup").querySelector("iframe").style.height = `${get("licensepopup").querySelector("iframe").clientHeight + 75}px`
      });
      version_text.innerText = `wersja ${manifest_ver}${allVersions[allVersions.length - 1].split(" ")[0]}`;
      version_text.addEventListener("click", function () {
        createnewpopup("versionpopup", "<iframe src='/iframes/versionthing' style='margin-left: 1rem; margin-right: 1rem;' scrolling='yes' id='versionthing' frameborder='0'></iframe>", "");
        get("versionpopup").querySelector("iframe").style.width = `${get("versionpopup").clientWidth - 20}px`
        get("versionpopup").querySelector("iframe").style.height = `${get("versionpopup").querySelector("iframe").clientHeight + 15}px`
      });
    }
  });
}, 500);

let old_domain_text = "https://maciejhub.github.io";
let new_domain_text = "https://maciej.pub";
let old_window = undefined;

function fuck() {
  console.log("fuck")
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
        }
        old_window.close();
        get("fuck").remove();
        localStorage.setItem("movedData", true);
      }
    });

    old_window = window.open(`${old_domain_text}/data-mover`, '', 'width=0,height=0');
}

if (!localStorage.movedData) {
  createnewpopup("fuck", "maciej hub ma nową domenę! Teraz zamiast <a href='https://maciejhub.github.io'>maciejhub.github.io</a> jest <a href='https://maciej.pub'>maciej.pub</a>. Czy chcesz przenieść danę ze starej domeny?", "<button class='centerpopupbutton' onclick='fuck()'>Tak</button>")
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
