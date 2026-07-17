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