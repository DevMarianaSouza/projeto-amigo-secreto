const listaAmigos = [];
const listaElement = document.getElementById("listaAmigos");
const resultadoElement = document.getElementById("resultado");

// Adicionar amigo à lista
function adicionarAmigo() {
    const input = document.getElementById("amigo");
    const nome = input.value.trim();

    if (nome === "") {
        alert("Digite um nome válido!");
        return;
    }
    if (listaAmigos.includes(nome)) {
        alert("Esse nome já foi adicionado!");
        return;
    }

    listaAmigos.push(nome);
    atualizarLista();
    input.value = "";
}

// Atualizar a lista na tela
function atualizarLista() {
    listaElement.innerHTML = "";
    listaAmigos.forEach((nome, index) => {
        const li = document.createElement("li");
        li.textContent = nome;

        // Botão para remover nome da lista
        const btnRemover = document.createElement("button");
        btnRemover.textContent = "❌";
        btnRemover.onclick = () => removerAmigo(index);

        li.appendChild(btnRemover);
        listaElement.appendChild(li);
    });
}

// Remover amigo da lista
function removerAmigo(index) {
    listaAmigos.splice(index, 1);
    atualizarLista();
}

// Algoritmo de sorteio seguro
function sortearAmigo() {
    if (listaAmigos.length < 2) {
        alert("Adicione pelo menos 2 amigos para sortear!");
        return;
    }

    let disponiveis = [...listaAmigos]; // Lista de amigos disponíveis para serem sorteados
    let sorteio = {};

    for (let amigo of listaAmigos) {
        let possiveis = disponiveis.filter(a => a !== amigo); // Remove o próprio nome da lista

        if (possiveis.length === 0) {
            // Se sobrar apenas um nome e for o próprio, reinicia o sorteio
            return sortearAmigo();
        }

        let sorteado = possiveis[Math.floor(Math.random() * possiveis.length)];
        sorteio[amigo] = sorteado;
        disponiveis = disponiveis.filter(a => a !== sorteado); // Remove o nome sorteado da lista
    }

    // Exibir resultado na tela
    resultadoElement.innerHTML = "";
    Object.entries(sorteio).forEach(([amigo, sorteado]) => {
        const li = document.createElement("li");
        li.textContent = `${amigo} → ${sorteado}`;
        resultadoElement.appendChild(li);
    });
}
