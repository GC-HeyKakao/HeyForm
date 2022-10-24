import React, { createContext, useState } from 'react'; // createContext를 불러온다.

//하나의 Context를 생성합니다.
export const UserInfoContextStore = createContext();

/**
 * Context를 생성할 때 기본 값을 세팅한다. 
 * React에서는 값을 컨트롤 할 때는 Component를 만들어 사용하는걸 지향한다.
 *
 * **/
const UserInfoContext = (props) => {

    const [ id, setId ] = useState(null); // 유저 아이디
    const [ token, setToken ] = useState(''); // 유저 토큰값
    const [ name, setName ] = useState('홍길동'); // 유저 이름
    const [ email, setEmail ] = useState('Heyform@example.com'); // 유저 이메일
    const [ first, setFirst ] = useState('true'); // 유저 최초 접속, 로그인 후 할당
    const [ push, setPush ] = useState('false'); // 유저 알림 여부
    const [ age_range, setAge_range ] = useState(0); // 유저 나이대
    const [ gender, setGender ] = useState(''); // 유저 성별
    
    //유저 정보를 하나의 객체로 만들어준다.
    const UserInfo = {
        id,
        setId,
        token,
        setToken,
        name,
        setName,
        email, 
        setEmail,
        first,
        setFirst,
        push,
        setPush,
        age_range,
        setAge_range,
        gender,
        setGender,
    }

    /**
     * UserInfoContextStore.Provider : Provider는 구독(하위 Component)하고 있는 자식 Component에게 정보를 보내준다는 설정
     * value={UserInfo} : 자식 Component에게 값을 전달하기 위한 설정
     * {props.children} : 자식 Component를 랜더링 하기위해 설정
     */
    return (<UserInfoContextStore.Provider value={UserInfo}>{props.children}</UserInfoContextStore.Provider>);
};

export { UserInfoContext };