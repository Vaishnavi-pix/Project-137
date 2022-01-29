status="";
object=[];
function preload(){
    
}
function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(480,380);
    video.hide();
}
function start(){
    objectDetected=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Detecting Objects";
    object_name=document.getElementById("Object_Name").value;
}
function modelLoaded(){
    console.log("model loaded");
    status=true;
}
function gotResults(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        object=results;
    }
}
function draw(){
    image(video,0,0,480,380);
    if(status != ""){
        objectDetected.detect(video,gotResults);
        document.getElementById("status").innerHTML="Objects Detected";
        for(i=0;i<object.length;i++){
percent=floor(object[i].confidence * 100);
fill("red");
text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15);
noFill();
stroke("red");
rect(object[i].x,object[i].y,object[i].width,object[i].height);
if(object_name==object[i].label){
    video.stop()
    objectDetected.detect(gotResults);
    document.getElementById("object_found").innerHTML="Object Found";
    synth=window.speechSynthesis;
    utterThis= new SpeechSynthesisUtterance(object_name);
    synth.speak(utterThis);

}
else{
    document.getElementById("object_found").innerHTML="Object Mentioned Not Found";
}
        }
    }
}