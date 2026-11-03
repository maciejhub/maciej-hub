
if (!localStorage.boughtItems) {
	localStorage.setItem("boughtItems", "[\"none\"]")
}
const ikons = {
  "stuff": [
    {
      "id": "star",
      "name": "Ikon z gwiazdką",
      "icon": "/ikony/star.png",
      "price": "75",
      "type": "ikon"
    },
    {
      "id": "pubikon",
      "name": "Ikon z napisem maciej pub",
      "icon": "/ikony/pubikon.png",
      "price": "5",
      "type": "ikon"
    },
    {
      "id": "bdikon",
      "name": "Ikon z okazji pierwszej rocznicy maciej hub",
      "icon": "/ikony/bdikon.png",
      "price": "25",
      "type": "ikon"
    },
    {
      "id": "znikon",
      "name": "Ikon z tłem gier zepsuć nokie",
      "icon": "/ikony/znikon.png",
      "price": "10",
      "type": "ikon"
    },
    {
      "id": "rmikon",
      "name": "Ikon z tłem rzucać mandarynki do kibla: the gra",
      "icon": "/ikony/rmikon.png",
      "price": "20",
      "type": "ikon"
    },
    {
      "id": "ogikon",
      "name": "Ikon z tłem oryginalnego zdjęcia",
      "icon": "/ikony/ogikon.png",
      "price": "15",
      "type": "ikon"
    },
    {
      "id": "randomikon",
      "name": "Zawsze losowy ikon od tych kupionych",
      "icon": "sklepzdjecia/dice.png",
      "price": "5",
      "type": "ikon"
    },
    {
      "id": "gmac",
      "name": "Złoty maciej w maciej clicker",
      "icon": "sklepzdjecia/goldmaciej.png",
      "price": "25",
      "type": "game_upgrade"
    },
    {
      "id": "gold",
      "name": "Złota nokia w zepsuć nokie simulator",
      "icon": "sklepzdjecia/goldnokia.png",
      "price": "25",
      "type": "game_upgrade"
    },
  ]
}

const boughtItems = JSON.parse(localStorage.boughtItems);
const update_price_text = new Event('updatePriceText');

async function show_items() {
  ikons["stuff"].forEach(function (info) {
    let item = get("shop_item").cloneNode(true);
    let stuff_inside = item.querySelector("div")
    let price_text = stuff_inside.querySelectorAll("button")[1].querySelector("b")
    stuff_inside.style.display = "flex";
    stuff_inside.style.marginRight = "30px";
    stuff_inside.querySelector("button").querySelector("img").src = info["icon"];
    stuff_inside.querySelector("button").querySelector("div").innerText = info["name"];
    if (boughtItems.includes(info["id"])) {
      if (info["type"] == "ikon") {
        if (localStorage.ikonpng.includes(info["id"])) {
          price_text.innerText = "Kliknij aby przestać używać";
        } else {
          price_text.innerText = "Kliknij aby zacząć używać";
        }
      } else {
        price_text.innerText = `Kupione`;
      }
    } else {
      price_text.innerText = `${info["price"]} tokenów`;
    }
    document.addEventListener("updatePriceText", function (ignore) {
      if (info["type"] !== "ikon" || info["id"] == ignore.ignore || !boughtItems.includes(info["id"])) {
        return;
      }
      price_text.innerText = "Kliknij aby zacząć używać";
    });
    get("shop").querySelector("div").appendChild(item);
    item.addEventListener("click", async function () {
      // console.log("div + click = welcome to event listener brother 💀")
      if (boughtItems.includes(info["id"])) {
        if (info["type"] == "ikon") {
          if (localStorage.ikonpng.includes(info["id"])) {
            localStorage.setItem("ikonpng", "/ikon.png");
            get("topicon").src = `/ikony/ikon.png`
            price_text.innerText = "Kliknij aby zacząć używać";
            update_price_text.ignore = info["id"]
            document.dispatchEvent(update_price_text);
          } else {
            localStorage.setItem("ikonpng", `/${info["id"]}.png`);
            get("topicon").src = `/ikony/${info["id"]}.png`
            price_text.innerText = "Kliknij aby przestać używać";
            update_price_text.ignore = info["id"]
            document.dispatchEvent(update_price_text);
          }
        }
        return;
      }
      if (tokens >= Number(info["price"])) {
        boughtItems.push(info["id"]);
        localStorage.setItem("boughtItems", JSON.stringify(boughtItems));
        if (info["type"] == "ikon") {
          localStorage.setItem("ikonpng", `/${info["id"]}.png`);
          get("topicon").src = `/ikony/${info["id"]}.png`
        }
        tokens -= Number(info["price"]);
        price_text.innerText = "Kupione, możliwe że nie zadziała od razu";
        await sleep(1000);
        if (info["type"] == "ikon") {
          update_price_text.ignore = info["id"]
          document.dispatchEvent(update_price_text);
          price_text.innerText = "Kliknij aby przestać używać";
        } else {
          price_text.innerText = "Kupione";
        }
      } else {
        price_text.innerText = "Masz za mało tokenów";
        await sleep(1000);
        price_text.innerText = `${info["price"]} tokenów`;
      }
    });
  });
}

show_items();

function openshop() {
	if (animationhappening == false) {
		showpopup();
    document.getElementById("shop").style.display = "initial";
		document.getElementById("popuptext").innerHTML = "SKLEP<br><br>";
	}
}
