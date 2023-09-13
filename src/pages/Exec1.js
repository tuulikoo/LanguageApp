import ExerciseComponent from "@/components/ExecComponent";
import wordLists from '../utils/wordlists/TextTospeech.json';

export default function Exec1() {
    const selectedList = wordLists["listening1.8"]; // for Testing TODO: change acconding to user level 

    return (
        <div>
            <ExerciseComponent wordList={selectedList} />
        </div>
    );
}

