// Import useRef
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import FlashcardList from './FlashcardList';

// Import styling
import './app.css';

// Remove sample data and initialise state with empty arrays for flashcards and categories of questions
function App() {
	const [flashcards, setFlashcards] = useState([]);
	const [categories, setCategories] = useState([]);

	const categoryEl = useRef();
	const amountEl = useRef();

	// Get categories data from API
	useEffect(() => {
		axios.get('https://opentdb.com/api_category.php').then((res) => {
			setCategories(res.data.trivia_categories);
		});
	}, []);

	useEffect(() => {}, []);

	// Function to decode html text
	function decodeString(str) {
		const textArea = document.createElement('textarea');
		textArea.innerHTML = str;
		return textArea.value;
	}

	// Function to handle submits on forms and prevent default from happening
	function handleSubmit(e) {
		e.preventDefault();
		// Amount of questions and categories available from connection with API
		axios
			.get('https://opentdb.com/api.php', {
				params: {
					amount: amountEl.current.value,
					category: categoryEl.current.value,
				},
			})
			.then((res) => {
				setFlashcards(
					res.data.results.map((questionItem, index) => {
						const answer = decodeString(questionItem.correct_answer);
						const options = [
							...questionItem.incorrect_answers.map((a) => decodeString(a)),
							answer,
						];
						return {
							// add id with date
							id: `${index}-${Date.now()}`,
							question: decodeString(questionItem.question),
							answer: answer,
							// randomise disposition of options at flashcard
							options: options.sort(() => Math.random() - 0.5),
						};
					})
				);
				console.log(res.data);
			});
	}

	return (
		<>
			{/* Create header form with categories, amount of questions and generate button */}
			<form className="header" onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="category">Category</label>
					<select id="category" ref={categoryEl}>
						{categories.map((category) => {
							return (
								<option value={category.id} key={category.id}>
									{category.name}
								</option>
							);
						})}
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="amount">Number Of Questions</label>
					<input
						type="number"
						id="amount"
						min="1"
						step="1"
						defaultValue={10}
						ref={amountEl}
					/>
				</div>
				<div className="form-group">
					<button className="btn">Generate</button>
				</div>
			</form>
			<div className="container">
				<FlashcardList flashcards={flashcards} />
			</div>
		</>
	);
}

export default App;
