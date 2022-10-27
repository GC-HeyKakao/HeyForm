import axios from 'axios';
import { forwardRef, useImperativeHandle } from "react";
import { tokenState } from '../../atom';
import { useRecoilValue } from 'recoil';

// props -> surveyJson,userToken
// route.CreateSurvey에서 사용!
const PostSurvey = forwardRef((props, ref) => {

    const user_token=useRecoilValue(tokenState);
    console.log(user_token);
    useImperativeHandle(ref, () => ({

        postSurvey() {
            console.log("post survey 시작");
            const headers = {
                //Authorization: localStorage.getItem('token')
                Authorization: props.userToken
            };

            const body = {
                surveyDto: "props.surveyJson"
            }

            console.log('확인', JSON.stringify(props.surveyJson));

                axios.post(`http://210.109.60.38:8080/survey/${user_token}`, props.surveyJson)
                  .then((response) => {
                    console.log(response)
                    console.log('post survey ok');
                })
                .catch((error) => {
                    console.log(error);
                    console.error(error.response.data);
                })
        },
    }));

});

export { PostSurvey };