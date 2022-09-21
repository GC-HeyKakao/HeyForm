import {useNavigate} from 'react-router-dom'

import {Card, Button} from 'react-bootstrap';

import {AboutProduct} from '../components/AboutProduct.js'

function MainPage() {
	let navigate = useNavigate();
	return (
  	<>
		<div className='main-bg'/>
		<Button variant="secondary" size="lg" onClick={()=>navigate("/create")} style={{width: "15%", height: "10%", position: "absolute", left: "42%", top: "66%"}}>
			Get Started
		</Button>
    </>
  )
}

export {MainPage}