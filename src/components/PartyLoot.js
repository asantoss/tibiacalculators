import React, { useState } from 'react';
import { parseLootYML } from '../utility/stringParser';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {
	TextareaAutosize,
	Stepper,
	Step,
	StepLabel,
	Typography
} from '@material-ui/core';
import styled from 'styled-components';

export default function PartyLoot() {
	function getStepContent(step, data) {
		switch (step) {
			case 0:
				return (
					<TextareaAutosize
						name=''
						rows={10}
						cols={10}
						id='data'
						placeholder='Party hunt analyzer data.'
						aria-label='party hunt analyzer data'
						onChange={e => {
							setstate(e.target.value);
						}}
					/>
				);
			case 1:
				return { message: 'Results for all of your hunt.', ...data };
			default:
				return 'Unknown step';
		}
	}

	const [activeStep, setActiveStep] = React.useState(0);
	const steps = getSteps();

	const handleNext = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};
	const [state, setstate] = useState('');
	const [Data, setData] = useState(null);
	const handleSumbit = e => {
		if (state) {
			const rawData = parseLootYML(state);
			if (rawData) {
				setData(rawData);
			}
		}
	};

	return (
		<PartyLootStyled {...Data}>
			<Stepper activeStep={activeStep}>
				{steps.map((label, index) => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
			{activeStep === 0 ? (
				<div>
					<Typography>{getStepContent(0)}</Typography>
					<div>
						<Button
							color='success'
							onClick={() => {
								handleSumbit();
								handleNext();
							}}>
							Submit
						</Button>
					</div>
				</div>
			) : (
				Data && (
					<div id='results'>
						<div className='resultsHeader'>
							<h4>
								Each player has a
								{Data.profit > 0 ? ' net profit of ' : ' net loss of '}
								<span style={{ color: Data.profit > 0 ? 'green' : 'red' }}>
									{Math.floor(Data.profit).toLocaleString()} GP
								</span>
							</h4>
							<p className='resultsLoot'>
								Total Loot: {Math.floor(Data.loot).toLocaleString()} GP
							</p>
							<p className='resultsLoot'>
								Total Suplies: {Math.floor(Data.supplies).toLocaleString()} GP
							</p>
							{/* <p>Loot type: {Data.lootType}</p> */}
						</div>
						<div className='resultsBody'>
							{Data.players.map((player, idx) => (
								<PlayerElement key={idx} {...player}>
									<Card>
										<Card.Header>{player.name}</Card.Header>
										<Card.Body className='p-1'>
											<Card.Text>
												<span className='resultsBalance'>
													Balance:{' '}
													<span>
														{Math.floor(player.balance).toLocaleString()} GP
													</span>
												</span>
												<br />
												<span className='resultsProfit'>
													Profit:{' '}
													<span>
														{Math.floor(Data.profit).toLocaleString()} GP
													</span>
												</span>
											</Card.Text>
										</Card.Body>
										<Card.Footer>
											<p className='resultsPayout'>
												Payment:
												<span>
													{' '}
													{Math.floor(player.payOut).toLocaleString()} GP
												</span>
											</p>
										</Card.Footer>
									</Card>
								</PlayerElement>
							))}
						</div>
						<Button
							disabled={activeStep === 0}
							variant='danger'
							onClick={handleReset}>
							Reset
						</Button>
					</div>
				)
			)}
		</PartyLootStyled>
	);
}

const PartyLootStyled = styled.div`
	width: 100%;
	overflow: none;
	#data {
		resize: none;
		width: 90vw;
		height: 80vh;
		max-width: 300px;
		max-height: 550px;
	}
	.resultsHeader {
		width: 100%;
	}
	.resultsBody {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
	}
	#results {
		display: flex;
		flex-direction: column;
		button {
			align-self: flex-end;
		}
	}
`;

const PlayerElement = styled.div`
	width: 15rem;
	margin: 1em 5px;
	font-size: 1rem;
	p {
		margin: 0;
	}
	.resultsPayout {
		span {
			color: ${({ payOut }) => (payOut > 0 ? 'green' : 'red')};
		}
	}
	.resultsProfit {
		span {
			color: ${({ profit }) => (profit > 0 ? 'green' : 'red')};
		}
	}
	.resultsBalance {
		span {
			color: ${({ balance }) => (balance > 0 ? 'green' : 'red')};
		}
	}
`;

function getSteps() {
	return ['Data', 'Results'];
}
