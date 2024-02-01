function prenderCamara(){
    

        createCanvas(640, 480);
        //crear camara 
        webcam = createCapture(VIDEO);
        webcam.size(width,height);
        camara = true
        webcam.hide();
        
        
        tracker = new clm.tracker();
        tracker.init();
        tracker.start(webcam.elt);
        
       
    
}
    function apagarCamara() {
        //webcam.stop()
    location.reload();
    camara = false;
    clearInterval(identificadorIntervaloDeTiempo);
}

prenderCamara();