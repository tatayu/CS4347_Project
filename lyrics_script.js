var lyrics;
var lcounter = 0;
var lcur_time = 0;
fetch("lyrics.json")
        .then(response => response.json())
        .then(data => {
            lyrics = data; 
        })

setInterval(change, 1000);

function change() {
    lcur_time += 1000;
    document.getElementById("lyrics").innerHTML = lyrics[lcounter].line;
    if (lcur_time == lyrics[lcounter].duration) {
        lcounter ++;
        lcur_time = 0;
        if(lcounter >= lyrics.length) {lcounter = 0;}
    }
}

