var juego = function(){
    let tiempo = 30;
    let movimiento = 20;
    let movimientoJugador = 20;
    let width = document.documentElement.clientWidth-movimiento
    let height = document.documentElement.clientHeight-movimiento
    let controlJuego;
    let barra1 = document.getElementById("jugador1")
    let barra2 = document.getElementById("jugador2")
    let jugador1;
    let jugador2;

    function start(){
        iniciar();
        controlJuego = setInterval(empezar, tiempo)
    }
     function iniciar(){
        pelota.style.left = 0;
        pelota.state = 1 ; 
        pelota.direction = 1; // derecha 1 , izquierda 2
        jugador1 = new Object();
        jugador2 = new Object();
        jugador1.keypress = false
        jugador2.keypress = false
        jugador1.key = null;
        jugador2.key = null;
     }
     function parar(){
        clearInterval(controlJuego)
        document.body.style.background = "#f00"
     }
     function empezar(){
        moverJugador();
     }
     function moverJugador(){
        if(jugador1.keypress){
            if(jugador1.key == "w" && barra1.offsetTop >=2){
                barra1.style.top = (barra1.offsetTop - movimientoJugador) + "px"
            }
             if(jugador1.key == "s" && (barra1.offsetTop + barra1.clientHeight-2) <= height){
                barra1.style.top = (barra1.offsetTop + movimientoJugador) + "px"
            } 
        }
        if(jugador2.keypress){
            if(jugador2.key == "o" && barra2.offsetTop >=2 ){
                barra2.style.top = (barra2.offsetTop - movimientoJugador) + "px"
            }
             if(jugador2.key == "l" && (barra2.offsetTop + barra2.clientHeight-2) <= height){
                barra2.style.top = (barra2.offsetTop + movimientoJugador) + "px"
            } 
        }
     }

     document.onkeydown = function(e){
        e=e 
        switch(e.key){
            case "w"  :
            case "s"  :
                jugador1.key = e.key;
                jugador1.keypress = true;
            break;
            case "o" :
            case "l" :
                jugador2.key = e.key;
                jugador2.keypress = true;
            break;
        }
        console.log(e.key)
     }
     document.onkeyup = function(e){
        if(e.key == "w" || "s" ){
            jugador1.keypress = false;
        }
        if(e.key == "o" || "l" ){
            jugador2.keypress = false;
        }

     }
    start();
}()