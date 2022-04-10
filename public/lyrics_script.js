var lyrics;
var lcounter = 0;
var lcur_time = 0;
fetch("/static/lyrics.json")
        .then(response => response.json())
        .then(data => {
            lyrics = data["Lyrics"]; 
            setInterval(change, 1000);
        })




function change() {
    
    document.getElementById("lyrics").innerHTML = lyrics[lcounter].line;

    if (lcur_time == lyrics[lcounter].duration) {
        lcounter ++;
        lcur_time = 0;
        if(lcounter >= lyrics.length) {lcounter = 0;}
    }
    lcur_time += 1000;
}

