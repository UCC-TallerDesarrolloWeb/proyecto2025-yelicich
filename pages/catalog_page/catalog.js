// ---------- refs ----------
const list = document.getElementById("list-products");
const select = document.getElementById("order-by");
const carsCount = document.getElementById("cars-count");
const clearBtn = document.getElementById("clear-filters");

// Precio
const fromPriceInput = document.getElementById("from-price");
const toPriceInput   = document.getElementById("to-price");

// ---------- helpers ----------
const getCheckedValues = (selector) =>
    Array.from(document.querySelectorAll(selector))
    .filter(el => el.checked)
    .map(el => el.value);

const getNumeric = (el) => {
    if (!el) return null;
    const onlyDigits = (el.value || "").replace(/\D/g, "");
    return onlyDigits ? parseInt(onlyDigits, 10) : null;
};

const slug = (s) => s.toLowerCase().replace(/\s+/g, "-");

// ---------- generar marcas dinámicamente ----------
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

// ---------- render ----------
function renderAutos(arr) {
    list.innerHTML = "";

    arr.forEach(auto => {
        const card = document.createElement("div");
        card.classList.add("card-car");

        card.innerHTML = `
        <a href="../details_page/details.html?id=${auto.id}" class="link-detalle">
            <div class="car-image-container">
            <img src="${auto.imagenes[0]}" alt="${auto.marca} ${auto.modelo}">
            </div>
            <div class="informacion">
            <div class="datos">
                <div class="marca">${auto.marca}</div>
                <div class="modelo">${auto.modelo}</div>
                <div class="tipo-caja">${auto.tipo} • ${auto.caja}</div>
            </div>
            <div class="precio">
                <span class="desde">Desde</span>
                <strong>$${auto.precio.toLocaleString("es-AR")}</strong>
            </div>
            </div>
        </a>
        `;
        list.appendChild(card);
    });
}

// ---------- sort ----------
function sortAutos(arr, criterion) {
    const v = (criterion || "").toLowerCase();
    const cp = [...arr];

    if (v === "cheaper") cp.sort((a, b) => a.precio - b.precio);
    else if (v === "expensive") cp.sort((a, b) => b.precio - a.precio);
    else cp.sort((a, b) => b.id - a.id);
    return cp;
}

// ---------- filter + render pipeline ----------
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

    // Ordenar sobre el resultado filtrado
    const sorted = sortAutos(filtered, select ? select.value : "most_recent");

    // Render + contador
    renderAutos(sorted);
    if (clearBtn) clearBtn.classList.toggle('hidden', !isAnyFilterActive());
    if (carsCount) carsCount.textContent = `${filtered.length} autos`;
}

// ---------- listeners (después de generar marcas) ----------
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

// ---------- primera carga ----------
applyFiltersAndRender();

//Boton para limpiar filtros
function isAnyFilterActive() {
    const minP = getNumeric(fromPriceInput);
    const maxP = getNumeric(toPriceInput);
    const anyTipo   = document.querySelector('#suv:checked, #sedan:checked, #pickup:checked, #utilitario:checked, #deportivo:checked');
    const anyMarca  = document.querySelector('#marca-filter input[type="checkbox"]:checked');
    const anyCaja   = document.querySelector('#manual:checked, #automatic:checked');
    return !!(minP || maxP || anyTipo || anyMarca || anyCaja);
}

if (clearBtn) {
    clearBtn.addEventListener('click', () => {
        // limpiar precio
        if (fromPriceInput) fromPriceInput.value = "";
        if (toPriceInput)   toPriceInput.value   = "";

        // desmarcar todos los checkboxes
        document.querySelectorAll('.filters input[type="checkbox"]')
        .forEach(ch => ch.checked = false);

        // re-render
        applyFiltersAndRender();
    });
}

//Dar formato de precio al filtro de precio
const inputsPrecio = document.querySelectorAll(".price-filter");

inputsPrecio.forEach(input => {
    input.addEventListener("input", (e) => {
        let valor = e.target.value.replace(/\D/g, ""); // solo números
        if (valor) {
        e.target.dataset.valor = valor; // número puro
        e.target.value = `$ ${Number(valor).toLocaleString("es-AR")}`; // texto con formato
        } else {
        e.target.dataset.valor = "";
        e.target.value = "";
        }
    });
});