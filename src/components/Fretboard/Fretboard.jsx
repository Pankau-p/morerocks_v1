import { useFretboard } from "../../context/FretboardContext";


export default function Fretboard() {
    const {
        selectedChord,
        selectedScale,
        highlightedNotesChord,
        highlightedNotesScale,
        updateChord,
        updateScale
    } = useFretboard();
    
    return (
        <div style={{ padding: "10px", flex: 1 }}>
            <h2>Fretboard area</h2>

            <button onClick={()=> updateChord("Cmaj7")}>Set Cmaj7</button>
            <button onClick={()=> updateChord("G")}>Set G</button>


            <button onClick={()=> updateScale("C major")}>Set C Major Scale</button>
            <button onClick={()=> updateScale("A minor")}>Set A Minor Scale</button>
            
            <div style={{ marginTop: "1rem" }}>
                <p><strong>Selected Chord: </strong>{selectedChord}</p>
                <p><strong>Chord Notes: </strong>{highlightedNotesChord.join(" ")}</p>

                <p><strong>Selected Scale: </strong>{selectedScale}</p>
                <p><strong>Scale Notes: </strong>{highlightedNotesScale.join(" ")}</p>
            </div>

        </div>
    );
}