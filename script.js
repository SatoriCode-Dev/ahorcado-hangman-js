let palabraSecreta = "";
let arrayOculto = [];
let intentos = 7;

const pantallaMenu = document.getElementById("pantalla-menu");
const pantallaPalabra = document.getElementById("pantalla-palabra");
const pantallaJuego = document.getElementById("pantalla-juego");

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
const btnAdivinar = document.getElementById("btnAdivinar");
const btnReiniciar = document.getElementById("btnReiniciar");

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
      |
      |
      |
      |
      |
  =========`, // Índice 2: Viga (5 intentos)
  `
  +---+
  O   |
      |
      |
      |
      |
  =========`, // Índice 3: Cabeza (4 intentos)
  `
  +---+
  O   |
  |   |
      |
      |
      |
  =========`, // Índice 4: Torso (3 intentos)
  `
  +---+
  O   |
 /|\\  |
      |
      |
      |
  =========`, // Índice 5: Un brazo (2 intentos)
  `
  +---+
  O   |
 /|\\  |
 / \\  |
      |
      |
  =========`, // Índice 6: Dos brazos (1 intento)
  `
  +---+
  O   |
 /|\\  |
 / \\  |
      |
      |
¡ESTÁS CONDENADO!` // Índice 7: Piernas y Mensaje (0 intentos)
];

function prepararMesa() {
  arrayOculto = [];
  intentos = 7;
  lienzoAhorcado.innerText = fasesAhorcado[0];

  // Este bucle crea las líneas (Sol = _ _ _)
  for (let i = 0; i < palabraSecreta.length; i++) {
  arrayOculto.push("_");
  }
  lineasPalabra.innerText = arrayOculto.join(" "); // Escribe las líneas en la pantalla
}

// Esto le dice al sistema que cuando se haga click en el botón Sistema, 
// se oculta la pantalla Menú y muestra la pantalla Juego 
btnSistema.addEventListener("click", () => {
  pantallaMenu.classList.add("oculto");
  pantallaJuego.classList.remove("oculto");
  let indiceAleatorio = Math.floor(Math.random() * diccionario.length); // formula matemática que multiplica un número decimal < 1 al azar por el número de palabras en el diccionario (diccionario.length = 20), el resultado es la variable indiceAleatorio. Esto sustituye la forma condicional tradicional que tendría 20 líneas y la vuelve solo 1
  palabraSecreta = diccionario[indiceAleatorio]; // La palabra secreta es la seleccionada en el indiceAleatorio  
  prepararMesa();
});
// Lo mismo, pero aquí se muestra la pantalla palabra
btnAmigo.addEventListener("click", () => {
  pantallaMenu.classList.add("oculto");
  pantallaPalabra.classList.remove("oculto");
});
// Se guarda la palabra escrita y empieza el juego con un amigo
btnEmpezar.addEventListener("click", () => {
  palabraSecreta = inputPalabra.value.toUpperCase(); // toUpperCase convierte todas las letras a Mayusculas a la fuerza
  pantallaPalabra.classList.add("oculto");
  pantallaJuego.classList.remove("oculto");
  console.log("La palabra secreta es: " + palabraSecreta);
  prepararMesa(); 
});
// Dentro del juego, flujo del botón Adivinar
btnAdivinar.addEventListener("click", () => { 
  let letraAdivinada = inputLetra.value.toUpperCase(); // la letra escrita por el usuario ahora es la variable letraAdivinada
  console.log("El usuario intentó con la letra: " + letraAdivinada);
  inputLetra.value = ""; // limpia la pizarra

  if (letraAdivinada === "") { //manejo de error
        alert("¡Escribe una letra antes de sellar tu destino!");
        return;
    }
  
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
    lienzoAhorcado.innerText = fasesAhorcado[7 - intentos]; // Hermosa formula matemática que resume un código condicional largo a una sola línea, muestra el una parte del dibujo cada vez que se le da al botón Adivinar
    // Cuando queda 1 solo intento el botón Adivinar cambia su nombre
    if (intentos === 1) {
      btnAdivinar.innerText = "Sellar Destino";
    }
    // Cuando el jugador pierde, lo anuncia, bloque las opciones y muestra nuevo botón
    if (intentos === 0) {
      alert("¡Has sellado TU DESTINO!");
      inputLetra.disabled = true;
      btnAdivinar.disabled = true;
      btnReiniciar.innerText = "Revivir";
      btnReiniciar.classList.remove("oculto");
    }
    }
    // Si se acaban los guiones bajos el jugador gana
    if (arrayOculto.includes("_") === false) {
      alert("te has salvado, ¡por esta vez!... ¿quieres jugar otra vez?");
      inputLetra.disabled = true;
      btnAdivinar.disabled = true;
      btnReiniciar.innerText = "¿Quién dijo miedo?";
      btnReiniciar.classList.remove("oculto");
    }
});

btnReiniciar.addEventListener("click", () => {
  pantallaJuego.classList.add("oculto");
  btnReiniciar.classList.add("oculto");
  pantallaMenu.classList.remove("oculto");
  inputPalabra.value = ""; 
  inputLetra.disabled = false;
  btnAdivinar.disabled = false;
  btnAdivinar.innerText = "Adivinar";  
});