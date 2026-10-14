import express from "express";
import "dotenv/config";
import cors from "cors";
import receitasRoutes from "./routes/receitasRoutes.js";
import { testarConexao } from "./database/conexao.js";

// CRIANDO APLICAÇÃO
const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARES (Libera o CORS para qualquer frontend)
app.use(cors());
app.use(express.json());

// ROTAS (agora apontando diretamente para /receitas)
app.use("/receitas", receitasRoutes);

// ROTA INICIAL
app.get("/", function(req, res) {
    res.status(200).json({ mensagem: "API do Sistema de Receitas a funcionar!" });
});

async function iniciarServidor() {
    try {
        await testarConexao();
        console.log("Conectado ao MySQL com sucesso!");

        app.listen(PORT, function() {
            console.log("Servidor rodando em http://localhost:" + PORT);
        });
    } catch (erro) {
        console.log("Não foi possível iniciar o servidor");
        console.log(erro.message);
    }
}

iniciarServidor();