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
                    <img src="../../imagenes/marcas/${logo}.webp" alt="${nombre}">
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
                    <img src="../../imagenes/segmentos/${imagen}.webp" alt="${nombre}">
                </div>
                <div class="type-name">${nombre}</div>
            </a>
        `;

        segmentosList.appendChild(card);
    });

    //TODO: conectar con catalogo.html?segmento=nombre
}

renderSegmentos(TIPOS);