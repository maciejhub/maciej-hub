let animationhappening = false;
let tokens = tokens2;
let fulldate = new Date();
let lastDayBeen = localStorage.lastDayBeen
let date = fulldate.getDate();
let matches = [];

function showpopup() {
  if (animationhappening == false) {
    document.getElementById("popup").style.display = "initial";
  }
}

function hidepopup() {
  get("popuptext").innerText = ""
  get("popup").style.display = "none";
  get("shop").style.display = "none";
  get("helppopup").style.display = "none";
  get("questpopup").style.display = "none";
}

hidepopup();


function sleep(ms) { // stolen
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function plusanimation2(oldtokens, newtokens) {
  animationhappening = true;
  let difference = newtokens - oldtokens;
  if (difference == 0) {
    difference = "Nic";
  }
  let lastnumintokens = parseInt(oldtokens.toString().charAt(oldtokens.toString().length - 1));
  await sleep(500);
  document.getElementById("plus").style.marginRight = "10px";
  if (difference.toString().includes("-") || difference == "Nic") {
    document.getElementById("plus").innerHTML = difference;
  } else {
    document.getElementById("plus").innerHTML = " +" + difference;
  }

  await sleep(1000);
  lastnumintokens = parseInt(newtokens.toString().charAt(newtokens.toString().length - 1));
  if (lastnumintokens == 4 || lastnumintokens == 3 || newtokens == 2) {
      document.getElementById("tokencounter").innerHTML = newtokens + " tokeny";
  } else {
      document.getElementById("tokencounter").innerHTML = newtokens + " tokenów";
  }

  if (newtokens == 1) {
      document.getElementById("tokencounter").innerHTML = newtokens + " token";
  }
  await sleep(800);
  document.getElementById("plus").innerHTML = "";
  document.getElementById("plus").style.marginRight = "0px";
  tokens = newtokens
  animationhappening = false;
}



let agained = false;
const buy = new Audio("buy.mp3");
get("spinner").style.display = "inline-block";
const urls = ["kasynozdjecie/1.png", "kasynozdjecie/2.png", "kasynozdjecie/3.png", "kasynozdjecie/4.png", "kasynozdjecie/5.png", "kasynozdjecie/6.png", "kasynozdjecie/7.png", "kasynozdjecie/8.png", "kasynozdjecie/9.png", "buy.mp3"]; // wiem ze to jest ochydne ale prosze nie pytac
let globalrolls = "hello";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let loadedstuff = 0;

function loadImage(url) {
    if (url != "buy.mp3") {

        const img = new Image();

        img.onload = function() {
            loadedstuff += 1;
            document.getElementById("loadedcounter").innerHTML = `Załadowano ${loadedstuff}/${urls.length} rzeczy`;
            if (loadedstuff == urls.length) {
                document.getElementById("spinner").style.display = "none";
                document.getElementById("loadedcounter").style.display = "none";
                awesomeanimation();
            }
        };

        img.onerror = function() {
            console.log("Error loading image: " + url);
        };

        img.src = url;
    } else {

        buy.oncanplaythrough = function() {
            loadedstuff += 1;
          document.getElementById("loadedcounter").innerHTML = `Załadowano ${loadedstuff}/${urls.length} rzeczy`;
            if (loadedstuff == urls.length) {
                document.getElementById("spinner").style.display = "none";
                document.getElementById("loadedcounter").style.display = "none";
                awesomeanimation();
            }
        };

        buy.onerror = function() {
            console.log("Failed to load audio");
        };
    }
}

urls.forEach(url => loadImage(url));

async function animate_border(my_matches, match_number, is_help) {
  value = my_matches[match_number];
  let pos = value.split(",");
  let item = (x) => get(`item${Number(pos[x]) - 1}`);
  if (item(0).className == "") {
    item(0).className = "whitecontainer";
    item(1).className = "whitecontainer";
  }
  await sleep(500);
  item(0).className = "";
  item(1).className = "";
  let sleep_length;
  if (my_matches.length == 1) {
    sleep_length = 500
  } else {
    sleep_length = 1000 / my_matches.length
  }
  await sleep(sleep_length);
  if (is_help) {
    if (get("popuptext").innerHTML == "Pomoc<br>") {
      animate_border(my_matches, 0, true);
    }
  } else {
    if (my_matches == matches) {
      if (match_number + 1 > my_matches.length - 1) {
        animate_border(my_matches, 0);
      } else {
        animate_border(my_matches, match_number + 1);
      }
    } else {
      return;
    }
  }
}

async function checkformatch() {
    let addtokens = 0;
    matches = [];
    for (let i = 0; i < 9; i++) {
        if (globalrolls[1 + i] == globalrolls[2 + i]) {
           // console.log(`Found h match at ${1 + i} and ${2 + i}`);
            if (i != 2 && i != 5) {
                addtokens += 1;
                matches.push(`${1 + i},${2 + i}`)
            }
        }
        if (globalrolls[1 + i] == globalrolls[4 + i]) {;
            //console.log(`Found v match at ${1 + i} and ${4 + i}`);
            matches.push(`${1 + i},${4 + i}`)
            addtokens += 1;
        }
    }
    if (matches.length > 0) {
      animate_border(matches, 0);
    }
  plusanimation2(tokens, tokens - 2 + addtokens);
}
// token maker

if (localStorage.visitedCasino) {
  console.log("Visited casino")
} else {
  localStorage.setItem("visitedCasino", "true");
  localStorage.setItem("casinoTokens", localStorage.sessions);
}

function updateeverything() {
  if (animationhappening == false) {
    localStorage.setItem("casinoTokens", tokens);
    let lastnumintokens = parseInt(localStorage.casinoTokens.charAt(localStorage.casinoTokens.toString().length - 1));

    if (lastnumintokens == 4 || lastnumintokens == 3 || localStorage.casinoTokens == 2) {
        document.getElementById("tokencounter").innerHTML = localStorage.casinoTokens + " tokeny";
    } else {
        document.getElementById("tokencounter").innerHTML = localStorage.casinoTokens + " tokenów";
    }

    if (localStorage.casinoTokens == 1) {
        document.getElementById("tokencounter").innerHTML = localStorage.casinoTokens + " token";
    }
  }
    setTimeout(updateeverything, 100);
}

//
async function spinthing() {
    document.getElementById("spin").innerHTML = "Masz za mało tokenów. Dostajesz 3 tokeny kiedy kończysz misję";
    await sleep(3500);
    document.getElementById("spin").innerHTML = "Kręć maszyne za 2 tokeny";
}

function openhelp() {
  if (animationhappening == false) {
    showpopup();
    get("popuptext").innerHTML = "Pomoc<br>";
    get("helppopup").style.display = "inline";
    animate_border(["11,12"], 0, true);
  }
}

function again() {
  if (animationhappening == false) {
    if (tokens > 1) {
        agained = true
        buy.play();
        const rolls = [0];
        document.getElementById("mythingdingle").innerHTML = "";
        for (let i = 0; i < 9; i++) {
            if (i == 3 || i == 6 || i == 9) {
                const randomgetter = getRandomInt(8) + 1;
                rolls.push(randomgetter);
                document.getElementById("mythingdingle").innerHTML += `<br><span style="width: 4rem; margin-left: 0.25rem; margin-right: 0.25rem;" id='item${i}'><img style='width: 4rem;' src=kasynozdjecie/${randomgetter}.png></span>`;
            } else {
                const randomgetter = getRandomInt(8) + 1;
                rolls.push(randomgetter);
                document.getElementById("mythingdingle").innerHTML += `<span style="width: 4rem; margin-left: 0.25rem; margin-right: 0.25rem;" id='item${i}'><img style='width: 4rem;' src=kasynozdjecie/${randomgetter}.png></span>`;
            }
        }
        globalrolls = rolls;
        checkformatch();
    } else {
        spinthing();
    }
  }
}

function awesomeanimation() {
    if (agained == false) {
        const rolls = [0];
        document.getElementById("mythingdingle").innerHTML = "";
        const randomgetter = getRandomInt(8) + 1;
        let html = "";
        for (let i = 0; i < 9; i++) {
            if (i == 3 || i == 6 || i == 9) {
              html += "<br><img style='width: 4rem;' src=kasynozdjecie/" + randomgetter + ".png>" + " ";
            } else {
              html += "<img style='width: 4rem;' src=kasynozdjecie/" + randomgetter + ".png>" + " ";
            }
        }
        get("mythingdingle").innerHTML = html
    }
    if (agained == false) {
      setTimeout(awesomeanimation, 500);
    }
}

function resetdata() {
    localStorage.removeItem("casinoTokens");
    localStorage.removeItem("visitedCasino");
    window.close();
}
tokens = tokens2;

if (localStorage.sessions) {
    if (typeof tokens != "number" || isNaN(tokens)) {
        tokens = localStorage.sessions;
    }
} else {
    if (typeof tokens != "number" || isNaN(tokens)) {
        tokens = 1;
    }
}

let difference = tokens - localStorage.casinoPreviousTokens;

async function plusanimation() {
  let lastnumintokens = parseInt(localStorage.casinoPreviousTokens.charAt(localStorage.casinoPreviousTokens.toString().length - 1));
  if (lastnumintokens == 4 || lastnumintokens == 3 || localStorage.casinoPreviousTokens == 2) {
        document.getElementById("tokencounter").innerHTML = localStorage.casinoPreviousTokens + " tokeny";
    } else {
        document.getElementById("tokencounter").innerHTML = localStorage.casinoPreviousTokens + " tokenów";
    }

    if (localStorage.casinoTokens == 1) {
        document.getElementById("tokencounter").innerHTML = localStorage.casinoPreviousTokens + " token";
    }
  await sleep(500);
  document.getElementById("plus").style.marginRight = "10px";
  document.getElementById("plus").innerHTML = " +" + difference;
  await sleep(1000);
  updateeverything();
  await sleep(800);
  document.getElementById("plus").innerHTML = "";
  document.getElementById("plus").style.marginRight = "0px";
  updateeverything();
}

if (difference != 0) {
  plusanimation();
} else {
  updateeverything();
}
function setprevtokens() {
  localStorage.setItem("casinoPreviousTokens", tokens);
}

localStorage.setItem("casinoPreviousTokens", tokens);
document.addEventListener("visibilitychange", setprevtokens);
window.addEventListener("pagehide", setprevtokens);

if (isNaN(tokens2)) {
  window.location.reload();
}
