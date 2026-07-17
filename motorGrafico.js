class MotorGrafico {
    constructor() {
        this.canvas = document.getElementById('lienzoJuego');
        this.ctx = this.canvas.getContext('2d');
        
        console.log("Canvas: ", this.canvas);
        console.log("Width: ", this.canvas.width);
        console.log("Height: ", this.canvas.height);
        
        // Dimensiones maestras
        this.centroX = this.canvas.width / 2;
        this.sueloY = this.canvas.height - 100;

        // Variables de estado interno
        this.erroresActuales = 0;
        this.tiempo = 0;
        this.temblor = 0;

        // Matrices de seguimiento para transiciones e interpolación
        this.progresos = new Array(11).fill(0); 
        this.figX = this.centroX - 100;
        this.figY = this.sueloY - 150;
        this.rotacionSilla = 0;
        this.cuerdaY = this.sueloY - 230; 
        this.figScaleY = 1.0;
        this.cierreOjos = 1.0; 

        // Enlazar y arrancar el bucle continuo a 60 FPS
        this.bucleAnimacion = this.bucleAnimacion.bind(this);
        this.animacionActiva = false;
        this.animacionID = null; // Guardará el ID del proceso para poder matarlo

        this.bucleAnimacion = this.bucleAnimacion.bind(this);
        // Ya NO arrancamos el bucle aquí. Esperaremos la orden de la Interfaz.
    }
    
    iniciar() {
        if (!this.animacionActiva) {
            this.animacionActiva = true;
            this.bucleAnimacion(); // Arrancamos el motor
        }
    }

    pausar() {
        this.animacionActiva = false;
        if (this.animacionID) {
            cancelAnimationFrame(this.animacionID); // Matamos el proceso en la CPU
            this.animacionID = null;
        }
    }

    // El puente de comunicación con el juego
    actualizarErrores(numeroErrores) {
        console.log("Recibido: ", numeroErrores);
        if (this.erroresActuales !== numeroErrores) {
            this.erroresActuales = numeroErrores;
            if (this.erroresActuales === 10) {
                this.temblor = 15; // Sacudida controlada al colapsar la silla
            }
        }
        console.log("Errores actuales: ", this.erroresActuales);
    }

    bucleAnimacion() {
        if (!this.animacionActiva) return; // Seguridad extra por si entra un fotograma rezagado
        this.tiempo += 0.05;

        // 1. Procesar opacidades de cada pieza (Invocación lenta)
        for (let i = 1; i <= 10; i++) {
            let velocidadEmerge = (i === 2) ? 0.008 : 0.02; // Pilar vertical más lento
            if (this.erroresActuales >= i) {
                this.progresos[i] = Math.min(1.0, this.progresos[i] + velocidadEmerge);
            } else {
                this.progresos[i] = Math.max(0.0, this.progresos[i] - 0.05);
            }
        }

        // 2. Control del cierre de ojos en el error final
        if (this.erroresActuales === 10 && this.progresos[10] > 0.5) {
            this.cierreOjos = Math.max(0.0, this.cierreOjos - 0.002);
        } else if (this.erroresActuales < 10) {
            this.cierreOjos = 1.0;
        }

        // 3. Interpolación de posiciones (Desplazamientos suaves)
        let targetFigX = this.centroX - 100;
        let targetFigY = this.sueloY - 150;
        let targetRotacionSilla = 0;
        let targetCuerdaY = this.sueloY - 230;

        if (this.erroresActuales === 8) {
            targetFigX = this.centroX;
        } else if (this.erroresActuales === 9) {
            targetFigX = this.centroX + 50;
            targetFigY = this.sueloY - 170;
            targetCuerdaY = targetFigY - 60;
        } else if (this.erroresActuales === 10) {
            targetFigX = this.centroX + 50;
            targetFigY = this.sueloY - 140;
            targetCuerdaY = targetFigY - 60;
            targetRotacionSilla = Math.PI / 2.5;
        }

        this.figX += (targetFigX - this.figX) * 0.05;
        this.figY += (targetFigY - this.figY) * 0.08;
        this.rotacionSilla += (targetRotacionSilla - this.rotacionSilla) * 0.15;
        this.cuerdaY += (targetCuerdaY - this.cuerdaY) * 0.1;

        let targetScaleY = (this.erroresActuales === 10) ? 1.08 : 1.0;
        this.figScaleY += (targetScaleY - this.figScaleY) * 0.1;

        // 4. Aplicar efecto de impacto si es necesario
        if (this.temblor > 0) {
            const offsetX = (Math.random() - 0.5) * this.temblor;
            const offsetY = (Math.random() - 0.5) * this.temblor;
            this.ctx.setTransform(1, 0, 0, 1, offsetX, offsetY);
            this.temblor *= 0.9;
        } else {
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        }

        // 5. Renderizar escena limpia
        console.log("Errores: ", this.erroresActuales);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.dibujarLuzAmbiente();
        this.dibujarEscenario();
        this.dibujarAhorcado();

        // Guardamos el ID exacto de este fotograma para poder cancelarlo si el usuario cambia de skin
        this.animacionID = requestAnimationFrame(this.bucleAnimacion);
    }

    dibujarLuzAmbiente() {
        if (this.isVictoria) {
            this.ctx.fillStyle = `rgba(230, 220, 200, 0.1)`; // Destello blanco/hueso súper transparente
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    dibujarEscenario() {
        let resplandorMaldito = 0.5 + (this.erroresActuales * 0.05) + Math.sin(this.tiempo * 3) * 0.2;

        this.ctx.save();
        this.ctx.translate(this.centroX, this.sueloY);
        this.ctx.scale(1, 0.3);
        
        this.ctx.strokeStyle = 'rgba(255, 0, 0, 0.8)';
        this.ctx.shadowColor = "red";
        //this.ctx.shadowBlur = 15 * resplandorMaldito;
        this.ctx.lineWidth = 3;

        const radio = 180;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, radio, 0, Math.PI * 2);
        this.ctx.stroke();

        this.ctx.beginPath();
        for (let i = 0; i <= 5; i++) {
            const angulo = i * (Math.PI * 4 / 5) - Math.PI / 2;
            const px = Math.cos(angulo) * radio;
            const py = Math.sin(angulo) * radio;
            if (i === 0) this.ctx.moveTo(px, py);
            else this.ctx.lineTo(px, py);
        }
        this.ctx.stroke();
        this.ctx.restore();

        this.dibujarVelas();
    }

    dibujarVelas() {
        this.ctx.save();
        const radio = 180;

        for (let i = 0; i < 5; i++) {
            const angulo = i * (Math.PI * 2 / 5) - Math.PI / 2;
            const vx = this.centroX + Math.cos(angulo) * radio;
            const vy = this.sueloY + Math.sin(angulo) * radio * 0.3;

            const estaViva = this.erroresActuales < (i + 1) * 2;

            this.ctx.shadowBlur = 0;
            this.ctx.fillStyle = "#cfd8dc";
            this.ctx.fillRect(vx - 4, vy - 20, 8, 20);

            if (estaViva) {
                const parpadeo = Math.random() * 0.3;
                this.ctx.beginPath();
                this.ctx.fillStyle = `rgba(255, 180, 50, ${0.7 + parpadeo})`;
                //this.ctx.shadowColor = "orange";
                //this.ctx.shadowBlur = 20 + Math.random() * 15;
                this.ctx.arc(vx, vy - 25, 4, 0, Math.PI * 2);
                this.ctx.fill();
            } else {
                this.ctx.shadowBlur = 0;
                this.ctx.fillStyle = "rgba(100, 100, 100, 0.4)";
                this.ctx.beginPath();
                this.ctx.arc(vx, vy - 25 - (this.tiempo % 3) * 5, 3, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
        this.ctx.restore();
    }

    dibujarAhorcado() {
        this.ctx.save();
        this.ctx.fillStyle = "#3e2723";
        this.ctx.strokeStyle = "#1a100e";
        this.ctx.lineWidth = 2;
        this.ctx.shadowBlur = 0;

        const hx = this.centroX - 60;

        // Etapa 1: Base de madera
        if (this.progresos[1] > 0) {
            this.ctx.save();
            this.ctx.globalAlpha = this.progresos[1];
            this.ctx.fillRect(hx - 50, this.sueloY - 10, 100, 10);
            this.ctx.strokeRect(hx - 50, this.sueloY - 10, 100, 10);
            this.ctx.restore();
        }

        // Etapa 2: Pilar vertical lento
        if (this.progresos[2] > 0) {
            this.ctx.save();
            this.ctx.globalAlpha = this.progresos[2];
            const alturaPilar = 400 * this.progresos[2];
            this.ctx.fillRect(hx - 10, this.sueloY - alturaPilar, 20, alturaPilar);
            this.ctx.restore();
        }

        // Etapa 3: Viga horizontal superior
        if (this.progresos[3] > 0) {
            this.ctx.save();
            this.ctx.globalAlpha = this.progresos[3];
            this.ctx.fillRect(hx - 10, this.sueloY - 400, 140, 20);
            this.ctx.restore();
        }

        // Etapa 4: Soporte diagonal
        if (this.progresos[4] > 0) {
            this.ctx.save();
            this.ctx.globalAlpha = this.progresos[4];
            this.ctx.beginPath();
            this.ctx.moveTo(hx + 10, this.sueloY - 320);
            this.ctx.lineTo(hx + 70, this.sueloY - 380);
            this.ctx.lineTo(hx + 70, this.sueloY - 400);
            this.ctx.lineTo(hx + 10, this.sueloY - 340);
            this.ctx.fill();
            this.ctx.restore();
        }

        // Etapa 5: Cuerda
        if (this.progresos[5] > 0) {
            this.ctx.save();
            this.ctx.globalAlpha = this.progresos[5];
            this.ctx.strokeStyle = "#8d6e63";
            this.ctx.lineWidth = 4;
            this.ctx.beginPath();
            this.ctx.moveTo(this.centroX + 50, this.sueloY - 380);
            this.ctx.lineTo(this.centroX + 50, this.cuerdaY);
            this.ctx.stroke();
            
            if (this.erroresActuales < 9 && this.progresos[5] > 0.5) {
                this.ctx.beginPath();
                this.ctx.arc(this.centroX + 50, this.cuerdaY + 15, 15, 0, Math.PI * 2);
                this.ctx.stroke();
            }
            this.ctx.restore();
        }

        // Etapa 6: La Silla
        if (this.progresos[6] > 0) {
            this.ctx.save();
            this.ctx.globalAlpha = this.progresos[6];
            this.ctx.translate(this.centroX + 30, this.sueloY - 10);
            this.ctx.rotate(this.rotacionSilla);
            this.ctx.translate(-(this.centroX + 30), -(this.sueloY - 10));

            this.ctx.fillStyle = "#2d1a11";
            this.ctx.fillRect(this.centroX + 25, this.sueloY - 70, 50, 10);
            this.ctx.fillRect(this.centroX + 30, this.sueloY - 60, 8, 60);
            this.ctx.fillRect(this.centroX + 62, this.sueloY - 60, 8, 60);
            this.ctx.fillRect(this.centroX + 25, this.sueloY - 120, 8, 50);
            this.ctx.restore();
        }

        // Etapas 7 a 10: La Figura Encapuchada
        if (this.progresos[7] > 0) {
            this.ctx.save();
            this.ctx.globalAlpha = this.progresos[7];
            this.ctx.translate(this.figX, this.figY);
            this.ctx.scale(1, this.figScaleY);

            this.ctx.fillStyle = "#795548";
            
            // Túnica
            this.ctx.beginPath();
            this.ctx.moveTo(0, -60);
            this.ctx.quadraticCurveTo(30, -20, 30, 100);
            this.ctx.lineTo(-30, 100);
            this.ctx.quadraticCurveTo(-30, -20, 0, -60);
            this.ctx.fill();

            // Capucha
            this.ctx.beginPath();
            this.ctx.arc(0, -80, 25, 0, Math.PI * 2);
            this.ctx.fill();

            // Ojos lentos escarlata
            if (this.progresos[8] > 0 && this.cierreOjos > 0) {
                this.ctx.fillStyle = `rgba(255, 50, 50, ${this.progresos[8] * 0.8})`;
                this.ctx.shadowColor = "red";
                this.ctx.shadowBlur = 10;
                
                const offsetOjos = (this.erroresActuales === 10) ? 10 : 0;
                this.ctx.beginPath();
                this.ctx.ellipse(-8, -85 + offsetOjos, 2, 2 * this.cierreOjos + 0.01, 0, 0, Math.PI * 2);
                this.ctx.ellipse(8, -85 + offsetOjos, 2, 2 * this.cierreOjos + 0.01, 0, 0, Math.PI * 2);
                this.ctx.fill();
            }
            this.ctx.restore();
        }
        this.ctx.restore();
    }
    
    reset() {
        // 1. Reseteamos estados y errores
        this.erroresActuales = 0;
        this.isVictoria = false;
        this.progresoPiedad = 0.0;
        this.temblor = 0;
        this.tiempo = 0;

        // 2. Vaciamos por completo el progreso de dibujo de la horca (esencial)
        this.progresos.fill(0);

        // 3. Devolvemos al muñeco y a la silla a sus posiciones iniciales de fábrica
        this.figX = this.centroX - 100;
        this.figY = this.sueloY - 150;
        this.rotacionSilla = 0;
        this.cuerdaY = this.sueloY - 230;
        this.figScaleY = 1.0;
        this.cierreOjos = 1.0;
    }
}