
const score_canvas = document.querySelector('.score');
//const staff = document.getElementById('boo');
const context = score_canvas.getContext('2d');
// score_canvas.width = window.innerWidth;
// score_canvas.height = 200;

const MiditoNote = {
    21: "a/0",
    22: "a#/0",
    23: "b/0",
    24: "c/1",
    25: "c#/1",
    26: "d/1",
    27: "d#/1",
    28: "e/1",
    29: "f/1",
    30: "f#/1",
    31: "g/1",
    32: "g#/1",
    33: "a/1",
    34: "a#/1",
    35: "b/1",
    36: "c/2",
    37: "c#/2",
    38: "d/2",
    39: "d#/2",
    40: "e/2",
    41: "f/2",
    42: "f#/2",
    43: "g/2",
    44: "g#/2",
    45: "a/2",
    46: "a#/2",
    47: "b/2",
    48: "c/3",
    49: "c#/3",
    50: "d/3",
    51: "d#/3",
    52: "e/3",
    53: "f/3",
    54: "f#/3",
    55: "g/3",
    56: "g#/3",
    57: "a/3",
    58: "a#/3",
    59: "b/3",
    60: "c/4",
    61: "c#/4",
    62: "d/4",
    63: "d#/4",
    64: "e/4",
    65: "f/4",
    66: "f#/4",
    67: "g/4",
    68: "g#/4",
    69: "a/4",
    70: "a#/4",
    71: "b/4",
    72: "c/5",
    73: "c#/5",
    74: "d/5",
    75: "d#/5",
    76: "e/5",
    77: "f/5",
    78: "f#/5",
    79: "g/5",
    80: "g#/5",
    81: "a/5",
    82: "a#/5",
    83: "b/5",
    84: "c/6",
    85: "c#/6",
    86: "d/6",
    87: "d#/6",
    88: "e/6",
    89: "f/6",
    90: "f#/6",
    91: "g/6",
    92: "g#/6",
    93: "a/6",
    94: "a#/6",
    95: "b/6",
    96: "c/7",
    97: "c#/7",
    98: "d/7",
    99: "d#/7",
    100: "e/7",
    101: "f/7",
    102: "f#/7",
    103: "g/7",
    104: "g#/7",
    105: "a/7",
    106: "a#/7",
    107: "b/7",
    108: "c/8",
    109: "c#/8",
    110: "d/8",
    111: "d#/8",
    112: "e/8",
    113: "f/8",
    114: "f#/8",
    115: "g/8",
    116: "g#/8",
    117: "a/8",
    118: "a#/8",
    119: "b/8",
    120: "c/9",
    121: "c#/9",
    122: "d/9",
    123: "d#/9",
    124: "e/9",
    125: "f/9",
    126: "f#/9",
    127: "g/9"
};


const {
    Renderer,
    Stave,
    StaveNote,
    Voice,
    Formatter
  } = Vex.Flow;

var counter = 0;
var score_len;
var num_set = 0;
var last_set = 0;
var set_counter = 0
var j = 0;
var set_list = [];
var set_duration_sum = [];
var set_duration_list = [];

//draw_score();
//setInterval(draw_score, 1000);


var score;

async function run (){
    await fetch("/static/pitch.json")
        .then(response => response.json())
        .then(data => {
            score = data["Pitch"]; 
            score_len = score.length;
            num_set = score_len / 4 + 1; //total number of sets with 4 notes per set
            if(score_len % 4 > 0){
                num_set = num_set + 1;
            }

            for (let i = 0; i < num_set; i ++) {
                set_list.push(i);
                set_list[i] = [];
                set_duration_sum.push(i);
                set_duration_list.push(i);
                set_duration_list[i] = [];
                set_duration_sum[i] = 0;
            }

            let s = 0;
            while ( j < score_len) {
                for (let i = 0; i < 4; i ++) {
                    set_list[s].push(score[j].pitch);
                    //console.log(set_list[s][0]);
                    if(j == score_len - 1){
                        set_duration_sum[s] += (score[j].end - score[j].start)*1000;
                        set_duration_list[s].push((score[j].end - score[j].start)*1000);
                    }
                    else if(j == 0){
                        set_duration_sum[s] += (score[j+1].start - 0)*1000;
                        set_duration_list[s].push((score[j+1].start - 0)*1000);
                    }
                    else {
                        set_duration_sum[s] += (score[j+1].start - score[j].start)*1000;
                        set_duration_list[s].push((score[j+1].start - score[j].start)*1000);
                    }
                    j ++;
                }
                s ++;
            }

            setInterval(draw_score, 100);
        })
}

run();

