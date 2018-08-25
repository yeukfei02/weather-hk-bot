'use strict';

console.log('OK. The bot is running...')

// bot name: weatherHKBot
// link: t.me/weatherHKBot
const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;
const TextCommand = Telegram.TextCommand;
const $ = new Telegram.Telegram('464954249:AAFYuoCvPmHEp3bfg4X1iAjLE3YVGHc56Gg');

const request = require("request");
const parseString = require('xml2js').parseString;
const htmlToText = require('html-to-text');

// store user setting
let languageObj = {
    english: 'English',
    traditionalChinese: '繁體中文',
    simplifiedChinese: '简体中文'
};

let currentURLObj = {
    english: 'http://rss.weather.gov.hk/rss/CurrentWeather.xml',
    traditionalChinese: 'http://rss.weather.gov.hk/rss/CurrentWeather_uc.xml',
    simplifiedChinese: 'http://gbrss.weather.gov.hk/rss/CurrentWeather_uc.xml'
};

let warningInformationURLObj = {
    english: 'http://rss.weather.gov.hk/rss/WeatherWarningBulletin.xml',
    traditionalChinese: 'http://rss.weather.gov.hk/rss/WeatherWarningBulletin_uc.xml',
    simplifiedChinese: 'http://gbrss.weather.gov.hk/rss/WeatherWarningBulletin_uc.xml'
};

let warningSummaryURLObj = {
    english: 'http://rss.weather.gov.hk/rss/WeatherWarningSummaryv2.xml',
    traditionalChinese: 'http://rss.weather.gov.hk/rss/WeatherWarningSummaryv2_uc.xml',
    simplifiedChinese: 'http://gbrss.weather.gov.hk/rss/WeatherWarningSummaryv2_uc.xml'
};

let subscribeWarning = true;
let language = languageObj.english;
let currentURL = currentURLObj.english;
let warningInformationURL = warningInformationURLObj.english;
let warningSummaryURL = warningSummaryURLObj.english;

function getCurrentResponse($, urlLink, strToShow) {
	// current response
	request({
    url: urlLink,
    json: true
	}, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      parseString(body, (err, result) => {
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
  request({
    url: urlLink,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      parseString(body, (err, result) => {
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
}

class TopicsController extends TelegramBaseController {
    topicsHandler($) {
  		switch (language) {
  			case 'English':
  				getCurrentResponse($, currentURL, 'Current');
  				if (subscribeWarning) {
  					getWarningResponse($, warningInformationURL, 'Warning');
  				} else {
  					$.sendMessage('Please subscribe warning');
  				}
  				break;
  			case '繁體中文':
  				getCurrentResponse($, currentURL, '現時');
  				if (subscribeWarning) {
  					getWarningResponse($, warningInformationURL, '警告');
  				} else {
  					$.sendMessage('Please subscribe warning');
  				}
  				break;
  			case '简体中文':
  				getCurrentResponse($, currentURL, '现时');
  				if (subscribeWarning) {
  					getWarningResponse($, warningInformationURL, '警告');
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
    	switch (language) {
  			case 'English':
  				getCurrentResponse($, currentURL, 'Current');
  				break;
  			case '繁體中文':
  				getCurrentResponse($, currentURL, '現時');
  				break;
  			case '简体中文':
  				getCurrentResponse($, currentURL, '现时');
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
  		switch (language) {
  			case 'English':
  				if (subscribeWarning) {
  					getWarningResponse($, warningSummaryURL, 'Warning');
  				} else {
  					$.sendMessage('Please subscribe warning');
  				}
  				break;
  			case '繁體中文':
  				if (subscribeWarning) {
  					getWarningResponse($, warningSummaryURL, '警告');
  				} else {
  					$.sendMessage('Please subscribe warning');
  				}
  				break;
  			case '简体中文':
  				if (subscribeWarning) {
  					getWarningResponse($, warningSummaryURL, '警告');
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
    	subscribeWarning = true;

      $.sendMessage('You just subscribe warning');
    }

  	get routes() {
      return {
        'subscribeWarningCommand': 'subscribeWarningHandler'
      }
    }
}

class UnsubscribeWarningController extends TelegramBaseController {
  	unsubscribeWarningHandler($) {
    	subscribeWarning = false;

      $.sendMessage('You just unsubscribe warning');
    }

  	get routes() {
      return {
        'unsubscribeWarningCommand': 'unsubscribeWarningHandler'
      }
    }
}

class EnglishController extends TelegramBaseController {
  	englishHandler($) {
  		language = languageObj.english;
  		currentURL = currentURLObj.english;
  		warningInformationURL = warningInformationURLObj.english;
  		warningSummaryURL = warningSummaryURLObj.english;

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
  		language = languageObj.traditionalChinese;
  		currentURL = currentURLObj.traditionalChinese;
  		warningInformationURL = warningInformationURLObj.traditionalChinese;
  		warningSummaryURL = warningSummaryURLObj.traditionalChinese;

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
    	language = languageObj.simplifiedChinese;
  		currentURL = currentURLObj.simplifiedChinese;
  		warningInformationURL = warningInformationURLObj.simplifiedChinese;
  		warningSummaryURL = warningSummaryURLObj.simplifiedChinese;

      $.sendMessage('知道了');
    }

    get routes() {
      return {
        'simplifiedChineseCommand': 'simplifiedChineseHandler'
      }
    }
}

$.router
	.when(new TextCommand('@Bot topics', 'topicsCommand'), new TopicsController())
	.when(new TextCommand('@Bot tellme current', 'tellMeCurrentCommand'), new TellmeCurrentController())
	.when(new TextCommand('@Bot tellme warning', 'tellMeWarningCommand'), new TellmeWarningController())
	.when(new TextCommand('@Bot subscribe warning', 'subscribeWarningCommand'), new SubscribeWarningController())
	.when(new TextCommand('@Bot unsubscribe warning', 'unsubscribeWarningCommand'), new UnsubscribeWarningController())
	.when(new TextCommand('@Bot English', 'englishCommand'), new EnglishController())
	.when(new TextCommand('@Bot 繁體中文', 'traditionalChineseCommand'), new TraditionalChineseController())
	.when(new TextCommand('@Bot 简体中文', 'simplifiedChineseCommand'), new SimplifiedChineseController());
