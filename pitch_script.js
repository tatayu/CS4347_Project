var melody
fetch("pitch.json")
        .then(response => response.json())
        .then(data => {
            melody = data; 
        })

const canvas = document.querySelector('.myCanvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = 350;

const ctx = canvas.getContext('2d');
// ctx.fillStyle = 'rgb(0, 0, 0)';
// ctx.fillRect(0, 0, width, height);

var flag = true;
var x = 0;
var position = [];
var total_duration = 0;
var durationlist = [];
//window.requestAnimationFrame(mv);

// const VF = Vex.Flow;
// var vf = new VF.Factory({renderer: {elementId: 'boo'}});
// var score = vf.EasyScore();
// var system = vf.System();

setInterval(mv, 10);

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
        for(let i = 0; i < melody.length; i++) {
            ctx.fillStyle = "rgb(160, 207, 236)";
            let duration = (melody[i].end - melody[i].start)/10; //need scaling according to time
            durationlist.push(duration);
            
            //console.log(total_duration);
            ctx.fillRect(width/2+total_duration, height - melody[i].pitch*2, duration, 10);     
            position.push(width/2+total_duration);
            total_duration += duration;
            flag = false;
        }
    }
    else{ //upate to new position
        for(let i = 0; i < melody.length; i++) {
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
            // ctx.fillStyle = "red";
            // ctx.fillRect(width/2 - 10, height - melody[j].pitch*3-20, 20, 20);

            //using image
            star = new Image();
            star.src = "pngegg.png";
            ctx.drawImage(star, width/2 - 40, height - melody[j].pitch*3-55, 80, 80);
        }
    }
    
    // const VF = Vex.Flow;
    // var vf = new VF.Factory({renderer: {elementId: 'boo'}});
    // var score = vf.EasyScore();
    // var system = vf.System();
    // var n = "C#5/q, B4, A4, G#5";
    // system.addStave({
    // voices: [score.voice(score.notes(n))]
    // }).addClef('treble').addTimeSignature('4/4');

    // vf.draw();
}


//loop
/*
ctx.translate(width/2, height/2);

function degToRad(degrees) {
    return degrees * Math.PI / 180;
  };
  
  function rand(min, max) {
    return Math.floor(Math.random() * (max-min+1)) + (min);
  }
  
  let length = 250;
  let moveOffset = 20;
  
  for (let i = 0; i < length; i++) {
    ctx.fillStyle = `rgba(${255-length},0,${255-length},0.9)`;
    ctx.beginPath();
    ctx.moveTo(moveOffset,moveOffset);
    ctx.lineTo(moveOffset+length,moveOffset);
    const triHeight = length/2 * Math.tan(degToRad(60));
    ctx.lineTo(moveOffset+(length/2),moveOffset+triHeight);
    ctx.lineTo(moveOffset,moveOffset);
    ctx.fill();

    length--;
    moveOffset += 0.7;
    ctx.rotate(degToRad(5));

  }*/


  
  

// ctx.fillStyle = 'rgb(0, 0, 0)';
// ctx.fillRect(0, 0, width, height);

// ctx.fillStyle = 'rgb(255, 0, 0)';
// ctx.fillRect(50, 50, 100, 150);

// ctx.fillStyle = 'rgb(0, 255, 0)';
// ctx.fillRect(75, 75, 100, 100);

// ctx.strokeStyle = 'rgb(255, 255, 255)';
// ctx.lineWidth = 5;
// ctx.strokeRect(25, 25, 175, 200);

// ctx.fillStyle = 'rgb(255, 0, 0)';
// ctx.beginPath();
// ctx.moveTo(50, 50);
// draw your path
// ctx.fill();


