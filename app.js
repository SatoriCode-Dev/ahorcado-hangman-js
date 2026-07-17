// =================================
//        MÁQUINA DE ESTADOS
// =================================
const ESTADO_JUEGO = Object.freeze({
    BIENVENIDA: "BIENVENIDA",
    MENU: "MENU",
    CONFIGURACION: "CONFIGURACION",
    INGRESO_PALABRA: "INGRESO_PALABRA",
    JUGANDO: "JUGANDO",
    PAUSA_MODAL: "PAUSA_MODAL",
    TERMINADO: "TERMINADO",
    VICTORIA: "VICTORIA",
    DERROTA: "DERROTA"
});

// 2. DEPARTAMENTO DE AUDIO (AudioController)
class ControladorAudio {
    constructor() {
        this.ambiente = new Audio("audios/horror-ambiente.mp3");
        this.latido = new Audio("audios/unLatido.mp3");
        this.ahhh = new Audio("audios/ahhh.mp3");
        this.boooh = new Audio("audios/boooh.mp3");
        this.aAdivinar = new Audio("audios/boton-adivinar.mp3");
        this.aDestino = new Audio("audios/boton-destino.mp3");
        this.aClick = new Audio("audios/button-click.mp3");
        this.gritoEco = new Audio("audios/grito-con-eco.mp3");
        this.iniciaJuego = new Audio("audios/inicia-juego.mp3");
        this.muahaha = new Audio("audios/muahaha-evil.mp3");
        this.risaBurlona = new Audio("audios/risa-burlona.mp3");
        this.risasSatanicas = new Audio("audios/risas-satanicas.mp3");
        
        this.ambiente.loop = false;
        this.latido.loop = true;
        this.musicaActiva = true;
        this.sfxActivos = true;
        
        // Diccionario dinámico de sonidos
        this.catalogo = {
            "derrota": this.risasSatanicas,
            "victoria1": this.boooh,
            "victoria2": this.ahhh,
            "click": this.aClick,
            "destino": this.aDestino,
            "adivinar": this.aAdivinar,
            "burla": this.risaBurlona,
            "risa": this.muahaha,
            "grito": this.gritoEco,
            "latido": this.latido
        };
    }
    
    iniciarMusica() {
        if (this.musicaActiva && this.ambiente.paused) {
            this.ambiente.currentTime = 0;
            this.ambiente.play();
        }        
    }
    
    detenerMusica() {
        this.ambiente.pause();
        this.iniciaJuego.pause();
    }
    
    iniciarJuego() {
        if (this.musicaActiva) {
        this.iniciaJuego.currentTime = 0;
        this.iniciaJuego.play();
        this.ambiente.pause();
        }
    }    
    // MÉTODO MAESTRO DE EFECTOS ESPECIALES
    reproducir(efecto) {
        if (!this.sfxActivos || !this.catalogo[efecto]) return; // Guardia de seguridad                
        this.catalogo[efecto].currentTime = 0;
        this.catalogo[efecto].play();        
    }
    // MÉTODO MAESTRO PARA SILENCIAR EFECTOS
    detener(efecto) {
        if (this.catalogo[efecto]) {
            this.catalogo[efecto].pause();
            this.catalogo[efecto].currentTime = 0;
        }
    }
}

