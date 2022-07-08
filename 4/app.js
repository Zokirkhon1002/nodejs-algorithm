// @ts-nocheck
let token = "";

let link = `https://api.telegram.org/bot${token}/getUpdates`;

let chatId = "";

myForm.addEventListener("submit", (e) => {
  e.preventDefault();

  ({ name1, msg } = myForm);

  let my_text = `ism: <b>${name1.value} </b> %0Axabar:%0A<i>${msg.value}</i>`;
  let urlForMessage = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${my_text}&parse_mode=html`;

  let api = new XMLHttpRequest();
  api.open("GET", urlForMessage, true);
  api.send();

  name1.value = "";
  msg.value = "";
  console.log("success");
});