var current_time = 0;
var current_note_time = 0;
var current_set = 0;
function draw_score(){
    const div = document.getElementById("boo");

    while(div.hasChildNodes()){
        div.removeChild(div.lastChild);
    }

    const { Renderer, Stave } = Vex.Flow;

    // Create an SVG renderer and attach it to the DIV element named "boo".
    const renderer = new Renderer(div, Renderer.Backends.SVG);

    // Configure the rendering context.
    renderer.resize(500, 200);
    const context = renderer.getContext();

    // Create a stave of width 400 at position 10, 40 on the canvas.
    const stave = new Stave(10, 40, 400);
   

    // Add a clef and time signature.
    stave.addClef("treble").addTimeSignature("4/4");

    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();

    // console.log(current_time);
    // console.log(current_set);
    // console.log(set_duration_sum[current_set]);
    // if(current_time >= set_duration_sum[current_set]){ 
    //     current_set ++;
    //     console.log("set");
    //     current_time = 0;
    //     if(current_set == num_set){
    //         current_set = 0;
    //     }
    // }
    //for(let i = 0; i < 1; i ++){
    total_duration = set_duration_sum[current_set];
    notes_to_show = set_list[current_set];

    var notes;
    if(current_time >= 0 && current_time < set_duration_list[current_set][0]){
        notes = [
            new StaveNote({ keys: [MiditoNote[notes_to_show[0]]], duration: "q" }).setStyle({ fillStyle: "rgb(240, 230, 140)", strokeStyle: "rgb(240, 230, 140)" }),
            new StaveNote({ keys: [MiditoNote[notes_to_show[1]]], duration: "q" }).setStyle({ fillStyle: "rgb(160, 207, 236)", strokeStyle: "rgb(160, 207, 236)" }),
            new StaveNote({ keys: [MiditoNote[notes_to_show[2]]], duration: "q" }).setStyle({ fillStyle: "rgb(160, 207, 236)", strokeStyle: "rgb(160, 207, 236)" }),
            new StaveNote({ keys: [MiditoNote[notes_to_show[3]]], duration: "q" }).setStyle({ fillStyle: "rgb(160, 207, 236)", strokeStyle: "rgb(160, 207, 236)" }),

        ]
    }
    else if(current_time >= set_duration_list[current_set][0] && current_time < set_duration_list[current_set][0] + set_duration_list[current_set][1]){
        notes = [
            new StaveNote({ keys: [MiditoNote[notes_to_show[0]]], duration: "q" }).setStyle({ fillStyle: "rgb(160, 207, 236)", strokeStyle: "rgb(160, 207, 236)" }),
            new StaveNote({ keys: [MiditoNote[notes_to_show[1]]], duration: "q" }).setStyle({ fillStyle: "rgb(240, 230, 140)", strokeStyle: "rgb(240, 230, 140)" }),
            new StaveNote({ keys: [MiditoNote[notes_to_show[2]]], duration: "q" }).setStyle({ fillStyle: "rgb(160, 207, 236)", strokeStyle: "rgb(160, 207, 236)" }),
            new StaveNote({ keys: [MiditoNote[notes_to_show[3]]], duration: "q" }).setStyle({ fillStyle: "rgb(160, 207, 236)", strokeStyle: "rgb(160, 207, 236)" }),
        ]
    }
    else if(current_time >= set_duration_list[current_set][0] + set_duration_list[current_set][1] && current_time < set_duration_list[current_set][0] + set_duration_list[current_set][1] + set_duration_list[current_set][2]){
        notes = [
            new StaveNote({ keys: [MiditoNote[notes_to_show[0]]], duration: "q" }).setStyle({ fillStyle: "rgb(160, 207, 236)", strokeStyle: "rgb(160, 207, 236)" }),
            new StaveNote({ keys: [MiditoNote[notes_to_show[1]]], duration: "q" }).setStyle({ fillStyle: "rgb(160, 207, 236)", strokeStyle: "rgb(160, 207, 236)" }),
            new StaveNote({ keys: [MiditoNote[notes_to_show[2]]], duration: "q" }).setStyle({ fillStyle: "rgb(240, 230, 140)", strokeStyle: "rgb(240, 230, 140)" }),
            new StaveNote({ keys: [MiditoNote[notes_to_show[3]]], duration: "q" }).setStyle({ fillStyle: "rgb(160, 207, 236)", strokeStyle: "rgb(160, 207, 236)" }),
        ]
    }
    //else if(current_time >= set_duration_list[current_set][0] + set_duration_list[current_set][1] + set_duration_list[current_set][2] && current_time <= set_duration_sum[current_set]){
    else{
        notes = [
            new StaveNote({ keys: [MiditoNote[notes_to_show[0]]], duration: "q" }).setStyle({ fillStyle: "rgb(160, 207, 236)", strokeStyle: "rgb(160, 207, 236)" }),
            new StaveNote({ keys: [MiditoNote[notes_to_show[1]]], duration: "q" }).setStyle({ fillStyle: "rgb(160, 207, 236)", strokeStyle: "rgb(160, 207, 236)" }),
            new StaveNote({ keys: [MiditoNote[notes_to_show[2]]], duration: "q" }).setStyle({ fillStyle: "rgb(160, 207, 236)", strokeStyle: "rgb(160, 207, 236)" }),
            new StaveNote({ keys: [MiditoNote[notes_to_show[3]]], duration: "q" }).setStyle({ fillStyle: "rgb(240, 230, 140)", strokeStyle: "rgb(240, 230, 140)" }),
        ]

       
    }
    if(current_time >= set_duration_list[current_set][0] + set_duration_list[current_set][1] + set_duration_list[current_set][2] + set_duration_list[current_set][3]){
        current_time = 0;
        current_set ++;
    }


    // const notes = [
    //     new StaveNote({ keys: [MiditoNote[notes_to_show[0]]], duration: "q" }),
        
    //     new StaveNote({ keys: [MiditoNote[notes_to_show[1]]], duration: "q" }),
    //     new StaveNote({ keys: [MiditoNote[notes_to_show[2]]], duration: "q" }),
    //     new StaveNote({ keys: [MiditoNote[notes_to_show[3]]], duration: "q" }),
    // ];

// Create a voice in 4/4 and add above notes
    const voice = new Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables(notes);

    // Format and justify the notes to 400 pixels.
    new Formatter().joinVoices([voice]).format([voice], 350);

    // Render voice
    voice.draw(context, stave);
    current_time += 100;
    current_note_time += 100;
}
