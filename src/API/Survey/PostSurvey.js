import axios from 'axios';
import { forwardRef, useImperativeHandle } from "react";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../../atom';
import { PostUserToken } from '../User/PostUserToken';

// props -> surveyJson,userToken
// route.CreateSurvey에서 사용!
const PostSurvey = forwardRef((props, ref) => {

    const users = useRecoilValue(userState);
    const userHandler = useSetRecoilState(userState);
    const user_token=users.token;
    const setLink = props.setLink;

    useImperativeHandle(ref, () => ({

        postSurvey() {
            console.log("post survey 시작");
            console.log(user_token);
            const headers = {
                Authorization: user_token
            };

            const body = {
                surveyDto: "props.surveyJson"
            }

            console.log('확인', JSON.stringify(props.surveyJson));

                axios.post(`http://210.109.60.38:8000/survey/${users.kakaoToken}`, props.surveyJson)
                  .then((response) => {
                    console.log(response);
                    // if (response.status === 203) {
                    //     console.log(users)
                    //     PostUserToken(users.kakaoToken, users, userHandler);
                    //     //console.log('ok', users)
                    //     //console.log('get survey by token ok');
                    //     //console.log("설문링크", response.data);
                    //     setLink(response.data);
                    // } else {
                        setLink(response.data);
                    // }
                    
                    // console.log("설문링크", response.data);
                    // setLink(response.data);
                    // console.log(response.data)
                    // console.log('post survey ok');
                })
                .catch((error) => {
                    console.log(error);
                    // console.error(error.response.data);
                })
        },
    }));

});

export { PostSurvey };