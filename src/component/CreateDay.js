import React from 'react'
import useFetch from '../hooks/useFetch'
import { useNavigate } from 'react-router-dom';

export default function CreateDay() {
    const days = useFetch(`http://localhost:3001/days/`);
    const navigate = useNavigate();

    //Day 추가
    function addDay(){
        fetch(`http://localhost:3001/days/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                day: days.length+1,
            }),
        }).then(res => {
            if(res.ok) {
                alert("Day가 추가되었습니다..");
                navigate(`/`); // Day 선택 화면 이동
            }
        });
    }

    return (
    <div>
      <h3>현재 일수 : {days.length}</h3>
      <button onClick={addDay}>Day 추가</button>
    </div>
  )
}
