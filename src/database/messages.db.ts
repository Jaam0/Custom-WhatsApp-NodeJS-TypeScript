export const MessagesDB = [
  {
    id: 1,
    message: `@welcome *@name*,\n\nDios te bendiga.Espero que estés muy bien. En este momento no te puedo atender, debajo te dejo algunas opciones para saber cuál es el nivel de urgencia que tiene este mensaje.
                  \n*1* - Alta \n*2* - Media \n*3* - Baja
                  \nTrataré de responderte lo más antes posible.
                  \n*Nota*: _Puedes seleccionar el numero (1,2 o 3) o el nombre (Alta, Media o Baja) de la opción_. `,
    status: 'Active',
  },
];


// console.log(data);
// customWhatsApp();

// const insert = async () => {
//   const { message, description, status }: MessageInterface = {
//     message: `@welcome *@name*,\n\nDios te bendiga.Espero que estés muy bien. En este momento no te puedo atender, debajo te dejo algunas opciones para saber cuál es el nivel de urgencia que tiene este mensaje.
//           \n*1* - Alta \n*2* - Media \n*3* - Baja
//           \nTrataré de responderte lo más antes posible.
//           \n*Nota*: _Puedes seleccionar el numero (1,2 o 3) o el nombre (Alta, Media o Baja) de la opción_. `,
//     description: 'Este es el mensaje principal que se mostrara cuando me escriban',
//     status: Status.Active,
//   };

//   const res = await Message.create({ message, description, status });
// };

// const show = async () => {
//   const res: any = await Message.findAll();
//   console.log(JSON.stringify(res));
// };
