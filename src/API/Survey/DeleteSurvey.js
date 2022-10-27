import axios from 'axios';
import { forwardRef, useImperativeHandle } from "react";

const DeleteSurvey = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({
        deleteSurvey() {

            const headers = {
                Authorization: localStorage.getItem('token')
            };
            const data = {
                surveyId: props.surveyId
            };
            // 특정 survey 삭제하기
            const response = axios.delete(`http://210.109.60.38:8080/survey/{surveyId}?surveyId=${data.surveyId}`, headers)
                .then((response) => {
                    console.log('delete survey (id:' + data.surveyId + ') ok');
                    console.log(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
    }));

});


export { DeleteSurvey };