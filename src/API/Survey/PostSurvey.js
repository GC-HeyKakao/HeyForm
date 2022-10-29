import axios from 'axios';
import { forwardRef, useImperativeHandle } from "react";
import { tokenState } from '../../atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { linkState } from '../../atom';

// props -> surveyJson,userToken
// route.CreateSurvey에서 사용!
const PostSurvey = forwardRef((props, ref) => {

    const user_token=useRecoilValue(tokenState);
    const linkHandler = useSetRecoilState(linkState);

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

                axios.post(`http://210.109.60.38:8080/survey/${user_token}`, props.surveyJson)
                  .then((response) => {
                    linkHandler(response.data);
                    console.log(response.data)
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