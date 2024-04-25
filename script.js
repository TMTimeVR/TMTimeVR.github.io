const notes = [
    "OFF",
    "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3",
    "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
    "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5",
];

const colors = [
    "#ffffff",
    "#FF0000", "#FF2800", "#FF5000", "#FF7800", "#FFA000", "#FFC800", "#FFE000", "#FFFF00",
    "#E0FF00", "#C8FF00", "#A0FF00", "#78FF00", "#50FF00", "#28FF00", "#00FF00",
    "#00FF28", "#00FF50", "#00FF78", "#00FFA0", "#00FFC8", "#00FFE0", "#00FFFF",
    "#00E0FF", "#00C8FF", "#00A0FF", "#0078FF", "#0050FF", "#0028FF", "#0000FF",
    "#2800FF", "#5000FF", "#7800FF", "#A000FF", "#C800FF", "#E000FF", "#FF00FF",
    "#FF00E0", "#FF00C8", "#FF00A0", "#FF0078", "#FF0050", "#FF0028",
];
const grid = document.querySelector("#grid");
const synth = new Tone.Synth().toDestination();
const bpmInput = document.querySelector("#bpm");
const playButton = document.querySelector("#play");
const exportButton = document.querySelector("#exportMIDI");
const loadDemoButton = document.querySelector("#loadDemo");
const saveButton = document.querySelector("#save");
const loadButton = document.querySelector("#loadButton");
const loadInput = document.querySelector("#load");

let sequence = new Array(32).fill(0);

for (let row = 0; row < 2; row++) {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    grid.appendChild(rowDiv);
    
    for (let column = 0; column < 16; column++) {
        let i = row * 16 + column;
        const noteCell = document.createElement("div");
        noteCell.classList.add("note-cell");
        noteCell.style.backgroundColor = colors[sequence[i]];
        noteCell.innerHTML = notes[sequence[i]];
        noteCell.style.height = `${(sequence[i] / notes.length) * 100 + 25}px`;
        
        let isFocused = false;

        noteCell.addEventListener("mouseover", () => {
            isFocused = true;
        });

        noteCell.addEventListener("mouseout", () => {
            isFocused = false;
        });

        noteCell.addEventListener("click", () => {
            sequence[i] = (sequence[i] + 1) % notes.length;
            noteCell.style.backgroundColor = colors[sequence[i]];
            noteCell.innerHTML = notes[sequence[i]];
            noteCell.style.height = `${(sequence[i] / notes.length) * 100 + 25}px`;

            if (sequence[i] !== 0) {
                synth.triggerAttackRelease(notes[sequence[i]], "8n");
            }
        });

        noteCell.addEventListener("wheel", (event) => {
            if (isFocused) {
                if (event.deltaY < 0) {
                    sequence[i] = (sequence[i] + 1) % notes.length;
                } else {
                    sequence[i] = (sequence[i] - 1 + notes.length) % notes.length;
                }
                noteCell.style.backgroundColor = colors[sequence[i]];
                noteCell.innerHTML = notes[sequence[i]];
                noteCell.style.height = `${(sequence[i] / notes.length) * 100 + 25}px`;

                if (sequence[i] !== 0) {
                    synth.triggerAttackRelease(notes[sequence[i]], "8n");
                }
                event.preventDefault();
            }
        });

        window.addEventListener("keydown", (event) => {
            if (isFocused) {
                if (event.key === "ArrowUp") {
                    sequence[i] = Math.min(sequence[i] + 12, notes.length - 1);
                } else if (event.key === "ArrowDown") {
                    sequence[i] = Math.max(sequence[i] - 12, 0);
                }
                noteCell.style.backgroundColor = colors[sequence[i]];
                noteCell.innerHTML = notes[sequence[i]];
                noteCell.style.height = `${(sequence[i] / notes.length) * 100 + 25}px`;

                if (sequence[i] !== 0) {
                    synth.triggerAttackRelease(notes[sequence[i]], "8n");
                }
            }
        });

        rowDiv.appendChild(noteCell);
    }
}

