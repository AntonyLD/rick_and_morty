let nomeInput = document.querySelector("#input-text")
let buscar = document.querySelector("#buscar")
let anterior = document.querySelector("#anterior")
let proximo = document.querySelector("#proximo")
let nomePersonagem = document.querySelector("#nomePersonagem")
let progenitor = document.querySelector("#progenitor")
let planNat = document.querySelector("#planNat")
let especie = document.querySelector("#especie")
let idade = document.querySelector("#idade")
let vivoMorto = document.querySelector("#vivoMorto")
let imagemPersonagem = document.querySelector("#caracterImg")


let dados = [];
let currentIndex = 0;

async function buscarDados() {
    try {
        const primeiraPagina = await fetch(`https://rickandmortyapi.com/api/character`).then(res => res.json());
        const totalPaginas = primeiraPagina.info.pages;
        const requisicoes = [];

        for (let i = 1; i <= totalPaginas; i++) {
            requisicoes.push(fetch(`https://rickandmortyapi.com/api/character?page=${i}`).then(res => res.json()));
        }

        const resultados = await Promise.all(requisicoes);
        dados = resultados.flatMap(resultado => resultado.results);

        buscarPersonagem(nomeInput.value);
    } catch (erro) {
        console.error('Uma das requisições falhou:', erro);
    }
}

function buscarPersonagem(nome) {
    const idInput = nome.toLowerCase();
    const personagem = dados.find(p => p.name.toLowerCase().includes(idInput));

    if (personagem) {
        currentIndex = dados.indexOf(personagem);
        exibirPersonagem(currentIndex);
    } else {
        console.error("Personagem não encontrado.");
    }
}

function exibirPersonagem(index) {
    const personagem = dados[index];
    if (personagem) {
        nomePersonagem.textContent = personagem.name;
        progenitor.textContent = personagem.gender;
        planNat.textContent = personagem.location.name;
        especie.textContent = personagem.species;
        vivoMorto.textContent = personagem.status;
        atualizaPersonagem(personagem.image);
        console.log(imagemPersonagem.classList);
    } else {
        console.error("Personagem não encontrado.");
    }
}

function atualizaPersonagem(newImage) {
    
    imagemPersonagem.classList.remove('visible');
    imagemPersonagem.classList.add('hidden');
    
    setTimeout(() => {
        imagemPersonagem.src = newImage;
        imagemPersonagem.classList.remove('hidden');
        imagemPersonagem.classList.add('visible');
    }, 500);
}

proximo.addEventListener("click", () => {
    if (currentIndex < dados.length - 1) {
        currentIndex++;
        exibirPersonagem(currentIndex);
    }
});

anterior.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        exibirPersonagem(currentIndex);
    }
});

buscar.addEventListener("click", (e) => {
    e.preventDefault();
    buscarPersonagem(nomeInput.value);
});


buscarDados();
