import React, { useRef, useState } from 'react'
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

export default function CreateWord() {
    const days = useFetch('http://localhost:3001/days');
    const navigate = useNavigate(); // 단어 저장 시 저장한 Day 페이지를 호출하기 위함
    const [isLoading, setIsLoading] = useState(false); // 단어 저장을 연속으로 누를 경우 쓰레기 데이터가 저장 될 수 있으니 연속해서 데이터를 저장 되지 않도록 하기 위함. true: 저장 중이라 저장 불가능 false: 저장 가능

    function onSubmit(e) { /* 이벤트가 발생했을 때 발생하는 함수 */
        e.preventDefault(); /* 기본 기능을 막음. 이벤트 발생 시 새로고침 되는 것을 방지 */

        if (!isLoading) {
            setIsLoading(true); //저장 중. 저장 불가능 상태.
            // 저장
            fetch(`http://localhost:3001/words/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    day: dayRef.current.value,
                    eng: engRef.current.value,
                    kor: korRef.current.value,
                    isDone: false,
                }),
            }).then(res => {
                if (res.ok) {
                    alert("단어 저장이 완료되었습니다.");
                    navigate(`/day/${dayRef.current.value}`); // 단어 저장 시 저장한 Day 페이지를 호출하기 위함
                    setIsLoading(false); //저장 완료. 저장 가능 상태.
                }
            });
        }
    }

    const engRef = useRef(null); /* 정보를 얻기 위함. useRef : Doom에 접근 가능하도록 하는 기능. 예를들어 스크롤 위치 확인 및 포커스 주기 위함.  */
    const korRef = useRef(null);
    const dayRef = useRef(null);

    return (
        <form onSubmit={onSubmit}>
            <div className='input_area'>
                <label>Eng</label>
                <input type="text" placeholder='English' ref={engRef} />
            </div>
            <div className='input_area'>
                <label>Kor</label>
                <input type="text" placeholder='영어' ref={korRef} />
            </div>
            <div className='input_area'>
                <label>Day</label>
                <select ref={dayRef}>
                    {days.map(day => (
                        <option key={day.id} value={day.day}>
                            {day.day}
                        </option>
                    ))}
                </select>
            </div>
            <button>{ isLoading ? "Saving..." : "저장" }</button>
        </form>
    )
}