playButton.addEventListener("click", () => {
    Tone.Transport.bpm.value = bpmInput.value;
    let i = 0;
    const gridCells = document.querySelectorAll('.note-cell');
    const highlightNote = (index) => {
        gridCells.forEach((cell, cellIndex) => {
            if (cellIndex === index) {
                cell.style.borderColor = 'red'; // Highlight current note
            } else {
                cell.style.borderColor = '#000000'; // Reset other notes
            }
        });
    };
    const scheduledSequence = Tone.Transport.scheduleRepeat((time) => {
        if (sequence[i] !== 0) {
            synth.triggerAttackRelease(notes[sequence[i]], "8n", time);
            highlightNote(i);
        }
        i++;
        if (i >= sequence.length) {
            Tone.Transport.clear(scheduledSequence);
            i = 0; // Optional, reset i for next time play is pressed
            gridCells.forEach(cell => cell.style.borderColor = '#000000'); // Reset all after playing
        }
    }, "16n");
    Tone.Transport.start();
});




saveButton.addEventListener("click", () => {
    const sequenceAsNotes = sequence.map(index => notes[index]);
    const a = document.createElement("a");
    const file = new Blob([JSON.stringify(sequenceAsNotes)], {type: "application/json"});
    a.href = URL.createObjectURL(file);
    a.download = "sequence.json";
    a.click();
});

loadButton.addEventListener("click", () => {
    loadInput.click();
});

loadInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const contents = e.target.result;
            try {
                const newSequenceAsNotes = JSON.parse(contents);
                if (!Array.isArray(newSequenceAsNotes) || newSequenceAsNotes.length !== sequence.length) {
                    throw new Error("Invalid file contents");
                }
                sequence = newSequenceAsNotes.map(note => notes.indexOf(note));
                updateDisplay();
            } catch (e) {
                alert("Invalid file format: " + e.message);
            }
        };
        reader.readAsText(file);
    }
});

function updateDisplay() {
    for (let row = 0; row < 2; row++) {
        for (let column = 0; column < 16; column++) {
            let i = row * 16 + column;
            const noteCell = grid.children[row].children[column];
            noteCell.style.backgroundColor = colors[sequence[i]];
            noteCell.innerHTML = notes[sequence[i]];
            noteCell.style.height = `${(sequence[i] / notes.length) * 100 + 25}px`;
        }
    }
}

exportButton.addEventListener("click", () => {
    // Create an instance of MidiWriterJS
    let track = new MidiWriter.Track();

    // Convert the sequence to MIDI events
    sequence.forEach(noteIndex => {
        if (notes[noteIndex] !== "OFF") {
            // MidiWriterJS needs MIDI note numbers, so we convert from note names
            let noteNumber = MidiWriter.Utils.getPitch(notes[noteIndex]);

            // Create a note event and add it to the track
            let note = new MidiWriter.NoteEvent({pitch: [noteNumber], duration: '16'});
            track.addEvent(note);
        } else {
            // If the note is "OFF", add a rest
            let rest = new MidiWriter.NoteEvent({rest: true, duration: '16'});
            track.addEvent(rest);
        }
    });

    // Generate the MIDI file
    let write = new MidiWriter.Writer([track]);

    // Create a link to download the MIDI file
    let a = document.createElement('a');
    a.href = "data:audio/midi;base64," + write.base64();
    a.download = 'sequence.mid';
    a.click();
});

loadDemoButton.addEventListener("click", () => {
    fetch('https://maxniftynine.github.io/MusicMaker/demo.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
    .then(json => {
        if (Array.isArray(json) && json.length === sequence.length) {
            sequence = json.map(note => notes.indexOf(note));
            updateDisplay();
        } else {
            alert("Invalid demo file");
        }
    })
    .catch(function() {
        alert("Failed to load demo");
    });
});
