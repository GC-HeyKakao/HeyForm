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

                axios.post(`https://210.109.63.71:8080/survey/update`, props.surveyQuestionDto)
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