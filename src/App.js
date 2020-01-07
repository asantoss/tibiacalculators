import React from 'react';
import PartyHunt from './components/PartyHunt';
import PartyLoot from './components/PartyLoot';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import AppBar from './components/AppBar';
import Home from './components/Home';
function App() {
	const timeStamp = new Date();
	return (
		<>
			<Router>
				<div className='App'>
					<header className='App-header'>
						<AppBar />
					</header>
					<AppMain>
						<Route component={PartyHunt} path='/partyhunt' exact />
						<Route component={PartyLoot} path='/partyloot' exact />
						<Route component={PartyHunt} path='/' exact />
					</AppMain>
				</div>
			</Router>
			<Footer>
				<p>Copyright © {timeStamp.getFullYear()} All Rights Reserved.</p>
				<p>
					Our statistics are based on tibia.com, the only official Tibia
					website. Tibia is a registered trademark of CipSoft GmbH. Tibia and
					all products related to Tibia are copyright by CipSoft GmbH.
				</p>
			</Footer>
		</>
	);
}

const AppMain = styled.main`
	width: 90vw;
	margin: auto;
	max-width: 680px;
	height: 90vh;
`;
const Footer = styled.footer`
	width: 100vw;
	height: 10vh;
	background-color: black;
	color: white;
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
export default App;
