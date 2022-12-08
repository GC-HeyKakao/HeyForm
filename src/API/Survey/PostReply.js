import axios from 'axios';
import { forwardRef, useImperativeHandle } from "react";
import { useRecoilValue, useSetRecoilState } from 'recoil';

const PostReply = async (reply) => {
    // /survey/post/{userAccount}
    
    //console.log("넘기는 답", reply);
    await axios.post('http://210.109.60.38:8000/survey/paper/result', reply)
        .then((response) => {
            console.log('응답 저장 성공');
            
        })
        .catch((error) => {
            console.log("왜 실패 ㅠ", reply);
            console.log('응답 저장 실패');
            console.log(error)
        })
        .finally(() => {
            console.log('응답 저장 완료')
        })
}


export { PostReply };

