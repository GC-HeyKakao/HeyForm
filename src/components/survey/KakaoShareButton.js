import { logDOM } from '@testing-library/react'
import React, { useEffect } from 'react'
import { Button, Dropdown } from 'react-bootstrap'
import { JAVASCRIPT_KEY } from '../../OAuth'
import { Helmet } from 'react-helmet'
import sendKakaoBtn from '../../sendKakaoBtn.png';

const KakaoShareButton = () => {

    useEffect(() => {
        createKakaoButton()
    }, [])

    const createKakaoButton = () => {
        // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
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
                    title: '설문 마감 기한: 2022-10-31 ', //get survey-id.name
                    description: '-와 관련된 설문입니다.',
                    imageUrl: 'logo.png',
                    link: {
                        mobileWebUrl: window.location.href,
                        webUrl: window.location.href,
                    },
                },
                itemContent: {
                    profileText: '설문 제목',
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

export { KakaoShareButton }