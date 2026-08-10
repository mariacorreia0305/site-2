```javascript
/* =========================================================
   PORTAL DE APOIO AO ESTUDANTE
   JavaScript - Página Inicial
========================================================= */


/* =========================================================
   1. MENU MOBILE
========================================================= */

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");

if (menuBtn && nav) {

    menuBtn.addEventListener("click", () => {

        nav.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (nav.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

            menuBtn.setAttribute("aria-label", "Fechar menu");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

            menuBtn.setAttribute("aria-label", "Abrir menu");
        }
    });


    /* Fecha o menu quando o usuário
       clica em algum link */

    const navLinks = nav.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");

            const icon = menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

            menuBtn.setAttribute("aria-label", "Abrir menu");
        });
    });
}


/* =========================================================
   2. BOTÃO VOLTAR AO TOPO
========================================================= */

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");
        }
    });


    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });
}


/* =========================================================
   3. ANIMAÇÃO DAS SEÇÕES AO ENTRAREM NA TELA
========================================================= */

const animatedElements = document.querySelectorAll(
    ".info-card, .help-item, .welcome-box, .section-title"
);

if (animatedElements.length > 0) {

    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";

                    observer.unobserve(entry.target);
                }
            });

        },
        {
            threshold: 0.15
        }
    );


    animatedElements.forEach(element => {

        element.style.opacity = "0";
        element.style.transform = "translateY(25px)";
        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";

        observer.observe(element);
    });
}


/* =========================================================
   4. MODO ESCURO
========================================================= */

const darkModeButton = document.createElement("button");

darkModeButton.className = "accessibility-button";
darkModeButton.id = "darkModeButton";

darkModeButton.setAttribute(
    "aria-label",
    "Ativar ou desativar modo escuro"
);

darkModeButton.innerHTML = `
    <i class="fa-solid fa-moon"></i>
`;

document.body.appendChild(darkModeButton);


/* Verifica preferência salva */

const darkMode = localStorage.getItem("darkMode");

if (darkMode === "enabled") {

    document.body.classList.add("dark-mode");

    darkModeButton.innerHTML = `
        <i class="fa-solid fa-sun"></i>
    `;
}


/* Ativa/desativa */

darkModeButton.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    const isDark =
        document.body.classList.contains("dark-mode");


    if (isDark) {

        localStorage.setItem("darkMode", "enabled");

        darkModeButton.innerHTML = `
            <i class="fa-solid fa-sun"></i>
        `;

    } else {

        localStorage.setItem("darkMode", "disabled");

        darkModeButton.innerHTML = `
            <i class="fa-solid fa-moon"></i>
        `;
    }
});


/* =========================================================
   5. AUMENTAR / DIMINUIR FONTE
========================================================= */

let fontSize = Number(
    localStorage.getItem("fontSize")
) || 100;


/* Cria os botões */

const increaseFontButton = document.createElement("button");

increaseFontButton.className = "accessibility-button";
increaseFontButton.id = "increaseFont";

increaseFontButton.setAttribute(
    "aria-label",
    "Aumentar tamanho da fonte"
);

increaseFontButton.innerHTML = `
    <i class="fa-solid fa-plus"></i>
    <span>A</span>
`;


const decreaseFontButton = document.createElement("button");

decreaseFontButton.className = "accessibility-button";
decreaseFontButton.id = "decreaseFont";

decreaseFontButton.setAttribute(
    "aria-label",
    "Diminuir tamanho da fonte"
);

decreaseFontButton.innerHTML = `
    <i class="fa-solid fa-minus"></i>
    <span>A</span>
`;


/* Adiciona os botões */

document.body.appendChild(increaseFontButton);
document.body.appendChild(decreaseFontButton);


/* Aplica tamanho salvo */

document.documentElement.style.fontSize =
    `${fontSize}%`;


/* Aumentar */

increaseFontButton.addEventListener("click", () => {

    if (fontSize < 125) {

        fontSize += 5;

        document.documentElement.style.fontSize =
            `${fontSize}%`;

        localStorage.setItem(
            "fontSize",
            fontSize
        );
    }
});


/* Diminuir */

decreaseFontButton.addEventListener("click", () => {

    if (fontSize > 90) {

        fontSize -= 5;

        document.documentElement.style.fontSize =
            `${fontSize}%`;

        localStorage.setItem(
            "fontSize",
            fontSize
        );
    }
});


/* =========================================================
   6. ALTO CONTRASTE
========================================================= */

const contrastButton = document.createElement("button");

contrastButton.className = "accessibility-button";
contrastButton.id = "contrastButton";

contrastButton.setAttribute(
    "aria-label",
    "Ativar ou desativar alto contraste"
);

contrastButton.innerHTML = `
    <i class="fa-solid fa-circle-half-stroke"></i>
`;


document.body.appendChild(contrastButton);


/* Verifica preferência */

const highContrast =
    localStorage.getItem("highContrast");


if (highContrast === "enabled") {

    document.body.classList.add(
        "high-contrast"
    );
}


/* Ativar/desativar */

contrastButton.addEventListener("click", () => {

    document.body.classList.toggle(
        "high-contrast"
    );

    const isContrast =
        document.body.classList.contains(
            "high-contrast"
        );


    if (isContrast) {

        localStorage.setItem(
            "highContrast",
            "enabled"
        );

    } else {

        localStorage.setItem(
            "highContrast",
            "disabled"
        );
    }
});


/* =========================================================
   7. ANO AUTOMÁTICO NO RODAPÉ
========================================================= */

const footerText =
    document.querySelector(".footer-bottom p");

if (footerText) {

    const currentYear =
        new Date().getFullYear();

    footerText.innerHTML = `
        &copy; ${currentYear} Portal de Apoio ao Estudante.
        Projeto educativo escolar.
    `;
}


/* =========================================================
   8. FECHAR MENU COM A TECLA ESC
========================================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        if (nav && nav.classList.contains("active")) {

            nav.classList.remove("active");

            const icon =
                menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

            menuBtn.setAttribute(
                "aria-label",
                "Abrir menu"
            );
        }
    }
});


/* =========================================================
   9. INDICADOR DE CARREGAMENTO
========================================================= */

window.addEventListener("load", () => {

    document.body.classList.add("page-loaded");

});
```
