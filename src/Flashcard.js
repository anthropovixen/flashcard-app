import React, { useState } from 'react';

export default function Flashcard({ flashcard }) {
	/**  variables to have the card flipping. set state to false to start showing the front side*/
	const [flip, setFlip] = useState(false);

	/**set onClick inside div as a function, everytime we click here we set the current flip to non flip.
	 * Toggling the current flip to the other option.
	 */
	return (
		<div onClick={() => setFlip(!flip)}>
			{/** if flip is true, we should return the answer, otherwise we should return the question*/}
			{flip ? flashcard.answer : flashcard.question}
		</div>
	);
}
