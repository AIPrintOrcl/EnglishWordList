import { useEffect, useState } from "react";

export default function useFetch(url) { // fotch: 나만의 커스텀북. 하나의 함수를 여러곳에서 사용 가능하도록
    const [data, setData] = useState([]);

    useEffect(() => { // useEffect: 어떤 상태값이 바뀌었을 때 동작함수. 
        fetch(url) // fetch를 이용하여 API 주소를 호출하여 Promise를 반환한다.
            .then(res => {
                return res.json();
            })
            .then(data => {
                setData(data);
            })
    }, [url]); // [배열] : 의존성배열. [배열]에서 배열이 변경 될 때만 useEffect()함수를 호출한다. 만약 [] 안에 빈 곳이면 최초 한번만 호출한다.
    
    return data;
}