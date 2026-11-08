
let directory = "/"

function get(element) {
   return document.getElementById(element)
}

async function renderdirectory(path) {
  await sleep(50);
  while (document.getElementById("basefile2")) {
    document.getElementById("basefile2").remove();
  }

  let current = file_system;
  let parts = path.split("/").filter(p => p);

  for (let part of parts) {
    current = current.contents.find(item => item.name === part);
    if (!current) {
      return;
    }
  }
  parts.pop()

  if (directory !== "/") {
    if (directory !== "") {
      renderfile("folder", "Wstecz", parts.join("/"));
    }
  }

  for (let i = 0; i < current.contents.length; i++) {
    let file = current.contents[i];
    if (file.type == "file") {
      renderfile(file.type, file.name, file.contents);
    } else {
      renderfile(file.type, file.name, `${path}/${file.name}`);
    }
  }
}

renderdirectory("/");

async function remove_listeners(audio, player, popupnumber, func1, func2) {
  if (player.parentElement.id !== `popup_content${popupnumber}`) {
    audio.removeEventListener("timeupdate", func1);
    player.removeEventListener("click", func2);
    audio.pause();
    return;
  }
  await sleep(100);
  remove_listeners(audio, player, popupnumber, func1, func2);
}

function format_time(time) {
  let minutes = Math.floor(Number(time) / 60);
  if (minutes.toString().length == 1) {
    minutes = `0${minutes}`;
  }
  let seconds = Number(time) - 60 * minutes;
  if (seconds.toString().length == 1) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

async function audio_player_stuff(audio, popupnumber) {
  let player = get("gay_gay_gay").cloneNode(true);
  let time_text = player.querySelectorAll("div")[2]
  get(`popup_content${popupnumber}`).appendChild(player);
  player.querySelector("button").innerHTML = '<span class="system_loader" style="width: 22px; height: 22px;" ></span>'
  console.log(player.querySelector("button").innerHTML)
  player.querySelector("div").style.display = "flex";
  let duration = 0;
  let formatted_duration = "00:00";
  audio.onloadedmetadata = async function () {
    duration = Math.round(audio.duration).toString();
    if (duration.length == 1) {
      duration = `0${duration}`
    }
    time_text.innerText = `00:00 / ${formatted_duration}`;
    console.log(player.querySelector("button").innerHTML)
    clicked_func();
    //player.querySelector("button").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30"><path fill="white" d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z"/></svg>';
  };
  time_text.innerText = `00:00 / 00:00`;
  const clicked_func = () => {
    if (player.parentElement.id !== `popup_content${popupnumber}`) {
      return;
    }
    if (!audio.paused) {
      audio.pause();
      //player.querySelector("button").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30"><path fill="white" d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z"/></svg>';
    } else {
      player.querySelector("button").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M176 96C149.5 96 128 117.5 128 144L128 496C128 522.5 149.5 544 176 544L240 544C266.5 544 288 522.5 288 496L288 144C288 117.5 266.5 96 240 96L176 96zM400 96C373.5 96 352 117.5 352 144L352 496C352 522.5 373.5 544 400 544L464 544C490.5 544 512 522.5 512 496L512 144C512 117.5 490.5 96 464 96L400 96z" fill="white"/></svg>';
      audio.play();
    }
  }
  const timeupdate_func = () => {
    let current_time = Math.round(audio.currentTime).toString();
    if (current_time.length == 1) {
      current_time = `0${current_time}`
    }
    let formatted_time = format_time(current_time);
    time_text.innerText = `${formatted_time} / ${format_time(duration)}`;
    player.querySelectorAll("div")[4].style.width = `${(100 / duration) * Number(current_time)}px`;
    if (audio.paused) {
      player.querySelector("button").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30"><path fill="white" d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z"/></svg>';
    }
  }
  audio.addEventListener('timeupdate', timeupdate_func);
  player.addEventListener("click", clicked_func);
  remove_listeners(audio, player, popupnumber, timeupdate_func, clicked_func);
}

function video_player_stuff(link, popupnumber) {
  let player = get("video_player_top").cloneNode(true);
  get(`popup_content${popupnumber}`).appendChild(player);
  player.style.display = "flex";
  let video = player.querySelector("video");
  video.src = link;
  let control_hider = player.querySelectorAll("div")[4];
  let pause_button = player.querySelectorAll("button")[1];
  let progress_bar = player.querySelectorAll("div")[2];
  let controls = player.querySelector("div");
  let previous_video_width = 100;
  let previous_video_height = 100;
  let parent_popup = get(`popup_content${popupnumber}`).parentElement.parentElement;
  let progress_width = 0;
  let popup_height = undefined;
  let old_maxHeight = "100%";
  let old_maxWidth = "100%";

  const metadata_load = () => {
    duration = Math.round(video.duration).toString();
    if (duration.length == 1) {
      duration = `0${duration}`
    }
    if (video.clientWidth > video.clientHeight) {
      player.querySelector("video").style.maxWidth = "110%";
    } else {
      player.querySelector("video").style.maxWidth = "70%";
    }
    let video_width = video.clientWidth
    if (video_width < 230) {
      video_width = 230;
    }

    let player_height = player.querySelector("div").clientHeight;

    player.querySelectorAll("button")[1].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M176 96C149.5 96 128 117.5 128 144L128 496C128 522.5 149.5 544 176 544L240 544C266.5 544 288 522.5 288 496L288 144C288 117.5 266.5 96 240 96L176 96zM400 96C373.5 96 352 117.5 352 144L352 496C352 522.5 373.5 544 400 544L464 544C490.5 544 512 522.5 512 496L512 144C512 117.5 490.5 96 464 96L400 96z" fill="white"/></svg>';
    controls.style.width = `${video_width + 2}px`;
    control_hider.style.height = `${player_height + 30}px`
    control_hider.style.width = `${video_width + 30}px`;
    progress_width = (controls.clientWidth - (pause_button.clientWidth + player.querySelectorAll("div")[1].clientWidth)) - 40
    player.querySelectorAll("div")[1].innerText = `00:00 / 00:${duration}`;
    progress_bar.style.width = `${progress_width}px`;
    player.querySelector("thing").style.width = `${video.clientWidth}px`;
    player.querySelector("thing").style.height = `${video.clientHeight}px`;
    previous_video_width = video.clientWidth;
    previous_video_height = video.clientHeight;
    old_maxHeight = video.style.maxHeight;
    old_maxWidth = video.style.maxWidth;
    popup_height = parent_popup.clientHeight;
    console.log(popup_height)
  }
  video.onloadedmetadata = metadata_load;
  video.addEventListener("timeupdate", function () {
    let current_time = Math.round(video.currentTime).toString();
    if (current_time.length == 1) {
      current_time = `0${current_time}`
    }
    let formatted_time = format_time(current_time);
    player.querySelectorAll("div")[1].innerText = `${formatted_time} / ${format_time(duration)}`;
    player.querySelectorAll("div")[3].style.width = `${(progress_width / duration) * Number(current_time)}px`;
    if (video.paused) {
      pause_button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="22" height="22"><path fill="white" d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z"/></svg>';
    }
  });
  pause_button.addEventListener("click", function () {
    if (!video.paused) {
      video.pause();
      pause_button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="22" height="22"><path fill="white" d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z"/></svg>';
    } else {
      pause_button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M176 96C149.5 96 128 117.5 128 144L128 496C128 522.5 149.5 544 176 544L240 544C266.5 544 288 522.5 288 496L288 144C288 117.5 266.5 96 240 96L176 96zM400 96C373.5 96 352 117.5 352 144L352 496C352 522.5 373.5 544 400 544L464 544C490.5 544 512 522.5 512 496L512 144C512 117.5 490.5 96 464 96L400 96z" fill="white"/></svg>';
      video.play();
    }
  });
  video.play();

  player.querySelector("button").onclick = async () => { // i have sientifficlay prooved that there are built in iphone 18 pro maxes inside frogs
    if (!get("fullscreen_content").querySelector("video")) {
      get("fullscreen_content").style.display = "flex";
      get("fullscreen_content").appendChild(get(`popup_content${popupnumber}`).querySelector("div"));
      video.style.maxWidth = `${document.body.clientWidth * 0.8}px`;
      video.style.maxHeight = `${document.body.clientHeight * 0.65}px`;
      player.querySelector("button").innerHTML = '<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="white" d="M256 128C256 110.3 241.7 96 224 96C206.3 96 192 110.3 192 128L192 192L128 192C110.3 192 96 206.3 96 224C96 241.7 110.3 256 128 256L224 256C241.7 256 256 241.7 256 224L256 128zM128 384C110.3 384 96 398.3 96 416C96 433.7 110.3 448 128 448L192 448L192 512C192 529.7 206.3 544 224 544C241.7 544 256 529.7 256 512L256 416C256 398.3 241.7 384 224 384L128 384zM448 128C448 110.3 433.7 96 416 96C398.3 96 384 110.3 384 128L384 224C384 241.7 398.3 256 416 256L512 256C529.7 256 544 241.7 544 224C544 206.3 529.7 192 512 192L448 192L448 128zM416 384C398.3 384 384 398.3 384 416L384 512C384 529.7 398.3 544 416 544C433.7 544 448 529.7 448 512L448 448L512 448C529.7 448 544 433.7 544 416C544 398.3 529.7 384 512 384L416 384z"/></svg>';
      control_hider.style.backgroundColor = "transparent";
      controls.style.width = `${video.clientWidth}px`;
      controls.className = "video_player2";
      parent_popup.style.height = `${popup_height - 30}px`
    } else {
      get("fullscreen_content").style.display = "none";
      get(`popup_content${popupnumber}`).appendChild(get("fullscreen_content").querySelector("div"));
      player.querySelector("button").innerHTML = '<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="white" d="M128 96C110.3 96 96 110.3 96 128L96 224C96 241.7 110.3 256 128 256C145.7 256 160 241.7 160 224L160 160L224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L128 96zM160 416C160 398.3 145.7 384 128 384C110.3 384 96 398.3 96 416L96 512C96 529.7 110.3 544 128 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480L160 416zM416 96C398.3 96 384 110.3 384 128C384 145.7 398.3 160 416 160L480 160L480 224C480 241.7 494.3 256 512 256C529.7 256 544 241.7 544 224L544 128C544 110.3 529.7 96 512 96L416 96zM544 416C544 398.3 529.7 384 512 384C494.3 384 480 398.3 480 416L480 480L416 480C398.3 480 384 494.3 384 512C384 529.7 398.3 544 416 544L512 544C529.7 544 544 529.7 544 512L544 416z"></path></svg>';
      console.log(`${video.style.width} vs ${previous_video_width}`)
      video.style.maxHeight = old_maxHeight;
      video.style.maxWidth = old_maxWidth;
      control_hider.style.backgroundColor = "#292929";
      controls.style.width = `${previous_video_width}px`;
      controls.className = "video_player";
    }

    if (Number(controls.style.width.replace("px", "")) < 230) {
      controls.style.width = "230px";
    }
    get("fullscreen_content").style.height = `${video.clientHeight}px`;
    progress_width = (controls.clientWidth - (pause_button.clientWidth + player.querySelectorAll("div")[1].clientWidth)) - 40
    progress_bar.style.width = `${progress_width}px`;
    player.querySelector("thing").style.width = `${video.clientWidth}px`;
    player.querySelector("thing").style.height = `${video.clientHeight}px`;
  }
}

function download(link, name) {
  let file = link;
  if (link.includes("|")) {
    file = link.split("|")[0]
  }
  const a = document.createElement("a");
  a.download = name.split(".")[0]
  a.href = file;
  a.click();
  a.remove();
}

function fullscreen_img(link) {
  hide_fullscreen();
  get("fullscreen_content").style.display = "flex";
  let img = document.createElement("img")
  img.src = link;
  let res = undefined;
  if (screen.orientation.type.includes("landscape")) {
    res = calculateAspectRatioFit(img.width, img.height, document.body.clientWidth * 0.7, document.body.clientHeight * 0.4)
  } else {
    res = calculateAspectRatioFit(img.width, img.height, document.body.clientWidth * 0.7, document.body.clientHeight * 0.7)
  }
  img.width = res["width"];
  img.height = res["height"];
  img.style.alignSelf = "center";
  get("fullscreen_content").style.height = `${res["height"]}px`;
  get("fullscreen_content").appendChild(img);
  get("fullscreen_content").innerHTML += '<button onclick="hide_fullscreen()" class="fullscreen_container"><svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="white" d="M256 128C256 110.3 241.7 96 224 96C206.3 96 192 110.3 192 128L192 192L128 192C110.3 192 96 206.3 96 224C96 241.7 110.3 256 128 256L224 256C241.7 256 256 241.7 256 224L256 128zM128 384C110.3 384 96 398.3 96 416C96 433.7 110.3 448 128 448L192 448L192 512C192 529.7 206.3 544 224 544C241.7 544 256 529.7 256 512L256 416C256 398.3 241.7 384 224 384L128 384zM448 128C448 110.3 433.7 96 416 96C398.3 96 384 110.3 384 128L384 224C384 241.7 398.3 256 416 256L512 256C529.7 256 544 241.7 544 224C544 206.3 529.7 192 512 192L448 192L448 128zM416 384C398.3 384 384 398.3 384 416L384 512C384 529.7 398.3 544 416 544C433.7 544 448 529.7 448 512L448 448L512 448C529.7 448 544 433.7 544 416C544 398.3 529.7 384 512 384L416 384z"/></svg></button>';
}

function hide_fullscreen() {
  get("fullscreen_content").style.display = "none";
  get("fullscreen_content").innerHTML = '';
}

function createmediapopup(type, link, name) {
  let popupnumber;
  console.log(`Creating ${type} from ${link}`);
  const download_button = "<button style='z-index: 2;' class='centerpopupbutton'>Pobierz</button>"
  if (type == "image") {
    popupnumber = createnewpopup("mediapopup", `<button onclick="fullscreen_img('${link}')" class="fullscreen_container"><svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="white" d="M128 96C110.3 96 96 110.3 96 128L96 224C96 241.7 110.3 256 128 256C145.7 256 160 241.7 160 224L160 160L224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L128 96zM160 416C160 398.3 145.7 384 128 384C110.3 384 96 398.3 96 416L96 512C96 529.7 110.3 544 128 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480L160 416zM416 96C398.3 96 384 110.3 384 128C384 145.7 398.3 160 416 160L480 160L480 224C480 241.7 494.3 256 512 256C529.7 256 544 241.7 544 224L544 128C544 110.3 529.7 96 512 96L416 96zM544 416C544 398.3 529.7 384 512 384C494.3 384 480 398.3 480 416L480 480L416 480C398.3 480 384 494.3 384 512C384 529.7 398.3 544 416 544L512 544C529.7 544 544 529.7 544 512L544 416z"></path></svg></button><img src="${link}" style="max-width: 40vw; max-height: 40vh"/>`, download_button);
    get(`popup_content${popupnumber}`).parentElement.parentElement.width = `${get(`popup_content${popupnumber}`).querySelector("img").clientWidth}px`;
  } else if (type == "video") {
    popupnumber = createnewpopup("mediapopup", ``, download_button);
    video_player_stuff(link, popupnumber)
  } else if (type == "text") {
    popupnumber = createnewpopup("mediapopup", link.split("|")[1], download_button);
  } else if (type == "custom") {
    popupnumber = createnewpopup("mediapopup", link.split("|")[2], "");
  } else if (type == "audio") {
    let audio = new Audio(link);
    popupnumber = createnewpopup("mediapopup", "", download_button, audio);
    audio_player_stuff(audio, popupnumber)
  }
  if (type !== "custom") {
    get(`secondpopupbutton${popupnumber}`).querySelector("button").onclick = () => download(link, name);
  }
  if (name == "maciej chat") {
    chat_open = false;
    detectMicInput();
  }
  return popupnumber
}

function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) { // stolen from stack overflow
    let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth*ratio, height: srcHeight*ratio };
}

