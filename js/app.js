const botonAdd = document.querySelectorAll('.agregar-carrito');
const padreCarro = document.getElementById('lista-carrito');
const Carro = padreCarro.querySelector('tbody');
const vaciarCarro = document.getElementById('vaciar-carrito');
const tarjetas = document.getElementsByClassName('card')

let carrito = []

let borrarCurso;


//Añadir productos al carrito
const agregarCarrito = (prodPadre) => {  
    console.log(prodPadre)  
    const infoCurso = {
        imagen: prodPadre.querySelector('img').src,
        titulo: prodPadre.querySelector('h4').textContent,
        precio: prodPadre.querySelector('.precio span').textContent,
        id: prodPadre.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    if(carrito.some(curso => curso.id === infoCurso.id)){
        const cursos = carrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        })
        carrito = [...cursos];
    }else{
        carrito = [...carrito, infoCurso]; 
    }
   renderCarrito();
}

//Con este metodo guardo y muestro los elemntos seleccionados en el carrito 
const renderCarrito = () => {
    Carro.innerHTML = '';
    carrito.forEach((curso) => { 
        Carro.innerHTML += `
        <tr>
            <td><img src="${curso.imagen}" width="100"></td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td><a href="#" id="borrar-curso" data-id="${curso.id}" class="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center borrar-curso">X</a></td>
        </tr> `
    })
    
}

//Accion que desemboca en el funcionamiento del boton AÑADIR
botonAdd.forEach((botonAdd) => { 
    botonAdd.addEventListener('click', () => {
        const cursoId = botonAdd.getAttribute('data-id');
        if(carrito.some(curso => curso.id === cursoId)){
            console.log('existe');
            carrito = carrito.map(curso => {
                curso.cantidad++;
                return curso;
            }) 
            renderCarrito();
        }else{
        const curso = document.querySelector(`[data-id="${cursoId}"]`);
        const prodPadre = curso.parentElement.parentElement;
        agregarCarrito(prodPadre);
       
    }
})
})

//Accion que desemboca en el funcionamiento del boton BORRAR
Carro.addEventListener('click', (e) => { 
    carrito = carrito.filter(curso => curso.id !== e.target.getAttribute('data-id'));
    renderCarrito();
})

//Accion que desemboca en el funcionamiento del boton VACIAR
vaciarCarro.addEventListener('click', () => { 
    carrito = [];
    renderCarrito();
})