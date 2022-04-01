// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const fs = require('fs');
const venom = require('venom-bot');

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
  client.onMessage((message) => {
    // console.log('message :>> ', message)
    client
      .sendText(message.from, `Hola ${message.chat.contact.displayName}` + ' bienvenido al WhatsApp de la mesa de ayuda de la Superintendencia' +
        ' de Servicios Públicos Domiciliarios. Tu información es muy importante para nosotros, por eso te invitamos' +
        ' a que validemos juntos los datos de acceso al Sistema Único de Información, así podremos continuar gestionando' +
        ' tu solicitud, para continuar por favor compártenos el identificador de tu empresa')
      .then((result) => {
        // console.log('Result: ', result); //return object success
        console.log(`Result message :>> ${message.chat.contact.displayName} :>> ${result.status}`); //return object success
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      });
  });
}