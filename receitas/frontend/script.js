const API_URL = 'http://localhost:3000/receitas';

const formReceita = document.getElementById('form-receita');
const listaReceitasDiv = document.getElementById('lista-receitas');

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

formReceita.addEventListener('submit', async (e) => {
    e.preventDefault();

    const novaReceita = {
        nome: document.getElementById('nome').value,
        categoria: document.getElementById('categoria').value,
        tempo_preparo: document.getElementById('tempo_preparo').value,
        dificuldade: document.getElementById('dificuldade').value
    };

    try {
        const resposta = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novaReceita)
        });

        if (resposta.ok) {
            formReceita.reset();
            carregarReceitas();
        } else {
            alert('Erro ao salvar receita.');
        }
    } catch (error) {
        console.error('Erro ao enviar receita:', error);
    }
});

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

carregarReceitas();