// 5. DEPARTAMENTO DE PREFERENCIAS
class Configuracion {
    constructor(controladorAudio, herramientaUI) {
        this.audio = controladorAudio; // Recibe el control del audio
        this.ui = herramientaUI;
        
        // 1. Atrapar sus propios botones del DOM
        this.btnMusica = document.getElementById("btnToggleMusica");
        this.btnSfx = document.getElementById("btnToggleSfx");
        // 2. Atrapamos los botones en un Array (Lista) ---
        this.botonesTurnos = [
            document.getElementById("btnTurno10"),
            document.getElementById("btnTurno9"),
            document.getElementById("btnTurno8"),
            document.getElementById("btnTurno7")
        ];
        // 3. Atrapamos los botones del cronómetro en una lista
        this.botonesTiempo = [
            document.getElementById("btnTiempoOff"),
            document.getElementById("btnTiempo3"),
            document.getElementById("btnTiempo2"),
            document.getElementById("btnTiempo1")
        ];
        // 4. Atrapamos los botones de idioma del HTML
        this.btnLangEs = document.getElementById("btnLangEs");
        this.btnLangEn = document.getElementById("btnLangEn");
        // --- AUTO-DETECCIÓN DE IDIOMA ---
        // Extraemos las primeras dos letras del idioma del dispositivo (ej. "es" de "es-EC" o "en" de "en-US")
        const idiomaNativo = navigator.language.slice(0, 2); 
        const idiomaPorDefecto = (idiomaNativo === "es") ? "es" : "en";
        // 5. Cargar memoria (localStorage) o usar valores por defecto        
        this.estado = JSON.parse(localStorage.getItem("ahorcado_config")) || {musica: true, sfx: true, turnos: 10, tiempo: 0, idioma: idiomaPorDefecto
        }; 
        // --- PARCHES DE SEGURIDAD PARA MEMORIAS VIEJAS ---
        if (this.estado.turnos === undefined) this.estado.turnos = 10;
        if (this.estado.tiempo === undefined) this.estado.tiempo = 0;
        if (this.estado.idioma === undefined) this.estado.idioma = idiomaPorDefecto;  
		if (this.estado.skin === undefined) this.estado.skin = "ascii";
        this.guardarMemoria(); // Guardamos los datos actualizados
        // 5. Inicializar la pantalla y mandar las órdenes
        this.aplicarConfiguracion();        
        // 6. Encender los "escuchadores" de clics
        this.asignarEventos();
    }    
    // Método para guardar en la memoria del navegador
    guardarMemoria() {
        localStorage.setItem("ahorcado_config", JSON.stringify(this.estado));
    }    
    // Método que actualiza lo visual y le da la orden a la clase Audio
    aplicarConfiguracion() {
        // 1. Averiguamos el idioma actual para pedir los textos correctos
        const idioma = this.estado.idioma;
        const dict = DiccionarioIdioma[idioma];
        
        // --- PARA LA MÚSICA ---
        this.audio.musicaActiva = this.estado.musica; // Le da la orden al Audio
        if (this.estado.musica) {
            this.btnMusica.classList.add("seleccionado");
            this.btnMusica.textContent = dict.estadoEncendida;
        } else {
            this.btnMusica.classList.remove("seleccionado");
            this.btnMusica.textContent = dict.estadoApagada;
            this.audio.detenerMusica(); // Si la apagan mientras suena, la callamos
        }
        
        // --- PARA LOS EFECTOS (SFX) ---
        this.audio.sfxActivos = this.estado.sfx;
        if (this.estado.sfx) {
            this.btnSfx.classList.add("seleccionado");
            this.btnSfx.textContent = dict.estadoEncendidos;
        } else {
            this.btnSfx.classList.remove("seleccionado");
            this.btnSfx.textContent = dict.estadoApagados;
        }
        
        // --- PARA LOS TURNOS ---
        // 1. Limpiamos: Le quitamos la clase "seleccionado" a TODOS los botones de la caja
        this.botonesTurnos.forEach(boton => {
            boton.classList.remove("seleccionado");
        });
        // 2. Matemática para encontrar la posición del botón correcto
        let indiceBoton = 10 - this.estado.turnos;         
        // 3. Pintamos de rojo el botón que coincide con nuestra memoria
        this.botonesTurnos[indiceBoton].classList.add("seleccionado");
        
        // --- PARA EL TIEMPO (CRONÓMETRO) ---
        // 1. Limpiamos todos los botones de tiempo
        this.botonesTiempo.forEach(boton => {
            boton.classList.remove("seleccionado");
        });
        // 2. Lógica matemática para encontrar el índice
        let indiceTiempo;
        if (this.estado.tiempo === 0) {
            indiceTiempo = 0; // El botón "Ninguno" está en la posición 0
        } else {
            indiceTiempo = 4 - this.estado.tiempo; // Si eligió 3 min, 4-3 = posición 1. Si eligió 1 min, 4-1 = posición 3.
        }        
        // 3. Pintamos el botón correcto
        this.botonesTiempo[indiceTiempo].classList.add("seleccionado");
        
        // --- PARA EL IDIOMA ---
        // 1. Pintamos de rojo (seleccionado) el botón correcto
        if (this.estado.idioma === "es") {
            this.btnLangEs.classList.add("seleccionado");
            this.btnLangEn.classList.remove("seleccionado");
        } else {
            this.btnLangEn.classList.add("seleccionado");
            this.btnLangEs.classList.remove("seleccionado");
        }        
        // 2. Le ordenamos a la interfaz que traduzca todo al idioma actual
        this.ui.traducirPantalla(this.estado.idioma);
		
		// --- PARA LA SKIN VISUAL ---
        // 1. Igualamos el selector del HTML con lo que hay en memoria
        this.ui.selectorSkin.value = this.estado.skin;        
        // 2. Le ordenamos a la interfaz que aplique las clases ocultas y prenda/apague la CPU
        this.ui.configurarSkinVisual(this.estado.skin);
    }    
    // Método que escucha cuando el usuario hace clic en los botones
    asignarEventos() {
        this.btnMusica.addEventListener("click", () => {
            this.estado.musica = !this.estado.musica; // Invierte el valor (true a false y viceversa)
            this.guardarMemoria(); // Guarda el cambio
            this.aplicarConfiguracion(); // Actualiza la pantalla y el audio
            this.audio.reproducir("click"); // Suena (solo si los SFX están activos)
        });
        
        this.btnSfx.addEventListener("click", () => {
            this.estado.sfx = !this.estado.sfx;
            this.guardarMemoria();
            this.aplicarConfiguracion();
            // Forzamos el sonido del clic para probar que se acaba de encender
            if (this.estado.sfx) { this.audio.aClick.play(); } 
        });
        
        // --- CLICS PARA LOS TURNOS ---
        this.botonesTurnos.forEach((boton, indice) => {
            boton.addEventListener("click", () => {
                // 1. Guardia de seguridad: ¿Está bloqueado?
                if (boton.classList.contains("bloqueado")) {                    
                    return; 
                }
                // 2. Matemática inversa para saber cuántos turnos eligió
                this.estado.turnos = 10 - indice;
                // 3. El ciclo de siempre: Guardar, Aplicar y Sonar
                this.guardarMemoria();
                this.aplicarConfiguracion();
                
                if (this.estado.sfx === true) { 
                    this.audio.reproducir("click"); 
                }
            });
        });
        
        // --- CLICS PARA EL TIEMPO (CRONÓMETRO) ---
        this.botonesTiempo.forEach((boton, indice) => {
            boton.addEventListener("click", () => {
                // 1. Guardia de seguridad: ¿Está bloqueado por la historia?
                if (boton.classList.contains("bloqueado")) {
                    return; 
                }
                // 2. Matemática para saber cuántos minutos eligió
                if (indice === 0) {
                    this.estado.tiempo = 0; // Posición 0 es "Ninguno"
                } else {
                    this.estado.tiempo = 4 - indice; // Convierte la posición (1, 2, 3) en minutos (3, 2, 1)
                }
                // 3. El ciclo sagrado: Guardar, Aplicar y Sonar
                this.guardarMemoria();
                this.aplicarConfiguracion();
                
                if (this.estado.sfx === true) { 
                    this.audio.reproducir("click"); 
                }
            });
        });
        
        // --- CLICS PARA LOS IDIOMAS ---
        this.btnLangEs.addEventListener("click", () => {
            this.estado.idioma = "es"; // Cambiamos la memoria a español
            this.guardarMemoria(); // Guardamos
            this.aplicarConfiguracion(); // Actualizamos botones y traducimos pantalla
            if (this.estado.sfx) { this.audio.reproducir("click"); } // Sonido
        });
        this.btnLangEn.addEventListener("click", () => {
            this.estado.idioma = "en"; // Cambiamos la memoria a inglés
            this.guardarMemoria(); 
            this.aplicarConfiguracion(); 
            if (this.estado.sfx) { this.audio.reproducir("click"); } 
        });
		
		// --- EVENTOS PARA EL SELECTOR DE SKIN ---
        this.ui.selectorSkin.addEventListener("change", (evento) => {
            // 1. Atrapamos el valor nuevo ("ascii" o "maldito")
            this.estado.skin = evento.target.value;             
            // 2. Ciclo sagrado: Guardar, Aplicar, Sonar
            this.guardarMemoria(); 
            this.aplicarConfiguracion();             
            if (this.estado.sfx) { 
                this.audio.reproducir("click"); 
            }
        });	
    }
}

