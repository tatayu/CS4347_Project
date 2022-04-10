
//import axios from 'axios';
//const axios = require('axios');
var melody;
window.onload = async function() {
    var url = "/static/pitch.json";

    await axios.get(url).then(async function(result){
        melody = result.data["Pitch"];
        console.log(melody);
        melody_len = melody.length;

        setInterval(mv, 10);
    }
    )
}



const canvas = document.querySelector('.myCanvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = 300;

const ctx = canvas.getContext('2d');
// ctx.fillStyle = 'rgb(0, 0, 0)';
// ctx.fillRect(0, 0, width, height);

var flag = true;
var x = 0;
var position = [];
var total_duration = 0;
var durationlist = [];
//window.requestAnimationFrame(mv);


function mv() {
    //ctx.fillStyle = 'blue';
    //ctx.fillRect(0, 0, width, height);
    ctx.clearRect(0, 0, width, height);
    
    //middle line
    ctx.strokeStyle = "rgb(240, 230, 140)";
    ctx.lineWidth = 4;
    ctx.moveTo(width/2, height);
    ctx.lineTo(width/2, 0);
    ctx.stroke();

    //set initial position
    if (flag == true) { 
        for(let i = 0; i < melody_len; i++) {
            ctx.fillStyle = "rgb(160, 207, 236)";
            let duration = (melody[i].end - melody[i].start)*100; //need scaling according to time
            durationlist.push(duration);
            
            //console.log(total_duration);
            ctx.fillRect(width/2+melody[i].start*100, height - melody[i].pitch*3, duration, 12);     
            position.push(width/2+melody[i].start*100);
            total_duration += duration;
            flag = false;
        }
    }
    else{ //upate to new position
        for(let i = 0; i < melody_len; i++) {
            //console.log(melody.length);
            //ctx.fillStyle = "red";
            let duration = durationlist[i];
            position[i] -= 1;
            if(position[i] <= width/2 ) {   
            //if(position[i] <= width/2 && position[i] >= width/2 - duration) {      
                ctx.fillStyle = "rgb(240, 230, 140)";
                ctx.fillRect(position[i], height - melody[i].pitch*3, duration, 12); //pitch*n for scaling
            }
            else {
                ctx.fillStyle = "rgb(160, 207, 236)";
                ctx.fillRect(position[i], height - melody[i].pitch*3, duration, 12);
            }
        }
    }
    
    //draw the jumping star
    for(let j = 0; j < position.length; j++) {
        if(position[j] <= width/2 && position[j] >= width/2 - durationlist[j]) {

            //using image
            star = new Image();
            star.src = "/static/pngegg.png";
            ctx.drawImage(star, width/2 - 40, height - melody[j].pitch*3-55, 80, 80);
        }
    }
}



