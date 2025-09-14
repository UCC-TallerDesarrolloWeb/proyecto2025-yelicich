const brandsList = document.getElementById("list-brands");

// Generar cards de las marcas
function renderMarcas(arr) {
    brandsList.innerHTML = "";

    arr.forEach(marca => {
        const card = document.createElement("div");
        card.classList.add("card-brand");

        card.innerHTML = `
            <a href="../catalog_page/catalog.html?marca=${encodeURIComponent(marca.nombre)}" class="link-detalle">
                <div class="car-image-container">
                    <img src="${marca.logo}" alt="${marca.nombre}">
                </div>
                <div class="brand-name">${marca.nombre}</div>
            </a>
        `;

        brandsList.appendChild(card);
    });
}

renderMarcas(marcas);