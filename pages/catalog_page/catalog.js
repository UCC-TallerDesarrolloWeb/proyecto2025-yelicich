const list = document.getElementById("list-products");
const select = document.getElementById("order-by");
const carsCount = document.getElementById("cars-count");
const clearBtn = document.getElementById("clear-filters");

// Precio
const fromPriceInput = document.getElementById("from-price");
const toPriceInput = document.getElementById("to-price");

// ---------- Helpers ----------
const slug = (s) => s.toLowerCase().replace(/\s+/g, "-");

const getCheckedValues = (selector) =>
    Array.from(document.querySelectorAll(selector))
        .filter(el => el.checked)
        .map(el => el.value);

const getNumeric = (el) => {
    if (!el) return null;
    const onlyDigits = (el.value || "").replace(/\D/g, "");
    return onlyDigits ? parseInt(onlyDigits, 10) : null;
};

// ---------- Construir filtro de marcas (UNA sola vez) ----------
(function buildBrandFilter() {
    const ul = document.getElementById("marca-filter");
    if (!ul || typeof MARCAS !== "object") return;

    ul.innerHTML = "";
    Object.values(MARCAS).forEach(marca => {
        const id = `marca-${slug(marca)}`;
        const li = document.createElement("li");
        li.innerHTML = `
        <input type="checkbox" id="${id}" value="${marca}">
        <label for="${id}">${marca}</label>
        `;
        ul.appendChild(li);
    });
})();

// ---------- Marcar la marca si viene desde la Home ----------
(() => {
    const params = new URLSearchParams(window.location.search);
    const marcaFiltroParam = params.get("marca");
    if (!marcaFiltroParam) return;

    const marcaFiltro = decodeURIComponent(marcaFiltroParam);
    const selectorSeguro = `#marca-filter input[value="${CSS.escape(marcaFiltro)}"]`;
    const checkbox = document.querySelector(selectorSeguro);
    if (checkbox) checkbox.checked = true;
})();

// ---------- Render de cards ----------
    function renderAutos(arr) {
    list.innerHTML = "";

    arr.forEach(auto => {
        const card = document.createElement("div");
        card.classList.add("card-car");
        let modeloCar = textBase(auto.modelo);
        let scrImage = `../../imagenes/cars/${modeloCar}/main_${modeloCar}.webp`;
        let scrImageHover = `../../imagenes/cars/${modeloCar}/hover_${modeloCar}.webp`;

        card.innerHTML = `
        <a href="../details_page/details.html?id=${auto.id}" class="link-detalle">
            <div class="car-image-container">
            <img src="${scrImage}" alt="${auto.marca} ${auto.modelo}">
            </div>
            <div class="informacion">
            <div class="datos">
                <div class="car-marca">${auto.marca}</div>
                <div class="car-modelo">${auto.modelo}</div>
                <div class="car-tipo-caja">${auto.tipo} • ${auto.caja}</div>
            </div>
            <div class="car-precio">
                <span class="car-desde">Desde</span>
                <strong>$${auto.precio.toLocaleString("es-AR")}</strong>
            </div>
            </div>
        </a>
        `;

        // Hover imagen (si hay img_hover definida)
        const img = card.querySelector("img");
        if (scrImageHover) {
            card.addEventListener("mouseenter", () => { img.src = `${scrImageHover}`; });
            card.addEventListener("mouseleave", () => { img.src = `${scrImage}`; });
        }

        list.appendChild(card);
    });
}

// ---------- Orden ----------
function sortAutos(arr, criterion) {
    const v = (criterion || "").toLowerCase();
    const cp = [...arr];

    if (v === "cheaper") cp.sort((a, b) => a.precio - b.precio);
    else if (v === "expensive") cp.sort((a, b) => b.precio - a.precio);
    else cp.sort((a, b) => a.id - b.id); // relevancia/recientes (ajustá si querés desc)
    return cp;
}

// ---------- Filtros + Render ----------
function applyFiltersAndRender() {
    let filtered = [...autos];

    // Precio
    const minP = getNumeric(fromPriceInput);
    const maxP = getNumeric(toPriceInput);
    if (minP !== null) filtered = filtered.filter(a => a.precio >= minP);
    if (maxP !== null) filtered = filtered.filter(a => a.precio <= maxP);

    // Segmento / Tipo
    const tiposChecked = getCheckedValues(
        "#suv:checked, #sedan:checked, #pickup:checked, #utilitario:checked, #deportivo:checked"
    );
    if (tiposChecked.length) {
        filtered = filtered.filter(a => tiposChecked.includes(a.tipo));
    }

    // Marca
    const marcasChecked = getCheckedValues("#marca-filter input[type='checkbox']:checked");
    if (marcasChecked.length) {
        filtered = filtered.filter(a => marcasChecked.includes(a.marca));
    }

    // Transmisión
    const cajasChecked = getCheckedValues("#manual:checked, #automatic:checked");
    if (cajasChecked.length) {
        filtered = filtered.filter(a => cajasChecked.includes(a.caja));
    }

    // Orden
    const sorted = sortAutos(filtered, select ? select.value : "most_recent");

    // Render + contador + toggle limpiar
    renderAutos(sorted);
    if (clearBtn) clearBtn.classList.toggle("hidden", !isAnyFilterActive());
    if (carsCount) carsCount.textContent = `${filtered.length} autos`;
}

// ---------- Listeners ----------
function wireFilterEvents() {
    document.querySelectorAll(".filters input[type='checkbox']").forEach(inp => {
        inp.addEventListener("change", applyFiltersAndRender);
    });
    [fromPriceInput, toPriceInput].forEach(inp => {
        if (inp) inp.addEventListener("input", applyFiltersAndRender);
    });
    if (select) select.addEventListener("change", applyFiltersAndRender);
}
wireFilterEvents();

// ---------- Primera carga ----------
applyFiltersAndRender();

// ---------- Limpiar filtros ----------
function isAnyFilterActive() {
    const minP = getNumeric(fromPriceInput);
    const maxP = getNumeric(toPriceInput);
    const anyTipo  = document.querySelector('#suv:checked, #sedan:checked, #pickup:checked, #utilitario:checked, #deportivo:checked');
    const anyMarca = document.querySelector('#marca-filter input[type="checkbox"]:checked');
    const anyCaja  = document.querySelector('#manual:checked, #automatic:checked');
    return !!(minP || maxP || anyTipo || anyMarca || anyCaja);
}

if (clearBtn) {
    clearBtn.addEventListener("click", () => {
        if (fromPriceInput) fromPriceInput.value = "";
        if (toPriceInput)   toPriceInput.value   = "";
        document.querySelectorAll('.filters input[type="checkbox"]').forEach(ch => ch.checked = false);
        applyFiltersAndRender();
    });
}

// ---------- Formato de precio ----------
document.querySelectorAll(".price-filter").forEach(input => {
    input.addEventListener("input", (e) => {
        const valor = e.target.value.replace(/\D/g, "");
        if (valor) {
        e.target.dataset.valor = valor;
        e.target.value = `$ ${Number(valor).toLocaleString("es-AR")}`;
        } else {
        e.target.dataset.valor = "";
        e.target.value = "";
        }
    });
});
