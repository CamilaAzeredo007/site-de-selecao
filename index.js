import express from "express";
import Genero from './models/Genero.js';
import Musica from './models/Musica.js';
import Artista from './models/Artista.js';
import Album from './models/Album.js';

const app = express();
const PORT = 3001;

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

app.get("/artistas/lst", async (req, res) => {
  const artistas = await Artista.find();
  res.render("artistas/lstartistas", {artistas});
});

app.get("/artistas/add", (req, res) => {
  res.render("artistas/addartistas")
});

app.post("/artistas/add", async (req, res) => {
  const nome = req.body.nome;
  const pais = req.body.pais;
  const anoInicio = req.body.anoInicio;
  await Artista.create({nome, pais, anoInicio})
  res.render("artistas/addartistasok")
});

//!DELETE
app.get('/artistas/del/:id', async (req, res) => {

const artista = await Artista.findByIdAndDelete(req.params.id)

res.redirect("/artistas/lst")

})

//!EDIÇÃO

app.get('/artistas/edt/:id', async (req, res) => {

const artista = await Artista.findById(req.params.id)

res.render("artistas/editartistas", {artista})

})

app.post('/artistas/edt/:id', async (req, res) => {

const artista = await Artista.findByIdAndUpdate(req.params.id, req.body)

res.render("artistas/editartistasok")

})

//!PESQUISA POR NOME
app.post('/artistas/lst', async (req, res) => {
  const { pesquisar } = req.body;
  const artistas = await Artista.find({
    nome: new RegExp(pesquisar, 'i')
  });
  res.render("artistas/lstartistas", { artistas });
})

//!GENEROS
/*app.get("/generos", (req, res) => {
  res.render("generos");
});

app.post("/listadegeneros", (req, res) => {
  const nome = req.body.nome;
  const descricao = req.body.descricao;

  res.render("generos", {nome, descricao})
});*/

app.get("/generos/lst", async (req, res) => {
  const generos = await Genero.find();
  res.render("generos/lst", {generos});
});

app.get("/generos/add", (req, res) => {
  res.render("generos/add");
});

app.post("/generos/add", async (req, res) => {
  const nome = req.body.nome;
  const descricao = req.body.descricao;
  await Genero.create({nome, descricao})
  res.render("generos/addok");
});

//!DELETE
app.get('/generos/del/:id', async (req, res) => {

const genero = await Genero.findByIdAndDelete(req.params.id)

res.redirect("/generos/lst")

})

//!EDIÇÃO

app.get('/generos/edt/:id', async (req, res) => {

const genero = await Genero.findById(req.params.id)

res.render("generos/edit", {genero})

})

app.post('/generos/edt/:id', async (req, res) => {

const genero = await Genero.findByIdAndUpdate(req.params.id, req.body)

res.render("generos/editok")

})

//!PESQUISA POR NOME
app.post('/generos/lst', async (req, res) => {
  const { pesquisar } = req.body;
  const generos = await Genero.find({
    nome: new RegExp(pesquisar, 'i')
  });
  res.render("generos/lst", { generos });
})



//!MUSICAS
/*app.get("/musicas", (req, res) => {
  res.render("musicas");
});

app.post("/listademusicas", (req, res) => {
  const titulo = req.body.titulo;
  const artista = req.body.artista;
  const genero = req.body.genero;
  const ano = req.body.ano;
  const duracao = req.body.duracao;

  res.render("musicas", {titulo, artista, genero, ano, duracao})
});*/

app.get("/musicas/lst", async (req, res) => {
  const musicas = await Musica.find()
  res.render("musicas/lstmusica", {musicas});
});

app.get("/musicas/add", (req, res) => {
  res.render("musicas/addmusica");
});

app.post("/musicas/add", async (req, res) => {
  const {titulo, duracao, artista, genero, album, ano} = req.body;
  await Musica.create({titulo, duracao, artista, genero, album, ano})
  res.render("musicas/addmusicaok");
});

//!DELETE
app.get('/musicas/del/:id', async (req, res) => {

const musica = await Musica.findByIdAndDelete(req.params.id)

res.redirect("/musicas/lst")

})

//!EDIÇÃO

app.get('/musicas/edt/:id', async (req, res) => {

const musica = await Musica.findById(req.params.id)

res.render("musicas/editmusica", {musica})

})

app.post('/musicas/edt/:id', async (req, res) => {

const musica = await Musica.findByIdAndUpdate(req.params.id, req.body)

res.render("musicas/editmusicaok")

})

//!PESQUISA POR NOME
app.post('/musicas/lst', async (req, res) => {
  const { pesquisar } = req.body;
  const musicas = await Musica.find({
    titulo: new RegExp(pesquisar, 'i')
  });
  res.render("musicas/lstmusica", { musicas });
})




//!ALBUM
app.get("/album/lst", async (req, res) => {
  const album = await Album.find()
  res.render("album/lstalbum", {album});
});

app.get("/album/add", (req, res) => {
  res.render("album/addalbum");
});

app.post("/album/add", async (req, res) => {
  const {nome, artista, genero, descricao, anoLanc} = req.body;
  await Album.create({nome, artista, genero, descricao, anoLanc})
  res.render("album/addalbumok");
});

//!DELETE
app.get('/album/del/:id', async (req, res) => {

const album = await Album.findByIdAndDelete(req.params.id)

res.redirect("/album/lst")

})

//!EDIÇÃO

app.get('/album/edt/:id', async (req, res) => {

const album = await Album.findById(req.params.id)

res.render("album/editalbum", {album})

})

app.post('/album/edt/:id', async (req, res) => {

const album = await Album.findByIdAndUpdate(req.params.id, req.body)

res.render("album/editalbumok")

})

//!PESQUISA POR NOME
app.post('/album/lst', async (req, res) => {
  const { pesquisar } = req.body;
  const album = await Album.find({
    nome: new RegExp(pesquisar, 'i')
  });
  res.render("album/lstalbum", { album });
})


app.listen(PORT, ()=>{
 console.log(
    `Servidor rodando em http://localhost:${PORT}`)
});
