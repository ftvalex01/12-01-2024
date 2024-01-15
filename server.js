// Importaciones de módulos
const express = require('express');
const logger = require('morgan');
const errorhandler = require('errorhandler');
const bodyParser = require('body-parser');

// Inicialización de la aplicación Express
const app = express();
const port = 3001;

// Uso de Middlewares
app.use(bodyParser.json()); // Para analizar el cuerpo de las solicitudes JSON
app.use(logger('dev')); // Logging con Morgan en modo 'dev'
app.use(errorhandler()); // Manejo de errores

// Objeto para almacenar los datos (simulando una base de datos en memoria)
let store = {};
store.accounts = [];

// Rutas y controladores
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/accounts', (req, res)=>{
    res.status(200).send(store.accounts);
});

// Obtener un registro específico por ID
app.get('/accounts/:id', (req, res) => {
    const id = req.params.id;
    const account = store.accounts[id];
    if (account) {
        res.status(200).send(account);
    } else {
        res.status(404).send({ error: 'Account not found' });
    }
});
app.post('/accounts', (req, res)=>{
    let newAccount = req.body;
    let id = store.accounts.length;
    store.accounts.push(newAccount);
    res.status(201).send({id: id});
});

app.put('/accounts/:id',(req, res)=>{
    store.accounts[req.params.id] = req.body;
    res.status(200).send(store.accounts[req.params.id]);
});

app.delete('/accounts/:id',(req, res)=>{
    store.accounts.splice(req.params.id, 1);
    res.status(204).send();
});

// Lanzamiento de la aplicación Express
app.listen(port, () => {
  console.log(`Escuchando en el puerto: ${port}`)
});
