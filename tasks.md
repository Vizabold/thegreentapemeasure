## Task 1
- Please add the following logic for the quiz in the quiz section (id="quiz"):
- Only the instructions container (id="instructions") should be initally visible upon page load.
- When the user clicks or taps the "Ready?" button, the card container with the draggables (id="draggables") will slide in from left and the dropzones container (id="dropzones") will slide in from right. There are existing CSS animations in the tokens.css file that you can use for the slide-in effects. The button turns into a 30-second timer, counting down.
- If the user answers correctly in the alotted time, the  timer is replaced by a share button, allowing the user to share their participation to common social media platforms.
- If the time runs out before the user has answered everything correctly, the timer is replaced by a "try again?" button.
- Tapping or clicking the "try again?" or "reset quiz" buttons will put all draggables back to the draggables container and shuffle  the order of the draggables and dropzone cards.
- Users are limited to 5 incorrect and 1 correct tries a day.
- If placed correctly the dropzone background changes to primary-two, if incorrect it changes to secondary-five.
- If placed correctly, the user cannot move the draggable again.
- If placed incorrectly, the user can move the draggable to a new dropzone.
- Each dropzone only accepts one draggable at a time.
- When a draggable is placed in the dropzone, the placeholder text in the dropzone "place job title here" should dissapear and reappear only upon quiz reset or if there is no draggable in the dropzone.
- In addition to the dropzone color changes, top-middle of the dropzone's container will have a secondary-five 'x' with the words 'incorrect' if the draggable was placed incorrectly, or a primary-one checkmark and text 'correct' if placed correctly, with these visual cues removed on reset.

## Task 2
- Please add the following logic for the timeline in the timeline section (id="timeline"):
- Add the logic to see the previous or next event by clicking or tapping the buttons (id's "timeline-prev-btn" and "timeline-next-btn") or by swiping up or down. 