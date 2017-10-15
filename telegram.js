'use strict';

// Bot name: weatherHKBot
// link: t.me/weatherHKBot
const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;
const tg = new Telegram.Telegram('454777035:AAH7NRlTlNv_7CJ8Qepdoc8a12NfxO-s4gQ');


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


class TopicsController extends TelegramBaseController {
    

    topicsHandler($) {

    	var date = new Date();
		var hours = date.getHours();


		// cut string if time is within 19:00pm to 23:00pm, noon to 05:00am
		if ((hours >= 19 && hours <= 23) || (hours >= 0 && hours <= 5)) {
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
							    		var current = result.rss.channel[i].item[j].description.toString().substring(0, 285);

							    		var text = htmlToText.fromString(current, {
											wordwrap: 130,
											ignoreImage: true
										});

							    		$.sendMessage('Current');
										$.sendMessage('---------------------------------------------------');
										$.sendMessage(text.trim());

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

							    		$.sendMessage('現時');
										$.sendMessage('---------------------------------------------------');
										$.sendMessage(text.trim());

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

							    		$.sendMessage('现时');
										$.sendMessage('---------------------------------------------------');
										$.sendMessage(text.trim());

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

							    		$.sendMessage('Current');
										$.sendMessage('---------------------------------------------------');
										$.sendMessage(text.trim());

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
							    		var current = result.rss.channel[i].item[j].description.toString().substring(0, 350);

							    		var text = htmlToText.fromString(current, {
											wordwrap: 130,
											ignoreImage: true
										});
										
										$.sendMessage('現時');
										$.sendMessage('---------------------------------------------------');
										$.sendMessage(text.trim());

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
							    		var current = result.rss.channel[i].item[j].description.toString().substring(0, 350);

							    		var text = htmlToText.fromString(current, {
											wordwrap: 130,
											ignoreImage: true
										});

							    		$.sendMessage('现时');
										$.sendMessage('---------------------------------------------------');
										$.sendMessage(text.trim());

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

											$.sendMessage('Warning');
											$.sendMessage('---------------------------------------------------');
											$.sendMessage(text.trim());

								    	}
								    }
								});
						    }
						});



					}, 500);

				} else {
					$.sendMessage('Please subscribe warning');
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

								    		$.sendMessage('警告');
											$.sendMessage('---------------------------------------------------');
								    		$.sendMessage(text.trim());

								    	}
								    }
								});
						    }
						});



					}, 500);

				} else {
					$.sendMessage('Please subscribe warning');
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

											$.sendMessage('警告');
											$.sendMessage('---------------------------------------------------');
								    		$.sendMessage(text.trim());

								    	}
								    }
								});
						    }
						});



					}, 500);

				} else {
					$.sendMessage('Please subscribe warning');
				}
				break;

		}


    }



    get routes() {
        return {
            '@Bot topics': 'topicsHandler'
            
        }
    }

}



class TellmeCurrentController extends TelegramBaseController {

    tellMeCurrentHandler($) {

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
										console.log(text.substring(42, 79).trim());
										console.log(text.substring(80).trim());
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
										console.log(text.substring(20, 30).trim());
										console.log(text.substring(31, 50).trim());
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
										console.log(text.substring(20, 30).trim());
										console.log(text.substring(31, 50).trim());
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
							    		var current = result.rss.channel[i].item[j].description.toString().substring(0, 430);

							    		var text = htmlToText.fromString(current, {
											wordwrap: 130,
											ignoreImage: true
										});

										$.sendMessage("'''" + text.substring(2, 40).trim());
										$.sendMessage(text.substring(41, 78).trim());
										$.sendMessage(text.substring(79, 110).trim());
										$.sendMessage(text.substring(111, 131).trim());
										$.sendMessage(text.substring(132, 177).trim());
										$.sendMessage(text.substring(178).trim());
										$.sendMessage("'''");
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
							    		var current = result.rss.channel[i].item[j].description.toString().substring(0, 350);

							    		var text = htmlToText.fromString(current, {
											wordwrap: 130,
											ignoreImage: true
										});

										$.sendMessage("'''" + text.substring(0, 18).trim());
										$.sendMessage(text.substring(19, 29).trim());
										$.sendMessage(text.substring(30, 49).trim());
										$.sendMessage(text.substring(50, 91).trim());
										$.sendMessage(text.substring(92, 109).trim());
										$.sendMessage(text.substring(110).trim());
										$.sendMessage("'''");
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
							    		var current = result.rss.channel[i].item[j].description.toString().substring(0, 350);

							    		var text = htmlToText.fromString(current, {
											wordwrap: 130,
											ignoreImage: true
										});

							    		$.sendMessage("'''" + text.substring(0, 18).trim());
										$.sendMessage(text.substring(19, 29).trim());
										$.sendMessage(text.substring(30, 49).trim());
										$.sendMessage(text.substring(50, 91).trim());
										$.sendMessage(text.substring(92, 109).trim());
										$.sendMessage(text.substring(110).trim());
										$.sendMessage("'''");

							    	}
							    }
							});
					    }
					});
					break;

			}


		}


    }


    get routes() {
        return {
            '@Bot tellme current': 'tellMeCurrentHandler'
        }
    }

}




