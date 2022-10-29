import styled from "styled-components";
import Fade from "react-reveal/Fade"; // Import reasct-reveal(Fade)
import './AboutProduct';

const IntroBlock = styled.div`
  margin: 0px 0px 300px 0px;
  
  h1 {
    margin: 10;
	text-align : center;
    font-weight: 330;
    font-size: 45px;
  }  

  h2 {
    margin: 0;
	text-align : center;
    font-weight: 300;
    font-size: 30px;
  }

  h3 {
	text-align : center;
    font-weight: 200;
    font-size: 25px;
  }

  img {
	display: block;
	margin: auto;
	margin-bottom: 80px;
	height: 70%;
	width: 70%;

  }

  @media (max-width: 768px) {
	margin: 0px 0px 100px 0px;
  
	h1 {
	  margin: 10;
	  text-align : center;
	  font-weight: 330;
	  font-size: 30px;
	}  
  
	h2 {
	  margin: 0;
	  text-align : center;
	  font-weight: 300;
	  font-size: 25px;
	}
  
	h3 {
	  text-align : center;
	  font-weight: 200;
	  font-size: 20px;
	}
  
	img {
	  height: 100%;
	  width: 100%;
	  display: block;
	  margin: auto;
	  margin-bottom: 80px;
	}

  }
`

function AboutProduct() {
	return (
		<div>
			<div>
				<Fade big>
					<IntroBlock style={{marginTop:"5%"}}>
						<h2>사용자에게 편의를 주는 솔루션을</h2>
						<h1><strong>헤이폼</strong>이 제안합니다.</h1>
						<img src="main_promotion.png" align="center" />
					</IntroBlock>
				</Fade>

				<Fade bottom cascade>
					<IntroBlock>
						<h1>
							설문을 <strong>제작하고 <br />
								공유하고 <br />
								결과 분석 조회</strong>까지 한 번에!
						</h1>
						<br />
						<h3>
							헤이폼에서 설문을 제작해보세요.<br />
							설문 공유는 QR 코드와 URL 링크를 통해 <br />
							편하게 공유할 수 있습니다. <br />
							설문 결과는 자동으로 분석됩니다.<br />
						</h3>
					</IntroBlock>

					<IntroBlock>
						<h1>
							<strong>카카오 계정 로그인</strong>
						</h1>
						<br />
						<h3>
							설문 응답하려는데 회원가입까지 해야한다고요? <br />
							헤이폼은 <strong>회원가입 절차가 필요없습니다.</strong> <br />
							카카오 계정으로 로그인 후 바로 서비스를 이용하세요.
						</h3>
					</IntroBlock>


					<IntroBlock>
						<h1>
							<strong>설문 미리보기</strong>
						</h1>
						<br />
						<h3>
							설문지가 제작되는 과정이 궁금하신가요? <br />
							설문 제목을 작성하고 설문 질문을 생성하는 동시에 <br />
							설문지를 실시간으로 확인할 수 있습니다.
						</h3>
					</IntroBlock>


					<IntroBlock>
						<h1>
							<strong>설문 결과 자동 분석</strong>
						</h1>
						<br />
						<h3>
							설문 결과를 취합하고 분석하는데 많은 시간을 소비하시나요? <br />
							헤이폼은 제출된 설문 응답을 <strong>자동으로 취합하고 분석</strong>합니다. <br />
							결과 보고서는 문항별 특화된 방식으로 분석합니다. <br />
						    <strong>응답자의 성별 및 연령대</strong> 또한 확인이 가능합니다.
						</h3>
					</IntroBlock>
				</Fade>

				<IntroBlock>
					<Fade bottom>
						<h1>
							<strong>AI 기반 솔루션</strong>
						</h1>
						<br />
						<h3>
							수많은 설문조사의 <strong>데이터</strong>를 기반으로 <br />
							사용자에게 <strong>편리함</strong>과 <strong>신뢰성</strong>을 제공합니다. <br />
							설문 제작 시 발생하는 고민을 줄여주고, <br />
							설문지를 한 눈에 파악할 수 있도록 도와줍니다. <br />
						</h3>
						<br />
						<br />
					<Fade left>
						<img src="promotion1.png" align="left" />
					</Fade>

					<br />
					<Fade right>
						<img src="promotion2.png" align="right" />
					</Fade>
					</Fade>
				</IntroBlock>
			</div >
		</div >
	)
}

export { AboutProduct };