// 3. DEPARTAMENTO VISUAL
class Interfaz {
    constructor() {
        this.pantallaMenu = document.getElementById("pantalla-menu");        
        this.pantallaConfiguracion = document.getElementById("pantalla-configuracion");
        this.btnConfig = document.getElementById("btnConfig"); // El engranaje del menú
        this.btnCerrarConfig = document.getElementById("btnCerrarConfig"); // La 'X' para salir
        this.pantallaPalabra = document.getElementById("pantalla-palabra");
        this.pantallaJuego = document.getElementById("pantalla-juego");
        this.tituloJuego = document.getElementById("iniciaJuego");
        this.dibujoAhorcado = document.getElementById("dibujoAhorcado");
		this.selectorSkin = document.getElementById("selector-skin");		
        this.canvasLienzo = document.getElementById("lienzoJuego");
		this.motorVisual = new MotorGrafico();
        this.mensajeCondena = document.getElementById("mensajeCondena");
        this.tecladoVirtual = document.getElementById("teclado-virtual");
        this.dibujoMenu = document.getElementById("dibujoMenu");
        
        this.btnSistema = document.getElementById("btnSistema");
        this.btnAmigo = document.getElementById("btnAmigo");
        this.btnEmpezar = document.getElementById("btnEmpezar");        
        this.btnReiniciar = document.getElementById("btnReiniciar");
        this.btnSalir = document.getElementById("btnSalir");
        this.btnConfirmSi = document.getElementById("btn-confirm-si");
        this.btnConfirmNo = document.getElementById("btn-confirm-no");
        this.btnSalirMenu = document.getElementById("btnSalirMenu");
        
        this.modalOverlay = document.getElementById("modal-overlay");
        this.modalTitulo = document.getElementById("modal-titulo");
        this.modalMensaje = document.getElementById("modal-mensaje");
        this.modalBoton = document.getElementById("modal-btn");
        this.modalConfirmOverlay = document.getElementById("modal-confirm-overlay");
        
        this.lineasPalabra = document.getElementById("lineasPalabra");        
        this.inputPalabra = document.getElementById("inputPalabra");        
        this.tiempoRestante = document.getElementById("tiempoRestante");
                
        this.alPresionarTecla = null;// Almacenará la función que el Juego quiere ejecutar cuando se toque una letra        
        this.tecladoVirtual.addEventListener("click", (evento) => { // DELEGACIÓN DE EVENTOS: Un solo escuchador para todo el contenedor
            // Verificamos si el clic ocurrió específicamente en un botón de clase "tecla"
            if (evento.target.classList.contains("tecla") && !evento.target.disabled) {
                const boton = evento.target;
                boton.disabled = true; // Lo desactivamos visualmente                
                // Si el Juego ya nos dio la orden de qué hacer, la ejecutamos pasando la letra
                if (this.alPresionarTecla) {
                    this.alPresionarTecla(boton.innerText);
                }
            }
        });
		// OBJECT POOLING: Creamos el almacén de reciclaje inmediatamente al encender la app
        this.inicializarPoolDeSpans();
		
        this.panelDefinicion = document.getElementById("panel-definicion");
        this.tituloRnd = document.getElementById("titulo-definicion-rnd");
        this.textoConcepto = document.getElementById("texto-concepto-final");
        this.textoEjemplo = document.getElementById("texto-ejemplo-final");
        this.contenedorBotonFinal = document.getElementById("contenedor-boton-final");
    }
	
	inicializarPoolDeSpans() { // OBJECT POOLING
        this.lineasPalabra.innerHTML = ""; // Aseguramos que el contenedor esté vacío        
        for (let i = 0; i < 15; i++) { // Creamos un límite máximo de 15 letras (suficiente para cualquier palabra)
            const span = document.createElement("span");
            span.classList.add("oculto"); // Nacen invisibles en el almacén
            this.lineasPalabra.appendChild(span);
        }
    }
    
    mostrarJuego() {
        this.pantallaMenu.classList.add("oculto");
        this.pantallaPalabra.classList.add("oculto");
        this.pantallaJuego.classList.remove("oculto");
    }
    
    ocultarJuego() {
        this.pantallaMenu.classList.remove("oculto");
        this.pantallaPalabra.classList.add("oculto");
        this.pantallaJuego.classList.add("oculto");
    }
    
