let palabraSecreta = ""; let arrayOculto = [];
let intentos = 7; let letrasUsadas = [];
let tiempoActual = 60; let cronometro; 

const pantallaMenu = document.getElementById("pantalla-menu");
const pantallaPalabra = document.getElementById("pantalla-palabra");
const pantallaJuego = document.getElementById("pantalla-juego");
const dibujoMenu = document.getElementById("dibujoMenu");

const modalOverlay = document.getElementById("modal-overlay");
const modalCaja = document.getElementById("modal-caja");
const modalTitulo = document.getElementById("modal-titulo");
const modalMensaje = document.getElementById("modal-mensaje");
const modalBoton = document.getElementById("modal-btn");

const sonidoBoton = new Audio("boton-destino.mp3");
const sonidoClick = new Audio("button-click.mp3");
const sonidoAdivinar = new Audio("boton-adivinar.mp3");
const sonidoAmbiente = new Audio("horror-ambiente.mp3");
const sonidoJuego = new Audio("inicia-juego.mp3");
const sonidoLatido = new Audio("unlatido.mp3");
const sonidoRisas = new Audio("risas-satanicas.mp3");
const sonidoBurlon = new Audio("risa-burlona.mp3");
const sonidoGritoEco = new Audio("grito-con-eco.mp3");
const sonidoNo = new Audio("no-no-no.mp3");
const sonidoAhh = new Audio("ahhh.mp3");
const sonidoBooh = new Audio("boooh.mp3");
const sonidoAbismo = new Audio("entrada-al-abismo.mp3");

const iniciaJuego = document.getElementById("iniciaJuego"); 
const btnSistema = document.getElementById("btnSistema");
const diccionario = [
  "WHISKY", "KIWI", "FUGAZ", "MIXTO", "JUZGAR", "YUNQUE", "AÑEJO", "ZURDO", "BIZCOCHO", "YELMO",
  "HALLAZGO", "TORAX", "LUZ", "EXIGIR", "ZIGZAG", "KAYAK", "ALMIZCLE", "ALZHEIMER", "PINZA", "SUBDITO"   
];

const btnAmigo = document.getElementById("btnAmigo");
const btnEmpezar = document.getElementById("btnEmpezar");
const inputPalabra = document.getElementById("inputPalabra");
const lineasPalabra = document.getElementById("lineasPalabra");
const inputLetra = document.getElementById("inputLetra");
const tiempoRestante = document.getElementById("tiempoRestante");
const contadorVidas = document.getElementById("contadorVidas");
const mensajeSistema = document.getElementById("mensajeSistema");
const letrasUsadasTexto = document.getElementById("letrasUsadasTexto");
const btnAdivinar = document.getElementById("btnAdivinar");
const btnReiniciar = document.getElementById("btnReiniciar");

const frasesFallo = ["El verdugo sonríe...", "Siento tu miedo", "Un paso más cerca del abismo", "La cuerda se tensa...",
"Escucho tu respiración...",  "Nadie vendrá a salvarte...", "Tus latidos te delatan...", "El frío abraza tu cuello...", "Tus opciones se agotan...", "Un paso más hacia el vacío..."];
const lienzoAhorcado = document.getElementById("dibujoAhorcado");
const fasesAhorcado = [
  `
  
  
  
  
  
  =========`, // Índice 0: Suelo (7 intentos restantes)
  `
      |
      |
      |
      |
      |
  =========`, // Índice 1: Poste (6 intentos)
  `
  +---+
  |   |
      |
      |
      |
      |
  =========`, // Índice 2: Viga (5 intentos)
  `
  +---+
  |   |
  O   |
      |
      |
      |
  =========`, // Índice 3: Cabeza (4 intentos)
  `
  +---+
  |   |
  O   |
  |   |
      |
      |
  =========`, // Índice 4: Torso (3 intentos)
  `
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
  =========`, // Índice 5: Un brazo (2 intentos)
  `
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
  =========`, // Índice 6: Dos brazos (1 intento)
  `
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
¡ESTÁS CONDENADO!` // Índice 7: Piernas y Mensaje (0 intentos)
];
dibujoMenu.innerText = fasesAhorcado[6];

function mostrarModal(titulo, mensaje, textoBoton, accionBoton) {
 modalTitulo.innerHTML = titulo;
 modalMensaje.innerHTML = mensaje;
 modalBoton.innerText = textoBoton;
 modalOverlay.classList.remove("oculto");
 
 modalBoton.onclick = () => {
  accionBoton();
  sonidoClick.play();
  modalOverlay.classList.add("oculto");
 };
}
mostrarModal(`<span class="texto-terror">Así que... <br>quieres probar tu suerte</span>`, `esperamos que no te arrepientas <br><span class="texto-terror">(aunque sabemos que lo harás)<span>`, "Entrar", () => { 
  sonidoAmbiente.play(); });

