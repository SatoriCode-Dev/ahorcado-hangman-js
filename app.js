// 1. DEPARTAMENTO DE DATOS
const BaseDeDatos = { // Objeto Literal
    nivelDificil: [
        "WHISKY", "KIWI", "FUGAZ", "MIXTO", "JUZGAR", "YUNQUE", "AÑEJO", "ZURDO", "BIZCOCHO", "YELMO",
        "HALLAZGO", "TORAX", "LUZ", "EXIGIR", "ZIGZAG", "KAYAK", "ALMIZCLE", "ALZHEIMER", "PINZA", "SUBDITO"
    ],
    frasesTerror: [
        "El verdugo sonríe...", "Siento tu miedo", "Un paso más cerca del abismo", "La cuerda se tensa...",
        "Escucho tu respiración...", "Nadie vendrá a salvarte...", "Tus latidos te delatan...", 
        "El frío abraza tu cuello...", "Tus opciones se agotan...", "Un paso más hacia el vacío..."
    ],
    dibujosASCII: [        
    `\n\n\n\n\n\n`, // [0] Indice 0: Lienzo vacío    
    `\n      |\n      |\n      |\n      |\n      |\n=========`, // [1] Indice 1: Piso y Poste    
    `  +---+\n      |\n      |\n      |\n      |\n      |\n=========`, // [2] Indice 2: Techo    
    `  +---+\n  |   |\n      |\n      |\n      |\n      |\n=========`, // [3] Indice 3: La soga    
    `  +---+\n  |   |\n  O   |\n      |\n      |\n      |\n=========`, // [4] Indice 4: La cabeza    
    `  +---+\n  |   |\n  O   |\n  |   |\n      |\n      |\n=========`, // [5] Indice 5: El cuerpo    
    `  +---+\n  |   |\n  O   |\n /|   |\n      |\n      |\n=========`, // [6] Indice 6: Un brazo (izquierdo)    
    `  +---+\n  |   |\n  O   |\n /|\\  |\n      |\n      |\n=========`, // [7] Indice 7: Otro brazo (derecho)    
    `  +---+\n  |   |\n  O   |\n /|\\  |\n /    |\n      |\n=========`, // [8] Indice 8: Una pierna (izquierda)    
    `  +---+\n  |   |\n  O   |\n /|\\  |\n / \\  |\n      |\n=========`, // [9] Indice 9: Otra pierna (derecha) - Muñeco completo    
    `  +---+\n  |   |\n  O   |\n /|\\  |\n / \\  |\n      |\n` // [10] Indice 10: Sentenciado (Se borra el suelo para dar espacio a la frase)
    ],    
    dibujoVictoria: [
        `\n  +---+\n  |   |\n      |\n  O   |\n /|\\  |\n / \\  |\n`
    ],
    dibujoMenu: `\n  +---+\n  |   |\n      |\n      |\n      |\n      |\n=========`,    
    dibujosASCIIFinal: [
        /* 0: El inicio pacífico (Fácil) */
        `\n\n\n\n\n=========`, 
        
        /* 1: Poste vertical */
        `\n  |\n  |\n  |\n  |\n  |\n=========`, 
        
        /* 2: Viga superior */
        `\n  +---+\n  |   |\n      |\n      |\n      |\n      |\n=========`, 
        
        /* 3: La Cuerda (Aquí empieza la dificultad Media) */
        `\n  +---+\n  |   |\n  |   |\n      |\n      |\n      |\n=========`, 
        
        /* 4: La Silla/Plataforma (Aquí empieza el "Nivel Imposible") */
        `\n  +---+\n  |   |\n  |   |\n      |\n     [ ]\n     [ ]\n=========`, 
        
        /* 5: Sube una pierna */
        `\n  +---+\n  |   |\n  |   |\n      |\n      /\n     [ ]\n=========`, 
        
        /* 6: Sube la otra pierna */
        `\n  +---+\n  |   |\n  |   |\n      |\n     / \\\n     [ ]\n=========`, 

        /* 7: El Torso */
        `\n  +---+\n  |   |\n  |   |\n      |\n      |\n     / \\\n     [ ]\n=========`,

        /* 8: Los Brazos */
        `\n  +---+\n  |   |\n  |   |\n     /|\\\n      |\n     / \\\n     [ ]\n=========`,

        /* 9: La Cabeza (Ultimo turno) */
        `\n  +---+\n  |   |\n  |   |\n      O\n     /|\\\n     / \\\n     [ ]\n=========`,

        /* 10: ¡DERROTA! (La silla desaparece, el cuerpo cae) */
        `\n  +---+\n  |   |\n  O   |\n /|\\  |\n / \\  |\n      |\n=========`, 
    ]
};

