import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { AboutProduct } from '../components/AboutProduct.js'
import { Footer } from '../components/Footer.js'
import React, { useState, useEffect } from "react";

function MainPage() {

	let navigate = useNavigate();

	const [ScrollY, setScrollY] = useState(0); //현재 스크롤의 값
	const [scrollBtnStatus, setScrollBtnStatus] = useState(false); // 스크롤 버튼 상태
	const [startBtnStatus, setStartBtnStatus] = useState(true); // 시작하기 버튼 상태

	const handleFollow = () => {
		setScrollY(window.pageYOffset);
		if (100 > ScrollY) {
			// 스크롤이 맨 위에 위치하면 스크롤 버튼은 안보이게 숨기고, 시작하기 버튼은 보이게
			setScrollBtnStatus(false);
			setStartBtnStatus(true);
		} else if (ScrollY > document.body.scrollHeight - 1000) {
			// 스크롤이 맨 아래에 위치하면 스크롤 버튼은 안보이게 숨기고, 시작하기 버튼은 보이게
			setScrollBtnStatus(false);
			setStartBtnStatus(true);
		} else {
			// 스크롤이 맨 위/맨 아래에 위치하지 않으면 스크롤버튼이 보이게, 시작하기 버튼이 안보이게 숨김
			setScrollBtnStatus(true);
			setStartBtnStatus(false);
		}
	}

	const handleTop = () => {  // 클릭하면 스크롤이 위로 올라가는 함수
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
		setScrollY(0);  // ScrollY 의 값을 초기화
		setScrollBtnStatus(false); // BtnStatus의 값을 false로 바꿈 => 스크롤 버튼 숨김
		setStartBtnStatus(true); // start 버튼 보임
	}

	const handleBottom = () => {  // 클릭하면 스크롤이 아래로 내려가는 함수
		window.scrollTo({
			top: document.body.scrollHeight,
			behavior: "smooth",
		});
		console.log(document.body.scrollHeight);
		setScrollY(document.body.scrollHeight);  // ScrollY 의 값을 max로
		setScrollBtnStatus(false); // BtnStatus의 값을 false로 바꿈 => 스크롤 버튼 숨김
		setStartBtnStatus(true); // start 버튼 보임
	}


	useEffect(() => {
		const watch = () => {
			window.addEventListener('scroll', handleFollow)
		}
		watch();
		return () => {
			window.removeEventListener('scroll', handleFollow)
		}
	})

	return (
		<>
			<div className="wraper">
				<div className="content">
					<AboutProduct />
					<Button className={startBtnStatus ? "startBtn active" : "startBtn"}
						variant="primary" size="lg" onClick={() => navigate("/mypage")}>
						시작하기
					</Button> {/*로그인 되어있지 않으면 로그인창으로*/}

					<button
						className={scrollBtnStatus ? "topBtn active" : "topBtn"} // 버튼 노출 여부
						onClick={handleTop}  // 버튼 클릭시 함수 호출
					>▲</button>
					<button
						className={scrollBtnStatus ? "bottomBtn active" : "bottomBtn"} // 버튼 노출 여부
						onClick={handleBottom}  // 버튼 클릭시 함수 호출
					>▼</button>
				</div>
				<Footer />
			</div>
		</>
	)
}

export { MainPage }