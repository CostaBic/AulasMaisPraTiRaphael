const formAdicionar = document.getElementById('form-adicionar') //Pega o elemento <form> do HTML com o id="form-adicionar" e guarda na variável formAdicionar. Isso permite manipular e ouvir eventos nesse formulário.
const inputItem = document.getElementById('input-item') //Pega o campo de texto (<input>) onde o usuário digita a nova tarefa.
const listaItens = document.getElementById('lista-itens') //Pega a <ul> ou <ol> onde os itens serão listados.
const btnLimpar = document.getElementById('btn-limpar') //Pega o botão de apagar tudo (id="btn-limpar") para adicionar uma ação de limpeza da lista.

let itens = [] //Cria um array vazio que vai armazenar todos os itens da lista (em memória).

window.addEventListener('DOMContentLoaded', () => { //window.addEventListener('DOMContentLoaded', ...): Executa o código quando o HTML for carregado (antes das imagens e outros recursos).
    const dados = localStorage.getItem('listaCompras')
    if(dados) {
        itens = JSON.parse(dados)
        renderizarLista()
    }
})

function salvarDados() {
    localStorage.setItem('listaCompras', JSON.stringify(itens)) //Converte o array itens para string.
}

function renderizarLista() {
    listaItens.innerHTML = ''

    itens.forEach((item, index) => {
        const li = document.createElement('li')
        li.textContent = item

        // Aplica estilo se já estiver concluído
        if (item.concluido) {
            li.style.textDecoration = 'line-through';
            li.style.color = 'gray';
        }

        // Botão de concluir
        const btnConcluido = document.createElement('button');
        btnConcluido.innerHTML = '<img src="assets/check.png" alt="Concluir" width="16" height="16">';
        btnConcluido.addEventListener('click', () => {
            itens[index].concluido = !itens[index].concluido; // alterna estado
            salvarDados();
            renderizarLista();
        });

        const btnRemover = document.createElement('button')
        btnRemover.innerHTML = '<img src="assets/remover.png" alt="Remover" width="16" height="16">';
        btnRemover.addEventListener('click', () => {
            removerItem(index)
        })
        
        li.appendChild(btnConcluido);
        li.appendChild(btnRemover)
        listaItens.appendChild(li)
    })
}

formAdicionar.addEventListener('submit', (evento) => {
    evento.preventDefault()
    const novoItem = inputItem.value.trim()
    if(novoItem === '') return; 
    itens.push(novoItem)

    salvarDados()
    renderizarLista()

    inputItem.value = ''
})  

function removerItem(indice) {
    itens.splice(indice, 1)
    salvarDados()
    renderizarLista()
}

btnLimpar.addEventListener('click', () => {
    if(confirm('Deseja realmente limpar toda a lista?')) { 
        itens = []
        salvarDados()
        renderizarLista()
    }
})


// Funcionalidades:

// Marcar como comprado - Salvar esse Estado no localStorage
// Contador de Itens - Mostrar quantos itens tem na lista, atualizando em tempo real
// Adicione filtros para itens 'comprados' e 'pedentes'
// Permita ordenar alfabeticamente ou por status