// 2. DEPARTAMENTO DE IDIOMAS
const DiccionarioIdioma = {
    es: {
        // Pantalla de Bienvenida
        bienvenidaTitulo: "<span class='texto-terror'>El abismo te da <br>la bienvenida</span>",
        bienvenidaMensaje: "Entrar es la parte fácil <br><span class='texto-terror'>Salir te costará más</span>",
        btnBienvenida: "Adelante",
                
        // Menú Principal
        tituloPrincipal: "Ahorcado",
        textoDestino: "Elige tu destino:",
        fraseTematica: '"Alguien debe ocupar este lugar..."',
        btnHistoria: "MODO HISTORIA <br><span class='subtitulo'>✟ Desafía al abismo ✟</span>",
        btnSistema: "PRÁCTICA<br><span class='subtitulo'>Juega contra el sistema</span>",
        btnAmigo: "MULTIJUGADOR<br><span class='subtitulo'>Condena a un Amigo</span>",
        modalSalirMenuTitulo: "¿Salir?",
        modalSalirMenuMensaje: "<span class='texto-terror'>No hay escapatoria de este lugar</span>",
        
        // Configuración
        tituloConfig: "Leyes del Abismo",
        lblSentidos: "Sentidos",
        lblMusica: "Música de Ambiente",
        lblSfx: "Efectos Visuales/Sonoros",
        lblLengua: "Lengua",
        lblTurnos: "Turnos de Vida",
        lblTiempo: "Tiempo Límite",
        lblIdioma: "Idioma / Language",
        estadoEncendida: "[ ENCENDIDA ]",
        estadoApagada: "[ APAGADA ]",
        estadoEncendidos: "[ ENCENDIDOS ]",
        estadoApagados: "[ APAGADOS ]",
        tituloDificultad: "Dificultad (Modo Libre)",
        textoDificultad: "Demuestra tu valor en el Modo Historia para romper las cadenas.",
        lblTurnosMorir: "Turnos antes de morir:",
        lblTiempoMaximo: "Tiempo Máximo (Cronómetro):",
        btnTiempoNinguno: "Ninguno",
        btnBorrarProgreso: "Borrar Progreso",
        
        // Alertas y Textos Dinámicos
        alertaLetraVacia: "¡Escribe una letra antes de sellar tu destino!",
        alertaPalabraVacia: "¡Escribe una sentencia antes de empezar!",
        alertaLetraRepetida: "¿Los nervios no te dejan pensar? Ya usaste esa letra.",
        letrasPurgatorio: "Letras en el purgatorio: <br>",
        btnAccionAdivinar: "Adivinar",
        btnSellarDestino: "Sellar Destino",
        
        // Pantalla Palabra (Multijugador)
        pantallaPalabraTitulo: "Dicta la sentencia",
        pantallaPalabraAviso: "El abismo solo entiende letras. Sin números ni símbolos.",
        placeholderAmigo: "Asegúrate de que nadie vea",
        btnSellarDestinoAmigo: "Sellar su destino",
        
        // Pantalla Juego (Cabecera)
        lblTiempoJuego: "Tiempo:",
        lblTurnosJuego: "Turnos:",
        
        // Textos del Juego y Derrota
        tituloJuego: "¡Adivina o muere!",
        tituloDerrota: "¡Ahorcado!",
        fraseSentenciaDerrota: "_†_ ESTÁS CONDENADO _†_",
        modalDerrotaTitulo: "¡Has sellado tu destino!",
        modalDerrotaMensaje: "La soga se ha cerrado por completo... Tu alma ahora nos pertenece.",
        modalDerrotaTiempoTitulo: "¡Muy Lento!",
        btnRevivir: "Revivir",
        
        // Modal de Confirmación (Salir)
        modalConfirmTitulo: "¿Huir como cobarde?",
        modalConfirmMensaje: "Si vuelves al menú, tu progreso se perderá en el abismo.",
        btnConfirmSi: "Sí, huir",
        btnConfirmNo: "No, me quedo",
        btnSalir: "Salir",
        
        // Modal de Victoria y Conceptos
        modalVictoriaTitulo: "¡Absolución concedida!",
        modalVictoriaMensaje: "La soga se afloja... Has burlado al verdugo por ahora.",
        btnSiguientePrueba: "Siguiente prueba",
        etiquetaPalabra: "Palabra:",
        etiquetaVeredicto: "El Veredicto:",
        tituloSalvado: "Salvado",
        fraseSentenciaVictoria: "_†_¡BURLASTE AL VERDUGO!_†_",
        conceptoAmigo: "Palabra dictada por un alma corrupta.",
        ejemploAmigo: "No confíes en quien te invita a jugar con la muerte.",
    },
    en: {
        // First-Time Welcome Screen
        bienvenidaTitulo: "<span class='texto-terror'>The abyss <br>welcomes you</span>",
        bienvenidaMensaje: "Entering is the easy part... <br><span class='texto-terror'>Leaving will cost you dearly</span>",
        btnBienvenida: "Descend",
        
        // Main Menu
        tituloPrincipal: "Hangman",
        textoDestino: "Choose your fate:",
        fraseTematica: '"Someone must take this place..."',
        btnHistoria: "STORY MODE <br><span class='subtitulo'>✟ Defy the abyss ✟</span>",
        btnSistema: "PRACTICE<br><span class='subtitulo'>Play vs the system</span>",
        btnAmigo: "MULTIPLAYER<br><span class='subtitulo'>Condemn a Friend</span>",
        modalSalirMenuTitulo: "Quit?",
        modalSalirMenuMensaje: "<span class='texto-terror'>There is no escape from this place</span>",
        
        // Settings
        tituloConfig: "Settings",
        lblSentidos: "Senses",
        lblMusica: "Ambient Music",
        lblSfx: "Visual/Sound FX",
        lblLengua: "Language",
        lblTurnos: "Life Turns",
        lblTiempo: "Time Limit",
        lblIdioma: "Idioma / Language",
        estadoEncendida: "[ ON ]",
        estadoApagada: "[ OFF ]",
        estadoEncendidos: "[ ON ]",
        estadoApagados: "[ OFF ]",
        tituloDificultad: "Difficulty (Free Mode)",
        textoDificultad: "Prove your worth in Story Mode to break the chains.",
        lblTurnosMorir: "Turns before death:",
        lblTiempoMaximo: "Max Time (Timer):",
        btnTiempoNinguno: "None",
        btnBorrarProgreso: "Clear Progress",
        
        // Alerts and dynamic texts
        alertaLetraVacia: "Write a letter before sealing your fate!",
        alertaPalabraVacia: "Write a sentence before starting!",
        alertaLetraRepetida: "Nerves blocking your thoughts? You already used that letter.",
        letrasPurgatorio: "Letters in purgatory: <br>",
        btnAccionAdivinar: "Guess",
        btnSellarDestino: "Seal Fate",
        
        // Multiplayer Word Screen
        pantallaPalabraTitulo: "Dictate the sentence",
        pantallaPalabraAviso: "The abyss only understands letters. No numbers or symbols.",
        placeholderAmigo: "Make sure no one is watching",
        btnSellarDestinoAmigo: "Seal their fate",
        
        // Game Screen (Header)
        lblTiempoJuego: "Time:",
        lblTurnosJuego: "Turns:",
        
        // Game text and defeat
        tituloJuego: "Guess or perish!",
        tituloDerrota: "Hanged!",
        fraseSentenciaDerrota: "_†_ YOU ARE CONDEMNED _†_",
        modalDerrotaTitulo: "You sealed your fate!",
        modalDerrotaMensaje: "The noose tightens... Your soul is ours now.",
        modalDerrotaTiempoTitulo: "Too Slow!",
        btnRevivir: "Resurrect",
        
        // Confirmation dialog (exit)
        modalConfirmTitulo: "Flee like a coward?",
        modalConfirmMensaje: "The abyss will swallow your progress. There is no turning back.",
        btnConfirmSi: "Succumb",
        btnConfirmNo: "I will not yield",
        btnSalir: "Exit",
        
        // Winning dialog and concepts
        modalVictoriaTitulo: "Absolution granted!",
        modalVictoriaMensaje: "The noose loosens... You've cheated the hangman for now.",
        btnSiguientePrueba: "Next trial",
        etiquetaPalabra: "Word:",
        etiquetaVeredicto: "The Verdict:",
        tituloSalvado: "Spared",
        fraseSentenciaVictoria: "_†_YOU'VE CHEATED THE HANGMAN_†_",
        conceptoAmigo: "Word dictated by a corrupt soul.",
        ejemploAmigo: "Do not trust the one who invites you to play with death.",
    }
};