    generarTeclado(idioma, funcionCerebro) {
        // Limpiamos el contenedor por si había un teclado anterior
        this.tecladoVirtual.innerHTML = ""; 
        this.alPresionarTecla = funcionCerebro; // Guardamos la función del cerebro
        
        // Definimos los dos teclados
        const qwertyEs = [
            ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
            ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
            ["Z", "X", "C", "V", "B", "N", "M"]
        ];
        const qwertyEn = [
            ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
            ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
            ["Z", "X", "C", "V", "B", "N", "M"]
        ];
        // Seleccionamos el teclado correcto
        const tecladoQWERTY = (idioma === "es") ? qwertyEs : qwertyEn;
        
        tecladoQWERTY.forEach(fila => {
            // Creamos un contenedor div para cada fila horizontal
            const filaDiv = document.createElement("div");
            filaDiv.classList.add("fila-teclado");
            
            fila.forEach(letra => {
                const botonTecla = document.createElement("button");
                botonTecla.classList.add("tecla");
                botonTecla.innerText = letra;
                botonTecla.id = `tecla-${letra}`;
                filaDiv.appendChild(botonTecla);
            });
            this.tecladoVirtual.appendChild(filaDiv);
        });
    }
    
    mostrarConfiguracion() {
        this.pantallaMenu.classList.add("oculto"); // Escondemos el menú principal
        this.pantallaConfiguracion.classList.remove("oculto"); // Mostramos la configuración
    }

    ocultarConfiguracion() {
        this.pantallaConfiguracion.classList.add("oculto"); // Escondemos la configuración
        this.pantallaMenu.classList.remove("oculto"); // Devolvemos el menú principal
    }
    
    ocultarModal() {
        this.modalOverlay.classList.add("oculto");
    }
    
    revelarLetra(indice, letra) {
        // En lugar de borrar todo, solo busca al hijo exacto y le inyecta la letra
        this.lineasPalabra.children[indice].innerText = letra;
    }
    
    mostrarIngresoPalabra() {
        this.pantallaMenu.classList.add("oculto");
        this.pantallaJuego.classList.add("oculto");
        this.pantallaPalabra.classList.remove("oculto");
    }
    
    dibujarPalabra(arrayOculto) {
        // Recibimos los guiones bajos o letras adivinadas de class Juego y las dibujamos en la pantalla
        // Sustituímos this.lineasPalabra.innerHTML = arrayOculto.map(caracter => `<span>${caracter}</span>`).join(" "); por:
		// En lugar de crear HTML, leemos los 15 spans que ya existen en el DOM
        const spansExistentes = this.lineasPalabra.children; // OBJECT POOLING
        for (let i = 0; i < spansExistentes.length; i++) {
            if (i < arrayOculto.length) {
                // RECICLAJE: Si la letra existe en la palabra, la activamos
                spansExistentes[i].textContent = arrayOculto[i];
                spansExistentes[i].className = ""; // Limpiamos efectos de partidas pasadas (ganadora/fantasma)                
            } else {
                // ALMACÉN: Los spans que sobran se limpian y se ocultan para la próxima partida
                spansExistentes[i].textContent = "";
                spansExistentes[i].className = "oculto";
            }
        }
    }
    
    dibujarAhorcado(fasesAhorcado) {
        // Dibujamos la variable recibida de Logistica dentro del espacio asignado por HTML
        this.dibujoAhorcado.innerHTML = fasesAhorcado;
    }
	
	// Método para alternar vistas al cambiar opciones o niveles
    configurarSkinVisual(skinActiva) {
        if (skinActiva === "maldito") {
            this.dibujoAhorcado.classList.add("oculto");
            this.canvasLienzo.classList.remove("oculto");
			this.motorVisual.iniciar(); // OPTIMIZACIÓN: Encendemos los cálculos del procesador
        } else {
            this.canvasLienzo.classList.add("oculto");
            this.dibujoAhorcado.classList.remove("oculto");
			this.motorVisual.pausar(); // OPTIMIZACIÓN: Apagamos el motor gráfico. Consumo de RAM y CPU = 0.
        }
    }
	
	// Modifica tu método de refresco para que acepte la skin activa
    actualizarPantallaDibujo(turnosRestantes, turnosMaximos, skinActiva) {
        const errores = turnosMaximos - turnosRestantes;
		
		console.log("Skin: ", skinActiva);
		console.log("Errores: ", errores);

        if (skinActiva === "maldito") {
            // Sincronización instantánea con el número de error actual
			console.log("Errores enviados", errores);
            this.motorVisual.actualizarErrores(errores);
        } else {
            // Tu lógica clásica de asignación de texto ASCII
            this.dibujoAhorcado.innerText = BaseDeDatos.dibujosASCII[errores];
        }
    }
    
    cambiarTitulo(texto) {
        this.tituloJuego.innerHTML = texto;        
    }
    
    iniciarEfectoTitulo() {
        this.tituloJuego.classList.add("efecto-latido");
    }
    
    iniciarEfectoTitulo2() {
        this.tituloJuego.classList.add("efecto-salvado");
    }
    
    iniciarEfectoTitulo3() {
        this.tituloJuego.classList.add("efecto-fuego-interno");        
    }
	
	mostrarPanelPostPartida(titulo, concepto, ejemplo, textoBoton) {
        // Oculta el teclado virtual
        this.tecladoVirtual.classList.add("oculto");
        
        // Inyecta el concepto
		this.tituloRnd.innerHTML = titulo;
        this.textoConcepto.innerHTML = concepto;
        this.textoEjemplo.innerHTML = `"${ejemplo}"`;

        // Genera el botón con teclas
        this.contenedorBotonFinal.innerHTML = ""; 
        const letras = textoBoton.split(""); 
        letras.forEach(letra => {
            const btnTecla = document.createElement("button");
            btnTecla.classList.add("tecla"); // Usa tu diseño original
            btnTecla.innerText = letra;
            this.contenedorBotonFinal.appendChild(btnTecla);
        });

        // Muestra el panel
        this.panelDefinicion.classList.remove("oculto");
    }
    
