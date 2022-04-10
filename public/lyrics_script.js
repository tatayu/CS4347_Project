var lyrics;
var lcounter = 0;
var lcur_time = 0;
var lyrics_duration = 0;
fetch("/static/lyrics.json")
        .then(response => response.json())
        .then(data => {
            lyrics = data["Lyrics"]; 
            setInterval(change, 100);
        })

function change() {
    
    
    if(lcounter == 0 && lcur_time < lyrics[0].start){
        document.getElementById("lyrics").innerHTML = "";
    }
    else{
        document.getElementById("lyrics").innerHTML = lyrics[lcounter].line;
    }

    if(lcounter == 0){
        lyrics_duration = lyrics[lcounter + 1].start;
    }
    else if(lcounter == lyrics.length - 1){
        lyrics_duration = lyrics[lcounter].end - lyrics[lcounter].start;
    }
    else{
        lyrics_duration = lyrics[lcounter + 1].start - lyrics[lcounter].start;
    }

    if (lcur_time >= lyrics_duration ) {
        lcur_time = 0;
        if(lcounter == lyrics.length - 1){
            lcounter = 0;
        }
        else{
            lcounter += 1;
        }
    }

    console.log(lyrics_duration);
    console.log(lcur_time);
    lcur_time += 100;
}

