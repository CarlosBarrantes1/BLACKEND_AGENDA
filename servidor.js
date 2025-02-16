import express, { request, response } from "express"; // Importamos la libreria express
const app = express(); // Creamos la instancia de express
app.use(express.json());
const PORT = 4000; // Definimos el puerto donde correra nuestra aplicacion
let agenda = [
  {
    id: 1,
    dni: "12345678",
    nombre: "Juan Pérez",
    telefono: "987654321",
    correo: "juan.perez@email.com",
  },
  {
    id: 2,
    dni: "87654321",
    nombre: "María López",
    telefono: "923456789",
    correo: "maria.lopez@email.com",
  },
];
BLACKEND_AGENDA
// GET - LISTAR RECURSOS /AGENDA
app.get("/agenda", (request, response) => {
  response.status(200).json(agenda);
});

// GET - BUSCAR UN RECURSO /AGENDA/:ID
app.get("/agenda/:id", (request, response) => {
  const { id } = request.params; // Desestructuración de objeto
  console.log("El id del contacto es: ", id);
  const agendaItem = agenda.find(
    // buscar un elemento dentro de un array
    (agendaItem) => agendaItem.id === parseInt(id)
  );
  response.status(200).json(agendaItem);
  console.log("Contacto buscado con exito");
});
// POST - CREA UN RECURSO
app.post("/agenda", (request, response) => {
  const agregar = request.body;
  agenda.push(agregar); // Agrega elementos al final de un array.
  response.status(200).json("Contacto se creo con exito");
});

// PUT - ACTUALIZA UN RECURSO
app.put("/agenda/:id", (request, response) => {
  const { id } = request.params;
  const { dni, nombre, telefono, correo } = request.body;
  console.log("El id del contacto actualizar es: ", id);
  const agendaItem = agenda.find((item) => item.id === parseInt(id)); // buscar un elemento dentro de un array
  if (!agendaItem) {
    return response.status(200).json("Contacto no encontrado");
  }
  agendaItem.dni = dni;
  agendaItem.nombre = nombre;
  agendaItem.telefono = telefono;
  agendaItem.correo = correo;
  response.status(200).json("Contacto actualizado con exito");
});

// DELETE - ELIMINA UN RECURSO
app.delete("/agenda/:id", (request, response) => {
  const { id } = request.params;
  console.log("El id a eliminar es: ", id);
  agenda = agenda.filter((agendaItem) => agendaItem.id !== parseInt(id)); //Devuelve un nuevo array con los elementos que cumplen la condición
  response.status(200).json("Contacto eliminado con exito");
});

// Inicializamos el servidor en el puerto 4000
app.listen(PORT, () => {
  console.log("Servidor Iniciado");
});
