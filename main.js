function preload(){
    alarm="alarm.mp3"
    status1="";
    objects=[];
}

function setup(){
    canvas=createCanvas(380, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Baby is Detected";
}

function modelLoaded(){
    console.log("Model is loaded?");
    status1=true;
    
}
function gotResults(error,results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        objects=results;
    }
}

function draw(){
    image(video,0,0,380,380);
    if (status1 !=""){
        objectDetector.detect(video,gotResults);
        for(i=0; i<objects.length; i++){
            fill(255,0,0);
                percent=floor(objects[i].confidence*100);
                text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
                noFill();
                stroke(255,0,0);
                rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height); 
            if(objects.label='person'){
                document.getElementById("status").innerHTML="Status: Baby is Detected"
                document.getElementById("baby").innerHTML="Baby Found";
                console.log("Person Detected");
                
            }else{
                document.getElementById("status").innerHTML="Status: Baby is not Detected"
                document.getElementById("baby").innerHTML="Baby not found, sounding alarm";
                console.log("Person Not Detected");
                play(alarm);
            }
            
            
        }
    }
}