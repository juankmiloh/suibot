// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require('venom-bot');

venom
  .create({
    session: 'session-name', //name of session
    multidevice: false // for version not multidevice use false.(default: true)
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {
    // console.log('message :>> ', message)
    client
      .sendText(message.from, `Hola ${message.chat.contact.displayName}`+' bienvenido al WhatsApp de la mesa de ayuda de la Superintendencia' +
      ' de Servicios Públicos Domiciliarios. Tu información es muy importante para nosotros, por eso te invitamos' +
      ' a que validemos juntos los datos de acceso al Sistema Único de Información, así podremos continuar gestionando' + 
      ' tu solicitud, para continuar por favor compártenos el identificador de tu empresa')
      .then((result) => {
        // console.log('Result: ', result); //return object success
        console.log('Result: ', result.status); //return object success
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      });
  });
}