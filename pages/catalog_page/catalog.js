const list = document.getElementById("list-products");
const select = document.getElementById("order-by");
const carsCount = document.getElementById("cars-count");
const clearBtn = document.getElementById("clear-filters");

// Precio
const fromPriceInput = document.getElementById("from-price");
const toPriceInput = document.getElementById("to-price");

/**
 * Genera un string en minúsculas separado por guiones a partir de un texto.
 * @method slug
 * @param {string} s - Texto de entrada.
 * @return {string} Slug generado.
 */
const slug = (s) => s.toLowerCase().replace(/\s+/g, "-");

/**
 * Devuelve un array con los valores de todos los checkboxes seleccionados según un selector.
 * @method getCheckedValues
 * @param {string} selector - Selector CSS para buscar checkboxes.
 * @return {Array<string>} Lista de valores seleccionados.
 */
const getCheckedValues = (selector) =>
    Array.from(document.querySelectorAll(selector))
        .filter(el => el.checked)
        .map(el => el.value);

/**
 * Convierte el valor de un input en número, eliminando caracteres no numéricos.
 * @method getNumeric
 * @param {HTMLInputElement} el - Input del que se obtiene el valor.
 * @return {number|null} Número parseado o null si está vacío.
 */
const getNumeric = (el) => {
    if (!el) return null;
    const onlyDigits = (el.value || "").replace(/\D/g, "");
    return onlyDigits ? parseInt(onlyDigits, 10) : null;
};

// -------------------- FILTROS AUTOMÁTICOS --------------------

/**
 * Renderiza dinámicamente el filtro de marcas.
 * @method renderBrandFilter
 * @return {void}
 */
const renderBrandFilter = () => {
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
};

/**
 * Renderiza dinámicamente el filtro de segmentos al cargar la página.
 * @method renderSegmentFilter
 * @return {void}
 */
const renderSegmentFilter = () => {
    const ul = document.getElementById("tipo-filter");
    if (!ul || typeof TIPOS !== "object") return;

    ul.innerHTML = "";
    Object.values(TIPOS).forEach(tipo => {
        const id = `tipo-${slug(tipo)}`;
        const li = document.createElement("li");
        li.innerHTML = `
        <input type="checkbox" id="${id}" value="${tipo}">
        <label for="${id}">${tipo}</label>
        `;
        ul.appendChild(li);
    });
};

/**
 * Marca automáticamente los filtros según los parámetros pasados por la URL.
 * @method applyURLFilters
 * @return {void}
 */
const applyURLFilters = () => {
    const params = new URLSearchParams(window.location.search);

    const marcaParam = params.get("marca");
    if (marcaParam) {
        const marca = decodeURIComponent(marcaParam);
        const selector = `#marca-filter input[value="${CSS.escape(marca)}"]`;
        const checkbox = document.querySelector(selector);
        if (checkbox) checkbox.checked = true;
    }

    const segmentoParam = params.get("segmento");
    if (segmentoParam) {
        const segmento = decodeURIComponent(segmentoParam);
        const selector = `#tipo-filter input[value="${CSS.escape(segmento)}"]`;
        const checkbox = document.querySelector(selector);
        if (checkbox) checkbox.checked = true;
    }
};


/**
 * Determina si hay filtros activos.
 * @method isAnyFilterActive
 * @return {boolean} True si hay al menos un filtro aplicado.
 */
const isAnyFilterActive = () => {
    const minP = getNumeric(fromPriceInput);
    const maxP = getNumeric(toPriceInput);
    const anyTipo  = document.querySelector('#tipo-filter input[type="checkbox"]:checked');
    const anyMarca = document.querySelector('#marca-filter input[type="checkbox"]:checked');
    const anyCaja  = document.querySelector('#manual:checked, #automatic:checked');
    return !!(minP || maxP || anyTipo || anyMarca || anyCaja);
}

// -------------------- RENDER --------------------
/**
 * Renderiza las tarjetas de autos en la lista principal.
 * @method renderAutos
 * @param {Array<Object>} arr - Array de los autos con {id, marca, modelo, tipo, caja, precio}.
 * @return {void}
 */
