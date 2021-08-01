song="";
leftWristX=0;
leftWristY=0;
RightWristY=0;
RightWristX=0;
function preload(){
    song=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(500,500);
    canvas.position(480,300);

    video=createCapture(VIDEO);
    video.hide();
    poseNet= ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function draw(){
    image(video,0,0,500,500);
    fill("thistle");
    stroke("black");
    circle(leftWristX,leftWristY,40);
    circle(RightWristX,RightWristY,40);
    if(RightWristY>0 && RightWristY<=100){
        document.getElementById("speed1").innerHTML="speed=0.5x";
        song.rate(0.5);
    }
    if(RightWristY>100 && RightWristY<=200){
        document.getElementById("speed1").innerHTML="speed=1x";
        song.rate(1);
    }
    if(RightWristY>200 && RightWristY<=300){
        document.getElementById("speed1").innerHTML="speed=1.5x";
        song.rate(1.5);
    }
    if(RightWristY>300 && RightWristY<=400){
        document.getElementById("speed1").innerHTML="speed=2x";
        song.rate(2);
    }
    if(RightWristY>400 && RightWristY<=500){
        document.getElementById("speed1").innerHTML="speed=2.5x";
        song.rate(2.5);
    }
    numberLWY=Number(leftWristY);
    removeD=floor(numberLWY);
    volume=removeD/500
    document.getElementById("volume1").innerHTML="volume= "+volume;
    song.setVolume(volume);
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded(){
    console.log("poseNet is initialised")
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX= "+leftWristX +" leftWristY= "+leftWristY);
        RightWristX=results[0].pose.rightWrist.x;
        RightWristY=results[0].pose.rightWrist.y;
        console.log("RightWristX= "+RightWristX +" RightWristY= "+RightWristY);
    }
}
