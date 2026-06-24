import conexao from "../config/conexao.js";

const SelecaoSchema = new conexao.Schema({
  pais: String,
  cores: String,
  continente: String,
  titulosMundiais: Number    
});

const Selecao = conexao.model("Selecao", SelecaoSchema);

export default Selecao;