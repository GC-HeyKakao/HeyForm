import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { JAVASCRIPT_KEY } from '../../OAuth'
import sendKakaoBtn from '../../sendKakaoBtn.png'
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import { Button } from "react-bootstrap";
import { useRecoilValue } from 'recoil';
import { userState } from '../../atom';

const KakaoShare = (props) => {

    const users = useRecoilValue(userState);

    useEffect(() => {
        console.log(props);
        createKakaoButton()

    }, [])

    const createKakaoButton = () => {
        // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능
        if (window.Kakao) {
            const kakao = window.Kakao

            // 중복 initialization 방지
            if (!kakao.isInitialized()) {
                // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
                kakao.init(JAVASCRIPT_KEY)
                console.log('init 완료');
            }

            kakao.Link.createDefaultButton({
                // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
                container: '#kakao-link-btn',
                objectType: 'feed',
                content: {
                    title: users.name + "님이 설문 응답을 요청했어요 🙌🏻",
                    description: props.surveyTitle + '\n' + props.surveyDescription + '\n' + props.end_time,
                    imageUrl: 'logo.png',
                    link: {
                        mobileWebUrl: props.link,
                        webUrl: props.link,
                    },
                },
                itemContent: {
                    profileText: '헤이폼',
                },                
                // social: {
                //   likeCount: 77,
                //   commentCount: 55,
                //   sharedCount: 333,
                // },
                buttons: [
                    {
                        title: '설문 응답하러 가기',
                        link: {
                            mobileWebUrl: props.link,
                            webUrl:props.link,
                        },
                    },
                ],
            })
        }
    }

    return (

        <>

            <Helmet>
                <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
            </Helmet>
            <div style={{ float:'left', marginBottom:'20px'}} >
                {/* Kakao share button */}
                <Button size='lg' id="kakao-link-btn" variant='light'>카카오톡 💛</Button>
            </div >
        
        </>
            
    )
}

export { KakaoShare }
