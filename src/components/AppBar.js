import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export default function AppBar() {
	return (
		<NavBar>
			<div id='logo'>
				<NavLink to='/'>PartyCalculators</NavLink>
			</div>
			<div className='nav-link-container'>
				<NavLink to='/partyhunt' activeStyle={{ opacity: 0.7 }}>
					Sharing Range
				</NavLink>
				<NavLink to='/partyloot' activeStyle={{ opacity: 0.7 }}>
					Loot Analyzer
				</NavLink>
			</div>
		</NavBar>
	);
}

const NavBar = styled.nav`
	display: flex;
	justify-content: space-evenly;
	height: 30px;
	margin: 0 auto;
	width: 100vw;
	align-items: flex-end;
	padding: 0.5em;
	background-color: black;
	.nav-link-container {
		width: 50%;
		display: flex;
		justify-content: space-evenly;
	}
	a {
		color: white;
		font-size: 1.2em;
		font-weight: 300;
		text-decoration: none;
	}
`;
