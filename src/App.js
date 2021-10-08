import React, { useState } from 'react';
import FlashcardList from './FlashcardList';
import './app.css';

function App() {
	const [flashcards] = useState(SAMPLE_FLASHCARDS);
	return <FlashcardList flashcards={flashcards} />;
}

const SAMPLE_FLASHCARDS = [
	{
		id: 1,
		question: 'Describe componentDidMount()',
		answer:
			'invoked after a component is mounted(inserted into the three). Initialization that requires DOM nodes should go here. Instantiate network request to load data from a remote endpoint.',
		options: [],
	},
	{
		id: 2,
		question: 'What is React?',
		answer:
			'An open-source frontend JavaScript library which is used fo building user interfaces for single page applications. Handles view layer for web and mobile apps. Created by Jordan Walke, a engineer working for FB. First deployed in 2011',
	},
	{
		id: 3,
		question: 'What are the major features of React?',
		answer:
			'Uses VirtualDOM instead RealDOM - RealDOM manipulations are expensive. Supports server-side rendering. Follows unidrectional data flow or binding. Uses reusable/composable UI components to develop the view',
	},
];

export default App;
