import db from "../database/conexao.js";

export async function listarReceitas(req, res) {
    try {
        const [receitas] = await db.query("SELECT * FROM receitas ORDER BY id DESC");
        res.status(200).json(receitas);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao buscar receitas", erro: error.message });
    }
}

export async function criarReceita(req, res) {
    try {
        const { nome, categoria, tempo_preparo, dificuldade } = req.body;

        // Validação extra por segurança
        if (!nome || !categoria || !tempo_preparo || !dificuldade) {
            return res.status(400).json({ mensagem: "Preencha todos os campos obrigatórios!" });
        }

        const sql = "INSERT INTO receitas (nome, categoria, tempo_preparo, dificuldade) VALUES (?, ?, ?, ?)";
        const [resultado] = await db.query(sql, [nome, categoria, tempo_preparo, dificuldade]);

        res.status(201).json({ 
            mensagem: "Receita cadastrada com sucesso!", 
            id: resultado.insertId 
        });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao cadastrar receita", erro: error.message });
    }
}

export async function deletarReceita(req, res) {
    try {
        const { id } = req.params;
        await db.query("DELETE FROM receitas WHERE id = ?", [id]);
        res.status(200).json({ mensagem: "Receita excluída com sucesso!" });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao excluir receita", erro: error.message });
    }
}