    mostrarResultado(titulo, mensaje, textoBoton) {
        // 1. Escribimos mensajes en ventanas emergentes tal como nos mandan
        this.modalTitulo.innerHTML = `${titulo}`;
        this.modalMensaje.innerHTML = `${mensaje}`;
        this.modalOverlay.classList.remove("oculto");       
        // 2. Modificar la interfaz del juego (cuando se gana o se pierde)
        this.modalBoton.innerText = textoBoton; // Asigna el textoBoton ("Revivir" o "¿Quién dijo miedo?")
        //this.btnReiniciar.classList.remove("oculto"); // quita la clase "oculto" al botón Reiniciar
        //this.btnReiniciar.classList.add("modo-revivir");
    }
    
    reiniciarInterfaz() {
        // Revertimos el punto 2 de mostrarResultado
        //this.btnReiniciar.classList.add("oculto");         
        // this.contadorTurnos.textContent = "Turnos: " + this.turnos;        
        this.mensajeCondena.classList.add("oculto");
        this.mensajeCondena.classList.remove("animar-condena");
        this.mensajeCondena.classList.remove("animar-victoria");
        this.pantallaJuego.classList.add("estado-jugando");
        //this.btnReiniciar.classList.remove("modo-revivir");
        this.lineasPalabra.classList.remove("estado-muerto");              
        this.tituloJuego.classList.remove("efecto-latido"); 
        this.tituloJuego.classList.remove("efecto-salvado");
        this.tituloJuego.classList.remove("efecto-fuego-interno");
        this.dibujoAhorcado.classList.remove("dibujo-victoria-cian");        
        //this.btnReiniciar.classList.remove("estado-victoria");
        this.tituloJuego.classList.remove("estado-victoria");
		this.tecladoVirtual.classList.remove("oculto"); // Devolvemos el teclado
        this.panelDefinicion.classList.add("oculto");   // Ocultamos el panel
		this.pantallaJuego.classList.remove("estado-victoria", "estado-derrota");
        
    }
    
    traducirPantalla(idioma) {
        // 1. Capturamos TODOS los elementos del HTML que tengan el "código de barras" data-i18n
        const elementosATraducir = document.querySelectorAll("[data-i18n]");
        // 2. ¡Usamos forEach! Por cada elemento encontrado en la pantalla...
        elementosATraducir.forEach(elemento => {
            // Extraemos el valor de su etiqueta (por ejemplo: "btnSistema")
            const llave = elemento.getAttribute("data-i18n");
            // Vamos al DiccionarioGlobal, entramos al idioma actual ('es' o 'en') y buscamos esa llave
            const textoTraducido = DiccionarioIdioma[idioma][llave];
            // 3. Si la traducción existe en nuestro diccionario, la inyectamos
            if (textoTraducido) {
                // Si el elemento es un campo de texto, editamos su placeholder
                if (elemento.tagName === "INPUT") {
                    elemento.placeholder = textoTraducido;
                } else {
                    // Si es cualquier otra etiqueta, usamos innerHTML normalmente
                    elemento.innerHTML = textoTraducido;
                }
            }
        });
    }   
      
    mostrarConfirmacion() {
        this.modalConfirmOverlay.classList.remove("oculto");
    }
    
    ocultarConfirmacion() {
        this.modalConfirmOverlay.classList.add("oculto");
    }

    ejecutarEfectosDerrota(palabraSecreta, arrayOculto, fraseCondena) {
        this.iniciarEfectoTitulo();
        
        // 1. Invocamos a los fantasmas para las letras no adivinadas
        const spansLetras = this.lineasPalabra.querySelectorAll("span");
        for (let i = 0; i < palabraSecreta.length; i++) {    
            if (arrayOculto[i] === "_") {
                spansLetras[i].textContent = palabraSecreta[i];
                spansLetras[i].classList.add("letra-fantasma");
            }
        }        
        // 2. Apagamos contenedores y mostramos la condena
        this.lineasPalabra.classList.add("estado-muerto");
        this.mensajeCondena.innerHTML = fraseCondena;
        this.mensajeCondena.classList.remove("oculto");
        this.mensajeCondena.classList.add("animar-condena");
		this.pantallaJuego.classList.add("estado-derrota");
    }

    ejecutarEfectosVictoria(fraseSalvacion) {
        this.iniciarEfectoTitulo2();
        this.iniciarEfectoTitulo3();
		this.motorVisual.dispararVictoria();
        this.dibujoAhorcado.classList.add("dibujo-victoria-cian");        
        // 1. Pintamos de victoria todas las letras
        // Solo afectamos a los spans que están jugando
        const spansLetras = this.lineasPalabra.children;
        for (let i = 0; i < spansLetras.length; i++) {
            if (!spansLetras[i].classList.contains("oculto")) {
                spansLetras[i].classList.add("letra-ganadora");
            }
        }        
        // 2. Mostramos el mensaje de salvación y preparamos el botón de continuar
        this.mensajeCondena.innerHTML = fraseSalvacion;
        this.mensajeCondena.classList.remove("oculto");
        this.mensajeCondena.classList.add("animar-victoria");       
        //this.btnReiniciar.classList.add("estado-victoria");
		this.pantallaJuego.classList.add("estado-victoria");
    }
    
    alertaPeligroInminente() {
        this.tiempoRestante.classList.add("peligro-inminente"); 
    }

    ejecutarMuerteVisualReloj(dibujoAhorcadoFinal) {
        // La UI manipula sus propios colores y textos
        this.tiempoRestante.classList.remove("latido-corazon");
        this.tiempoRestante.style.color = "red";
        this.dibujoAhorcado.innerText = dibujoAhorcadoFinal;
    }
    
