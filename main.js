ScoreLW=0
LWX=0
LWY=0
ScoreRW=0
RWX=0
RWY=0
var Music1=""
var Music2=""

function preload()
{
   Harry_Potter_Song = loadSound('music.mp3');
   Peter_Pan_Song = loadSound('music2.mp3');
}

function setup()
{
    canvas = createCanvas(300 , 300);
    canvas.center();
    Video = createCapture(VIDEO);
    Video.hide();
    posenet = ml5.poseNet(Video , modelLoaded);
    posenet.on('pose' , gotPoses);
}

function modelLoaded()
{
    console.log("PoseNet Initialized!");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        RWX = results[0].pose.rightWrist.x;
        RWY = results[0].pose.rightWrist.y;
        LWX = results[0].pose.leftWrist.x;
        LWY = results[0].pose.leftWrist.y;

        ScoreLW = results[0].pose.keypoints[9].score;
        ScoreRW = results[0].pose.rightWrist.confidence;
        console.log("Score Right Wrist --> "+ ScoreLW + " Score Left Wrist ", ScoreLW);

    }
}

function draw(){
    image(Video , 0 , 0 , 500 , 400);

    Music1 = Harry_Potter_Song.isPlaying();
    Music2 = Peter_Pan_Song.isPlaying();
    
    fill('#42f5b9');
    stroke('#42f5b9');

    if(ScoreLW > 0.02){

        circle(LWX , LWY , 20);

        if(Music2 == false){
            Harry_Potter_Song.stop();
            Peter_Pan_Song.play();
            document.getElementById("song_name").innerHTML = "Playing Peter Pan Song";

        }

    } 

    if(ScoreRW > 0.02){

        circle(RWX , RWY , 20);

        if(Music1 == false){
            Peter_Pan_Song.stop();
            Harry_Potter_Song.play();
            document.getElementById("song_name").innerHTML = "Playing Harry Potter Song";

        }

    } 

}

function play()
{
	song.play();
	song.setVolume(1);
	song.rate(1);
}