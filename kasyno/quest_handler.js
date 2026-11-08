let quests = {
  stuff: [
    {
      "id": "S",
      "name": "Dostań mniej niż 1 sekundę 5 razy w maciej hub speedrun",
      "tokens": "3"
    },
    {
      "id": "RM",
      "name": "Dostań 4+ mandarynki w rzucać mandarynki do kibla: THE GRA",
      "tokens": "3"
    },
    {
      "id": "ZNT",
      "name": "Dostań 5+ odświeżen w zepsuć nokie TYCOON",
      "tokens": "3"
    },
    {
      "id": "AS",
      "name": "Dostań 20+ na 3 piosenkach w asmr bułka: THE GRA",
      "tokens": "3"
    },
    {
      "id": "KRT",
      "name": "Dostań 13+ mystery boxów w <i style=\"color: black;\">censored</i> KART",
      "tokens": "3"
    },
    {
      "id": "ZNS",
      "name": "Zniszcz 40+ nokii w zepsuć nokie SIMULATOR",
      "tokens": "3"
    }
  ]
}

function indexOfQuest(string) {
  let again = true;
  let i = -1;
  quests["stuff"].forEach(function (quest) {
    if (again) {
      i++;
      if (quest["id"] == string) {
        again = false;
      }
    }
  });
  console.log(i)
  return i;
}

const current_quest = () => localStorage.quest.substring(1, localStorage.quest.length);

if (localStorage.quest) {
  console.log("quest already exists")
} else {
  localStorage.setItem("quest", "nS")
}

if (localStorage.lastDayBeen != date) {
  get("questamount").innerText = "Zostały ci 2 misje dzisiaj";
  localStorage.setItem("questsDoneToday", 0);
}
localStorage.setItem("lastDayBeen", date);
if (localStorage.questsDoneToday == undefined) {
  localStorage.setItem("questsDoneToday", 0);
}
if (localStorage.questsDone == undefined) {
  localStorage.setItem("questsDone", 0);
}
if (localStorage.questsDone == 0 && localStorage.quest == "nS") {
  localStorage.setItem("quest", "nRM");
}
if (parseInt(localStorage.questsDoneToday) == 0) {
  get("questamount").innerText = "Zostały ci 2 misje dzisiaj";
} else if (parseInt(localStorage.questsDoneToday) == 1) {
  get("questamount").innerText = "Została ci 1 misja dzisiaj";
} else if (parseInt(localStorage.questsDoneToday) == 2) {
  get("questamount").innerText = "Skończyłeś wszystkie swoje misje dzisiaj. Wróć jutro na kolejne";
}

function getnewquesttype() {
  let prevtype = indexOfQuest(current_quest());
  let type = prevtype
  type += getRandomInt(2) + 1
  if (type > quests["stuff"].length - 1) {
    type -= quests["stuff"].length;
  }
  if (type < 0) {
    type += quests["stuff"].length;
  }
  return "n" + quests["stuff"][type]["id"]
}
async function checkforcompletedquest() {
  if (localStorage.quest.substring(0, 1) == "c") {
    let oldtokens = tokens;
    hidepopup();
    plusanimation2(oldtokens, oldtokens + 3);
    await sleep(2300);
    animationhappening = false;
    tokens += 2;
    localStorage.setItem("quest", localStorage.quest.replace("c", "?"));
    await sleep(400);
    localStorage.setItem("questsDoneToday", parseInt(localStorage.questsDoneToday) + 1);
    localStorage.setItem("questsDone", parseInt(localStorage.questsDoneToday) + 1);
    if (parseInt(localStorage.questsDoneToday) > 1) {
      get("questtitle").innerText = "Nie ma misji";
      get("questamount").innerText = "Skończyłeś wszystkie swoje misje dzisiaj. Wróć jutro na kolejne";
    } else {
      get("questamount").innerText = "Została ci 1 misja dzisiaj";
    }
    get("questfinished").innerText = "Kliknij na nową misję";
    get("questtitle").innerText = "Nie ma misji";
  } else if (localStorage.quest.substring(0, 1) == "?") {
    if (localStorage.questsDoneToday != 2) {
      localStorage.setItem("quest", getnewquesttype());
      get("questtitle").innerText = quests["stuff"][indexOfQuest(current_quest())]["name"];
      await sleep(100);
      get("questfinished").innerText = "Nie skończone";
    } else {
      get("questfinished").innerText = "Dostajesz nic";
      await sleep(1000);
      get("questfinished").innerText = "Kliknij na nic";
    }
  } else {
    get("questfinished").innerText = "Nie skończyłeś misji";
    await sleep(700);
    get("questfinished").innerText = "Nie skończone";
  }
}
function openquests() {
  if (animationhappening == false) {
    showpopup();
    get("questpopup").style.display = "initial";
    get("popuptext").innerHTML = "Misje<br>";
    if (localStorage.questsDoneToday == 2) {
      get("questtitle").innerText = "Nie ma misji";
      get("questfinished").innerText = "Kliknij na nic";
      return
    }
    get("questtitle").innerText = quests["stuff"][indexOfQuest(current_quest())]["name"];
    if (localStorage.quest.substring(0, 1) == "n") {
      get("questfinished").innerText = "Nie skończone";
    } else if ((localStorage.quest.substring(0, 1) == "?")) {
      get("questtitle").innerText = "Nie ma misji";
      get("questfinished").innerText = "Kliknij na nową misję";
    } else if (localStorage.quest.substring(0, 1) == "c") {
      get("questfinished").innerText = "Skończone, kliknij";
    }
  }
}