const renderAutos = (arr) => {
    list.textContent = "";

    arr.forEach(auto => {
        const card = document.createElement("div");
        card.classList.add("card-car");
        const modeloCar = textBase(auto.modelo);
        const scrImage = `../../imagenes/cars/${modeloCar}/main_${modeloCar}.webp`;
        const scrImageHover = `../../imagenes/cars/${modeloCar}/hover_${modeloCar}.webp`;
        let noHover = false;

        card.innerHTML = `
        <a href="../details_page/details.html?id=${auto.id}" class="link-detalle">
            <div class="car-image-container">
            <img src="${scrImage}" alt="${auto.marca} ${auto.modelo}" loading="lazy">
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

        // Hover
        const img = card.querySelector("img");

        img.onerror = () => {
            img.src = "../../imagenes/cars/without_image.webp";
            noHover = true;
        };

        img.onload = () => {
            if (!noHover) {
                card.addEventListener("mouseenter", () => { img.src = scrImageHover; });
                card.addEventListener("mouseleave", () => { img.src = scrImage; });
            }
        };

        list.appendChild(card);
    });
}

/**
 * Ordena los autos según el criterio elegido.
 * @method sortAutos
 * @param {Array<Object>} arr - Lista de autos a ordenar.
 * @param {string} criterion - Criterio de orden ("cheaper", "expensive", "most_recent").
 * @return {Array<Object>} Lista de autos ordenada.
 */
const sortAutos = (arr, criterion) => {
    const v = (criterion || "").toLowerCase();
    const cp = [...arr];

    if (v === "cheaper") cp.sort((a, b) => a.precio - b.precio);
    else if (v === "expensive") cp.sort((a, b) => b.precio - a.precio);
    else cp.sort((a, b) => a.id - b.id);
    return cp;
}

/**
 * Aplica todos los filtros activos y renderiza la lista de autos resultante.
 * @method applyFiltersAndRender
 * @return {void}
 */
const applyFiltersAndRender = () => {
    let filtered = [...autos];

    // Precio
    const minP = getNumeric(fromPriceInput);
    const maxP = getNumeric(toPriceInput);

    if (minP !== null && maxP !== null && minP > maxP) {
        document.getElementById("from-price").classList.add("input-error");
        document.getElementById("to-price").classList.add("input-error");
        document.getElementById("input-error-text").style.display = "block";
        return;
    } else {
        document.getElementById("from-price").classList.remove("input-error");
        document.getElementById("to-price").classList.remove("input-error");
        document.getElementById("input-error-text").style.display = "none";
    }

    if (minP !== null) filtered = filtered.filter(a => a.precio >= minP);
    if (maxP !== null) filtered = filtered.filter(a => a.precio <= maxP);

    const tiposChecked = getCheckedValues("#tipo-filter input[type='checkbox']:checked");
    if (tiposChecked.length) {
        filtered = filtered.filter(a => tiposChecked.includes(a.tipo));
    }

    const marcasChecked = getCheckedValues("#marca-filter input[type='checkbox']:checked");
    if (marcasChecked.length) {
        filtered = filtered.filter(a => marcasChecked.includes(a.marca));
    }

    const cajasChecked = getCheckedValues("#manual:checked, #automatic:checked");
    if (cajasChecked.length) {
        filtered = filtered.filter(a => cajasChecked.includes(a.caja));
    }

    const sorted = sortAutos(filtered, select ? select.value : "most_recent");

    renderAutos(sorted);
    if (clearBtn) clearBtn.classList.toggle("hidden", !isAnyFilterActive());
    if (carsCount) carsCount.textContent = `${sorted.length} autos`;
}

/**
 * Limpia todos los filtros activos.
 * @method clearAllFilters
 * @return {void}
 */
const clearAllFilters = () => {
    if (fromPriceInput) fromPriceInput.value = "";
    if (toPriceInput)   toPriceInput.value   = "";
    document.querySelectorAll('.filters input[type="checkbox"]').forEach(ch => ch.checked = false);
    applyFiltersAndRender();
};

/**
 * Asocia los eventos de los filtros a sus funciones correspondientes.
 * @method initFilterEvents
 * @return {void}
 */
const initFilterEvents = () => {
    document.querySelectorAll(".filters input[type='checkbox']").forEach(inp => {
        inp.addEventListener("change", applyFiltersAndRender);
    });
    [fromPriceInput, toPriceInput].forEach(inp => {
        if (inp) inp.addEventListener("input", applyFiltersAndRender);
    });
    if (select) select.addEventListener("change", applyFiltersAndRender);
    if (clearBtn) clearBtn.addEventListener("click", clearAllFilters);
};

/**
 * Inicializa los filtros de la página de catálogo.
 * Llama a todas las funciones necesarias al cargar la página.
 * @method initCatalogPage
 * @return {void}
 */
const initCatalogPage = () => {
    renderBrandFilter();
    renderSegmentFilter();
    applyURLFilters();
    initFilterEvents();
    applyFiltersAndRender();
};

// -------------------- FORMATOS Y MOBILE --------------------
/**
 * Aplica formato monetario a los inputs de precio mientras el usuario escribe.
 * @method initPriceFormatting
 * @return {void}
 */
const initPriceFormatting = () => {
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
};

/**
 * Abre el panel de filtros en versión mobile.
 * @method openFilters
 * @return {void}
 */
const openFilters = () => {
    const filtros = document.querySelector(".filters");
    const overlay = document.querySelector(".filters-overlay");
    filtros.classList.add("mobile-active");
    overlay.style.display = "block";
};

/**
 * Cierra el panel de filtros (mobile).
 * @method closeFilters
 * @return {void}
 */
const closeFilters = () => {
    const filtros = document.querySelector(".filters");
    const overlay = document.querySelector(".filters-overlay");
    filtros.classList.remove("mobile-active");
    overlay.style.display = "none";
};

/**
 * Inicializa funciones adicionales (formato de precio).
 * @method initExtras
 * @return {void}
 */
const initExtras = () => {
    initPriceFormatting();
};