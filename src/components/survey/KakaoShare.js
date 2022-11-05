import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { JAVASCRIPT_KEY } from '../../OAuth'
import sendKakaoBtn from '../../sendKakaoBtn.png'

const KakaoShare = (props) => {

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
                    title: props.name + "님이 " + props.survey_name + " 응답을 요청했어요!\n",
                    description: props.start_time + '\n~' + props.end_time,
                    imageUrl: 'logo.png',
                    link: {
                        mobileWebUrl: window.location.href,
                        webUrl: window.location.href,
                    },
                },
                itemContent: {
                    profileText: '설문조사 요청이 도착했어요 🙌🏻',
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
                            mobileWebUrl: window.location.href,
                            webUrl: window.location.href, // 링크 변경 필요
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
            <div className="kakao-share-button">
                {/* Kakao share button */}
                <button id="kakao-link-btn" style={{ backgroundColor:"transparent", color:"black", border:"none"}}>
                <img src = {sendKakaoBtn}></img>
                </button>
            </div >
        
        </>
            
    )
}

export { KakaoShare }
