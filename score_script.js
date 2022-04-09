const score_canvas = document.querySelector('.score');
//const staff = document.getElementById('boo');
const context = score_canvas.getContext('2d');
// score_canvas.width = window.innerWidth;
// score_canvas.height = 200;


// Create an SVG renderer and attach it to the DIV element named "boo".

const {
    Renderer,
    Stave,
    StaveNote,
    Voice,
    Formatter
  } = Vex.Flow;

const notes1 = [
    // A quarter-note C.
    new StaveNote({ keys: ["c/4"], duration: "q" }),

    // A quarter-note D.
    new StaveNote({ keys: ["d/4"], duration: "q" }),

    // A quarter-note rest. Note that the key (b/4) specifies the vertical
    // position of the rest.
    new StaveNote({ keys: ["b/4"], duration: "qr" }),

    // A C-Major chord.
    new StaveNote({ keys: ["c/4", "e/4", "g/4"], duration: "q" }),
];

const notes2 = [
    // A quarter-note C.
    new StaveNote({ keys: ["e/4"], duration: "q" }),

    // A quarter-note D.
    new StaveNote({ keys: ["f/4"], duration: "qr" }),

    // A quarter-note rest. Note that the key (b/4) specifies the vertical
    // position of the rest.
    new StaveNote({ keys: ["b/4"], duration: "q" }),

    // A C-Major chord.
    new StaveNote({ keys: ["c/4", "e/4"], duration: "q" }),
];

var counter = 0;
//draw_score();
setInterval(draw_score, 1000);

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

    // Create the notes
    // const notes = [
    //     // A quarter-note C.
    //     new StaveNote({ keys: ["c/4"], duration: "q" }),
    
    //     // A quarter-note D.
    //     new StaveNote({ keys: ["d/4"], duration: "q" }),

    //     // A quarter-note rest. Note that the key (b/4) specifies the vertical
    //     // position of the rest.
    //     new StaveNote({ keys: ["b/4"], duration: "qr" }),

    //     // A C-Major chord.
    //     new StaveNote({ keys: ["c/4", "e/4", "g/4"], duration: "q" }),
    // ];
    var notes = [];
    //notes = notes1;
    if(counter == 0) {
       notes = notes1;
       counter ++;
    }
    else{
        notes = notes2;
        counter --;
    }
    
    // Create a voice in 4/4 and add above notes
    const voice = new Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables(notes);

    // Format and justify the notes to 400 pixels.
    new Formatter().joinVoices([voice]).format([voice], 350);

    // Render voice
    voice.draw(context, stave);
}
