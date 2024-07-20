const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.todos');
const btnJavascript = document.querySelector('.javascript');
const btnPasta = document.querySelector('.pasta');
const btnPizza = document.querySelector('.pizza');
const btnPostre = document.querySelector('.postre');

const contenedorProyectos = document.querySelector('.proyectos');

document.addEventListener('DOMContentLoaded', () => {
    eventos();
    proyectos();
});


const eventos = () => {
    menu.addEventListener('click',abrirMenu);
}

const abrirMenu = () => {
    navegacion.classList.remove('ocultar')
    botonCerrar();
}

const botonCerrar = () => {
    const btnCerrar = document.createElement('p');
    const overlay = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const body = document.querySelector('body');

    if(document.querySelectorAll('.pantalla-completa').length > 0) return;

    body.appendChild(overlay);
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-cerrar');

    while(navegacion.children[5]){
        navegacion.removeChild(navegacion.children[5]);
    }
    navegacion.appendChild(btnCerrar);
    cerrarMenu(btnCerrar,overlay);
}

const cerrarMenu = (boton,overlay) => {
    const enlaces = navegacion.querySelectorAll('a');

    boton.addEventListener('click', () => {
        navegacion.classList.add('ocultar');
        overlay.remove();
    });

    overlay.onclick = function() {
        overlay.remove();
        navegacion.classList.add('ocultar')
    }

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', () => {
            navegacion.classList.add('ocultar');
            overlay.remove();
        });
    });
}

const observer = new IntersectionObserver((entries, observer) =>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            const imagen = entry.target;
            imagen.src = imagen.dataset.src;
            observer.unobserve(imagen);
        }
    });
});

imagenes.forEach(imagen=> {
    observer.observe(imagen);
});


// Filtro de lenguajes

const proyectos = () => {
    let proyectosArreglo = [];
    const proyectos = document.querySelectorAll('.proyecto');

    proyectos.forEach(proyecto => proyectosArreglo.push(proyecto));

    const javascript = proyectosArreglo.filter(javascript => javascript.getAttribute('data-lenguaje') === 'javascript');

    const pastas = proyectosArreglo.filter(pasta => pasta.getAttribute('data-platillo') === 'pasta');

    const pizzas = proyectosArreglo.filter(pizza => pizza.getAttribute('data-platillo') === 'pizza');

    const postres = proyectosArreglo.filter(postre => postre.getAttribute('data-platillo') === 'postre');


    mostrarProyectos(javascript, pastas, pizzas, postres, proyectosArreglo);
};

const mostrarProyectos = (javascript, pastas, pizzas, postre, todos) => {

    btnTodos.addEventListener('click', () => {
        limpiarHtml(contenedorProyectos);
        todos.forEach(todo => contenedorProyectos.appendChild(todo));
    });
    
    btnJavascript.addEventListener('click', () => {
        limpiarHtml(contenedorProyectos);
        javascript.forEach(js => contenedorProyectos.appendChild(js));
    });

    btnPasta.addEventListener('click', () => {
        limpiarHtml(contenedorProyectos);
        pastas.forEach(pasta => contenedorProyectos.appendChild(pasta));
    });

    btnPizza.addEventListener('click', () => {
        limpiarHtml(contenedorProyectos);
        pizzas.forEach(pizza => contenedorProyectos.appendChild(pizza));
    });

    btnPostre.addEventListener('click', () => {
        limpiarHtml(contenedorProyectos);
        postre.forEach(postre => contenedorProyectos.appendChild(postre));
    });
}
    

const limpiarHtml = (contenedor) => {
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}