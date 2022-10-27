import {Dropdown, DropdownButton} from 'react-bootstrap'

function DropdownCmpt(props) {
	return(
		<DropdownButton title={props.title} style={props.style} onSelect={(e)=>{
			props.setSelected(e);
		}}>
			<Dropdown.Item disabled={true}>{props.defaultTitle}</Dropdown.Item>
			{
				props.list.map((item, idx)=>
					<Dropdown.Item key={idx} eventKey={item}>{item}</Dropdown.Item>
				)
			}
		</DropdownButton>
	)
}

export {DropdownCmpt};