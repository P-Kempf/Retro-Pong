var juego = function () {
    let tiempo = 100;
    let movimiento = 20;
    let movimientoJugador = 20;
    let width = document.documentElement.clientWidth - movimiento
    let height = document.documentElement.clientHeight - movimiento
    let controlJuego;
    let barra1 = document.getElementById("jugador1")
    let barra2 = document.getElementById("jugador2")
    let pelota = document.getElementById("pelota")
    let marcador1 = document.getElementById("jugador1score")
    let marcador2 = document.getElementById("jugador2score")
    let jugador1;
    let jugador2;
    var jugador1score = 0;
    var jugador2score = 0;
    const startButton = document.getElementById('start-button');
    const pressSpacebar = document.getElementById('press-spacebar');
    const gameContainer = document.getElementById('game-container');
    let gameStarted = false;

    function start() {
        gameStarted = true;
        startButton.style.display = 'none';
        pressSpacebar.style.display = 'none';
        iniciar();
        controlJuego = setInterval(empezar, tiempo)
    }
    function iniciar() {

        pelota.style.left = 0;
        pelota.state = 1;
        pelota.direction = 1; // derecha 1 , izquierda 2
        jugador1 = new Object();
        jugador2 = new Object();
        jugador1.keypress = false
        jugador2.keypress = false
        jugador1.key = null;
        jugador2.key = null;
    }
    function parar() {
        if(jugador1score || jugador2score == 2){
        pressSpacebar.innerText = 'Fin de la Partida';
        pressSpacebar.style.display = 'block';
        
        }
        else{
        clearInterval(controlJuego)
        gameStarted = false;
        startButton.innerText = 'Continue';
        pressSpacebar.innerText = 'Press Bar Space to Continue';
        startButton.style.display = 'block';
        pressSpacebar.style.display = 'block';
        }
    }
    function empezar() {
        moverJugador();
        moverpelota();
        marcarPunto();
    }
    function marcarPunto() {
        if (pelota.offsetLeft >= width) {
            parar();
            jugador1score++
            marcador1.innerHTML = jugador1score
        }
        if (pelota.offsetLeft <= 0) {
            parar();
            jugador2score++
            marcador2.innerHTML = jugador2score
        }
    }
    function moverJugador() {
        if (jugador1.keypress) {
            if (jugador1.key == "w" && barra1.offsetTop >= 2) {
                barra1.style.top = (barra1.offsetTop - movimientoJugador) + "px"
            }
            if (jugador1.key == "s" && (barra1.offsetTop + barra1.clientHeight - 2) <= height) {
                barra1.style.top = (barra1.offsetTop + movimientoJugador) + "px"
            }
        }
        if (jugador2.keypress) {
            if (jugador2.key == "o" && barra2.offsetTop >= 2) {
                barra2.style.top = (barra2.offsetTop - movimientoJugador) + "px"
            }
            if (jugador2.key == "l" && (barra2.offsetTop + barra2.clientHeight - 2) <= height) {
                barra2.style.top = (barra2.offsetTop + movimientoJugador) + "px"
            }
        }
    }

    document.onkeydown = function (e) {
        e = e
        switch (e.key) {
            case "w":
            case "s":
                jugador1.key = e.key;
                jugador1.keypress = true;
                break;
            case "o":
            case "l":
                jugador2.key = e.key;
                jugador2.keypress = true;
                break;
        }
        console.log(e.key)
    }
    document.onkeyup = function (e) {
        if (e.key == "w" || "s") {
            jugador1.keypress = false;
        }
        if (e.key == "o" || "l") {
            jugador2.keypress = false;
        }

    }
    function moverpelota() {
        comprobarEstadoPelota();
        switch (pelota.state) {
            case 1: // derecha , abajo
                pelota.style.left = (pelota.offsetLeft + movimiento) + "px"
                pelota.style.top = (pelota.offsetTop + movimiento) + "px"
                break;
            case 2: // derecha , arriba
                pelota.style.left = (pelota.offsetLeft + movimiento) + "px"
                pelota.style.top = (pelota.offsetTop - movimiento) + "px"
                break;
            case 3: // izquierda , abajo
                pelota.style.left = (pelota.offsetLeft - movimiento) + "px"
                pelota.style.top = (pelota.offsetTop + movimiento) + "px"
                break;
            case 4: // izquierda , arriba
                pelota.style.left = (pelota.offsetLeft - movimiento) + "px"
                pelota.style.top = (pelota.offsetTop - movimiento) + "px"
                break;
        }
    }
    function comprobarEstadoPelota() {

        if (colisionarJugador1()) {
            pelota.direction = 1;
            if (pelota.state == 3) pelota.state = 1;
            if (pelota.state == 4) pelota.state = 2;
        }
        else if (colisionarJugador2()) {
            pelota.direction = 2;
            if (pelota.state == 1) pelota.state = 3;
            if (pelota.state == 2) pelota.state = 4;
        }
        if (pelota.direction === 1) {
            if (pelota.offsetTop >= height) pelota.state = 2;
            else if (pelota.offsetTop <= 0) pelota.state = 1;
        }
        else {
            if (pelota.offsetTop >= height) pelota.state = 4;
            else if (pelota.offsetTop <= 0) pelota.state = 3;
        }
    }

    function colisionarJugador1() {
        if (pelota.offsetLeft <= (barra1.clientWidth) &&
            pelota.offsetTop >= barra1.offsetTop &&
            pelota.offsetTop <= (barra1.offsetTop + barra1.clientHeight)) {
            return true
        }
        return false
    }
    function colisionarJugador2() {
        if (pelota.offsetLeft >= (width - barra2.clientWidth) &&
            pelota.offsetTop >= barra2.offsetTop &&
            pelota.offsetTop <= (barra2.offsetTop + barra2.clientHeight)) {
            return true
        }
        return false
    }
    startButton.addEventListener('click', start);

    document.addEventListener('keydown', event => {
        if (event.code === 'Space' && !gameStarted) {
            start();
        }
    });


}()