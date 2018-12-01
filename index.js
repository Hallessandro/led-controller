var five = require('johnny-five'); 
var http = require('http');
const express = require("express");

const app = express();

var board = new five.Board();
var isReady = false;
var isOn = false;
var led;

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});

// quando a placa se conecta e está pronta... 
board.on('ready', function() { 
    // instanciamos um led no pino 13 
    led = new five.Led(13);

    // certificamos que o led estará desligado 
    led.off();

    // setamos a variável que usamos para 
    // saber o estado atual da placa 
    isReady = true; 
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.route("/")
    .get((req, res) => {
        toggleLed();
        res.json({status: isOn});
    });

// Função responsável por ligar e desligar o led 
function toggleLed () {

    // Se a placa não estiver pronta 
    // a execução não prossegue 

    if (!isReady) { return; }

    // Se o led estiver ligado... 
    if (isOn) {

        // o método off é chamado, desligando-o
        led.off();

        // a variável recebe false
        isOn = false;

    } else {

        // se o led estiver desligado, o método on
        //  é chamado, ligando-o
        led.on();

        // a variável recebe true
        isOn = true;
    }
} 