class TellmeWarningController extends TelegramBaseController {

	tellMeWarningHandler($) {
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
								
								$.sendMessage(text.trim());

					    	}
					    }
					});
			    }
			});

		} else {
			$.sendMessage('Please subscribe warning');
		}


    }


    get routes() {
        return {
            '@Bot tellme warning': 'tellMeWarningHandler'
        }
    }


}



class SubscribeWarningController extends TelegramBaseController {

	subscribeWarningHandler($) {
    	storage.setItem('subscribeWarning', true);

        $.sendMessage('OK');
    }


	get routes() {
        return {
            '@Bot subscribe warning': 'subscribeWarningHandler'
        }
    }

}



class UnsubscribeWarningController extends TelegramBaseController {

	unsubscribeWarningHandler($) {
    	storage.setItem('subscribeWarning', false);

        $.sendMessage('OK');
    }


	get routes() {
        return {
            '@Bot unsubscribe warning': 'unsubscribeWarningHandler'
        }
    }

}



class EnglishController extends TelegramBaseController {

	englishHandler($) {
    	storage.setItem('language', language.english);

		storage.setItem('currentURL', currentURL.english);
		storage.setItem('warningInformationURL', warningInformationURL.english);
		storage.setItem('warningSummaryURL', warningSummaryURL.english);

        $.sendMessage('OK');
    }



	get routes() {
        return {
            '@Bot English': 'englishHandler'
        }
    }

}




class TraditionalChineseController extends TelegramBaseController {
	
	traditionalChineseHandler($) {
		storage.setItem('language', language.traditionalChinese);

		storage.setItem('currentURL', currentURL.traditionalChinese);
		storage.setItem('warningInformationURL', warningInformationURL.traditionalChinese);
		storage.setItem('warningSummaryURL', warningSummaryURL.traditionalChinese);

        $.sendMessage('知道了');
    }



	get routes() {
        return {
            '@Bot 繁體中文': 'traditionalChineseHandler'
        }
    }

}




class SimplifiedChineseController extends TelegramBaseController {
	
	
    simplifiedChineseHandler($) {
    	storage.setItem('language', language.simplifiedChinese);

		storage.setItem('currentURL', currentURL.simplifiedChinese);
		storage.setItem('warningInformationURL', warningInformationURL.simplifiedChinese);
		storage.setItem('warningSummaryURL', warningSummaryURL.simplifiedChinese);

        $.sendMessage('知道了');
    }




	get routes() {
        return {
            '@Bot 简体中文': 'simplifiedChineseHandler'
        }
    }

}





tg.router
    .when('@Bot topics', new TopicsController())
    .when('@Bot tellme current', new TellmeCurrentController())
   	.when('@Bot tellme warning', new TellmeWarningController())
   	.when('@Bot subscribe warning', new SubscribeWarningController())
   	.when('@Bot unsubscribe warning', new UnsubscribeWarningController())
   	.when('@Bot English', new EnglishController())
   	.when('@Bot 繁體中文', new TraditionalChineseController())
   	.when('@Bot 简体中文', new SimplifiedChineseController());