const BibliotecaMaldita = {
    es: {
        practica: [
            { 
                palabra: "CEMENTERIO", 
                concepto: "Terreno donde se entierran los cadáveres.", 
                ejemplo: "El silencio del cementerio es solo una ilusión para los vivos." 
            },
            { 
                palabra: "CADENA", 
                concepto: "Sucesión de eslabones metálicos usados para privar de libertad.", 
                ejemplo: "Tus errores son la cadena que te arrastrará al fondo del abismo." 
            }
        ],
        historia: {
            nivel1: [
                { 
                    palabra: "TUMBA", 
                    concepto: "Excavación en la tierra para enterrar un cadáver.", 
                    ejemplo: "Al final, todas las riquezas del mundo se quedan fuera de la tumba." 
                }
            ]
        }
    },
    en: {
        practica: [
            { 
                palabra: "CEMETERY", 
                concepto: "A large burial ground, especially one not in a churchyard.", 
                ejemplo: "The silence of the cemetery is only an illusion for the living." 
            },
            { 
                palabra: "CHAIN", 
                concepto: "A series of linked metal rings used for fastening or securing.", 
                ejemplo: "Your mistakes are the chain that will drag you down into the abyss." 
            }
        ],
        historia: {
            nivel1: [
                { 
                    palabra: "TOMB", 
                    concepto: "A large vault, typically an underground one, for burying the dead.", 
                    ejemplo: "In the end, all the wealth in the world stays outside the tomb." 
                }
            ]
        }
    }
};

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
    
    sonidoDerrota() {
       if (this.sfxActivos) {
        this.risasSatanicas.currentTime = 0;
        this.risasSatanicas.play();
       }
    }
    
    sonidoVictoria2() {
        if (this.sfxActivos) {
            this.ahhh.currentTime = 0;
            this.ahhh.play();
        }
    }
    
    sonidoVictoria() {
        if (this.sfxActivos) {
            this.boooh.currentTime = 0;
            this.boooh.play();
        }
    }
    
    botonClick() {
        if (this.sfxActivos) {
            this.aClick.currentTime = 0;        
            this.aClick.play();
        }
    }
    
    botonDestino() {
        if (this.sfxActivos) {
            this.aDestino.currentTime = 0;        
            this.aDestino.play();
        }
    }
    
    botonAdivinar() {
        if (this.sfxActivos) {
            this.aAdivinar.currentTime = 0;
            this.aAdivinar.play();
        }
    }
    
    reproducirBurla() {
        if (this.sfxActivos) {
            this.risaBurlona.currentTime = 0;
            this.risaBurlona.play();
        }
    }
    
    reproducirRisa() {
        if (this.sfxActivos) {
            this.muahaha.currentTime = 0;
            this.muahaha.play();
        }
    }
    
    reproducirGrito() {
        if (this.sfxActivos) {
            this.gritoEco.currentTime = 0;
            this.gritoEco.play();
        }
    }
    
    reproducirLatido() {
       if (this.sfxActivos) {
           this.latido.currentTime = 0;
           this.latido.play();
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
    }    
    // Método que escucha cuando el usuario hace clic en los botones
    asignarEventos() {
        this.btnMusica.addEventListener("click", () => {
            this.estado.musica = !this.estado.musica; // Invierte el valor (true a false y viceversa)
            this.guardarMemoria(); // Guarda el cambio
            this.aplicarConfiguracion(); // Actualiza la pantalla y el audio
            this.audio.botonClick(); // Suena (solo si los SFX están activos)
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
                    this.audio.botonClick(); 
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
                    this.audio.botonClick(); 
                }
            });
        });
        
        // --- CLICS PARA LOS IDIOMAS ---
        this.btnLangEs.addEventListener("click", () => {
            this.estado.idioma = "es"; // Cambiamos la memoria a español
            this.guardarMemoria(); // Guardamos
            this.aplicarConfiguracion(); // Actualizamos botones y traducimos pantalla
            if (this.estado.sfx) { this.audio.botonClick(); } // Sonido
        });
        this.btnLangEn.addEventListener("click", () => {
            this.estado.idioma = "en"; // Cambiamos la memoria a inglés
            this.guardarMemoria(); 
            this.aplicarConfiguracion(); 
            if (this.estado.sfx) { this.audio.botonClick(); } 
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
        this.mensajeCondena = document.getElementById("mensajeCondena");
        this.dibujoMenu = document.getElementById("dibujoMenu");
        
        this.btnSistema = document.getElementById("btnSistema");
        this.btnAmigo = document.getElementById("btnAmigo");
        this.btnEmpezar = document.getElementById("btnEmpezar");
        this.btnAdivinar = document.getElementById("btnAdivinar");
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
        this.inputLetra = document.getElementById("inputLetra"); 
        this.inputPalabra = document.getElementById("inputPalabra");
        this.letrasUsadasTexto = document.getElementById("letrasUsadasTexto");
        this.tiempoRestante = document.getElementById("tiempoRestante");
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
    
    mostrarIngresoPalabra() {
        this.pantallaMenu.classList.add("oculto");
        this.pantallaJuego.classList.add("oculto");
        this.pantallaPalabra.classList.remove("oculto");
    }
    
    dibujarPalabra(arrayOculto) {
        // Recibimos los guiones bajos o letras adivinadas de class Juego y las dibujamos en la pantalla
        this.lineasPalabra.innerHTML = arrayOculto.map(caracter => `<span>${caracter}</span>`).join(" ");
    }
    
    dibujarAhorcado(fasesAhorcado) {
        // Dibujamos la variable recibida de Logistica dentro del espacio asignado por HTML
        this.dibujoAhorcado.innerHTML = fasesAhorcado;
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
    
    cambiarTextoBotonAdivinar(texto) {
    this.btnAdivinar.innerHTML = texto;
    }
    
    mostrarResultado(titulo, mensaje, textoBoton) {
        // 1. Escribimos mensajes en ventanas emergentes tal como nos mandan
        this.modalTitulo.innerHTML = `${titulo}`;
        this.modalMensaje.innerHTML = `${mensaje}`;
        this.modalOverlay.classList.remove("oculto");       
        // 2. Modificar la interfaz del juego (cuando se gana o se pierde)
        this.btnReiniciar.innerText = textoBoton; // Asigna el textoBoton ("Revivir" o "¿Quién dijo miedo?")
        this.btnReiniciar.classList.remove("oculto"); // quita la clase "oculto" al botón Reiniciar
        this.inputLetra.disabled = true; // bloquea el inputLetra
        this.btnAdivinar.classList.add("oculto"); // oculta el botón Adivinar
        this.btnReiniciar.classList.add("modo-revivir");
    }
    
    reiniciarInterfaz() {
        // Revertimos el punto 2 de mostrarResultado
        this.btnReiniciar.classList.add("oculto"); 
        this.inputLetra.disabled = false; 
        this.inputLetra.value = "";
        // this.contadorTurnos.textContent = "Turnos: " + this.turnos;
        this.btnAdivinar.classList.remove("oculto");
        this.mensajeCondena.classList.add("oculto");
        this.mensajeCondena.classList.remove("animar-condena");
        this.mensajeCondena.classList.remove("animar-victoria");
        this.pantallaJuego.classList.add("estado-jugando");
        this.btnReiniciar.classList.remove("modo-revivir");
        this.lineasPalabra.classList.remove("estado-muerto");
        this.inputLetra.parentElement.classList.remove("estado-muerto");
        this.letrasUsadasTexto.classList.remove("estado-muerto");
        this.tituloJuego.classList.remove("efecto-latido"); 
        this.tituloJuego.classList.remove("efecto-salvado");
        this.tituloJuego.classList.remove("efecto-fuego-interno");
        this.dibujoAhorcado.classList.remove("dibujo-victoria-cian");
        this.inputLetra.parentElement.classList.remove("estado-victoria");
        this.letrasUsadasTexto.classList.remove("estado-victoria");
        this.btnAdivinar.classList.remove("peligro-inminente");
        this.btnReiniciar.classList.remove("estado-victoria");
        this.tituloJuego.classList.remove("estado-victoria");
        
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
    
    mostrarPurgatorio(letra) {
        this.letrasUsadasTexto.innerHTML = letra;
    }
    
    mostrarConfirmacion() {
        this.modalConfirmOverlay.classList.remove("oculto");
    }
    
    ocultarConfirmacion() {
        this.modalConfirmOverlay.classList.add("oculto");
    }
}

// 4. DEPARTAMENTO DE LOGISTICA 
class Juego {
    constructor(herramientaAudio, herramientaUI, herramientaConfig) {
        this.audio = herramientaAudio;
        this.ui = herramientaUI;
        this.config = herramientaConfig;
        
        // Llamamos al súper método para que construya las variables por primera vez
        this.reiniciarEstado();
    }
    
    reiniciarEstado() {
        // Estado inicial del Juego
        clearInterval(this.cronometro); // Destruye cualquier reloj fantasma
        this.audio.latido.pause();      // Apaga cualquier latido fantasma
        this.turnos = this.config.estado.turnos;
        this.tiempoActual = this.config.estado.tiempo * 60; // Multiplicamos los minutos (1, 2, 3) por 60 para tener los segundos
        if (this.tiempoActual === 0) { // Si eligió 0 (Ninguno), mostraremos un símbolo de infinito
            this.ui.tiempoRestante.innerText = "∞";
        } else {
            this.ui.tiempoRestante.innerText = this.tiempoActual;
        }
        this.palabraSecreta = "";
        this.arrayOculto = [];
        this.letrasUsadas = [];
        this.ui.mensajeCondena.classList.add("oculto");   
        this.ui.tiempoRestante.classList.remove("latido-corazon"); // Limpiamos el efecto rojo
        this.ui.tiempoRestante.style.color = "#dfdede";
    }
    
    iniciarCronometro() {
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
                    this.audio.latido.currentTime = 0; 
                    this.audio.latido.play();
                }
            }
            // 4. FASE DE MUERTE: El tiempo llega a 0
            if (this.tiempoActual === 0) {
                clearInterval(this.cronometro); // Apagamos el reloj
                this.audio.latido.pause(); // Callamos el latido 
                //this.audio.detenerMusica(); // Detenemos la música
                this.ejecutarDerrotaPorTiempo(); // Llamamos al verdugo                                              
            }
        }, 1000);
    }
    
    ejecutarDerrotaPorTiempo() {
        // 1. Limpiamos el efecto de pánico del reloj        
        this.ui.tiempoRestante.classList.remove("latido-corazon");
        this.ui.tiempoRestante.style.color = "red";
        // 2. Forzamos la muerte para la Máquina de Estados
        this.turnos = 0;        
        this.ui.dibujoAhorcado.innerText = BaseDeDatos.dibujosASCII[10]; // Dibujo del ahorcado completo
        this.ui.pantallaJuego.classList.remove("estado-jugando"); // Eliminamos el estado Jugando para que se activen los efectos de la derrota
         
        // 3. Sonido de derrota
        if (this.audio.sfxActivos) {
            this.audio.muahaha.play();             
        }        
        // --- INYECCIÓN DE IDIOMA Y EFECTOS ---
        const idioma = this.config.estado.idioma;        
        this.ui.cambiarTitulo(DiccionarioIdioma[idioma].tituloDerrota); // Título de Derrota con su Efecto        
        let elementoCondena = this.ui.mensajeCondena; // Frase "ESTÁS CONDENADO"
        elementoCondena.innerHTML = DiccionarioIdioma[idioma].fraseSentenciaDerrota; // Le ponemos la frase de MUERTE
        elementoCondena.classList.remove("oculto");
        // 4. Mostramos el Modal de castigo
        this.ui.mostrarResultado(
            `<span class="texto-terror">${DiccionarioIdioma[idioma].modalDerrotaTiempoTitulo}</span>`, 
            DiccionarioIdioma[idioma].modalDerrotaMensaje, 
            DiccionarioIdioma[idioma].btnRevivir
        );
    }
    
    iniciarPartida(palabraManual = null) {
        // 1. Estado inicial del Juego
        this.reiniciarEstado();
        this.ui.pantallaJuego.classList.add("estado-jugando");
        
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
        let sueloInicial = BaseDeDatos.dibujosASCII[0];
        this.ui.dibujarAhorcado(sueloInicial);
        
        // 3. Reinicio de estados iniciales 
        this.ui.mostrarPurgatorio(DiccionarioIdioma[this.config.estado.idioma].letrasPurgatorio);
        this.ui.cambiarTitulo(DiccionarioIdioma[this.config.estado.idioma].tituloJuego);
        this.ui.cambiarTextoBotonAdivinar(DiccionarioIdioma[this.config.estado.idioma].btnAccionAdivinar);
        this.iniciarCronometro();
    }
    
    procesarLetra(letra) {
        if (this.letrasUsadas.includes(letra)) {
            alert(DiccionarioIdioma[this.config.estado.idioma].alertaLetraRepetida);
            return;
        }
        this.letrasUsadas.push(letra); // Esto guarda la letra usada para poder recordarla y usarla en el purgatorio de letras
        
        let letraPurgatorio = DiccionarioIdioma[this.config.estado.idioma].letrasPurgatorio + this.letrasUsadas.map(letra => {
            if (this.palabraSecreta.includes(letra)) {
                return `<span class="letra-acertada">${letra}</span>`;
            } else {
                return `<span class="letra-erronea">${letra}</span>`;
            }
        }).join(" - ");
        this.ui.mostrarPurgatorio(letraPurgatorio);
        
        if (this.palabraSecreta.includes(letra)) { // Si letra escrita se encuentra dentro de la palabraSecreta
            for (let i = 0; i < this.palabraSecreta.length; i++) { // Entonces busca esxactamente donde, pasando desde el inicio hasta el final de la palabra secreta
                if (this.palabraSecreta[i] === letra) { // Si la letra secreta coincide con la letra escrita
                    this.arrayOculto[i] = letra; // entonces el guión bajo (arrayOculto) que coincide con esa letra se convierte ahora en la letra escrita
                }
            }
            this.ui.dibujarPalabra(this.arrayOculto); // Mandamos hacer el cambio en la interfaz
        } else {
            this.turnos--; // Restamos 1 turno
            let fasesAhorcado = BaseDeDatos.dibujosASCII[10 - this.turnos]; // Restamos el número de turnos menos el número de errores y lo conectamos con la fase del dibujo que le corresponde, y lo guardamos en una variable
            this.ui.dibujarAhorcado(fasesAhorcado);  // Esta variable lo mandamos al método correspondiente en la interfaz
            
            if (this.turnos === 1) {
                this.ui.cambiarTextoBotonAdivinar(DiccionarioIdioma[this.config.estado.idioma].btnSellarDestino);
                // Activa el estado de pánico visual en el botón
                ui.btnAdivinar.classList.add("peligro-inminente");
            }
            
            if (this.turnos === 0) {
                clearInterval(this.cronometro);
                this.audio.latido.pause();
                this.audio.detenerMusica();                
                const idioma = this.config.estado.idioma; // Guardamos el idioma en una variable corta para no escribir tanto        
                this.ui.cambiarTitulo(DiccionarioIdioma[idioma].tituloDerrota);
                this.ui.mostrarResultado(
                    DiccionarioIdioma[idioma].modalDerrotaTitulo, 
                    DiccionarioIdioma[idioma].modalDerrotaMensaje, 
                    DiccionarioIdioma[idioma].btnRevivir
                );
                this.ui.pantallaJuego.classList.remove("estado-jugando");                
            }
        }
        
        if (!this.arrayOculto.includes("_")) { // Si te quedas sin guines bajos (literal, si arrayOculto no incluye "_")
            const idioma = this.config.estado.idioma;
            const dict = DiccionarioIdioma[idioma];
            // Armamos el mensaje combinando HTML con los datos de nuestro Objeto
            const mensajeVictoria = `
                <p>${dict.modalVictoriaMensaje}</p>
                <br>
                <div class="caja-concepto">
                    <p class="texto-terror"><strong>${dict.etiquetaPalabra}</strong> ${this.palabraActualObjeto.palabra}</p>
                    <p><strong>${dict.etiquetaVeredicto}</strong> ${this.palabraActualObjeto.concepto}</p>
                    <p class="frase-tematica">"${this.palabraActualObjeto.ejemplo}"</p>
                </div>
            `;
            // Lanzamos el modal con la información estructurada
            this.ui.mostrarResultado(
                dict.modalVictoriaTitulo,
                mensajeVictoria,
                dict.btnSiguientePrueba
            );            
            clearInterval(this.cronometro);
            this.audio.latido.pause();
            this.ui.cambiarTitulo(DiccionarioIdioma[idioma].tituloSalvado);
            this.ui.dibujarAhorcado(BaseDeDatos.dibujoVictoria[0]);
            document.getElementById("mensajeCondena").innerHTML = dict.fraseSentenciaVictoria;            
            this.ui.pantallaJuego.classList.remove("estado-jugando");
            return;
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
    // 2. Evaluamos el ESTADO del juego para saber qué sonido reproducir
    if (partida.turnos === 0) {    
        audio.botonClick();
        ui.iniciarEfectoTitulo();
        // 1. Capturamos los <span> que YA están en la pantalla
        const spansLetras = ui.lineasPalabra.querySelectorAll("span");
        // 2. Recorremos la palabra secreta original, letra por letra
        for (let i = 0; i < partida.palabraSecreta.length; i++) {    
        // Comparamos con lo que el jugador logró adivinar en el arrayOculto
        if (partida.arrayOculto[i] === "_") {
            // Si el jugador tenía un guion aquí, NO la adivinó. Invocamos al fantasma
            // Le cambiamos el texto a ESE span específico
            spansLetras[i].textContent = partida.palabraSecreta[i];
            // ...y le ponemos su clase de fantasma
            spansLetras[i].classList.add("letra-fantasma");
        }
    }
        // 3. Apagamos el contenedor general (como siempre)
        ui.lineasPalabra.classList.add("estado-muerto");
        audio.sonidoDerrota();
        ui.mensajeCondena.classList.remove("oculto");
        ui.mensajeCondena.classList.add("animar-condena");
        ui.lineasPalabra.classList.add("estado-muerto");
        ui.inputLetra.parentElement.classList.add("estado-muerto");
        ui.letrasUsadasTexto.classList.add("estado-muerto");
    } else if (partida.arrayOculto?.length > 0 && !partida.arrayOculto.includes("_")) {        
        audio.botonClick();
        ui.iniciarEfectoTitulo2();
        ui.iniciarEfectoTitulo3();
        audio.sonidoVictoria();
        ui.dibujoAhorcado.classList.add("dibujo-victoria-cian");        
        // 1. Aplicamos el efecto a las letras
        const spansLetras = ui.lineasPalabra.querySelectorAll("span");
        spansLetras.forEach(span => {
        span.classList.add("letra-ganadora");
        });
        // 2. Cambiamos la frase de condena por la de victoria        
        ui.mensajeCondena.classList.remove("oculto");
        ui.mensajeCondena.classList.add("animar-victoria"); // Una animación verde o blanca        
        // 3. Matamos el resto de elementos (purgatorio, input) pero en un tono distinto        
        ui.inputLetra.parentElement.classList.add("estado-victoria");
        ui.letrasUsadasTexto.classList.add("estado-victoria");
        ui.btnReiniciar.classList.add("estado-victoria");
    } else {
        audio.botonClick();    
        audio.iniciarMusica();
    }    
});
ui.btnConfig.addEventListener("click", () => {
    audio.botonClick(); 
    ui.mostrarConfiguracion();
});
ui.btnCerrarConfig.addEventListener("click", () => {
    audio.botonClick();
    ui.ocultarConfiguracion();
});
ui.btnSistema.addEventListener("click", () => {
    partida.modoJuego = "sistema";
    audio.botonDestino();
    audio.iniciarJuego();
    ui.mostrarJuego();
    ui.reiniciarInterfaz();
    partida.iniciarPartida();
});
ui.btnAdivinar.addEventListener("click", () => {    
    let letraEscrita = ui.inputLetra.value.toUpperCase(); // Toma el valor (letra) escrita en inputLetra, conviertela en mayusculas con toUpperCase y guardalo en la variable letraEscrita
    
    if (letraEscrita === "") {
        alert(DiccionarioIdioma[config.estado.idioma].alertaLetraVacia);
        return; 
    }
    audio.botonAdivinar();
    partida.procesarLetra(letraEscrita); // Envía la variable nueva al objeto partida y procesalo en su función procesarLetra
    
    if (partida.turnos === 0) {
        audio.detenerMusica();
    } else if (partida.arrayOculto && !partida.arrayOculto.includes("_")) {
        audio.detenerMusica();
        audio.sonidoVictoria2();
    } 
    ui.inputLetra.value = ""; // Limpia el inputLetra
});
ui.btnReiniciar.addEventListener("click", () => {
    audio.botonDestino();
    audio.iniciarJuego();
    ui.reiniciarInterfaz();
    
    if (partida.modoJuego === "amigo") {
        ui.mostrarIngresoPalabra();
    } else {
        partida.iniciarPartida();  
    }        
});
ui.btnSalirMenu.addEventListener("click", () => { 
    audio.reproducirRisa();
    const idioma = config.estado.idioma; // Averiguamos el idioma actual
    ui.mostrarResultado(
        DiccionarioIdioma[idioma].modalSalirMenuTitulo, 
        DiccionarioIdioma[idioma].modalSalirMenuMensaje,
        DiccionarioIdioma[idioma].btnBienvenida 
    );
});
ui.btnSalir.addEventListener("click", () => {    
    ui.mostrarConfirmacion();
    clearInterval(partida.cronometro);    
});
ui.btnConfirmNo.addEventListener("click", () => {
    audio.botonClick();
    ui.ocultarConfirmacion();
    // 2. Reanudamos el reloj SOLO si el juego sigue activo 
    // (turnos mayores a 0 y aún hay guiones por adivinar)
    if (partida.turnos > 0 && partida.arrayOculto.includes("_")) {
        partida.iniciarCronometro();
    }
});
ui.btnConfirmSi.addEventListener("click", () => {
    audio.detenerMusica();
    audio.botonClick();    
    ui.ocultarConfirmacion(); // Cerramos la ventana
    ui.ocultarJuego(); // Volvemos al menú    
    audio.reproducirBurla();    
    audio.iniciarMusica();
    partida.reiniciarEstado();
    ui.reiniciarInterfaz();
});
ui.btnAmigo.addEventListener("click", () => {
    partida.modoJuego = "amigo";
    audio.botonDestino();
    ui.mostrarIngresoPalabra();
});
ui.btnEmpezar.addEventListener("click", () => {
    audio.botonAdivinar();
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
