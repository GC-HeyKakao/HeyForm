import axios from 'axios';
import { forwardRef, useImperativeHandle } from "react";

const UpdateSurvey = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({

        postSurvey() {
            console.log("update survey 시작");
            const headers = {
                //Authorization: localStorage.getItem('token')
                Authorization: props.userToken
            };

            let user_token = props.userToken;
            user_token= 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJoZXlmb3JtIiwiZW1haWwiOiJUZXN0MSIsImlhdCI6MTY2Njg1NTM2MCwiZXhwIjoxNjY2ODU4OTYwfQ.yhFtdbRraXikpNEC6FHmNWJs4NyKRgfOFQTIav0XW7Y';

                axios.post(`http://210.109.60.38:8000/survey/update`, props.surveyQuestionDto)
                  .then((response) => {
                    console.log(response)
                    console.log('update survey ok');
                })
                .catch((error) => {
                    console.log(error);
                    console.error(error.response.data);
                })
        },
    }));

});

export { UpdateSurvey };