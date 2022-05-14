let identificadorIntervaloDeTiempo; //variable que crea el temporizador para verificar
let webcam = null; //variable que almacena la camara
let camara = null; //variable para comprobar si la camara esta encendida
let tracker = null; //variable que almacena la informacion de la libreria del rastreador
let features = null; // lista de las caracteristicas faciales
let tiempo;


function getData() {
    "use strict";
    tiempo = document.getElementById("tiempo").value;
    
    if(tiempo < 0){
      tiempo = Math.abs(tiempo);
    }
    tiempo = tiempo * 1000;
}

//alertas de escritorio
Notification.requestPermission().then(function(result) {
  permitido = result;
});

//llama al objeto que contiene las alertas
const alertas = llamar_alertas();




//funcion que dibuja la camara, los ojos y la linea de la postura
function draw(){
  
  if(camara){
    translate(width,0);
    scale(-1, 1);
    image(webcam, 0,0)

    line(0,237,1000,237);
    line(0,238,1000,238);
    line(0,238,1000,238);
    line(0,239,1000,239);
    line(0,240,1000,240);

    stroke(0,0,0);
    features = tracker.getCurrentPosition();
    
    
    if(features.length > 0){
      //Dibujar ojos
      /*
      ojoD = Object.values(features[32])
      console.log(ojoD[1]);
      ojoI = Object.values(features[27]);
      console.log(ojoI[1]);
      */
      let leftEye = features[27];
      let leftEyeX = leftEye[0];
      let leftEyeY = leftEye[1];
      
      fill(0);
      stroke(255);
      ellipse(leftEyeX, leftEyeY, 10,10);
  
      var rightEyeX = features[32][0];
      var rightEyeY = features[32][1];;
      ellipse(rightEyeX, rightEyeY, 10,10);

      }
  }
}


//funcion que llama cada cierto intervalo de tiempo a la verificacion
function verificar() {
  identificadorIntervaloDeTiempo = setInterval(verificacion, tiempo);
}

function verificar_cada_tiempo() {
  identificadorIntervaloDeTiempo = setInterval(mandarMensaje, 15000);
}

//funcion que envia los mensajes y verifica 
function verificacion() {

        if(camara){
          if(features != false){
            ojoDerecho = Object.values(features[27]);
            ojoIzquierdo = Object.values(features[32]);

            if(ojoDerecho[1] > 252 || ojoIzquierdo[1] > 252){
              //numero aleatorio para enviar una alerta
              if(ojoDerecho[1] > 252 && ojoIzquierdo[1] < 252){
                document.getElementById("barra_derecha").style.backgroundColor = "red";
                document.getElementById("barra_izquierda").style.backgroundColor = "green";

              }
              else if(ojoIzquierdo[1] > 252 && ojoDerecho[1] < 252){
                document.getElementById("barra_izquierda").style.backgroundColor = "red";
                document.getElementById("barra_derecha").style.backgroundColor = "green";

              }
              else if((ojoDerecho[1] > 252 && ojoIzquierdo[1] > 252)){
                document.getElementById("barra_derecha").style.backgroundColor = "red";
                document.getElementById("barra_izquierda").style.backgroundColor = "red";
              }

            }
            
            
            if(ojoDerecho[1] <237 || ojoIzquierdo < 237){
              if(ojoDerecho[1] < 237 && ojoIzquierdo[1] > 237){
                document.getElementById("barra_izquierda").style.backgroundColor = "green";

              }
              if(ojoIzquierdo[1] < 237 && ojoDerecho > 237){
                document.getElementById("barra_izquierda").style.backgroundColor = "red";
                document.getElementById("barra_derecha").style.backgroundColor = "green";
              }
              else if((ojoDerecho[1] < 237 && ojoIzquierdo[1] < 237)){
                document.getElementById("barra_derecha").style.backgroundColor = "green";
                document.getElementById("barra_izquierda").style.backgroundColor = "red";
              }
            }
            
            if(ojoDerecho[1] < 252 && ojoIzquierdo[1] < 252 && ojoDerecho[1] > 237 && ojoIzquierdo[1] > 237){
              document.getElementById("barra_derecha").style.backgroundColor = "green";
              document.getElementById("barra_izquierda").style.backgroundColor = "green";
            }
          }
          else{
                document.getElementById("barra_derecha").style.backgroundColor = "#0000";
                document.getElementById("barra_izquierda").style.backgroundColor = "#0000";
          }
        }
}

function mandarMensaje() {

  if(camara){
    if(features != false){
      ojoDerecho = Object.values(features[27]);
      ojoIzquierdo = Object.values(features[32]);

      if(ojoDerecho[1] > 252 || ojoIzquierdo[1] > 252){
        //numero aleatorio para enviar una alerta
        let indice = Math.floor(Math.random() * (8 - 0)) + 0
        if(ojoDerecho[1] > 252 && ojoIzquierdo[1] < 252){
          var notification = new Notification('ALERTA', { body: "Te encuentras inclinado hacia la derecha, porfavor acomodate: " + alertas[indice]});

        }
        else if(ojoIzquierdo[1] > 252 && ojoDerecho[1] < 252){
          var notification = new Notification('ALERTA', { body: "Te encuentras inclinado hacia la izquierda, porfavor acomodate: " + alertas[indice]});

        }
        else if((ojoDerecho[1] > 252 && ojoIzquierdo[1] > 252)){
          var notification = new Notification('ALERTA', { body: "Te encuentras muy abajo de la postura recomendada, porfavor acomodate: " + alertas[indice]});
        }

      }
      
      
      if(ojoDerecho[1] <237 || ojoIzquierdo < 237){
        //numero aleatorio para enviar una alerta
        let indice = Math.floor(Math.random() * (8 - 0)) + 0
        if(ojoDerecho[1] < 237 && ojoIzquierdo[1] > 237){
          var notification = new Notification('ALERTA', { body: "Tienes la cabeza muy arriba por la parte derecha, porfavor acomodate: " + alertas[indice]});

        }
        if(ojoIzquierdo[1] < 237 && ojoDerecho[1] > 237){
          var notification = new Notification('ALERTA', { body: "Tienes la cabeza muy arriba por la parte izquierda, porfavor acomodate: " + alertas[indice]});
        }
        else if((ojoDerecho[1] < 237 && ojoIzquierdo[1] < 237)){
          var notification = new Notification('ALERTA', { body: "Te encuentras muy arriba de la postura recomendada, porfavor acomodate: " + alertas[indice]});
        }
      }
      
      if(ojoDerecho[1] < 252 && ojoIzquierdo[1] < 252 && ojoDerecho[1] > 237 && ojoIzquierdo[1] > 237){
        var notification = new Notification('ALERTA', { body: "Te encuentras en una buena postura"});
      }
    }
    else{
      var notification = new Notification('ALERTA', { body: "No se pudo detectar tus ojos"});
    }
  }
}

verificar();
verificar_cada_tiempo();