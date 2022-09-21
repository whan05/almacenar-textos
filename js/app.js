// Variables
const formulario = document.querySelector("#formulario")
const listaTweets = document.querySelector("#lista-tweets")
let tweets = []



// Event Listeners
eventListeners()
function eventListeners() {

    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener("submit", agregarTweet)

    // Cuando el documento esta listo
    document.addEventListener("DOMContentLoaded", () => {
        tweets = JSON.parse(localStorage.getItem("tweets")) || [];

        crearHTML()
    })
}




// Funciones
function agregarTweet(e) {
    e.preventDefault();
    const tweet = document.querySelector("#tweet").value
    if (tweet === "") {

        mostrarMensajeError("Por favor ingrese los datos")

        return;

    }

    const tweetObj = {
        id: Date.now(),
        tweet,
    }

    // Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj]

    console.log(tweets);

    // Una vez agregado creamos el HTML
    crearHTML()

    //Reiniciar el formulario
    formulario.reset()
}

function mostrarMensajeError(mensaje) {
    const error = document.createElement("p");
    error.textContent = mensaje
    error.classList.add("error")
    const contenido = document.querySelector("#contenido")
    contenido.appendChild(error)

    setTimeout(() => {
        error.remove()
    }, 3000);
}

// Muestra el HTML de los tweets
function crearHTML() {

    limpiarHTML()

    if (tweets.length > 0) {
        tweets.forEach( tweet => {

            // Crear boton para eliminar

            const btnEliminar = document.createElement("a");
            btnEliminar.classList.add("borrar-tweet");
            btnEliminar.textContent ="X";

            // Añadir la funcion de Eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id)
            }
            // Crear HTML
            const li = document.createElement("li");
            li.innerText = tweet.tweet;
            // Asignar boton de eliminar al li
            li.appendChild(btnEliminar);
            listaTweets.appendChild(li)

        })
    }

    sincronizarStorage()
}

// Agregar los tweets a Local Storage

function sincronizarStorage() {
    localStorage.setItem("tweets", JSON.stringify(tweets)) 
}

// Eliminar un tweet

function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !==id)

    crearHTML()
}


// Limpiar HTML

function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild)
    }
}

