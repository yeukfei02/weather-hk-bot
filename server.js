


var stdin = process.openStdin();
var request = require("request");
var parseString = require('xml2js').parseString;
var htmlToText = require('html-to-text');
var storage = require('node-persist');


// store user setting
storage.initSync();
storage.setItem('subscribeWarning', true);

var currentURL = {
    english: 'http://rss.weather.gov.hk/rss/CurrentWeather.xml',
    traditionalChinese: 'http://rss.weather.gov.hk/rss/CurrentWeather_uc.xml',
    simplifiedChinese: 'http://gbrss.weather.gov.hk/rss/CurrentWeather_uc.xml'
};


var warningInformationURL = {
    english: 'http://rss.weather.gov.hk/rss/WeatherWarningBulletin.xml',
    traditionalChinese: 'http://rss.weather.gov.hk/rss/WeatherWarningBulletin_uc.xml',
    simplifiedChinese: 'http://gbrss.weather.gov.hk/rss/WeatherWarningBulletin_uc.xml'
};


var warningSummaryURL = {
    english: 'http://rss.weather.gov.hk/rss/WeatherWarningSummaryv2.xml',
    traditionalChinese: 'http://rss.weather.gov.hk/rss/WeatherWarningSummaryv2_uc.xml',
    simplifiedChinese: 'http://gbrss.weather.gov.hk/rss/WeatherWarningSummaryv2_uc.xml'
};

var language = {
	english: 'English',
	traditionalChinese: '繁體中文',
	simplifiedChinese: '简体中文'

};


storage.setItem('currentURL', currentURL.english);
storage.setItem('warningInformationURL', warningInformationURL.english);
storage.setItem('warningSummaryURL', warningSummaryURL.english);
storage.setItem('language', language.english);