    prepararRelojVisual(tiempoActual) {
        // La UI decide cómo limpiar el reloj y los textos de condena
        this.tiempoRestante.classList.remove("latido-corazon");
        this.tiempoRestante.style.color = "#dfdede";
        
        if (tiempoActual === 0) {
            this.tiempoRestante.innerText = "∞";
        } else {
            this.tiempoRestante.innerText = tiempoActual;
        }
        
        this.mensajeCondena.classList.add("oculto");
    }
}

// 4. DEPARTAMENTO DE LOGISTICA 
class Juego {
    constructor(herramientaAudio, herramientaUI, herramientaConfig) {
        this.audio = herramientaAudio;
        this.ui = herramientaUI;
        this.config = herramientaConfig;
        // El juego siempre nace en la modal de bienvenida
        this.estadoActual = ESTADO_JUEGO.BIENVENIDA;
        // Llamamos al súper método para que construya las variables por primera vez
        this.reiniciarEstado();
    }
    
    establecerModoJuego(nuevoModo) {
        this.modoJuego = nuevoModo;
    }
    
    cambiarEstado(nuevoEstado) {
        // 1. Actualizamos el cerebro
        this.estadoActual = nuevoEstado; // El estado actual es el que llegue por el parámetro (nuevo estado)
        
        // 2. Ejecutamos las acciones estrictas según el nuevo estado
        switch (this.estadoActual) { // según estado actual:
            case ESTADO_JUEGO.BIENVENIDA:                
                break;
                
            case ESTADO_JUEGO.MENU: // Mostramos el menú
                this.audio.iniciarMusica();
                this.ui.ocultarJuego();
                this.ui.ocultarConfiguracion();
                this.ui.pantallaMenu.classList.remove("oculto");
                break;
                
            case ESTADO_JUEGO.CONFIGURACION:
                this.ui.mostrarConfiguracion();
                break;
                
            case ESTADO_JUEGO.INGRESO_PALABRA:
                this.ui.mostrarIngresoPalabra();
                break;
                
            case ESTADO_JUEGO.JUGANDO:
                // Si venimos de una pausa, reanudamos. Si es nuevo, la lógica de inicio ya se encarga.
                if (this.turnos > 0 && this.arrayOculto.includes("_") && this.tiempoActual > 0) {
                    this.iniciarCronometro();
                }
                break;
                
            case ESTADO_JUEGO.PAUSA_MODAL:
                // Congela el tiempo cuando se abre una modal
                clearInterval(this.cronometro);
                this.ui.mostrarConfirmacion();
                break;
                
            case ESTADO_JUEGO.VICTORIA:
                // 1. Detenemos los sistemas de juego
                clearInterval(this.cronometro);
                this.audio.detener("latido");
                this.audio.detenerMusica();
                this.audio.reproducir("victoria2");
                // 2. Ejecutamos los efectos visuales
                const idiomaVic = this.config.estado.idioma;
                const dictVic = DiccionarioIdioma[idiomaVic];
                this.ui.cambiarTitulo(dictVic.tituloSalvado);
                this.ui.dibujarAhorcado(BaseDeDatos.dibujoVictoria[0]);
                this.ui.ejecutarEfectosVictoria(dictVic.fraseSentenciaVictoria);
                this.ui.pantallaJuego.classList.remove("estado-jugando");
				// Elegimos un título al azar del diccionario
                const indiceAleatorioVic = Math.floor(Math.random() * dictVic.titulosVictoriaDinamicos.length);
                const tituloElegidoVic = dictVic.titulosVictoriaDinamicos[indiceAleatorioVic];          
                // 3. Disparamos la modal                
                this.ui.mostrarResultado(dictVic.modalVictoriaTitulo, dictVic.modalVictoriaMensaje, "Ver Detalles");
				this.tituloPostPartida = tituloElegidoVic;
				this.textoBotonPostPartida = dictVic.teclaDesafiar || "DESAFIAR";
				this.sonidoPostPartida = "victoria1";
                // Aquí añadiremos la lógica de sumar monedas/puntos
                break;
                
            case ESTADO_JUEGO.DERROTA:
                // 1. Detenemos los sistemas
                clearInterval(this.cronometro);
                this.audio.detener("latido");
                this.audio.detenerMusica();
                // 2. Ejecutamos los efectos visuales
                const idiomaDer = this.config.estado.idioma;
                const dictDer = DiccionarioIdioma[idiomaDer];
                this.ui.cambiarTitulo(dictDer.tituloDerrota);
                this.ui.ejecutarEfectosDerrota(this.palabraSecreta, this.arrayOculto, dictDer.fraseSentenciaDerrota);
                this.ui.pantallaJuego.classList.remove("estado-jugando");     
				const indiceAleatorioDer = Math.floor(Math.random() * dictDer.titulosDerrotaDinamicos.length);
                const tituloElegidoDer = dictDer.titulosDerrotaDinamicos[indiceAleatorioDer]; 
				this.tituloPostPartida = tituloElegidoDer;
				this.textoBotonPostPartida = dictDer.teclaRevivir || "REVIVIR";
				this.sonidoPostPartida = "derrota";
                // 3. Evaluamos si murió por tiempo o por turnos para el título de la modal
                let tituloModalDerrota = (this.tiempoActual <= 0 && this.config.estado.tiempo !== 0)? `<span class="texto-terror">${dictDer.modalDerrotaTiempoTitulo}</span>` 
                    : dictDer.modalDerrotaTitulo; // Si el tiempo llega a 0 y el cronómetro está activado entonces (?) guarda el titulo de derrota por tiempo, sino (:), guarda el titulo de derrota por turnos                    
                this.ui.mostrarResultado(tituloModalDerrota, dictDer.modalDerrotaMensaje, "Ver Detalles" ); // Cambia la pantalla del juego de acuerdo al tipo de derrota
                break;
        }
    }
    
