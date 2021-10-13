import React, { useState, useEffect, useRef } from 'react';

export default function Flashcard({ flashcard }) {
	//  variables to have the card flipping. set state to false to start showing the front side//
	const [flip, setFlip] = useState(false);
	const [height, setHeight] = useState('initial');

	// variables to be used for resizing of flashcards content
	const frontEl = useRef();
	const backEl = useRef();

	//Function to define maximum height on front and back of flashcards to be used for resizing of heights
	function setMaxHeight() {
		const frontHeight = frontEl.current.getBoundingClientRect().height;
		const backHeight = backEl.current.getBoundingClientRect().height;
		setHeight(Math.max(frontHeight, backHeight, 100));
	}
	// Change height with size of text on questions, answers and options
	useEffect(setMaxHeight, [
		flashcard.question,
		flashcard.answer,
		flashcard.options,
	]);

	// Change height with resize of screen
	useEffect(() => {
		window.addEventListener('resize', setMaxHeight);
		return () => window.removeEventListener('resize', setMaxHeight);
	}, []);

	/**set onClick inside div as a function, everytime we click here we set the current flip to non flip.
	 * Toggling the current flip to the other option.
	 */
	return (
		<div
			/** Use classes to style cards. Set the dynamic classes with default React and JavaScript. To have a static class of card and a flip class determined by the flip variable declared at initialization. If flip is true we want to have flip class, otherwise we'll have just a blank class. */
			className={`card ${flip ? 'flip' : ''}`}
			style={{ height }}
			onClick={() => setFlip(!flip)}
		>
			<div className="front" ref={frontEl}>
				{flashcard.question}
				<div className="flashcard-options">
					{flashcard.options.map((option) => {
						return (
							<div className="flashcard-option" key={option}>
								{option}
							</div>
						);
					})}
				</div>
			</div>
			<div className="back" ref={backEl}>
				{flashcard.answer}
			</div>
		</div>
	);
}
