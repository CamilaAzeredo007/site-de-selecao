import express from "express";
import Jogador from './models/Jogador.js';
import Selecao from './models/Selecao.js';

const app = express();
const PORT = 3004;

// Configura o EJS como motor de views
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// pasta onde ficam os arquivos .ejs
app.set("views", "./views"); 

//Liberar acesso a pasta public
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(__dirname + '/public'))


app.get("/", (req, res) => {
  res.render("index");
});

//!SELECOES
app.get("/selecao/lst", async (req, res) => {
  const selecao = await Selecao.find();
  res.render("selecoes/lst", {selecao});
});

app.get("/selecao/add", (req, res) => {
  res.render("selecoes/add")
});

app.post("/selecao/add", async (req, res) => {
  const {pais, cores, continente, titulosMundiais} = req.body;
  await Selecao.create({pais, cores, continente, titulosMundiais})
  res.render("selecoes/addok")
});

//!DELETE
app.get('/selecao/del/:id', async (req, res) => {

const selecao = await Selecao.findByIdAndDelete(req.params.id)

res.redirect("/selecao/lst")

})

//!EDIÇÃO

app.get('/selecao/edt/:id', async (req, res) => {

const selecao = await Selecao.findById(req.params.id)

res.render("selecoes/edit", {selecao})

})

app.post('/selecao/edt/:id', async (req, res) => {

const selecao = await Selecao.findByIdAndUpdate(req.params.id, req.body)

res.render("selecoes/editok")

})

//!PESQUISA POR TITULOS
/*app.post('/selecao/lst', async (req, res) => {
  const { pesquisar } = req.body;
  const selecao = await Selecao.find({
    titulosMundiais: new RegExp(pesquisar, 'i')
  });
  res.render("selecoes/lst", { selecao });
})*/

app.post('/selecao/lst', async (req, res) => {
  const { pesquisar } = req.body;

  const numero = parseInt(pesquisar, 10);

  if (isNaN(numero)) {
    return res.render("selecoes/lst", { selecao: [] });
  }

  const selecao = await Selecao.find({
    // maior que { titulosMundiais: { $gt: numero } } // menor que { titulosMundiais: { $lt: numero } }
    //maior ou igual
    titulosMundiais: { $gte: numero }
  });

  res.render("selecoes/lst", { selecao });
});



//!JOGADORES
app.get("/jogador/lst", async (req, res) => {
  const jogador = await Jogador.find()
  res.render("jogadores/lst", {jogador});
});

app.get("/jogador/add", (req, res) => {
  res.render("jogadores/add");
});

app.post("/jogador/add", async (req, res) => {
  const {nome, numero, selecao, gols, assistencias} = req.body;
  await Jogador.create({nome, numero, selecao, gols, assistencias})
  res.render("jogadores/addok");
});

//!DELETE
app.get('/jogador/del/:id', async (req, res) => {

const jogador = await Jogador.findByIdAndDelete(req.params.id)

res.redirect("/jogador/lst")

})

//!EDIÇÃO

app.get('/jogador/edt/:id', async (req, res) => {

const jogador = await Jogador.findById(req.params.id)

res.render("jogadores/edit", {jogador})

})

app.post('/jogador/edt/:id', async (req, res) => {

const jogador = await Jogador.findByIdAndUpdate(req.params.id, req.body)

res.render("jogadores/editok")

})

//!PESQUISA POR NOME
app.post('/jogador/lst', async (req, res) => {
  const { pesquisar } = req.body;
  const jogador = await Jogador.find({
    nome: new RegExp(`^${pesquisar}`, 'i')
  }); 
  res.render("jogadores/lst", { jogador });
})

app.listen(PORT, ()=>{
 console.log(
    `Servidor rodando em http://localhost:${PORT}`)
});