function iniciarCronometro() {
cronometro = setInterval(() => {
  tiempoActual--;
  tiempoRestante.innerText = tiempoActual;
  if (tiempoActual <= 10) {
    tiempoRestante.classList.add("latido-corazon");
    sonidoLatido.currentTime = 0;  
    sonidoLatido.play();
    }

  if (tiempoActual === 0) {
    clearInterval(cronometro);
    sonidoAbismo.play();
    sonidoLatido.pause(); 
    lienzoAhorcado.classList.remove("latido-corazon");
    tiempoRestante.classList.remove("latido-corazon");
    tiempoRestante.style.color = "red";
    lienzoAhorcado.innerText = fasesAhorcado[7];
    mostrarModal(`<span class="texto-terror">¡Muy Lento!</span>`, `La soga se ha cerrado por completo... 
    <br>Tu alma ahora nos <span class="texto-terror">pertenece</span>.`, "Aceptar destino", () => { 
    inputLetra.disabled = true;
    btnAdivinar.disabled = true;    
    sonidoRisas.play();
    iniciaJuego.innerText = "¡AHORCADO!";
    btnReiniciar.innerText = "Revivir";
    btnReiniciar.classList.remove("oculto");         
    });    
  }
}, 1000);
}

function prepararMesa() {
  arrayOculto = [];
  intentos = 7;
  iniciaJuego.innerText = "Adivina la palabra, o ¡muere!";
  lienzoAhorcado.innerText = fasesAhorcado[0];
  letrasUsadas = [];
  letrasUsadasTexto.innerHTML = `Letras en el purgatorio: <br>`;  
  tiempoActual = 60;
  tiempoRestante.innerText = tiempoActual;  
  tiempoRestante.classList.remove("latido-corazon");
  sonidoRisas.currentTime = 0;
  sonidoJuego.currentTime = 0;
  iniciarCronometro();
  contadorVidas.innerText = 7;
  contadorVidas.style.color = "green";  
  tiempoRestante.style.color = "#dfdede";

  // Este bucle crea las líneas (Sol = _ _ _)
  for (let i = 0; i < palabraSecreta.length; i++) {
  arrayOculto.push("_");
  }
  lineasPalabra.innerText = arrayOculto.join(" "); // Escribe las líneas en la pantalla
}

