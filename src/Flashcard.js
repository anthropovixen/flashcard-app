import React, { useState } from 'react';

export default function Flashcard({ flashcard }) {
	/**  variables to have the card flipping. set state to false to start showing the front side*/
	const [flip, setFlip] = useState(false);

	/**set onClick inside div as a function, everytime we click here we set the current flip to non flip.
	 * Toggling the current flip to the other option.
	 */
	return (
		<div
			/** Use classes to style cards. Set the dynamic classes with default React and JavaScript. To have a static class of card and a flip class determined by the flip variable declared at initialization. If flip is true we want to have flip class, otherwise we'll have just a blank class. */
			className={`card ${flip ? 'flip' : ''}`}
			onClick={() => setFlip(!flip)}
		>
			<div className="front">{flashcard.question}</div>
			<div className="back">{flashcard.answer}</div>
		</div>
	);
}
