import React, { useState } from 'react';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button, Row, Col } from 'antd';
import { AlignRightOutlined } from '@ant-design/icons';
import './Sections/Navbar.css';
import Logo from '../../../assets/images/CANE-logo2.png';
// import Logo from '../../../assets/images/Bespin Global-logo-black.png';

function NavBar() {
	const [visible, setVisible] = useState(false)

	const showDrawer = () => {
		setVisible(true)
	};

	const onClose = () => {
		setVisible(false)
	};



  return (
    <nav className="menu">
		<br/>
		<Row justify="space-around" align="middle">
			{/* <div style={{fontSize : "40px"}} > NFT 플랫폼</div> */}
		<a href="/"><img src={Logo} alt="Logo" style={{ width: '300px'}} /></a>
		</Row>
		<Row justify="space-around" align="middle">
			<Col>
				
			</Col>
			<Col>
				
			</Col>
			<Col>
				<RightMenu mode="horizontal" />
			</Col>
		</Row>
		<br/>
		{/* <Row>
			<Col span={24}>
				<LeftMenu mode="horizontal" />
			</Col>
		</Row> */}
	</nav>
	)
}

export default NavBar