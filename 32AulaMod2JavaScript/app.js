//O navegador oferece uma API para manipular a árvore DOM (Document Object Model). Este objeto chamamos de document:
//Com document podemos capturar elementos para manipular com JavaScript.
const formAdicionar = document.getElementById('form-adicionar') //Este comando cria uma especie de link ou ponteiro entre a variável formAdicionar e o elemento HTML <form> com id="form-adicionar".
//Agora esta variável tem poderes de trabalhar em cima deste formulário.

const inputItem = document.getElementById('input-item') //Pega o campo de texto (<input>) onde o usuário digita a nova tarefa.
const listaItens = document.getElementById('lista-itens') //Pega a <ul> ou <ol> onde os itens serão listados.
const btnLimpar = document.getElementById('btn-limpar') //Pega o botão de apagar tudo (id="btn-limpar") para adicionar uma ação de limpeza da lista.

let itens = [] //Cria um array vazio que vai armazenar todos os itens da lista (em memória).

window.addEventListener('DOMContentLoaded', () => { 
    /*
    Adiciona um evento que escuta quando o conteúdo do DOM (HTML) foi completamente carregado.
    Isso garante que o código dentro dessa função só será executado depois que todo o HTML estiver pronto.
    window.addEventListener('DOMContentLoaded', ...): Executa o código quando o HTML for carregado (antes das imagens e outros recursos).
    */
    const dados = localStorage.getItem('listaCompras') //Pega os dados salvos no localStorage (memória do navegador) com a chave 'listaCompras'.
    if(dados) { //Se houver dados. Se não houver dados, não faz nada.
        itens = JSON.parse(dados) //Converte a string JSON de volta para um array JavaScript e atribui à variável itens.
        renderizarLista() //Chama a função que renderiza a lista na tela.
    }
})

function salvarDados() { //função que salva os dados no localStorage.
    //localStorage é uma API do navegador que permite armazenar dados no navegador do usuário.
    localStorage.setItem('listaCompras', JSON.stringify(itens)) //Converte um valor em JavaScript para uma string JSON e salva no localStorage com a chave 'listaCompras'.
}

function renderizarLista() { //função que renderiza a lista de itens na tela.
    //Esta função é responsável por atualizar a lista de itens exibida na página.
    listaItens.innerHTML = '' //Pega o HTML interno da constante listaItens (innerHTML) e faz receber nada ('') ou seja, limpa a lista antes de renderizar novamente, para evitar duplicação de itens.

    itens.forEach((item, index) => { //Itera sobre cada item (percorre todos os itens) do array itens, usando forEach que executa uma função para cada item.
        const li = document.createElement('li') //Cria um novo elemento HTML <li> (item da lista).
        li.textContent = item //Pega o conteúdo do item (elemento do array) e coloca dentro do <li> criado.

        // Aplica estilo se já estiver concluído
        if (item.concluido) {
            li.style.textDecoration = 'line-through';
            li.style.color = 'gray';
        }
        /*
        // Botão de concluir
        const btnConcluido = document.createElement('button');
        btnConcluido.innerHTML = '<img src="assets/check.png" alt="Concluir" width="16" height="16">';
        btnConcluido.addEventListener('click', () => {
            itens[index].concluido = !itens[index].concluido; // alterna estado
            salvarDados();
            renderizarLista();
        });
        

        // Checkbox de concluir
        const chkConcluido = document.createElement('input');
        chkConcluido.type = 'checkbox';
        chkConcluido.checked = item.concluido || false; // mantém estado salvo

        chkConcluido.addEventListener('change', () => {
            itens[index].concluido = chkConcluido.checked;
            salvarDados();
            renderizarLista();
        });
        */

        const btnRemover = document.createElement('button') //Cria um novo botão no HTML para remover o item.
        btnRemover.innerHTML = '<img src="assets/remover.png" alt="Remover" width="16" height="16">'; //Coloca uma imagem como botão.
        btnRemover.addEventListener('click', () => { //Toda a vez que clicar no botão, vai executar a função removerItem
            removerItem(index) //Passa o índice do item para a função removerItem, que remove o item do array e atualiza a lista.
        })
        
        //li.appendChild(btnConcluido);
        //li.appendChild(chkConcluido);
        li.appendChild(btnRemover) //Faz o botão aparecer na tela, dentro do <li>.
        listaItens.appendChild(li) //Faz o <li> aparecer na lista de itens (listaItens).
    })
}

/*Temos um étodo chamado addEventListener que fica ouvindo quando temos um evento, como uma renderização de página, clique em botão, etc.
Mas temos que indicar qual evento queremos ficar ouvindo e o que queremos fazer depois do evento*/
formAdicionar.addEventListener('submit', (evento) => {
    /*variavelOuConstanteLinkadaAoHTML.addEventListener('eventoQueQueremos', (escolhaQualquerNomeDeVariavelParaArmazenarOEvento) => {*/
    evento.preventDefault()
    const novoItem = inputItem.value.trim() /*Cria um novo item somente no JavaScript, sem enviar para o servidor.
    O método trim() remove espaços em branco no início e no final da string */
    if(novoItem === '') return; // Se o campo estiver vazio, não faz nada.
    itens.push(novoItem) //Adiciona o novo item ao array itens.

    salvarDados() //Chama a função que salva os dados no localStorage (memória do navegador) para persistência.
    renderizarLista() //Chama a função que renderiza a lista atualizada na tela.

    inputItem.value = '' //Limpa o campo de entrada após adicionar o item.
    inputItem.focus() //Coloca o foco de volta no campo de entrada para facilitar a adição de novos itens.
})  

function removerItem(indice) { //Função que remove um item do array itens pelo índice.
    itens.splice(indice, 1) //O método splice() remove um ou mais elementos do array a partir do índice especificado. Aqui, remove 1 item no índice fornecido.
    salvarDados()
    renderizarLista()
}

btnLimpar.addEventListener('click', () => { //Adiciona um evento de clique no botão de limpar a lista. (Fica ouvindo este botão)
    if(confirm('Deseja realmente limpar toda a lista?')) { //Pede confirmação do usuário.
        itens = [] //Faz receber um array vazio que limpa a lista de itens.
        salvarDados() //Chama a função que salva os dados no localStorage (memória do navegador) para persistência.
        renderizarLista()//Chama a função que renderiza a lista atualizada na tela.
    }
})


// Funcionalidades:

// Marcar como comprado - Salvar esse Estado no localStorage
// Contador de Itens - Mostrar quantos itens tem na lista, atualizando em tempo real
// Adicione filtros para itens 'comprados' e 'pedentes'
// Permita ordenar alfabeticamente ou por status