


function id_to_id(poop_id) {
  let id = undefined;
  if (!poop_id.includes("n")) {
    return undefined;
  } else {
    id = poop_id.substring(1, poop_id.length);
  }
  let thing = undefined;
  if (id == "RM") {
    thing = "mandarynki";
  } else if (id == "ZNT") {
    thing = "nokiatycoon";
  } else if (id == "AS") {
    thing = "asmrbulka";
  } else if (id == "KRT") {
    thing = "kart";
  } else if (id == "ZNS") {
    thing = "zepsucnokie";
  }
  return thing;
}

let quest_element = get(id_to_id(localStorage.quest));
let code_field = undefined;

if (id_to_id(localStorage.quest)) {
  code_field = get("code_field").cloneNode(true);
  quest_element.addEventListener("load", function () {
    let iframe_width = quest_element.contentWindow.document.body.clientWidth - 2 * rem;
    quest_element.parentElement.appendChild(code_field);
    quest_element.parentElement.style.display = "flex";
    quest_element.parentElement.style.alignItems = "center";
    quest_element.parentElement.style.flexDirection = "column";
    code_field.style.display = "flex";
    let button_width = code_field.querySelector("button").clientWidth;
    code_field.querySelector("input").style.width = `${iframe_width - (button_width)}px`;
    code_field.querySelector("button").addEventListener("click", function () {
      checkcode();
    });
    code_field.addEventListener("keydown", function(e) {
        if (e.key == "Enter") {
            checkcode();
        }
    });
  });
}

let lettertonumber = ["error", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

function letter(of, which) {
  return of.toString().substring(which - 1, which)
}

async function checkcode() {
  let input = code_field.querySelector("input");
  let code = input.value;
  let dates = new Date();
  let hour = dates.getHours().toString().padStart(2, "0").toString();
  let date = dates.getDate().toString().padStart(2, "0").toString();
  console.log(code)

  let offset = Number(code.substring(0, 1));

  if (isNaN(offset) || isNumber(code.substring(1, 2)) || isNumber(code.substring(3, 4)) || !isNumber(code.substring(2, 3)) || !isNumber(code.substring(4, 5))) {
    code_field.querySelector("input").value = "";
    code_field.querySelector("input").placeholder = "Nie poprawny kod";
    return;
  }

  let number_code_array = code.split("")
  number_code_array[1] = lettertonumber.indexOf(letter(code, 2))
  number_code_array[3] = lettertonumber.indexOf(letter(code, 4))
  console.log(number_code_array)

  let date_array = [];
  console.log(letter(code, 2));
  date_array.push(number_code_array[1] - offset);
  date_array.push(number_code_array[3] - (offset + 2));
  if (date_array[0] + 9 == letter(date, 1)) {
    date_array[0] = date_array[0] + 9
  }
  if (date_array[1] + 9 == letter(date, 2)) {
    date_array[1] = date_array[1] + 9
  }
  let new_date = date_array.toString().replaceAll(",", "")

  let hour_array = [];
  hour_array.push(Number(letter(code, 3)) - (offset + 1));
  hour_array.push(Number(letter(code, 5)) - (offset + 3));
  if (hour_array[0] + 9 == letter(hour, 1)) {
    hour_array[0] = hour_array[0] + 9;
  }
  if (hour_array[1] + 9 == letter(hour, 2)) {
    hour_array[1] = hour_array[1] + 9;
  }
  let new_hour = hour_array.toString().replaceAll(",", "")

  if (code == localStorage.lastCodeEntered) {
    input.value = "";
    input.placeholder = "Wygeneruj nowy kod";
  } else if (date == new_date && hour == new_hour) {
    input.value = "";
    input.placeholder = "Skończone! Zobacz misję w kasynie";
    localStorage.setItem("lastCodeEntered", code);
    localStorage.setItem("quest", localStorage.quest.replace("n", "c"));
  } else {
    input.value = "";
    input.placeholder = "Nie poprawny kod                                                                         ROBERT EINSTEIN: THOSE WHO KNOW";
  }
}
