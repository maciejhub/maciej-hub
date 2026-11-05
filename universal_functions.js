function get(x) {
  return document.getElementById(x);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createnewpopup(id, content, second_button, audio, style) {
  lastpopupid = id;
  let popup = document.createElement("div");
  popup.innerHTML = `<div class='centerpopup' ${style} id=${id}><div class='center'><br><div id="popup_content${popupnumber}" style="width: 100%;">${content}</div><br><div style='display: flex; gap: 10px; justify-content: center;'><button id='closepopupbutton${popupnumber}' class='centerpopupbutton'>Zamknij</button><div id='secondpopupbutton${popupnumber}' style='z-index: 2;'>${second_button}</div></div></div></div>`;
  document.body.appendChild(popup);
  document.getElementById(`closepopupbutton${popupnumber}`).onclick = function () {
    if (audio instanceof Audio) {
      audio.pause();
      audio = null;
    }
    popup.remove();
    localStorage.setItem("movedData", true);
  };
  popupnumber += 1;
  return popupnumber - 1
}

async function fetch_mch_file(link, use_cache) {
  let text = undefined;
  if (!use_cache) {
    use_cache = "no-cache";
  }
  await fetch(link, {
    cache: use_cache
	})
	.then(response => response.text())
    .then(data => {
      text = data;
	})
    .catch(error => {
      text = "Error";
      console.log(error);
    });
  return text;
}
