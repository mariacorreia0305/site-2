/* =====================================================
   ELAS EM SEGURANÇA
   JAVASCRIPT
===================================================== */


/* =====================================================
   MENU MOBILE
===================================================== */

function abrirMenu() {

    const menu = document.getElementById("menu");

    menu.classList.toggle("open");

}


/* Fecha o menu quando um link é clicado */

document.querySelectorAll("#menu a").forEach(function(link) {

    link.addEventListener("click", function() {

        document.getElementById("menu").classList.remove("open");

    });

});


/* =====================================================
   BOTÃO VOLTAR AO TOPO
===================================================== */

const backToTop =
    document.getElementById("backToTop");


window.addEventListener("scroll", function() {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", function() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* =====================================================
   ACESSIBILIDADE — FONTE
===================================================== */

function aumentarFonte() {

    document.body.classList.remove("font-xl");

    document.body.classList.toggle("font-large");

}


function aumentarFonteMais() {

    document.body.classList.remove("font-large");

    document.body.classList.add("font-xl");

}


function fonteNormal() {

    document.body.classList.remove("font-large");

    document.body.classList.remove("font-xl");

}


/* =====================================================
   ALTO CONTRASTE
===================================================== */

function alternarContraste() {

    document.body.classList.toggle("contrast");

}


/* =====================================================
   MODO ESCURO
===================================================== */

function alternarModoEscuro() {

    document.body.classList.toggle("dark");

}


/* =====================================================
   QUIZ
===================================================== */


/*
    Cada posição representa uma pergunta.

    null = ainda não respondida
    1    = resposta correta
    0    = resposta errada
*/

const respostasUsuario = [

    null,
    null,
    null,
    null,
    null

];


function responder(botao, pergunta, valor) {

    const questao =
        botao.parentElement;

    const botoes =
        questao.querySelectorAll(".answer");


    /* Remove seleção anterior */

    botoes.forEach(function(item) {

        item.classList.remove("selected");

    });


    /* Marca a resposta escolhida */

    botao.classList.add("selected");


    /* Guarda resposta */

    respostasUsuario[pergunta] = valor;

}


/* =====================================================
   RESULTADO DO QUIZ
===================================================== */

function mostrarResultado() {

    const resultado =
        document.getElementById("resultado");


    let respondidas = 0;

    let pontos = 0;


    respostasUsuario.forEach(function(resposta) {

        if (resposta !== null) {

            respondidas++;

            if (resposta === 1) {

                pontos++;

            }

        }

    });


    if (respondidas < 5) {

        resultado.innerHTML = `
            <strong>Quase lá!</strong>
            <p>
                Você respondeu ${respondidas} de 5 perguntas.
                Responda todas para descobrir seu resultado.
            </p>
        `;

        resultado.classList.add("show");

        return;

    }


    let mensagem = "";


    if (pontos === 5) {

        mensagem =
            "Excelente! Você reconheceu corretamente todos os sinais apresentados.";

    } else if (pontos >= 3) {

        mensagem =
            "Muito bem! Você demonstrou um bom conhecimento sobre o tema.";

    } else {

        mensagem =
            "Continue aprendendo! Informação é uma ferramenta importante para reconhecer situações de violência e buscar apoio.";

    }


    resultado.innerHTML = `

        <strong>
            Você acertou ${pontos} de 5 perguntas.
        </strong>

        <p>
            ${mensagem}
        </p>

    `;


    resultado.classList.add("show");


    /* Mostra visualmente quais eram as respostas corretas */

    const questoes =
        document.querySelectorAll(".question");


    questoes.forEach(function(questao, indice) {

        const botoes =
            questao.querySelectorAll(".answer");


        botoes.forEach(function(botao) {

            const valor =
                botao.getAttribute("onclick");


            if (
                valor &&
                valor.includes(
                    `responder(this, ${indice}, 1)`
                )
            ) {

                botao.classList.add("correct");

            }

        });

    });

}


/* =====================================================
   PORTAL DE ESCUTA
===================================================== */

function enviarDesabafo() {

    const campo =
        document.getElementById("desabafo");

    const mensagem =
        document.getElementById("mensagemEscuta");


    if (campo.value.trim() === "") {

        mensagem.innerHTML = `

            <strong>Você pode escrever primeiro.</strong>

            <p>
                Este espaço é apenas uma simulação educativa
                e não armazena seu texto.
            </p>

        `;

        mensagem.style.display = "block";

        return;

    }


    mensagem.innerHTML = `

        <strong>
            Obrigada por compartilhar.
        </strong>

        <p>
            Seu texto não foi armazenado nem enviado.
            Em uma situação real, procure uma pessoa adulta
            de confiança ou um serviço de apoio.
        </p>

        <p>
            Você merece ser ouvida e respeitada.
        </p>

    `;


    mensagem.style.display = "block";


    /*
        Limpa o campo porque o formulário é somente
        uma simulação e nenhum texto deve permanecer.
    */

    campo.value = "";

}


/* =====================================================
   ANIMAÇÃO AO ENTRAR NA TELA
===================================================== */

const elementos =
    document.querySelectorAll(
        ".card, .sign, .stat, .right, .person, .timeline-item"
    );


const observador =
    new IntersectionObserver(

        function(entries) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },

        {
            threshold: 0.1
        }

    );


elementos.forEach(function(elemento) {

    elemento.style.opacity = "0";

    elemento.style.transform =
        "translateY(20px)";

    elemento.style.transition =
        "opacity .6s ease, transform .6s ease";

    observador.observe(elemento);

});


/* =====================================================
   ANO AUTOMÁTICO DO FOOTER
===================================================== */

const anoAtual =
    new Date().getFullYear();


const footerBottom =
    document.querySelector(".footer-bottom");


if (footerBottom) {

    footerBottom.innerHTML =
        `© ${anoAtual} Elas em Segurança • Projeto educativo`;

}