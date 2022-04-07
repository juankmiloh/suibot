// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const fs = require('fs');
const venom = require('venom-bot');
const dialogflow=require("./dialogflow");

venom
  .create(
    'sessionName',
    (base64Qr, asciiQR, attempts, urlCode) => {
      console.log(asciiQR); // Optional to log the QR in the terminal
      var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

      if (matches.length !== 3) {
        return new Error('Invalid input string');
      }
      response.type = matches[1];
      response.data = new Buffer.from(matches[2], 'base64');

      var imageBuffer = response;
      require('fs').writeFile(
        'out.png',
        imageBuffer['data'],
        'binary',
        function (err) {
          if (err != null) {
            console.log(err);
          }
        }
      );
    },
    undefined,
    { logQR: false }
  )
  .then((client) => {
    start(client);
  })
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage(async (message) => {
    // console.log('message :>> ', message)
    let payload=await dialogflow.sendToDialogFlow(message.body, "123123");
    let responses=payload.fulfillmentMessages;
    for (const response of responses) {
      client
        .sendText(message.from, response.text.text[0])
        .then((result) => {
          // console.log('Result: ', result); //return object success
          console.log(`Result message :>> ${message.chat.contact.displayName} :>> ${result.status}`); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
  });
}