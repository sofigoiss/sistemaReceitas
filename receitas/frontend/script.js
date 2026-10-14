const API_URL = 'http://localhost:3000/receitas';

const formReceita = document.getElementById('form-receita');
const listaReceitasDiv = document.getElementById('lista-receitas');

// 1. Função para carregar e listar as receitas do backend
async function carregarReceitas() {
    try {
        const resposta = await fetch(API_URL);
        const receitas = await resposta.json();

        listaReceitasDiv.innerHTML = '';

        if (receitas.length === 0) {
            listaReceitasDiv.innerHTML = '<p class="empty">Ainda não há receitas cadastradas.</p>';
            return;
        }

        receitas.forEach(receita => {
            const card = document.createElement('div');
            card.classList.add('card-receita');

            card.innerHTML = `
                <h3>${receita.nome}</h3>
                <p><strong>Categoria:</strong> ${receita.categoria}</p>
                <p><strong>Tempo:</strong> ${receita.tempo_preparo} min</p>
                <p><strong>Dificuldade:</strong> ${receita.dificuldade}</p>
                <button onclick="deletarReceita(${receita.id})" class="btn-delete">Excluir</button>
            `;

            listaReceitasDiv.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao carregar receitas:', error);
    }
}

// 2. Evento para enviar o formulário (POST)
formReceita.addEventListener('submit', async (e) => {
    e.preventDefault();

    const novaReceita = {
        nome: document.getElementById('nome').value,
        categoria: document.getElementById('categoria').value,
        tempo_preparo: Number(document.getElementById('tempo_preparo').value),
        dificuldade: document.getElementById('dificuldade').value
    };

    try {
        const resposta = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novaReceita)
        });

        if (resposta.ok) {
            formReceita.reset(); // Limpa os campos do formulário
            carregarReceitas();  // Atualiza a lista no ecrã imediatamente
        } else {
            const erroData = await resposta.json();
            alert('Erro ao salvar receita: ' + (erroData.mensagem || 'Erro desconhecido'));
        }
    } catch (error) {
        console.error('Erro ao enviar receita:', error);
        alert('Não foi possível conectar ao servidor. Verifica se o backend está a rodar.');
    }
});

// 3. Função para deletar receita (DELETE)
async function deletarReceita(id) {
    if (!confirm('Tens a certeza que queres apagar esta receita?')) return;

    try {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (resposta.ok) {
            carregarReceitas();
        } else {
            alert('Erro ao excluir receita.');
        }
    } catch (error) {
        console.error('Erro ao deletar receita:', error);
    }
}

// Carregar as receitas assim que a página abre
carregarReceitas();