stdin.addListener('data', function(d) {
	var userInput = d.toString().trim();

	//console.log("you entered: [" + userInput + "]");


	if (userInput == '@Bot topics') {

		var date = new Date();
		var hours = date.getHours();

		// cut string if time is within 19:00pm to 23:00pm, noon to 05:00am
		if ((hours >= 19 && hours <= 23) || (hours >= 0 && hours <= 5)) {

			switch (storage.getItem('language')) {
				case 'English':
					// current
					request({
					    url: currentURL.english,
					    json: true
					}, function (error, response, body) {

					    if (!error && response.statusCode === 200) {

					        parseString(body, function (err, result) {

							    for (var i = 0; i < result.rss.channel.length; i++) {

							    	for (var j = 0; j < result.rss.channel[i].item.length; j++) {
							    		var current = result.rss.channel[i].item[j].description.toString().substring(0, 285);

							    		var text = htmlToText.fromString(current, {
											wordwrap: 130,
											ignoreImage: true
										});
										console.log('Current');
										console.log('--------------------------------------------------------');
										console.log(text.trim());
										console.log();
										console.log();

							    	}
							    }
							});
					    }
					});
					break;

				case '繁體中文':
					// current
					request({
					    url: currentURL.traditionalChinese,
					    json: true
					}, function (error, response, body) {

					    if (!error && response.statusCode === 200) {

					        parseString(body, function (err, result) {

							    for (var i = 0; i < result.rss.channel.length; i++) {

							    	for (var j = 0; j < result.rss.channel[i].item.length; j++) {
							    		var current = result.rss.channel[i].item[j].description.toString().substring(0, 200);

							    		var text = htmlToText.fromString(current, {
											wordwrap: 130,
											ignoreImage: true
										});
										console.log('現時');
										console.log('--------------------------------------------------------');
										console.log(text.trim());
										console.log();
										console.log();

							    	}
							    }
							});
					    }
					});
					break;

				case '简体中文':
					// current
					request({
					    url: currentURL.simplifiedChinese,
					    json: true
					}, function (error, response, body) {

					    if (!error && response.statusCode === 200) {

					        parseString(body, function (err, result) {

							    for (var i = 0; i < result.rss.channel.length; i++) {

							    	for (var j = 0; j < result.rss.channel[i].item.length; j++) {
							    		var current = result.rss.channel[i].item[j].description.toString().substring(0, 200);

							    		var text = htmlToText.fromString(current, {
											wordwrap: 130,
											ignoreImage: true
										});
										console.log('现时');
										console.log('--------------------------------------------------------');
										console.log(text.trim());
										console.log();
										console.log();

							    	}
							    }
							});
					    }
					});
					break;


			}

		} 


		// cut string if time is within 06:00am to 18:00pm
		if (hours >= 6 && hours <= 18) {
			switch(storage.getItem('language')) {
				case 'English':
					// current
					request({
					    url: currentURL.english,
					    json: true
					}, function (error, response, body) {

					    if (!error && response.statusCode === 200) {

					        parseString(body, function (err, result) {

							    for (var i = 0; i < result.rss.channel.length; i++) {

							    	for (var j = 0; j < result.rss.channel[i].item.length; j++) {
							    		var current = result.rss.channel[i].item[j].description.toString().substring(0, 600);

							    		var text = htmlToText.fromString(current, {
											wordwrap: 130,
											ignoreImage: true
										});
										console.log('Current');
										console.log('--------------------------------------------------------');
										console.log(text.trim());
										console.log();
										console.log();

							    	}
							    }
							});
					    }
					});
					break;


				case '繁體中文':
					// current
					request({
					    url: currentURL.traditionalChinese,
					    json: true
					}, function (error, response, body) {

					    if (!error && response.statusCode === 200) {

					        parseString(body, function (err, result) {

							    for (var i = 0; i < result.rss.channel.length; i++) {

							    	for (var j = 0; j < result.rss.channel[i].item.length; j++) {
							    		var current = result.rss.channel[i].item[j].description.toString().substring(0, 410);

							    		var text = htmlToText.fromString(current, {
											wordwrap: 130,
											ignoreImage: true
										});
										console.log('現時');
										console.log('--------------------------------------------------------');
										console.log(text.trim());
										console.log();
										console.log();

							    	}
							    }
							});
					    }
					});
					break;

				case '简体中文':
					// current
					request({
					    url: currentURL.simplifiedChinese,
					    json: true
					}, function (error, response, body) {

					    if (!error && response.statusCode === 200) {

					        parseString(body, function (err, result) {

							    for (var i = 0; i < result.rss.channel.length; i++) {

							    	for (var j = 0; j < result.rss.channel[i].item.length; j++) {
							    		var current = result.rss.channel[i].item[j].description.toString().substring(0, 410);

							    		var text = htmlToText.fromString(current, {
											wordwrap: 130,
											ignoreImage: true
										});
										console.log('现时');
										console.log('--------------------------------------------------------');
										console.log(text.trim());
										console.log();
										console.log();

							    	}
							    }
							});
					    }
					});
					break;


			}


		}


		switch (storage.getItem('language')) {
			case 'English':
				// warning
				if (storage.getItem('subscribeWarning') == true) {
					setTimeout(function () {
						request({
						    url: warningInformationURL.english,
						    json: true
						}, function (error, response, body) {

						    if (!error && response.statusCode === 200) {

						        parseString(body, function (err, result) {

								    for (var i = 0; i < result.rss.channel.length; i++) {

								    	for (var j = 0; j < result.rss.channel[i].item.length; j++) {
								    		var warning = result.rss.channel[i].item[j].description.toString();

								    		var text = htmlToText.fromString(warning, {
												wordwrap: 130
											});
											console.log('Warning');
											console.log('--------------------------------------------------------');
											console.log(text.trim());
								    	}
								    }
								});
						    }
						});



					}, 500);

				} else {
					return false;
				}
				break;

			case '繁體中文':
				// warning
				if (storage.getItem('subscribeWarning') == true) {
					setTimeout(function () {
						request({
						    url: warningInformationURL.traditionalChinese,
						    json: true
						}, function (error, response, body) {

						    if (!error && response.statusCode === 200) {

						        parseString(body, function (err, result) {

								    for (var i = 0; i < result.rss.channel.length; i++) {

								    	for (var j = 0; j < result.rss.channel[i].item.length; j++) {
								    		var warning = result.rss.channel[i].item[j].description.toString();

								    		var text = htmlToText.fromString(warning, {
												wordwrap: 130
											});
											console.log('警告');
											console.log('--------------------------------------------------------');
											console.log(text.trim());
								    	}
								    }
								});
						    }
						});



					}, 500);

				} else {
					return false;
				}
				break;

			case '简体中文':
				// warning
				if (storage.getItem('subscribeWarning') == true) {
					setTimeout(function () {
						request({
						    url: warningInformationURL.simplifiedChinese,
						    json: true
						}, function (error, response, body) {

						    if (!error && response.statusCode === 200) {

						        parseString(body, function (err, result) {

								    for (var i = 0; i < result.rss.channel.length; i++) {

								    	for (var j = 0; j < result.rss.channel[i].item.length; j++) {
								    		var warning = result.rss.channel[i].item[j].description.toString();

								    		var text = htmlToText.fromString(warning, {
												wordwrap: 130
											});
											console.log('警告');
											console.log('--------------------------------------------------------');
											console.log(text.trim());
								    	}
								    }
								});
						    }
						});



					}, 500);

				} else {
					return false;
				}
				break;




		}


	}


	if (userInput == '@Bot tellme current') {

		var date = new Date();
		var hours = date.getHours();


		// cut string if time is within 19:00pm to 23:00pm, noon to 05:00am
		if ((hours >= 19 && hours <= 23) || (hours >= 0 && hours <= 5)) {
			switch(storage.getItem('language')) {
				case 'English':
					request({
					    url: currentURL.english,
					    json: true
					}, function (error, response, body) {

					    if (!error && response.statusCode === 200) {

					        parseString(body, function (err, result) {

							    for (var i = 0; i < result.rss.channel.length; i++) {

							    	for (var j = 0; j < result.rss.channel[i].item.length; j++) {
							    		var current = result.rss.channel[i].item[j].description.toString().substring(0, 285);

							    		var text = htmlToText.fromString(current, {
											wordwrap: 130,
											ignoreImage: true
										});

										console.log("'''" + text.substring(2, 41).trim());
										console.log("     " + text.substring(42, 79).trim());
										console.log("     " + text.substring(80).trim());
										console.log("'''");
							    	}
							    }
							});
					    }
					});
					break;


				case '繁體中文':
					request({
					    url: currentURL.traditionalChinese,
					    json: true
					}, function (error, response, body) {

					    if (!error && response.statusCode === 200) {

					        parseString(body, function (err, result) {

							    for (var i = 0; i < result.rss.channel.length; i++) {

							    	for (var j = 0; j < result.rss.channel[i].item.length; j++) {
							    		var current = result.rss.channel[i].item[j].description.toString().substring(0, 280);

							    		var text = htmlToText.fromString(current, {
											wordwrap: 130,
											ignoreImage: true
										});

										console.log("'''" + text.substring(0, 19).trim());
										console.log("     " + text.substring(20, 30).trim());
										console.log("     " + text.substring(31, 50).trim());
										console.log("'''");
							    	}
							    }
							});
					    }
					});
					break;

				case '简体中文':
					request({
					    url: currentURL.simplifiedChinese,
					    json: true
					}, function (error, response, body) {

					    if (!error && response.statusCode === 200) {

					        parseString(body, function (err, result) {

							    for (var i = 0; i < result.rss.channel.length; i++) {

							    	for (var j = 0; j < result.rss.channel[i].item.length; j++) {
							    		var current = result.rss.channel[i].item[j].description.toString().substring(0, 280);

							    		var text = htmlToText.fromString(current, {
											wordwrap: 130,
											ignoreImage: true
										});

										console.log("'''" + text.substring(0, 19).trim());
										console.log("     " + text.substring(20, 30).trim());
										console.log("     " + text.substring(31, 50).trim());
										console.log("'''");
							    	}
							    }
							});
					    }
					});
					break;

			}

		}



		// cut string if time is within 06:00am to 18:00pm
		if (hours >= 6 && hours <= 18) {
			switch(storage.getItem('language')) {
				case 'English':
					request({
					    url: currentURL.english,
					    json: true
					}, function (error, response, body) {

					    if (!error && response.statusCode === 200) {

					        parseString(body, function (err, result) {

							    for (var i = 0; i < result.rss.channel.length; i++) {

							    	for (var j = 0; j < result.rss.channel[i].item.length; j++) {
							    		var current = result.rss.channel[i].item[j].description.toString().substring(0, 420);

							    		var text = htmlToText.fromString(current, {
											wordwrap: 130,
											ignoreImage: true
										});

										console.log("'''" + text.substring(2, 40).trim());
										console.log("     " + text.substring(41, 78).trim());
										console.log("     " + text.substring(79, 110).trim());
										console.log("     " + text.substring(111, 131).trim());
										console.log("     " + text.substring(132, 177).trim());
										console.log("     " + text.substring(178).trim());
										console.log("'''");
							    	}
							    }
							});
					    }
					});
					break;


				case '繁體中文':
					request({
					    url: currentURL.traditionalChinese,
					    json: true
					}, function (error, response, body) {

					    if (!error && response.statusCode === 200) {

					        parseString(body, function (err, result) {

							    for (var i = 0; i < result.rss.channel.length; i++) {

							    	for (var j = 0; j < result.rss.channel[i].item.length; j++) {
							    		var current = result.rss.channel[i].item[j].description.toString().substring(0, 410);

							    		var text = htmlToText.fromString(current, {
											wordwrap: 130,
											ignoreImage: true
										});

										console.log("'''" + text.substring(0, 18).trim());
										console.log("     " + text.substring(19, 29).trim());
										console.log("     " + text.substring(30, 49).trim());
										console.log("     " + text.substring(50, 91).trim());
										console.log("     " + text.substring(92, 109).trim());
										console.log("     " + text.substring(109).trim());
										console.log("'''");
							    	}
							    }
							});
					    }
					});
					break;


				case '简体中文':
					request({
					    url: currentURL.simplifiedChinese,
					    json: true
					}, function (error, response, body) {

					    if (!error && response.statusCode === 200) {

					        parseString(body, function (err, result) {

							    for (var i = 0; i < result.rss.channel.length; i++) {

							    	for (var j = 0; j < result.rss.channel[i].item.length; j++) {
							    		var current = result.rss.channel[i].item[j].description.toString().substring(0, 410);

							    		var text = htmlToText.fromString(current, {
											wordwrap: 130,
											ignoreImage: true
										});

										console.log("'''" + text.substring(0, 18).trim());
										console.log("     " + text.substring(19, 29).trim());
										console.log("     " + text.substring(30, 49).trim());
										console.log("     " + text.substring(50, 91).trim());
										console.log("     " + text.substring(92, 109).trim());
										console.log("     " + text.substring(109).trim());
										console.log("'''");
							    	}
							    }
							});
					    }
					});
					break;

			}

		}



	}


	if (userInput == '@Bot tellme warning') {
		if (storage.getItem('subscribeWarning') == true) {
			request({
			    url: storage.getItem('warningSummaryURL'),
			    json: true
			}, function (error, response, body) {

			    if (!error && response.statusCode === 200) {

			        parseString(body, function (err, result) {

					    for (var i = 0; i < result.rss.channel.length; i++) {

					    	for (var j = 0; j < result.rss.channel[i].item.length; j++) {
					    		var description = result.rss.channel[i].item[j].description.toString();

					    		var time = result.rss.channel[i].item[j].pubDate.toString().substring(17, 22).trim();
					    		var day = result.rss.channel[i].item[j].pubDate.toString().substring(4, 7).trim();
					    		var month = result.rss.channel[i].item[j].pubDate.toString().substring(8, 11).trim();

					    		switch(month) {
					    			case 'Jan':
					    				month = '01';
					    				break;
					    			case 'Feb':
					    				month = '02';
					    				break;
					    			case 'Mar':
					    				month = '03';
					    				break;
					    			case 'Apr':
					    				month = '04';
					    				break;
					    			case 'May':
					    				month = '05';
					    				break;
					    			case 'Jun':
					    				month = '06';
					    				break;
					    			case 'Jul':
					    				month = '07';
					    				break;
					    			case 'Aug':
					    				month = '08';
					    				break;
					    			case 'Sep':
					    				month = '09';
					    				break;
					    			case 'Oct':
					    				month = '10';
					    				break;
					    			case 'Nov':
					    				month = '11';
					    				break;
					    			case 'Dec':
					    				month = '12';
					    				break;
					    		}


					    		var year = result.rss.channel[i].item[j].pubDate.toString().substring(12, 16).trim();
					    		var date = day + '/' + month + '/' + year;

					    		var warning = description + ' (' + time + ' HKT ' + date + ')';

					    		var text = htmlToText.fromString(warning, {
									wordwrap: 130
								});
								console.log(text.trim());
					    	}
					    }
					});
			    }
			});

		} else {
			return false;
		}

		
	}


	if (userInput == '@Bot subscribe warning') {

		storage.setItem('subscribeWarning', true);
		console.log('OK');

	}

	if (userInput == '@Bot unsubscribe warning') {

		storage.setItem('subscribeWarning', false);
		console.log('OK');

	}


	if (userInput == '@Bot 繁體中文') {

		storage.setItem('language', language.traditionalChinese);

		storage.setItem('currentURL', currentURL.traditionalChinese);
		storage.setItem('warningInformationURL', warningInformationURL.traditionalChinese);
		storage.setItem('warningSummaryURL', warningSummaryURL.traditionalChinese);
		console.log('知道了');

	}


	if (userInput == '@Bot 简体中文') {

		storage.setItem('language', language.simplifiedChinese);

		storage.setItem('currentURL', currentURL.simplifiedChinese);
		storage.setItem('warningInformationURL', warningInformationURL.simplifiedChinese);
		storage.setItem('warningSummaryURL', warningSummaryURL.simplifiedChinese);
		console.log('知道了');

	}


	if (userInput == '@Bot English') {

		storage.setItem('language', language.english);

		storage.setItem('currentURL', currentURL.english);
		storage.setItem('warningInformationURL', warningInformationURL.english);
		storage.setItem('warningSummaryURL', warningSummaryURL.english);
		console.log('OK');

	}


});








