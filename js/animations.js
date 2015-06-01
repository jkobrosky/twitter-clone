$(document).ready(function() {

	// Hide the tweet-controls - tweet button and character count.
	$('#tweet-controls').hide();
	$('.stats').hide();
	$('.reply').hide();
	$('.tweet-actions').hide();	
	$('.fa-retweet').hide();

	// Load the user's name and avatar.
	var user = 'JKobrosky';
	var userAvatar = 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQqWEnSyppjrQonizKbGFTNkAQxrKIuZ8m93UMZNLP6-1rsXQfv'

	$('#profile-summary p').text(user);
	$('#profile-summary').find('.avatar').prop('src', 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQqWEnSyppjrQonizKbGFTNkAQxrKIuZ8m93UMZNLP6-1rsXQfv');

	// Loads the proper time.
	var newTime = jQuery.timeago(new Date());
	console.log('this is the time: ' + newTime);
	console.log(jQuery.timeago('1981 March, 17'));

	// When clicking in the tweet compose area the tweet controls show up and the box doubles in height.
	$('#tweet-content .tweet-compose').on('click', function() {
		charCounter();
		$('#tweet-controls').show();
		$(this).css({ 'height' : '5em' });
	});

	// When the user clicks in the tweet-compose box the box expands. When the user clicks away it contracts.
	$('.tweet-compose').blur(function() {
		if (charCounter() !== 140) {
			return null;
		} else {
			$(this).css({ 'height' : '2.5em' });
			$('#tweet-controls').toggle().hide();
		}
	});

	// When user clicks on the Tweet button it console logs sent tweet!
	$('#tweet-submit').on('click', function() {
		var tweet = $('.tweet-compose').val();

		// This clones the first tweet that is already there and then updates the info in it.
		var userProfile = $('.tweet:first').clone(true);
		userProfile.find('.avatar').prop('src', 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQqWEnSyppjrQonizKbGFTNkAQxrKIuZ8m93UMZNLP6-1rsXQfv');
		userProfile.find('.fullname').html('Jkobrosky');
		userProfile.find('.username').html('@jkobrosky');
		userProfile.find('.tweet-text').html(tweet);
		userProfile.find('.time').html('<time>' + timeFunc() + '</time>');
		userProfile.find('.num-retweets').html(retweetCounter.getRetweetCounter());
		userProfile.find('.num-favorites').html(favCounter.getFavCounter());
		$('#stream').prepend(userProfile);

		tweetCounter.setTweetCounter();
		console.log('total tweets are : ' + tweetCounter.getTweetCounter());

		var saveTweets = [];
		saveTweets.push($('.tweet').html());
		localStorage.setItem('tweet', saveTweets);
		console.log(saveTweets);
		//ex. $(target).after(content to be inserted);
		// Cleans up the compose box and collapses everything.
		$('.tweet-compose').val('');
		$('.tweet-compose').css({ 'height' : '2.5em' });
		$('#tweet-controls').hide();		

	});

	// When user clicks on tweet it expands to show the stats and reply box.
	$('.tweet').on('click', function() {
		$(this).find('.stats').slideToggle().focus();
		$(this).find('.reply').slideToggle().focus();
	});

	// When hovering over a tweet it will expand and show the tweet actions.
	// .hover(handlerIn, handlerOut);
	$('.tweet').hover(function() {
		$(this).find('.tweet-actions').show();
	}, function() {
		$(this).find('.tweet-actions').hide();
	});

	// When the user clicks on one of the tweet-action icons it performs the appropriate action.
		$('action-retweet').on('click', function() {
			$(this).find('.fa-retweet').show();
			console.log('clicked re-tweet');
			retweetCouner.setRetweetCounter();
		});


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

	// Tracks the number of tweets the user has made.
	var tweetCounter = {
		tweetCount: 0,
		setTweetCounter: function() {
			this.tweetCount += 1;
		},
		getTweetCounter: function() {
			return this.tweetCount;
		}
	};

	var retweetCounter = {
		retweetCount: 0,
		setRetweetCounter: function() {
			this.retweetCount += 1;
		},
		getRetweetCounter: function() {
			return this.retweetCount;
		}
	};

	var favCounter = {
		favCount: 0,
		setFavCounter: function() {
			this.favCount += 1;
		},
		getFavCounter: function() {
			return this.favCount;
		}
	};

	// Counts and tracks the number of characters the user has typed. Also, controls the tweet button - if too few characters then it greys out, if too many it also greys out.
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

	// Playing with time 
	var timeFunc = function() {

		var monthsArray = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
		var dateNow = new Date();
		var date = [ dateNow.getMonth(), dateNow.getDate(), dateNow.getFullYear() ];
		var time = [ dateNow.getHours(), dateNow.getMinutes() ];
		var suffix = (time[0] < 12) ? 'AM' : 'PM';

		if (suffix === 'PM') {
			time[0] = time[0] - 12;
		};

		var curMonth = monthsArray[date[0]];
		var curTime = time[0] + ':' + time[1] + ' ' + suffix;

		var timeStamp = (curTime + ' - ' + date[1] + ' ' + curMonth + ' ' + date[2]);
		console.log(timeStamp);
		return timeStamp;
	};

	var saveLocal = function(arr) {
		if (localStorage.getItem('tweet')) {
			for (var i = 0; i < arr.length; i++) {
				$('.tweet').html(localStorage.getItem('tweet'));
			}

			window.localStorage.clear();
		}
	}

});







