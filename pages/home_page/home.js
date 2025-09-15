const brandsList = document.getElementById("list-brands");

// Generar cards de las marcas
function renderMarcas(marcasObj) {
    brandsList.innerHTML = "";

    Object.values(marcasObj).forEach(nombre => {
        const logo = textBase(nombre);
        const card = document.createElement("div");
        card.classList.add("card-brand");

        card.innerHTML = `
            <a href="../catalog_page/catalog.html?marca=${encodeURIComponent(nombre)}" class="link-detalle">
                <div class="car-image-container">
                    <img src="../../imagenes/marcas/${logo}.webp" alt="${nombre}">
                </div>
                <div class="brand-name">${nombre}</div>
            </a>
        `;

        brandsList.appendChild(card);
    });
}

renderMarcas(MARCAS);