function renderfile(type, name, link) {
  let newfile = get("basefile").cloneNode(true);
  let format = "idk";
  let width = "4.8rem"
  newfile.querySelector("button").style.display = "flex";
  newfile.querySelector("h2").innerText = name;
  newfile.id = "basefile2"
  if (type == "folder") {
    newfile.querySelector("img").src = "folder.png"
    newfile.querySelector("img").style.width = width;
    newfile.querySelector("img").style.height = width;
    if (name == "Wstecz") {
      newfile.querySelector("img").src = "back.png"
    }
  } else {
    if (link.includes(".jpg") || link.includes(".webp") || link.includes(".png")) {
      format = "image";
    } else if (link.includes(".mp4")) {
      format = "video";
    } else if (link.includes(".wav") || link.includes(".mp3")) {
      format = "audio";
    } else if (link.includes("txt")) {
      format = "text";
    }
    if (link.includes("custom")) {
      format = "custom";
    }
    if (format == "image" && !link.includes("instrukcja.webp")) {
      newfile.querySelector("img").src = `${link}`;
      newfile.querySelector("img").style.display = "none";
      newfile.querySelector("img").addEventListener("load", function () {
        let res = calculateAspectRatioFit(newfile.querySelector("img").width, newfile.querySelector("img").height, rem * 5 - 5, rem * 5 - 5)
        newfile.querySelector("img").style.width = `${res["width"]}px`;
        newfile.querySelector("img").style.height = `${res["height"]}px`;
        newfile.querySelector("img").style.display = "inline";
        return;
      });
    } else if (format == "custom") {
      newfile.querySelector("img").src = link.split("|")[1];
      newfile.querySelector("img").style.width = width;
      newfile.querySelector("img").style.height = width;
    } else if (link.includes("instrukcja.webp")) {
      newfile.querySelector("img").src = `video.png`;
      newfile.querySelector("img").style.width = width;
      newfile.querySelector("img").style.height = width;
    } else {
      newfile.querySelector("img").src = `${format}.png`;
      newfile.querySelector("img").style.width = width;
      newfile.querySelector("img").style.height = width;
    }
  }

  document.getElementById("files").appendChild(newfile);
  let open = false
  let popupnumber
  newfile.addEventListener("click", function () {
    if (!get(`popup_content${popupnumber}`)) {
      open = false
    }
    if (type == "folder") {
      directory = link
      renderdirectory(directory)
    } else {
      if (open) {
        if (get(`popup_content${popupnumber}`).parentElement.parentElement) {
          get("audio_player").style.display = "none";
          get("gay_gay_gay").appendChild(get("audio_player"));
          get(`popup_content${popupnumber}`).parentElement.parentElement.remove();
        } else {
          popupnumber = createmediapopup(format, link, name);
          open = true;
        }
        open = false
      } else {
        popupnumber = createmediapopup(format, link, name);
        open = true;
      }
    }
  });
}
