// Versión síncrona:
// Crear un nuevo Game y llamar al método start
// const game = new Game();
// game.start();

// Versión asíncrona:

// Inciar un intervalo para mostras los segundos restantes en la consola
// Recuerda 'cancelar' el intervalo cuando llegue a 0 segundos

function startGameWithCountdown() { //Define una función startGameWithCountdown que inicia el proceso de cuenta regresiva.
    let timeCount = 10; // Iniciar un contador de 10 segundos antes de empezar el juego
    const intervalId = setInterval(() => { // Configura un intervalo que se ejecuta cada segundo (1000 milisegundos).
        console.clear();
        console.log(`El juego empezará en... ${timeCount}`);
        timeCount--; //Resta 1 al valor de timeCount en cada iteración.

        if (timeCount < 0) { //Comprueba si timeCount es menor que 0.
            clearInterval(intervalId); //Si es así, se detiene el intervalo utilizando clearInterval(intervalId).
        }
    }, 1000);

    setTimeout(() => {
        const game = new Game(); // Aquí se crea una nueva instancia de la clase Game.
        game.start(); //Llama al método start() en la instancia de Game.
    }, (timeCount + 1) * 1000); // Esto significa que se ejecutará después de timeCount + 1 segundos.

}

startGameWithCountdown();

