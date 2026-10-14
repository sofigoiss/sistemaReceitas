import express from "express";
import "dotenv/config";
import receitasRoutes from "./routes/receitasRoutes.js";
import corsMiddleware from "./middlewares/corsMiddleware.js";
import { testarConexao } from "./database/connection.js";

// CRIANDO APLICAÇÃO
const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARES
app.use(corsMiddleware);
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