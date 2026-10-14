export default function validarReceita(req, res, next) {
    const { nome, categoria, tempo_preparo, dificuldade } = req.body;

    if (!nome || !categoria || !tempo_preparo || !dificuldade) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" });
    }

    next();
}