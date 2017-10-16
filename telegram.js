'use strict';

console.log('OK. The bot is running...')

// bot name: weatherHKBot
// link: t.me/weatherHKBot
const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;
const TextCommand = Telegram.TextCommand;
const tg = new Telegram.Telegram('464954249:AAFYuoCvPmHEp3bfg4X1iAjLE3YVGHc56Gg');

const request = require("request");
const parseString = require('xml2js').parseString;
const htmlToText = require('html-to-text');
const storage = require('node-persist');


// store user setting
storage.initSync();
storage.setItem('subscribeWarning', true);

let currentURL = {
    english: 'http://rss.weather.gov.hk/rss/CurrentWeather.xml',
    traditionalChinese: 'http://rss.weather.gov.hk/rss/CurrentWeather_uc.xml',
    simplifiedChinese: 'http://gbrss.weather.gov.hk/rss/CurrentWeather_uc.xml'
};


let warningInformationURL = {
    english: 'http://rss.weather.gov.hk/rss/WeatherWarningBulletin.xml',
    traditionalChinese: 'http://rss.weather.gov.hk/rss/WeatherWarningBulletin_uc.xml',
    simplifiedChinese: 'http://gbrss.weather.gov.hk/rss/WeatherWarningBulletin_uc.xml'
};


let warningSummaryURL = {
    english: 'http://rss.weather.gov.hk/rss/WeatherWarningSummaryv2.xml',
    traditionalChinese: 'http://rss.weather.gov.hk/rss/WeatherWarningSummaryv2_uc.xml',
    simplifiedChinese: 'http://gbrss.weather.gov.hk/rss/WeatherWarningSummaryv2_uc.xml'
};

let language = {
    english: 'English',
    traditionalChinese: '繁體中文',
    simplifiedChinese: '简体中文'

};

storage.setItem('currentURL', currentURL.english);
storage.setItem('warningInformationURL', warningInformationURL.english);
storage.setItem('warningSummaryURL', warningSummaryURL.english);
storage.setItem('language', language.english);


function getCurrentResponse($, urlLink, strToShow) {
	// current response
	request({
	    url: urlLink,
	    json: true
	}, function (error, response, body) {
	    if (!error && response.statusCode === 200) {
	        parseString(body, function (err, result) {
			    for (let i = 0; i < result.rss.channel.length; i++) {

			    	for (let j = 0; j < result.rss.channel[i].item.length; j++) {
			    		let currentResponse = result.rss.channel[i].item[j].description.toString();

			    		let text = htmlToText.fromString(currentResponse, {
							wordwrap: 130,
							//ignoreImage: true
						});

			    		$.sendMessage('------------------ [' + strToShow + '] ------------------');
						$.sendMessage(text);

			    	}
			    }
			});
	    }
	});
}


function getWarningResponse($, urlLink, strToShow) {
	// warning response
	setTimeout(function () {
		request({
		    url: urlLink,
		    json: true
		}, function (error, response, body) {
		    if (!error && response.statusCode === 200) {
		        parseString(body, function (err, result) {
				    for (let i = 0; i < result.rss.channel.length; i++) {

				    	for (let j = 0; j < result.rss.channel[i].item.length; j++) {
				    		let warningResponse = result.rss.channel[i].item[j].description.toString();

				    		let text = htmlToText.fromString(warningResponse, {
								wordwrap: 130
							});

							$.sendMessage('------------------ [' + strToShow + '] ------------------');
							$.sendMessage(text);

				    	}
				    }
				});
		    }
		});
	}, 500);
}



class TopicsController extends TelegramBaseController {
    topicsHandler($) {
    	let language = storage.getItem('language');
    	let subscribeWarning = storage.getItem('subscribeWarning');
		switch (language) {
			case 'English':
				getCurrentResponse($, currentURL.english, 'Current');
				if (subscribeWarning) {
					getWarningResponse($, warningInformationURL.english, 'Warning');
				} else {
					$.sendMessage('Please subscribe warning');
				}
				break;
			case '繁體中文':
				getCurrentResponse($, currentURL.traditionalChinese, '現時');
				if (subscribeWarning) {
					getWarningResponse($, warningInformationURL.traditionalChinese, '警告');
				} else {
					$.sendMessage('Please subscribe warning');
				}
				break;
			case '简体中文':
				getCurrentResponse($, currentURL.simplifiedChinese, '现时');
				if (subscribeWarning) {
					getWarningResponse($, warningInformationURL.simplifiedChinese, '警告');
				} else {
					$.sendMessage('Please subscribe warning');
				}
				break;
		}

    }


    get routes() {
        return {
            'topicsCommand': 'topicsHandler'
            
        }
    }

}



class TellmeCurrentController extends TelegramBaseController {
    tellMeCurrentHandler($) {
    	let language = storage.getItem('language');
    	switch (language) {
			case 'English':
				getCurrentResponse($, currentURL.english, 'Current');
				break;
			case '繁體中文':
				getCurrentResponse($, currentURL.traditionalChinese, '現時');
				break;
			case '简体中文':
				getCurrentResponse($, currentURL.simplifiedChinese, '现时');
				break;

		}
    }


    get routes() {
        return {
            'tellMeCurrentCommand': 'tellMeCurrentHandler'
        }
    }

}


class TellmeWarningController extends TelegramBaseController {
	tellMeWarningHandler($) {
		let language = storage.getItem('language');
		let subscribeWarning = storage.getItem('subscribeWarning');
		switch (language) {
			case 'English':
				if (subscribeWarning) {
					getWarningResponse($, warningSummaryURL.english, 'Warning');
				} else {
					$.sendMessage('Please subscribe warning');
				}
				break;
			case '繁體中文':
				if (subscribeWarning) {
					getWarningResponse($, warningSummaryURL.traditionalChinese, '警告');
				} else {
					$.sendMessage('Please subscribe warning');
				}
				break;
			case '简体中文':
				if (subscribeWarning) {
					getWarningResponse($, warningSummaryURL.simplifiedChinese, '警告');
				} else {
					$.sendMessage('Please subscribe warning');
				}
				break;

		}
        
    }


    get routes() {
        return {
            'tellMeWarningCommand': 'tellMeWarningHandler'
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
            'subscribeWarningCommand': 'subscribeWarningHandler'
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
            'unsubscribeWarningCommand': 'unsubscribeWarningHandler'
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
            'englishCommand': 'englishHandler'
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
            'traditionalChineseCommand': 'traditionalChineseHandler'
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
            'simplifiedChineseCommand': 'simplifiedChineseHandler'
        }
    }

}


tg.router
	.when(new TextCommand('@Bot topics', 'topicsCommand'), new TopicsController())
	.when(new TextCommand('@Bot tellme current', 'tellMeCurrentCommand'), new TellmeCurrentController())
	.when(new TextCommand('@Bot tellme warning', 'tellMeWarningCommand'), new TellmeWarningController())
	.when(new TextCommand('@Bot subscribe warning', 'subscribeWarningCommand'), new SubscribeWarningController())
	.when(new TextCommand('@Bot unsubscribe warning', 'unsubscribeWarningCommand'), new UnsubscribeWarningController())
	.when(new TextCommand('@Bot English', 'englishCommand'), new EnglishController())
	.when(new TextCommand('@Bot 繁體中文', 'traditionalChineseCommand'), new TraditionalChineseController())
	.when(new TextCommand('@Bot 简体中文', 'simplifiedChineseCommand'), new SimplifiedChineseController());





