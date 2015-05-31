$(document).ready(function() {

	// Hide the tweet-controls - tweet button and character count.
	$('#tweet-controls').hide();	
	

	// When clicking in the tweet compose area the tweet controls show up and the box doubles in height.
	$('#tweet-content .tweet-compose').on('click', function() {
		charCounter();
		$('#tweet-controls').show();
		$(this).css({ 'height' : '5em' });
	});

	// When the user clicks in the tweet-compose box the box expands. When the user clicks away it contracts.
	$('.tweet-compose').blur(function() {
		console.log('blur');
		if (charCounter() !== 140) {
			return null;
		} else {
			$(this).css({ 'height' : '2.5em' });
			$('#tweet-controls').hide();
		}

	});

	$('#tweet-submit').on('click', function() {
		console.log('sent tweet!');
	})

	// When clicking in the tweet compose area the tweet controls show up and the box doubles in height.
	$('div.reply .tweet-compose').on('click', function() {
		$(this).css({ 'height' : '5em' });
	});

	// When the user clicks in the tweet-compose box the box expands. When the user clicks away it contracts.
	$('div.reply .tweet-compose').blur(function() {
		// Need an if statement to cancel blur if trying to click tweet button.
		$(this).css({ 'height' : '2.5em' });
	});

	// When user clicks in the compose tweet box and starts typing the character counter function is called.

	$('.tweet-compose').on('keyup', function() {
		charCounter();
	});


	var charCounter = function() {
		var maxCount = 140;
		var wordCount = $('.tweet-compose').val().length;
		var difference = maxCount - wordCount;
		
		if (difference === 140) {
			$('#tweet-submit').prop('disabled', true);
		} else if (difference >= 11) {
			$('#char-count').text(difference)
			.css({ 'color' : '#000' });
			$('#tweet-submit').prop('disabled', false);
		} else if (difference >= 0) {
			$('#char-count').text(difference)
			.css({ 'color' : 'red' });
			$('#tweet-submit').prop('disabled', false);
		} else {
			$('#char-count').text(difference)
			.css({ 'color' : 'red' });
			$('#tweet-submit').prop('disabled', true);
		}

		return difference;
	};

});







