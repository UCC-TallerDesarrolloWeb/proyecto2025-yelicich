# Proyecto 2025 – Taller de Desarrollo Web

Estructura de Proyecto Taller de Desarrollo Web - 2025  

---

## Índice
- [Titulo del proyecto](#titulo-del-proyecto)
- [Autor](#autor)
- [Link gh-pages](#link-de-gh-pages)
- [Contenido de la pagina](#contenido-de-la-pagina)
- [Listado de tecnologias](#listado-de-tecnologias-usadas)

---

## Título del proyecto
**YeliMotors** – Página web de un concesionario de autos 0km en Argentina.  
El sitio incluye catálogo dinámico, página de detalles con configurador de compra y un carrusel de vehículos destacados.

---

## Link de gh-pages
🔗 [YeliMotors en GitHub Pages](https://...) <!-- TODO -->

---

## Contenido de la pagina
| Página | Secciones | Descripción |
|--------|-----------|-------------|
| **Inicio** (`index.html`) | Header | Logo y navegación principal con links a Importaciones, Servicios, Contacto y Catálogo. |
| | Hero | Mensaje principal con botón al catálogo. |
| | Vehículos destacados | Carrusel de autos destacados con links a detalles. |
| | Marcas | Listado dinámico para explorar autos por marca. |
| | Segmentos | Listado dinámico por tipo de vehículo. |
| | Testimonios | Opiniones de clientes en carrusel. |
| | Newsletter | Formulario de suscripción con email. |
| | Footer | Links legales, enlaces adicionales y redes sociales. |
| **Catálogo** (`catalog.html`) | Header | Igual al de inicio. |
| | Breadcrumb | Ruta de navegación Inicio > Catálogo. |
| | Catálogo de vehículos | Listado dinámico de autos con tarjetas. |
| | Filtros | Por precio, transmisión, segmento y marca. |
| | Footer | Igual al de inicio. |
| **Detalles** (`details.html`) | Header | Igual al de inicio. |
| | Breadcrumb | Ruta de navegación Inicio > Catálogo > Detalles. |
| | Imágenes del auto | Imagen principal y miniaturas dinámicas. |
| | Descripción | Características, motor y seguridad. |
| | Info del auto | Nombre, tipo, precio, impuestos, concesionario y botones de acción. |
| | Vehículos similares | Cards con autos relacionados. |
| | Modal de compra | Configurador con color, rines, método de pago, cuotas y resumen dinámico. |
| | Footer | Igual al de inicio. |


---

## Tecnologias usadas
- **HTML5** → estructura semántica de las páginas (header, nav, main, section, footer, etc.).  
- **CSS3** → estilos, diseño responsive, carruseles, modal de compra, layout con flexbox y grid.  
- **JavaScript (ES6)** → funcionalidad dinámica: renderizado de autos, filtros, validaciones, simulador de pago, carruseles y modales.  
- **Figma** → prototipado de interfaces: sketch y wireframe en desktop y mobile.  
- **Git & GitHub** → control de versiones, repositorio del proyecto y despliegue con GitHub Pages.  
- **Google Fonts** → tipografía personalizada (Quicksand).  
- **Material Icons** → iconos para mejorar la interfaz.  

---

## Requisitos del Primer Parcial

### Sobre el Sketch
- [X] Versión Desktop y Mobile
- [X] Guardado en formato PNG, JPG ó PDF
- [X] Dentro de una carpeta llamada "Sketch"
- [ ] En el diseño tener en cuenta los mensajes de error para el usuario

Tener en cuenta:
* ¿Qué opciones debe ofrecer al usuario?
* ¿Qué campos hay para ingresar datos?
* Benchmarking: Investigar sistemas similares
* ¿Qué acciones le permiten al usuario realizar?
* Mensajes de Error

### Sobre el Wireframe/Mockup
- [X] Dibujado con algún programa como: Figma, AdobeXD, Canvas, Draw.io en Drive, Pencil Project, Mockups, NinjaMock, o similares.
- [ ] Diseño de Mensajes de error para el usuario
- [X] Versión Desktop y Mobile
- [X] Guardado en formato PNG, JPG ó PDF
- [X] Dentro de una carpeta llamada "Wireframe" ó "Mockup"

### Sobre el Repositorio
- [X] El proyecto debe estar subido al repositorio adecuado "Proyecto2025-ApellidoAlumno1-ApellidoAlumno2"
- [ ] Modificar el Readme.MD y colocar información del proyecto/página (mínimamente: título del proyecto, autores con nombre y apellido, link de gh-pages, contenido de la página,  listado de tecnologías usadas, etc)
- [ ] En el **readme.md** se debe emplear Markdown y aplicar negrita, titulo de orden 1, 2 y 3, link, items, tabla, index a cada sección
- [ ] El código debe estar pusheado en el repositorio (emplear gh-pages ó publicar la página desde el main), y no debe haber diferencias entre **main** y **gh-pages** (verificar de realizar el Merge).
- [ ] Publicar la Web empleando GitHubPages
- [ ] El repositorio no debe contener archivos innecesarios (no debe contener .idea o .vsc ni .DS_Store, en todo caso emplear **.gitignore**)

### Sobre el Proyecto General
- [X] La página principal debe llamarse index
- [X] NO está permitido descargar un TEMPLATE (diseño 100% desde cero)
- [X] La estructura del proyecto debe ser adecuada
      - Crear una carpeta para las imágenes
      - Carpeta para los sketch
      - Carpeta para los mockups/Wireframes
- [ ] La estructura del proyecto debe ser adecuada
      En una segunda etapa, al emplear **React**:
      - Carpeta de Componentes
      - Carpeta de Pages
      - Carpeta de Styles
- [ ] Identar correctamente el código (en Webstorm Ctrl+Alt+L)
- [ ] No debe haber errores presentes (realizar *Code* > *Inspect Code* para verificar que no haya errores)
- [X] Se debe emplear algún favicon
- [X] Emplear alguna fuente de google fonts o subir al proyecto alguna fuente externa
- [X] Debe haber navegación entre todas las páginas
- [ ] No debe haber errores de ortografía en el contenido visual
- [X] "Lorem ipsum" es sólo válido para los prototipos, NO para la página

### Sobre el HTML
- [ ] Todas las etiquetas deben estar en minúscula
- [ ] Poner comillas a todos los atributos
- [X] Title debe contener el título de la página
- [X] En el ```<head></head>``` incluir las etiquetas ```<meta>``` detallando: autor, descripcion y palabras clave
- [X] Emplear al menos 3 etiquetas semánticas diferentes (header, nav, aside, main, section, article, footer)
- [X] Emplear ```<header></header>```. En el contenido de la cabecera debe haber un título ```<h1></h1>```, puede tener color de fondo, algún logotipo, etc.
- [X] Debe haber por lo menos una etiqueta ```<img>``` en la página.
- [X] La estructura de la página debe estar definida con ```<div></div>```
- [ ] Debe contener al menos 3 elementos de tipo ```<input>``` o ```<select>``` ó ```<button>``` que le permitan al usuario ingresar valores para poder realizar un cálculo de un ejercicio.
- [X] Emplear el atributo [**placeholder**](U2_HTML_avanzado.html#/19) (mínimamente en 1 input)
- [X] Emplear el atributo **size** para que el tamaño de los inputs sea prolijo
- [X] Emplear el atributo **maxlength** para que el usurario no pueda ingresar valores "muy grandes"
- [X] No espaciar con excesivos ```<br>```. Utilizar márgenes, paddings, etc.
- [ ] La anidación de etiquetas HTML debe ser correcta.
- [X] No utilizar etiquetas deprecadas.
- [ ] Todas las etiquetas deben estar correctamente cerradas
- [X] Los ids de los elementos deben ser unívocos

### Sobre las imágenes
- [X] Debe contener por lo menos una etiqueta ```<img>``` en la página.
- [X] Todas las imágenes deben ser incluidas en el repositorio dentro de una carpeta llamada **imagenes** (salvo que sean demasiado pesadas. En ese caso, se puede emplear un servidor externo).
- [X] No se deben subir videos en el repositorio (excepto que sean MUY livianos).
- [ ] Toda imagen debe tener su atributo alt
- [X] Las imágenes deben poseer un nombre representativo 

### Sobre el CSS
- [X] El estilo de los elementos debe establecerse en un archivo CSS (prohibido poner el atributo style a los elementos o emplear estilos incrustados).
- [X] El CSS debe contar mínimo con un tipo de cada forma (por Tag, por ID y por clase).
- [X] Se debe emplear pseudoclase
- [ ] No emplear !important
- [X] El diseño de la página debe ser consistente
- [ ] En la primera etapa debe existir un único archivo CSS (se debe evitar código duplicado. Se debe aplicar re-utilización de código/estilos)

### Sobre Accesibilidad:
- [ ] Toda imagen debe tener su etiqueta alt
- [ ] Todo ```<input>``` o ```<select>``` debe tener su ```<label>```
- [ ] Los labels deben contener el atributo **for** (el for debe contener el id del input al cual se referencia) 
- [ ] Si hay una tabla en la página, debe contener ```<caption></caption>```

### Sobre la funcionalidad JavaScript
Se debe agregar funcionalidad Js a la página HTML+CSS desarrollada
- [ ] Una función que compruebe si los valores ingresados son correctos, y si no lo son, que le indique al usuario por un alert o dialog, y que blanquee el contenido del campo.
- [X] Una función que calcule/muestre algo en base a los valores ingresados por el usuario en los inputs.
- [X] El código Js debe estar en un archivo externo
- [ ] Se debe emplear var, let o const según corresponda para mayor eficiencia
- [ ] No deben existir funciones innecesarias que no se llamen en ninguna sección del código
- [ ] Las funciones deben estar escritas cómo **función flecha**
- [ ] No debe haber errores JavaScript presentes (F12 > Consola)
- [X] El funcionamiento de la página debe ser consistente.

### Sobre la documentación
- [ ] TODAS las funciones javaScript deben estar comentadas adecuadamente. [JsDoc](https://jsdoc.app/about-getting-started.html)
   ```/**
     * Descripción de que hace la función
     * @method Nombre de la función
     * @param {string} ParámetroA - Explicación de que valor almacena ParámetroA
     * @param {number} ParámetroB - Explicación de que valor almacena ParámetroB
     * @return Valor que retorna
     */
   ```

### Testing 

- Es sumamente IMPORTANTE probar el funcionamiento de la página con diferentes valores.
- ¿Qué pasa si presiono calcular sin ingresar nada?
- ¿Y si ingreso solo algunos campos? ¿Y si ingreso todo cero? ¿Y si ingreso letras? ¿Y si ingreso números negativos?
- ¿Si vacío el carrito de compras?¿Si recargo la página?
- Prueba todas las situaciones posibles, no te quedes solo con el **happy path**.

### Sobre las correcciones
* Se corregirá el proyecto con el último commit realizado en Github hasta las 23:59 del día anterior a la fecha de entrega
* Las notas serán de la siguiente manera: (Por ejemplo 55% 4; 59% 5; 67% 6; 75% 7; 82% 8; 89% 9; 97% 10)
* Todas los errores o la falta de cumplimiento de los requisitos serán reportados a través de la plataforma de GitHub, en la pestaña de ISSUES

| Items a Evaluar    | %   |
|--------------------|-----|
| Prototipo en papel | 7%  |
| Prototipo Mockup   | 8%  |
| HTML+CSS+Js        | 85% |

Por cada corrección o defecto en el HTML+CSS+Js se descontará un 5% del 85%.





## Requisitos del Segundo Parcial

### Sobre React
- [ ] Se debe emplear **Vite** para instalar **React**
- [ ] Se debe emplear **Hooks**, useState, useEffect, useContext, useNavigate
- [ ] Se debe emplear **react-router-dom** para el enrutamiento a otras páginas
- [ ] Se debe emplear **outlet** para que un componente principal renderice componentes de rutas hijas.
- [ ] La estructura del proyecto (carpetas) debe ser el correcto: components, pages, styles
- [ ] Los **imports** deben ser usando con **alias**
- [ ] Validaciones en tiempo real con onChange + mensajes de error accesibles.
- [ ] Crear al menos un componente genérico (ej: Button, Card, Input) y reutilizarlo en varias páginas.
- [ ] Guardar algún dato en localStorage (ej: preferencias de tema o un carrito de compras).
- [ ] En caso de tener backend, emplear **fetch**
- [ ] En caso de no contar con un servicio que nos provea la información necesaria, la misma debe ser leída en formato tipo Json local y renderizar listas dinámicas. Ejemplo:
````javascript
const activities = [
  {
    nombre: "taekwondo",
    descripcion: "Arte marcial coreana",
    horarios: [
      { dia: 2, "hora-inicio": "18:30", "hora-fin": "20:00" },
      { dia: 4, "hora-inicio": "18:30", "hora-fin": "20:00" }
    ]
  },
  {
    nombre: "zumba",
    
    descripcion: "ritmos latinos",
    horarios: [
      { dia: 1, "hora-inicio": "19:30", "hora-fin": "20:30" },
      { dia: 3, "hora-inicio": "19:30", "hora-fin": "20:30" }
    ]
  }
];
````

### Sobre las Correcciones
- [ ] Todas las correcciones y mejoras (sugerencias) solicitadas durante el primer parcial deben estar corregidas.
- [ ] No debe haber errores presentes en el código (realizar *Code* > *Inspect Code* para verificar que no haya errores)
- [ ] Se corregirá el proyecto con el último commit realizado en Github hasta las 23:59 del día anterior a la fecha de entrega
- [ ] Las notas serán de la siguiente manera: (Por ejemplo 55% 4; 59% 5; 67% 6; 75% 7; 82% 8; 89% 9; 97% 10)
- Las sugerencias sobre el HTML, CSS y Js realizadas en el anterior parcial dejen ser corregidas.

| Items a Evaluar                          | %   |
|------------------------------------------|-----|
| Estructura del Proyecto                  | 10% |
| Navegación con react-router-dom          | 15% |
| Uso correcto de Hooks                    | 20% |
| Renderizado dinámico de datos            | 25% |
| Validaciones y mensajes de error         | 10% |
| Consistencia del diseño y uso de estilos | 10% |
| Código limpio y sin errores en consola   | 10% |

## Requisitos del FINAL
- [ ] Todas las correcciones y mejoras solicitadas durante el primer y segundo parcial deben estar corregidas.
- [ ] No debe haber errores presentes en el código (realizar Code > Inspect Code para verificar que no haya errores)
- [ ] No debe haber errores JavaScript presentes (F12 > Consola)
- [ ] Debe cumplir con TODOS los requisitos del 1er y 2do Parcial (si se agrego código nuevo en Js, se debe documentar, si hay nuevos inputs de html deben contener su label, etc)
- [ ] Incluir al menos 5 tests con Jest + React Testing Library (ejemplo: que un botón renderice un texto esperado).
