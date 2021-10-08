import React, { useState, useEffect } from 'react';
import FlashcardList from './FlashcardList';
import './app.css';
import axios from 'axios';

function App() {
	const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);

	useEffect(() => {
		axios
			.get('https://opentdb.com/api.php?amount=20&category=18')
			.then((res) => {
				setFlashcards(
					res.data.results.map((questionItem, index) => {
						const answer = decodeString(questionItem.correct_answer);
						const options = [
							...questionItem.incorrect_answers.map((a) => decodeString(a)),
							answer,
						];
						return {
							id: `${index}-${Date.now()}`,
							question: decodeString(questionItem.question),
							answer: answer,
							options: options.sort(() => Math.random() - 0.5),
						};
					})
				);
				console.log(res.data);
			});
	}, []);

	function decodeString(str) {
		const textArea = document.createElement('textarea');
		textArea.innerHTML = str;
		return textArea.value;
	}

	return (
		<div className="container">
			<FlashcardList flashcards={flashcards} />
		</div>
	);
}

const SAMPLE_FLASHCARDS = [
	{
		id: 1,
		question: 'Describe componentDidMount()',
		answer:
			'invoked after a component is mounted(inserted into the three). Initialization that requires DOM nodes should go here. Instantiate network request to load data from a remote endpoint.',
		options: ['1', '2', '3'],
	},
	{
		id: 2,
		question: 'What is React?',
		answer:
			'An open-source frontend JavaScript library which is used fo building user interfaces for single page applications. Handles view layer for web and mobile apps. Created by Jordan Walke, a engineer working for FB. First deployed in 2011',
		options: ['1', '2', '3'],
	},
	{
		id: 3,
		question: 'What are the major features of React?',
		answer:
			'Uses VirtualDOM instead RealDOM - RealDOM manipulations are expensive. Supports server-side rendering. Follows unidrectional data flow or binding. Uses reusable/composable UI components to develop the view',
		options: ['1', '2', '3'],
	},
];

export default App;