    reiniciarEstado() {
        // Estado inicial del Juego
        clearInterval(this.cronometro); // Destruye cualquier reloj fantasma
        this.audio.detener("latido");      // Apaga cualquier latido fantasma
        this.turnos = this.config.estado.turnos;
        this.tiempoActual = this.config.estado.tiempo * 60; // Multiplicamos los minutos (1, 2, 3) por 60 para tener los segundos
        this.ui.prepararRelojVisual(this.tiempoActual);
        this.palabraSecreta = "";
        this.arrayOculto = [];
        this.letrasUsadas = [];
    }
    
    iniciarCronometro() {
        clearInterval(this.cronometro);
        // 1. Guardia: Si el tiempo es infinito (0), abortamos y no encendemos el reloj
        if (this.tiempoActual === 0) return;
        // 2. Encendemos el reloj que hará un "tic" cada 1 segundo (1000 milisegundos)
        this.cronometro = setInterval(() => {
            this.tiempoActual--; // Restamos 1 segundo
            this.ui.tiempoRestante.innerText = this.tiempoActual; // Actualizamos la pantalla
            // 3. FASE DE PÁNICO: Los últimos 10 segundos
            if (this.tiempoActual <= 10 && this.tiempoActual > 0) {
                this.ui.tiempoRestante.classList.add("latido-corazon"); // Pone la letra roja y temblorosa
                // Reproducimos el latido solo si los SFX están permitidos, una sola vez, en el segundo 10
                if (this.tiempoActual === 10 && this.audio.sfxActivos) {                     
                    this.audio.reproducir("latido");
                }
            }
            // 4. FASE DE MUERTE: El tiempo llega a 0
            if (this.tiempoActual <= 0) {
                clearInterval(this.cronometro); // Apagamos el reloj
                this.audio.detener("latido"); // Callamos el latido 
                //this.audio.detenerMusica(); // Detenemos la música
                this.ejecutarDerrotaPorTiempo(); // Llamamos al verdugo                                              
            }
        }, 1000);
    }
    
    ejecutarDerrotaPorTiempo() {          
        this.turnos = 0;        
        let dibujoAhorcadoFinal = BaseDeDatos.dibujosASCII[10]; // Mandamos a dibujar el ahorcado completo
        this.ui.ejecutarMuerteVisualReloj(dibujoAhorcadoFinal);
        this.cambiarEstado(ESTADO_JUEGO.DERROTA);
    }
    
    iniciarPartida(palabraManual = null) {
        // 1. Estado inicial del Juego
        this.reiniciarEstado();
        this.ui.pantallaJuego.classList.add("estado-jugando");
		this.ui.motorVisual.reset();
        
        // 2. Selección de Palabra Secreta (El Bibliotecario)
        const idiomaActivo = this.config.estado.idioma;        
        if (this.modoJuego === "amigo") {
            this.palabraSecreta = palabraManual.toUpperCase();
            // Para el modo amigo, creamos un "concepto vacío" por ahora para que no de error la pantalla final
            this.palabraActualObjeto = { 
                palabra: this.palabraSecreta, 
                concepto: DiccionarioIdioma[idiomaActivo].conceptoAmigo,
                ejemplo: DiccionarioIdioma[idiomaActivo].ejemploAmigo, 
            };
        } else { // MODO SISTEMA (Práctica)            
            // Entramos a la biblioteca, en el idioma actual, sección 'practica'
            const listaPalabras = BibliotecaMaldita[idiomaActivo].practica;            
            // Elegimos una al azar
            const indiceAleatorio = Math.floor(Math.random() * listaPalabras.length);            
            // Guardamos el objeto COMPLETO (palabra, concepto y ejemplo) en la memoria del juego
            this.palabraActualObjeto = listaPalabras[indiceAleatorio];             
            // Guardamos solo el texto para la lógica de adivinar
            this.palabraSecreta = this.palabraActualObjeto.palabra;
        }        
        this.letrasSecretas = this.palabraSecreta.split("");
        this.arrayOculto = Array(this.palabraSecreta.length).fill("_"); // la palabraSecreta se convierte en guiones bajos (arrayOculto)        
        this.ui.dibujarPalabra(this.arrayOculto); // Mandamos los guines bajos a la interfaz
        this.ui.actualizarPantallaDibujo(this.turnos, 10); // Reemplazamos las líneas de sueloInicial y dibujarAhorcado por el enrutador único.
        
        // 3. Reinicio de estados iniciales 
        this.ui.cambiarTitulo(DiccionarioIdioma[this.config.estado.idioma].tituloJuego);        
        this.ui.generarTeclado(idiomaActivo, (letra) => {
            this.audio.reproducir("adivinar"); // El Juego hace sonar el clic
            this.procesarLetra(letra);  // El Juego procesa si ganas o pierdes
        });
        this.cambiarEstado(ESTADO_JUEGO.JUGANDO);
    }
    
    procesarLetra(letra) {
        this.letrasUsadas.push(letra); 
        
        if (this.palabraSecreta.includes(letra)) { // Si letra escrita se encuentra dentro de la palabraSecreta
            for (let i = 0; i < this.palabraSecreta.length; i++) { // Entonces busca esxactamente donde, pasando desde el inicio hasta el final de la palabra secreta
                if (this.palabraSecreta[i] === letra) { // Si la letra secreta coincide con la letra escrita
                    this.arrayOculto[i] = letra; // entonces el guión bajo (arrayOculto) que coincide con esa letra se convierte ahora en la letra escrita
                    this.ui.revelarLetra(i, letra); // re-dibujamos la letra específica en su posición exacta
                }
            }                       
        } else {
            this.turnos--; // Restamos 1 turno   
			// Envía los turnos y el tipo de aspecto seleccionado (ej: "ascii" o "maldito")
			this.ui.actualizarPantallaDibujo(this.turnos, 10, this.config.estado.skin);
                        
            if (this.turnos === 1) {
                this.ui.alertaPeligroInminente(); // Mandamos a cambiar el color del contador
            }
            
            if (this.turnos === 0) {
                this.cambiarEstado(ESTADO_JUEGO.DERROTA);
                return;                
            }
        }
        
        if (!this.arrayOculto.includes("_")) { // Si te quedas sin guines bajos (literal, si arrayOculto no incluye "_")
           this.cambiarEstado(ESTADO_JUEGO.VICTORIA);
        }
    }     
}
const audio = new ControladorAudio(); // audio es nuestro objeto
const ui = new Interfaz(); // ui(User Interface) es nuestro objeto
const config = new Configuracion(audio, ui);
const partida = new Juego(audio, ui, config);

