import React, { useMemo, useState } from 'react';
import './style.scss';
import WordInputField from '../../components/word-input-field';


function Home() {
	const [guessCounter, setGuessCounter] = useState<number>(0);
	const maxGuesses = 5;

	const updateGuessCounter = () => {
		setGuessCounter(guessCounter + 1);
	}

	return (
		<>
			<section className={'page'}>
				<div className={'page-header'}>
					{
						useMemo(() => {
							return (
								<>
									<h1>Guess the word</h1>
									<p>Guess the word by typing it in the input field below</p>
									<p>Guesses left: {maxGuesses - guessCounter}</p>
								</>
							);
						}, [guessCounter])
					}
				</div>
				{
					Array(maxGuesses).fill('').map((char: string, index: number) => (
						<WordInputField word={'Sample'} onCheck={updateGuessCounter} key={index} />
					))
				}
			</section>
		</>
	);
}

export default Home;
