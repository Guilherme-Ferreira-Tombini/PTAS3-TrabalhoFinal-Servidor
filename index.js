// JWT
require("dotenv-safe").config();
const cors = require('cors');
//const criptografa= require('./crypto_');

var cookieParser = require('cookie-parser')

const express = require('express');
//const { usuario } = require('./models');
const { produto } = require('./models');

const app = express();

app.set('view engine', 'ejs');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

app.use(cookieParser());

// Pagina Inicial
app.get('/', async function(req, res){
  res.render("home")
})

// Cadastro de produtos
app.get('/inscrever', async function(req, res){
  res.render("inscrever")
});

app.post('/cadastro', async function(req, res){
 const produtos = produto.create(req.body);
 res.render("home");
});

// listar produtos JSON
app.get('/produtos', async function(req, res){
  var resultado = await produto.findAll();
  //res.render("produtos", {resultado});
  res.json(resultado);
})

// listar produtos pelo ID em JSON
app.get("/produtos/:id", async function(req, res) {
  const id = await produto.findByPk(req.params.id);
  res.json(id);
 });

// Deletar produtos pelo ID
 app.delete("/produtos/:id", async function(req, res) {
  var resultado = produto.destroy({ where: { id: req.params.id }});
   res.json(resultado);
 });

app.listen(4000, function() {
  console.log('App de Exemplo escutando na porta 4000!')
});