import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

export default function PartyHunt() {
	const [level, setLevel] = useState(null);
	const [Results, setResults] = useState(null);
	const handleSubmit = e => {
		e.preventDefault();
		const low = Math.floor(level * (2 / 3));
		if (Number(level)) {
			let high = level;
			while (Math.round(high * (2 / 3)) !== Number(level)) {
				high++;
			}
			setResults(() => ({
				low,
				high
			}));
		}
	};
	return (
		<PartyHuntContainer>
			<h1 className='page-title'>Sharing Range Calculator </h1>
			<p className='subheading'>
				A party can share whenever the lowest leveled character is atleast 2/3
				the level of the highest player.
			</p>
			<form action='' onSubmit={handleSubmit}>
				<label htmlFor='level'>Level: </label>
				<input
					type='number'
					id='level'
					value={level}
					onChange={e => {
						setLevel(e.target.value);
					}}
				/>
				<Button variant='outline-success' type='submit'>
					Submit
				</Button>
			</form>
			{Results && (
				<p>
					The low is {Results.low} and the high is {Results.high}
				</p>
			)}
		</PartyHuntContainer>
	);
}

const PartyHuntContainer = styled.div`
	display: flex;
	margin: auto;
	align-items: flex-start;
	height: 100%;
	flex-direction: column;
	form {
		display: flex;
		flex-direction: column;
		button {
			width: ;
		}
	}
`;
