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
        
        // Ganchos aleatorios de Victoria
        titulosVictoriaDinamicos: [
            "Archivos del inframundo:",
            "Un alma más sabia:",
            "Atesora este saber:"
        ],
        // Ganchos aleatorios de Derrota
        titulosDerrotaDinamicos: [
            "Conoce a tu verdugo:",
            "Lo que te llevó a la tumba:",
            "La lección detrás de la soga:"
        ],

        // Textos para el nuevo botón final estilo teclado
        teclaRevivir: "REVIVIR", // Una letra por tecla en CSS
        teclaDesafiar: "DESAFIAR"
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
        
        // --- Dynamic End Screen Update ---
        titulosVictoriaDinamicos: [
            "Underworld archives:",
            "A wiser soul:",
            "Treasure this knowledge:"
        ],
        titulosDerrotaDinamicos: [
            "Meet your executioner:",
            "What led you to the grave:",
            "The lesson behind the rope:"
        ],

        teclaRevivir: "RESURRECT",
        teclaDesafiar: "CHALLENGE",    
    }
};