import { useParams } from "react-router-dom"; // useParams : url에 호출된 값을 가져옴.
import Word from "./Word";
import useFetch from "../hooks/useFetch";

export default function Day() {
    const day = Number(useParams().day);
    const words = useFetch(`http://localhost:3001/words?day=${day}`);

    return (
        <>
            <h2>Day {day}</h2>
            <table>
                <tbody>
                    {words.map(word => (
                        <Word props={word} key={word.id} />
                    ))}
                </tbody>
            </table>
        </>
    )
}