// Esto le dice al sistema que cuando se haga click en el botón Sistema, 
// se oculta la pantalla Menú y muestra la pantalla Juego 
btnSistema.addEventListener("click", () => {
  sonidoBoton.currentTime = 0;
  sonidoBoton.play();
  sonidoAmbiente.pause();
  pantallaMenu.classList.add("oculto");
  pantallaJuego.classList.remove("oculto");
  sonidoJuego.play();
  let indiceAleatorio = Math.floor(Math.random() * diccionario.length); // formula matemática que multiplica un número decimal < 1 al azar por el número de palabras en el diccionario (diccionario.length = 20), el resultado es la variable indiceAleatorio. Esto sustituye la forma condicional tradicional que tendría 20 líneas y la vuelve solo 1
  palabraSecreta = diccionario[indiceAleatorio]; // La palabra secreta es la seleccionada en el indiceAleatorio  
  prepararMesa();
});
// Lo mismo, pero aquí se muestra la pantalla palabra
btnAmigo.addEventListener("click", () => {
  sonidoBoton.currentTime = 0;
  sonidoBoton.play();
  sonidoAmbiente.pause();
  pantallaMenu.classList.add("oculto");
  pantallaPalabra.classList.remove("oculto");
});
// Se guarda la palabra escrita y empieza el juego con un amigo
btnEmpezar.addEventListener("click", () => {  
  sonidoAdivinar.play();
  palabraSecreta = inputPalabra.value.toUpperCase(); // toUpperCase convierte todas las letras a Mayusculas a la fuerza
  pantallaPalabra.classList.add("oculto");
  pantallaJuego.classList.remove("oculto");
  sonidoJuego.play();
  console.log("La palabra secreta es: " + palabraSecreta);
  prepararMesa(); 
});
// Dentro del juego, flujo del botón Adivinar
btnAdivinar.addEventListener("click", () => {  
  sonidoAdivinar.currentTime = 0;
  sonidoAdivinar.play();
  let letraAdivinada = inputLetra.value.toUpperCase(); // la letra escrita por el usuario ahora es la variable letraAdivinada
  console.log("El usuario intentó con la letra: " + letraAdivinada); 
  inputLetra.value = ""; // limpia la pizarra 

  if (letraAdivinada === "") { //manejo de error, input vacio 
    alert("¡Escribe una letra antes de sellar tu destino!");
    return;
  }

  if (letrasUsadas.includes(letraAdivinada)) { // manejo de error, input repetido
    alert("¿Los nervios no te deja pensar?, ya usaste esa letra");
    return;
  }
  letrasUsadas.push(letraAdivinada);
  letrasUsadasTexto.innerHTML = `Letras en el purgatorio: <br>` + letrasUsadas.map(letra => {
    if (palabraSecreta.includes(letra)) {
        return `<span class="letra-acertada">${letra}</span>`;
    } else {
        return `<span class="letra-erronea">${letra}</span>`;
    }
  }).join(" - ");
  
  let huboAcierto = false; // nuestra bandera
// Pasa por cada letra de la palabraSecreta y lo compara con la letra escrita (letraAdivinada)
  for (let i = 0; i < palabraSecreta.length; i++) {
  if (palabraSecreta[i] === letraAdivinada) {
    arrayOculto[i] = letraAdivinada; // Va a la cajita de los guiones bajos (arrayOculto), y en la MISMA posición [i] donde acaba de encontrar la coincidencia, cambia lo que haya ahí por la letra que tecleó el jugador
    huboAcierto = true;
  }
  }
  console.log("El array quedó así: " + arrayOculto);
  lineasPalabra.innerText = arrayOculto.join(" "); // Sustituye el arrayOculto (los guiones bajos) por las letras del usuario en la pantalla, join se encarga de la estética del texto.
  if (huboAcierto === true) {    
    console.log("¡Correcto! La letra " + letraAdivinada + " sí está.");
    } else {
    console.log("Fallo. La letra " + letraAdivinada + " NO está.");
    intentos--; // Le resta 1 intento, es igual que escribir: intentos = intentos - 1
    pantallaJuego.classList.add("pantalla-temblando");
    setTimeout(() => {pantallaJuego.classList.remove("pantalla-temblando"); }, 200);
    if ("vibrate" in navigator) {
      navigator.vibrate([40, 40, 40, 40, 40, 40, 40, 40, 40]);
    }
    contadorVidas.innerText = intentos; // A medida que se van restando los intentos se va actualizando el contador de vidas en la pantalla
    // A medida que se actualiza el contador de vidas este cambia de color
    if (intentos > 4) {
      contadorVidas.style.color = "green";
    } else if (intentos > 2) {
      contadorVidas.style.color = "orange";
    } else {
      contadorVidas.style.color = "red";
    }
    lienzoAhorcado.innerText = fasesAhorcado[7 - intentos]; // Hermosa formula matemática que resume un código condicional largo a una sola línea, muestra el una parte del dibujo cada vez que se le da al botón Adivinar
    // Formula matemática que elige al azar una frase de la variable frasesFallo y la introduce en la nueva variable
    let indiceFrase = Math.floor(Math.random() * frasesFallo.length); 
    mensajeSistema.innerText = frasesFallo[indiceFrase]; // La frase elegida se escribe el <p id"mensajeSistema><p>
    mensajeSistema.classList.add("mostrar-mensaje"); // mostrar-mensaje se encuentra en CSS y es el que hace que el texto aparezca y desaparezca de forma progresiva
    setTimeout(() => {mensajeSistema.classList.remove("mostrar-mensaje"); }, 2000);
    // Cuando queda 1 solo intento el botón Adivinar cambia su nombre
    if (intentos === 1) {
      btnAdivinar.innerText = "Sellar Destino";
      lienzoAhorcado.classList.add("latido-corazon");
      }
    // Cuando el jugador pierde, lo anuncia, bloque las opciones y muestra nuevo botón con nombre personalizado
    if (intentos === 0) {
      sonidoJuego.pause();
      sonidoLatido.pause();
      clearInterval(cronometro);
      lienzoAhorcado.classList.remove("latido-corazon"); 
      sonidoAbismo.play();
      mostrarModal(`<span class ="texto-terror">Descansa en Paz</span>`, `Es un decir,<span class ="texto-terror"><br>aquí no encontrarás paz</span>`, "Aceptar", () => {  
      inputLetra.disabled = true;      
      btnAdivinar.disabled = true;        
      sonidoRisas.play();
      iniciaJuego.innerText = "¡AHORCADO!";
      btnReiniciar.innerText = "Revivir";
      btnReiniciar.classList.remove("oculto");               
      });      
    }
    }
    // Si se acaban los guiones bajos el jugador gana
    if (arrayOculto.includes("_") === false) {
      sonidoJuego.pause();
      sonidoAhh.play();      
      clearInterval(cronometro);
      lienzoAhorcado.classList.remove("latido-corazon");
      lienzoAhorcado.innerText = `
      +---+
      |   |
          |
      O   |
     /|\\  |
     / \\  |
    =========`;
      mostrarModal("Te has salvado", `<span class="texto-terror">¡por esta vez!</span> <br>digo, ¿quieres jugar de nuevo?`, "Aceptar", () => {
      inputLetra.disabled = true;
      btnAdivinar.disabled = true;
      sonidoBooh.play();
      iniciaJuego.innerText = "¡Te has salvado!";        
      btnReiniciar.innerText = "¿Quién dijo miedo?";
      btnReiniciar.classList.remove("oculto");        
      });
    }
});

btnReiniciar.addEventListener("click", () => {
  sonidoBoton.play();
  sonidoAmbiente.play();
  sonidoRisas.pause(); sonidoRisas.currentTime = 0;
  pantallaJuego.classList.add("oculto");
  btnReiniciar.classList.add("oculto");
  pantallaMenu.classList.remove("oculto");
  inputPalabra.value = ""; 
  inputLetra.disabled = false;
  btnAdivinar.disabled = false;
  btnAdivinar.innerText = "Adivinar";  

  if (btnReiniciar.innerText === "¿Quién dijo miedo?") {
    sonidoBurlon.play();
  } else {
    sonidoGritoEco.play();
  }
});