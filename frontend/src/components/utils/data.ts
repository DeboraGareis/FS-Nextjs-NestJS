export const fake_messages = {
  user_notification: [
    {
      IdEmisor: "1234",
      IdReceptor: "5678",
      Texto: "Hola, ¿cómo estás?",
      FechaHora: "12-12-2024 10:00",
      Leido: "True"
    },
    {
      IdEmisor: "5678",
      IdReceptor: "1234",
      Texto: "Hola, bien. ¿Vos?",
      FechaHora: "12-12-2024 10:01",
      Leido: "True"
    },
    {
      IdEmisor: "1234",
      IdReceptor: "5678",
      Texto: "Todo bien, gracias. Te escribía por la orden que pedi ayer.",
      FechaHora: "12-12-2024 10:02",
      Leido: "True"
    },
    {
      IdEmisor: "5678",
      IdReceptor: "1234",
      Texto: "Sí, ya lo estoy revisando.",
      FechaHora: "12-12-2024 10:03",
      Leido: "False"
    },
    {
      IdEmisor: "1234",
      IdReceptor: "5678",
      Texto: "Avísame si necesitás algun dato más.",
      FechaHora: "12-12-2024 10:04",
      Leido: "False"
    },
    {
      IdEmisor: "5678",
      IdReceptor: "1234",
      Texto: "Dale, muchas gracias.",
      FechaHora: "12-12-2024 10:05",
      Leido: "False"
    },
    {
      IdEmisor: "1111",
      IdReceptor: "2222",
      Texto: "hola, consulta...",
      FechaHora: "12-12-2024 10:04",
      Leido: "False"
    },
    {
      IdEmisor: "2222",
      IdReceptor: "1111",
      Texto: "ok, saludos.",
      FechaHora: "12-12-2024 10:05",
      Leido: "False"
    },
    {
      IdEmisor: "1212",
      IdReceptor: "5678",
      Texto: "Hola, cuando te llega el producto xxx",
      FechaHora: "12-12-2024 10:00",
      Leido: "True"
    },
    {
      IdEmisor: "5678",
      IdReceptor: "1212",
      Texto: "Hola, todavia no me lo confirmaron, pero te aviso",
      FechaHora: "12-12-2024 10:01",
      Leido: "True"
    },
    {
      IdEmisor: "1212",
      IdReceptor: "5678",
      Texto: "bien, gracias..",
      FechaHora: "12-12-2024 10:02",
      Leido: "True"
    }

  ]
};


export const fake_id = "5678";

export const fake_users = 
{
users:[
    {id:"5678", Nombre:"user1", Email:"user1@gmail.com"},
    {id:"1212", Nombre:"user2", Email:"user2@gmail.com"},
    {id:"1234", Nombre:"user3", Email:"user3@gmail.com"}

]};


export const fake_products = 
{
products:[
  {
    "Categoria": "Electrónica",
    "Nombre": "Auriculares Bluetooth",
    "Stock": 25,
    "Imagen": "http://res.cloudinary.com/dkczleypd/image/upload/v1751490399/wvmkzdm1o81qqnz7ubri.jpg",
    "Precio": 10999.99,
    "IdAdministrador": "5678"
  },
  {
    "Categoria": "Hogar",
    "Nombre": "Camara",
    "Stock": 40,
    "Imagen": "http://res.cloudinary.com/dkczleypd/image/upload/v1751478951/vrhwq2doeliddlgbhxkw.jpg",
    "Precio": 299999.5,
    "IdAdministrador": "5678"
  },
  {
    "Categoria": "Juguetería",
    "Nombre": "Rompecabezas 1000 piezas",
    "Stock": 15,
    "Imagen": "http://res.cloudinary.com/dkczleypd/image/upload/v1751478951/vrhwq2doeliddlgbhxkw.jpg",
    "Precio": 3499,
    "IdAdministrador": "5678"
  },
  {
    "Categoria": "Deportes",
    "Nombre": "Pelota de fútbol profesional",
    "Stock": 10,
    "Imagen": "http://res.cloudinary.com/dkczleypd/image/upload/v1751478951/vrhwq2doeliddlgbhxkw.jpg",
    "Precio": 8999,
    "IdAdministrador": "5678"
  },
  {
    "Categoria": "Tecnología",
    "Nombre": "Mouse inalámbrico ergonómico",
    "Stock": 50,
    "Imagen": "http://res.cloudinary.com/dkczleypd/image/upload/v1751478951/vrhwq2doeliddlgbhxkw.jpg",
    "Precio": 1999.99,
    "IdAdministrador": "1212"
  }
]}