ui.traducirPantalla(config.estado.idioma);
ui.modalBoton.addEventListener("click", () => {
    // 1. Siempre cerramos la modal
    ui.ocultarModal();     
    audio.reproducir("click"); 	
    // Evaluamos en qué estado nos quedamos para reproducir el efecto de "cierre"
    if (partida.estadoActual === ESTADO_JUEGO.BIENVENIDA) {
        partida.cambiarEstado(ESTADO_JUEGO.MENU);
    } else if (
		partida.estadoActual === ESTADO_JUEGO.VICTORIA ||
		partida.estadoActual === ESTADO_JUEGO.DERROTA
        ) {
            audio.reproducir(partida.sonidoPostPartida);

    ui.mostrarPanelPostPartida(
        partida.tituloPostPartida,
        partida.palabraActualObjeto.concepto,
        partida.palabraActualObjeto.ejemplo,
        partida.textoBotonPostPartida
		 );
     }	
});       
ui.btnConfig.addEventListener("click", () => {
    audio.reproducir("click"); 
    partida.cambiarEstado(ESTADO_JUEGO.CONFIGURACION);
});
ui.btnCerrarConfig.addEventListener("click", () => {
    audio.reproducir("click");
	ui.configurarSkinVisual(config.skin);
    partida.cambiarEstado(ESTADO_JUEGO.MENU);
});
ui.btnSistema.addEventListener("click", () => {
    partida.establecerModoJuego("sistema");
    audio.reproducir("destino");
    audio.iniciarJuego();
    ui.mostrarJuego();
    ui.reiniciarInterfaz();
    partida.iniciarPartida();
});
ui.btnSalirMenu.addEventListener("click", () => { 
    audio.reproducir("risa");
    const idioma = config.estado.idioma; // Averiguamos el idioma actual
    ui.mostrarResultado(
        DiccionarioIdioma[idioma].modalSalirMenuTitulo, 
        DiccionarioIdioma[idioma].modalSalirMenuMensaje,
        DiccionarioIdioma[idioma].btnBienvenida 
    );
});
ui.btnSalir.addEventListener("click", () => {     
    partida.cambiarEstado(ESTADO_JUEGO.PAUSA_MODAL);    
});
ui.btnConfirmNo.addEventListener("click", () => {
    audio.reproducir("click");
    ui.ocultarConfirmacion();
    partida.cambiarEstado(ESTADO_JUEGO.JUGANDO);    
});
ui.btnConfirmSi.addEventListener("click", () => {
    audio.detenerMusica();
    audio.reproducir("click");    
    ui.ocultarConfirmacion(); // Cerramos la ventana
    ui.ocultarJuego(); // Volvemos al menú    
    audio.reproducir("burla");    
    audio.iniciarMusica();
    partida.reiniciarEstado();
    ui.reiniciarInterfaz();
    partida.cambiarEstado(ESTADO_JUEGO.MENU);
});
ui.btnAmigo.addEventListener("click", () => {
    partida.establecerModoJuego("amigo");
    audio.reproducir("destino");
    partida.cambiarEstado(ESTADO_JUEGO.INGRESO_PALABRA);
});
ui.btnEmpezar.addEventListener("click", () => {
    audio.reproducir("adivinar");
    audio.iniciarJuego();
    // 1. Extraemos el valor escrito y lo convertimos a mayúsculas
    let palabraCapturada = ui.inputPalabra.value.toUpperCase(); 
    // 2. Evitamos que el amigo deje la palabra vacía
    if (palabraCapturada === "") {
        alert(DiccionarioIdioma[config.estado.idioma].alertaPalabraVacia);
        return; 
    }
    // 3. Preparamos el escenario
    ui.mostrarJuego(); 
    ui.reiniciarInterfaz(); // Limpiamos botones de victoria/derrota pasados    
    // 4. Le mandamos la palabra al Cerebro y borramos la evidencia
    partida.iniciarPartida(palabraCapturada);
    ui.inputPalabra.value = ""; // Vaciamos el input para que no se vea la próxima vez
});
const idiomaActual = config.estado.idioma;
const dictBienvenida = DiccionarioIdioma[idiomaActual];
ui.mostrarResultado(
    dictBienvenida.bienvenidaTitulo, 
    dictBienvenida.bienvenidaMensaje, 
    dictBienvenida.btnBienvenida
);
ui.dibujoMenu.innerText = BaseDeDatos.dibujoMenu;
ui.contenedorBotonFinal.addEventListener("click", () => {
    // 1. Sonido de botón normal y reinicio de sistemas
    audio.reproducir("destino");
    audio.iniciarJuego();
    ui.reiniciarInterfaz();          
    // 3. Volvemos a lanzar la partida
    if (partida.modoJuego === "amigo") {
        ui.mostrarIngresoPalabra(); // Si es con amigo, pide la palabra
    } else {
        partida.iniciarPartida();   // Si es sistema, saca una palabra nueva sola
    }        
});
