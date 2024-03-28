import React, { useRef, useState } from 'react'
import useFetch from '../hooks/useFetch'
import { useNavigate } from 'react-router-dom';

export default function DeleteDay() {
    const days = useFetch(`http://localhost:3001/days/`);
    const dayRef = useRef(null);
    const [day, setDay] = useState([]);
    const navigate = useNavigate();

    function delDay() {
        setDay(dayRef.current.value);

        console.log(`${dayRef.current.value} / ${day}`);

        if (window.confirm("삭제 하시겠습니까?")) {
            fetch(`http://localhost:3001/days/${day}`, {
                method: "DELETE",
            }).then(res => {
                if (res.ok) {
                    delWords(day);
                    alert(`Day ${day}가 삭제되었습니다.`);
                    navigate(`/`);
                }
            })
        }
    };

    function delWords(day) { // 삭제된 Day로 저장된 단어들도 삭제.
            fetch(`http://localhost:3001/words/${day}`, {
                method: 'DELETE'
            }).then(res => { //API 응답을 받으면
                if (res.ok) { //응답이 ok이면 실행
                    console.log(`Day ${day}`);
                }
            });
    }

    return (
        <>
            <div>
                <select ref={dayRef}>
                    {days.map(day => (
                        <option key={day.id} value={day.day} >Day {day.day}</option>
                    ))}
                </select>
            </div>
            <button onClick={delDay}>삭제</button>
        </>
    )
}
