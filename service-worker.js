const my_version = "m3_sw1";

async function update() { // this doesn't run because its basically useless i think but ill keep it anyaway
  return fetch("/manifest.json", { cache: "no-cache" })
    .then((response) => response.text())
    .then((data) => {
      if (my_version.split("_")[1] !== data.split("_")[1]) {
        return self.registration.update();
      }
    })
    .catch((error) => console.log(error));
}

// the reading and writing the database is copied from ai
let open_request = indexedDB.open("database", 1);

open_request.onerror = (e) => {
  console.error(`Failed to open database ${e.target.error}`);
};

open_request.onupgradeneeded = function () {
  let database = open_request.result;
  database.createObjectStore("notification", { keyPath: "id" });
  database.createObjectStore("last_read_message", { keyPath: "id" });
};

open_request.onsuccess = function () {
  let database = open_request.result;
  const readTx = database.transaction("notification", "readonly");
  const get_request = readTx.objectStore("notification").get(1);

  get_request.onsuccess = async (e) => {
    if (get_request.result === undefined) {
      console.log("Notification record doesn't exist")
    } else {
      let notification_record = get_request.result.text;
      if (notification_record) {
        let allMessages = ["Error, nie można wziąść najnowszej wiadomości"];

        fetch("/allMessages.json", {
          cache: 'no-cache'
        })
        .then(response => response.text())
        .then(data => {
          allMessages = JSON.parse(data);
          const readTx_last_read = database.transaction("last_read_message", "readwrite");
          const get_request_last_read = readTx_last_read.objectStore("last_read_message").get(1);

          get_request_last_read.onsuccess = function () {
            let last_read_message = get_request_last_read.result;
            if (last_read_message !== undefined) {
              last_read_message = last_read_message.text;
            }

            let newestmessage = allMessages[allMessages.length - 1].replace(/<[^>]+>/g, ""); // removes html tags
            console.log("trying to send notification")
            if (allMessages[0] != "Error" && last_read_message !== newestmessage) {
              self.registration.showNotification('Nowa wiadomość!', {
                body: newestmessage,
                icon: "/ikony/ikon.png",
              });
              readTx_last_read.objectStore("last_read_message").put({ id: 1, text: newestmessage });
            } else {
              console.log("Not going to annoy with notification");
            }
          };

          get_request_last_read.onerror = function (e) {
            console.log(e.target.error)
          };
        })
        .catch(allMessages = ["Error, nie można wziąść najnowszej wiadomości"]);
      }
    }
  }
};
