import React, { useState } from 'react'

export default function Word({ props: w }) { //{ props: w }: props 변수명을 w로 변경 
    const [word, setWord] = useState(w);
    const [isShow, setIsShow] = useState(false); // 뜻 보기 및 숨기기 상태값
    const [isDone, setIsDone] = useState(word.isDone); // 외웠는지 확인하는 상태값
    
    function toggleShow(){ // 뜻 보기 및 숨기기 버튼 누를 시 토글 메소드
        setIsShow(!isShow);
    }

    function toggleDone(){ // 체크박스를 누를 시 토글 메소드
        // setIsDone(!isDone);
        fetch(`http://localhost:3001/words/${word.id}`, {
            method: "PUT", //update할 때 put 메소드를 사용
            headers: {
                'Content-Type' : 'application/json', // Content-Type: 보내는 리소스의 타입을 의미한다. 여러 타입(문자, 이미지, 숫자 등)이 있지만,여기서 타입은 json
            },
            body: JSON.stringify({//단순히 가져오는 get하고 다르게 put는 수정을 위한 정보를 실어서 보내야하기 때문에 body에 정보를 입력한다.
                //JSON.stringify: json 문자열로 변경.
                ...word, //기존 데이터
                isDone: !isDone,
            }),
        }).then(res => { //API 응답을 받으면
            if(res.ok) { //응답이 ok이면 실행
                setIsDone(!isDone);
            }
        });
    }

    function del() {
        if(window.confirm("삭제 하시겠습니까?")) {
            fetch(`http://localhost:3001/words/${word.id}`, {
                method : 'DELETE'
            }).then(res => { //API 응답을 받으면
                if(res.ok) { //응답이 ok이면 실행
                    setWord({ id: 0});
                }
            });
        }
    }

    if (word.id === 0) { //데이터 삭제 시 화면을 새롭게 호출하기 위함.
        return null;
    }

    return (
        <tr className={isDone ? "off" : ""}>
            <td>
                <input type="checkbox" checked={isDone} onChange={toggleDone} />
            </td>
            <td> {word.eng} </td>
            <td> {isShow && word.kor} </td> {/* isShow가 false 일 때는 한글 표기X. true 일 때는 한글 표기O */}
            <td>
                <button onClick={toggleShow}>{!isShow ? "뜻 보기" : "뜻 숨기기"}</button>
                <button className="btn_del" onClick={del}>삭제</button>
            </td>
        </tr>
    )
}
