$(document).ready(function() {

	/* When clicking the tweet-compose box (top left side of screen) the box increases in height and displays the char-count and tweet button.
	*/
	$('#tweet-content .tweet-compose').on('click', function() {
		$('#char-count, #tweet-submit').css({
  		'display': 'inline',
		});

		// When the user leaves the compose area it hides the char count and the tweet button.
		$('.tweet-compose').blur(function() {
			var contentChecker = $('.tweet-compose').val();
			if (contentChecker) {
				$('.tweet-compose').
			}
			$('#char-count, #tweet-submit').css({ 'display' : 'none' });
		});

		// This increase the height of the box clicked and when the mouse leaves the box it shrinks back to normal size.
		$(this).css({ 'height' : '5em' }).blur(function() {
			$(this).css({ 'height' : '2.5em' });
		});

	});

	// When a compose tweet box is clicked in on the main content area it increases the compose area.
	$('.tweet-compose').on('click', function() {
		$(this).css({ 'height' : '5em' }).blur(function() {
			$(this).css({ 'height' : '2.5em' });
		});
	});

	// Word count for composing a tweet. At less then 10 char left it goes red, after 0 is highlights the text red while showing a red negative number.
	$('.tweet-compose').on('keyup', function() {
		var maxCount = 140;
		var wordCount = $('.tweet-compose').val().length;


		// Tracks the word count of the user and warns them as they get close to the max limit.
		if (maxCount - wordCount > 10) {
			$('#char-count').text(maxCount - wordCount)
			.css({ 'color' : '#000' });
		} else if (maxCount - wordCount <= 10) {
			$('#char-count').text(maxCount - wordCount)
			.css({ 'color' : 'red' });
		} else if (maxCount - wordCount <= 0) {
			$('#char-count').text(maxCount - wordCount)
			.css({ 'color' : '#fff', 'background-color' : 'red' });
		}
	});

	// Submit button - checks to see if the user entered too many characters, if not submit tweet.
	$('#submit-tweet').on('click', function(e) {
		e.preventDefault();
		if (wordCount > 140) {
			$('tweet-compose').css({ 'background' : 'red' });
		} else {
			$('tweet-compose').css({ 'background' : '#fff' })
		}
	})



















});