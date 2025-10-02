const brandsList = document.getElementById("list-brands");
const segmentosList = document.getElementById("list-types");

/**
 * Renderiza las tarjetas de marcas en la sección "Buscar por marca".
 * @method renderMarcas
 * @param {Object} marcasObj - Lista con todas las marcas disponibles.
 * @return {void}
 */
const renderMarcas = (marcasObj) => {
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

/**
 * Renderiza las tarjetas de segmentos en la sección "Buscar por segmento".
 * @method renderSegmentos
 * @param {Object} segmentosObj - Lista con todos los segmentos disponibles.
 * @return {void}
 */
const renderSegmentos = (segmentosObj) => {
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

/**
 * Muestra el testimonio activo en el carrusel y oculta los demás.
 * @method showTestimonio
 * @param {number} index - Índice del testimonio que se debe mostrar.
 * @return {void}
 */
const showTestimonio = (index) => {
    testimonios.forEach((t, i) => {
        t.classList.toggle("active", i === index);
    });
}

/**
 * Avanza al siguiente testimonio en el carrusel.
 * @method nextTestimonio
 * @return {void}
 */
const nextTestimonio = () => {
    currentTestimonio = (currentTestimonio + 1) % testimonios.length;
    showTestimonio(currentTestimonio);
}

/**
 * Retrocede al testimonio anterior en el carrusel.
 * @method prevTestimonio
 * @return {void}
 */
const prevTestimonio = () => {
    currentTestimonio = (currentTestimonio - 1 + testimonios.length) % testimonios.length;
    showTestimonio(currentTestimonio);
}

showTestimonio(currentTestimonio);
document.getElementById("prev-testimonio").addEventListener("click", prevTestimonio);
document.getElementById("next-testimonio").addEventListener("click", nextTestimonio);

// Newsletter: validar email
const newsletterForm = document.querySelector(".newsletter__form");
const newsletterInput = document.getElementById("newsletter-email");

/**
 * Valida el email ingresado.
 * @method submitNewsletter
 * @param {Event} e - Evento de submit del formulario.
 * @return {void}
 */
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