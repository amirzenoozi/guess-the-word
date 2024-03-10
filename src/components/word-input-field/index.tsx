import React, { RefObject, useEffect, useRef, useState } from 'react';
import './style.scss';

interface WordInputFieldProps {
	word: string;
	onCheck: () => void;
}

const WordInputField: React.FC<WordInputFieldProps> = ({ word, onCheck}) => {
	// eslint-disable-next-line
	const inputRefs: RefObject<HTMLInputElement>[] = Array.from({ length: word.length }, () => useRef(null));
	const [guess, setGuess] = useState<Array<string>>([...Array(word.length).map(() => '')]);

	const handleInputChange = (index: number, event: any) => {
		const inputValue = event.target.value;

		if (/^[a-zA-Z]$/.test(inputValue)) {
			const newWord = [...guess];
			newWord[index] = inputValue;
			setGuess(newWord);

			if (index < inputRefs.length - 1 && inputValue !== '') {
				inputRefs[index + 1].current?.focus();
			}
		} else {
			event.target.value = '';
		}
	};

	const handleKeyUp = (index: number, event: any) => {
		switch (event.key) {
			case 'ArrowLeft':
				if (index > 0) {
					inputRefs[index - 1].current?.focus();
				}
				break;
			case 'ArrowRight':
				if (index < inputRefs.length - 1) {
					inputRefs[index + 1].current?.focus();
				}
				break;
			case 'Backspace':
				if (index > 0) {
					inputRefs[index - 1].current?.focus();
				}
				break;
			case 'Enter':
				// @ts-ignore
				checkWord();
				onCheck();
				break;
			default:
				break;
		}
	}

	const checkWord = () => {
		inputRefs.forEach((input, index) => {
			const classList = ['wordField__input'];
			const inputVal = input.current!.value.toLowerCase();
			const wordSameIndex = word[index].toLowerCase();

			if (inputVal === wordSameIndex) {
				classList.push('wordField__input--correct');
			} else if (inputVal !== wordSameIndex && word.indexOf(inputVal) > -1) {
				classList.push('wordField__input--semi-correct');
			}
			input.current!.className = classList.join(' ');
			input.current!.disabled = true;
		});
	};

	return (
		<div className={['wordField'].join(' ')}>
			{
				Array(word.length).fill('').map((char: string, index: number) => (
					<input
						key={index}
						className={'wordField__input'}
						type="text"
						maxLength={1}
						onChange={(event) => handleInputChange(index, event)}
						onKeyUp={(event) => handleKeyUp(index, event)}
						defaultValue={guess[index]}
						ref={inputRefs[index]}
					/>
				))
			}
		</div>
	);
}

export default WordInputField;
