const brandsList = document.getElementById("list-brands");
const segmentosList = document.getElementById("list-types");

// Generar cards de las marcas
function renderMarcas(marcasObj) {
    brandsList.innerHTML = "";

    Object.values(marcasObj).forEach(nombre => {
        const logo = textBase(nombre);
        const card = document.createElement("div");
        card.classList.add("card-brand");

        card.innerHTML = `
            <a href="../catalog_page/catalog.html?marca=${encodeURIComponent(nombre)}" class="link-detalle">
                <div class="brand-image-container">
                    <img src="../../imagenes/marcas/${logo}.webp" alt="logo de la marca ${nombre}" loading="lazy">
                </div>
                <div class="brand-name">${nombre}</div>
            </a>
        `;

        brandsList.appendChild(card);
    });
}

renderMarcas(MARCAS);

// Generar cards de los segmentos
function renderSegmentos(segmentosObj) {
    segmentosList.innerHTML = "";

    Object.values(segmentosObj).forEach(nombre => {
        const imagen = textBase(nombre);
        const card = document.createElement("div");
        card.classList.add("card-type");

        card.innerHTML = `
            <a href="../catalog_page/catalog.html?segmento=${encodeURIComponent(nombre)}" class="link-detalle">
                <div class="type-image-container">
                    <img src="../../imagenes/segmentos/${imagen}.webp" alt="Ícono del segmento ${nombre}" loading="lazy">
                </div>
                <div class="type-name">${nombre}</div>
            </a>
        `;

        segmentosList.appendChild(card);
    });
}

renderSegmentos(TIPOS);

// Carrusel testimonios
let currentTestimonio = 0;
const testimonios = document.querySelectorAll(".testimonio");

function showTestimonio(index) {
    testimonios.forEach((t, i) => {
        t.classList.toggle("active", i === index);
    });
}

function nextTestimonio() {
    currentTestimonio = (currentTestimonio + 1) % testimonios.length;
    showTestimonio(currentTestimonio);
}

function prevTestimonio() {
    currentTestimonio = (currentTestimonio - 1 + testimonios.length) % testimonios.length;
    showTestimonio(currentTestimonio);
}

showTestimonio(currentTestimonio);
document.getElementById("prev-testimonio").addEventListener("click", prevTestimonio);
document.getElementById("next-testimonio").addEventListener("click", nextTestimonio);

// Newsletter: validar email
const newsletterForm = document.querySelector(".newsletter__form");
const newsletterInput = document.getElementById("newsletter-email");

newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = newsletterInput.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
        alert("Por favor ingresá un correo válido.");
        newsletterInput.value = "";
        newsletterInput.focus();
        return;
    }

    alert("¡Gracias por suscribirte!");
    newsletterInput.value = "";
});