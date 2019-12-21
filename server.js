// bot name: weatherHKBot
// link: t.me/weatherHKBot
const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;
const TextCommand = Telegram.TextCommand;
const tg = new Telegram.Telegram(process.env.TELEGRAM_KEY);

const axios = require("axios");
const _ = require("lodash");
const parseString = require('xml2js').parseString;
const htmlToText = require('html-to-text');

// store user setting
const languageObj = {
  english: 'English',
  traditionalChinese: '繁體中文',
  simplifiedChinese: '简体中文'
};

const currentURLObj = {
  english: 'http://rss.weather.gov.hk/rss/CurrentWeather.xml',
  traditionalChinese: 'http://rss.weather.gov.hk/rss/CurrentWeather_uc.xml',
  simplifiedChinese: 'http://gbrss.weather.gov.hk/rss/CurrentWeather_uc.xml'
};

const warningInformationURLObj = {
  english: 'http://rss.weather.gov.hk/rss/WeatherWarningBulletin.xml',
  traditionalChinese: 'http://rss.weather.gov.hk/rss/WeatherWarningBulletin_uc.xml',
  simplifiedChinese: 'http://gbrss.weather.gov.hk/rss/WeatherWarningBulletin_uc.xml'
};

const warningSummaryURLObj = {
  english: 'http://rss.weather.gov.hk/rss/WeatherWarningSummaryv2.xml',
  traditionalChinese: 'http://rss.weather.gov.hk/rss/WeatherWarningSummaryv2_uc.xml',
  simplifiedChinese: 'http://gbrss.weather.gov.hk/rss/WeatherWarningSummaryv2_uc.xml'
};

let subscribeWarning = true;
let language = languageObj.english;
let currentURL = currentURLObj.english;
let warningInformationURL = warningInformationURLObj.english;
let warningSummaryURL = warningSummaryURLObj.english;

async function getResponse(tg, urlLink, strToShow) {
  const response = await axios.get(urlLink);
  if (!_.isEmpty(response)) {
    parseString(response.data, (err, result) => {
      if (!err) {
        if (!_.isEmpty(result.rss.channel)) {
          result.rss.channel.map((item, i) => {
            if (!_.isEmpty(item.item)) {
              item.item.map((value, i) => {
                const response = value.description.toString();

                const text = htmlToText.fromString(response, {
                  wordwrap: 130,
                  //ignoreImage: true
                });
                tg.sendMessage(`------------------ [${strToShow}] ------------------`);
                tg.sendMessage(text);
              });
            }
          });
        }
      }
    });
  }
}

class StartController extends TelegramBaseController {
  startHandler(tg) {
    tg.sendMessage(`
      ### Example command ###
/start or 1
Show all example command

/tellMeCurrentAndWarning or 2
List out the topic of current weather, warning

/tellMeCurrent or 3
Echo back the current info in forecast feed

/tellMeWarning or 4
Echo back the current info in weather warning

/subscribeWarning or 5
Enable warning message

/unsubscribeWarning or 6
Disable warning message

/繁體中文 or 7
Set content in Traditional Chinese

/简体中文 or 8
Set content in Simplified Chinese

/english or 9
Set content in English
    `);
  }

  get routes() {
    return {
      'startCommand': 'startHandler'
    }
  }
}

class TellMeCurrentAndWarningController extends TelegramBaseController {
  async tellMeCurrentAndWarningHandler(tg) {
    switch (language) {
      case 'English':
        await getResponse(tg, currentURL, 'Current');
        if (subscribeWarning) {
          await getResponse(tg, warningInformationURL, 'Warning');
        } else {
          tg.sendMessage('Please subscribe warning');
        }
        break;
      case '繁體中文':
        await getResponse(tg, currentURL, '現時');
        if (subscribeWarning) {
          await getResponse(tg, warningInformationURL, '警告');
        } else {
          tg.sendMessage('Please subscribe warning');
        }
        break;
      case '简体中文':
        await getResponse(tg, currentURL, '现时');
        if (subscribeWarning) {
          await getResponse(tg, warningInformationURL, '警告');
        } else {
          tg.sendMessage('Please subscribe warning');
        }
        break;
    }
  }

  get routes() {
    return {
      'tellMeCurrentAndWarningCommand': 'tellMeCurrentAndWarningHandler'
    }
  }
}

class TellmeCurrentController extends TelegramBaseController {
  tellMeCurrentHandler(tg) {
    switch (language) {
      case 'English':
        getResponse(tg, currentURL, 'Current');
        break;
      case '繁體中文':
        getResponse(tg, currentURL, '現時');
        break;
      case '简体中文':
        getResponse(tg, currentURL, '现时');
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
  tellMeWarningHandler(tg) {
    switch (language) {
      case 'English':
        if (subscribeWarning) {
          getResponse(tg, warningSummaryURL, 'Warning');
        } else {
          tg.sendMessage('Please subscribe warning');
        }
        break;
      case '繁體中文':
        if (subscribeWarning) {
          getResponse(tg, warningSummaryURL, '警告');
        } else {
          tg.sendMessage('Please subscribe warning');
        }
        break;
      case '简体中文':
        if (subscribeWarning) {
          getResponse(tg, warningSummaryURL, '警告');
        } else {
          tg.sendMessage('Please subscribe warning');
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
  subscribeWarningHandler(tg) {
    subscribeWarning = true;

    tg.sendMessage('You just subscribe warning');
  }

  get routes() {
    return {
      'subscribeWarningCommand': 'subscribeWarningHandler'
    }
  }
}

class UnsubscribeWarningController extends TelegramBaseController {
  unsubscribeWarningHandler(tg) {
    subscribeWarning = false;

    tg.sendMessage('You just unsubscribe warning');
  }

  get routes() {
    return {
      'unsubscribeWarningCommand': 'unsubscribeWarningHandler'
    }
  }
}

class EnglishController extends TelegramBaseController {
  englishHandler(tg) {
    language = languageObj.english;
    currentURL = currentURLObj.english;
    warningInformationURL = warningInformationURLObj.english;
    warningSummaryURL = warningSummaryURLObj.english;

    tg.sendMessage('OK');
  }

  get routes() {
    return {
      'englishCommand': 'englishHandler'
    }
  }
}


class TraditionalChineseController extends TelegramBaseController {
  traditionalChineseHandler(tg) {
    language = languageObj.traditionalChinese;
    currentURL = currentURLObj.traditionalChinese;
    warningInformationURL = warningInformationURLObj.traditionalChinese;
    warningSummaryURL = warningSummaryURLObj.traditionalChinese;

    tg.sendMessage('知道了');
  }

  get routes() {
    return {
      'traditionalChineseCommand': 'traditionalChineseHandler'
    }
  }
}

class SimplifiedChineseController extends TelegramBaseController {
  simplifiedChineseHandler(tg) {
    language = languageObj.simplifiedChinese;
    currentURL = currentURLObj.simplifiedChinese;
    warningInformationURL = warningInformationURLObj.simplifiedChinese;
    warningSummaryURL = warningSummaryURLObj.simplifiedChinese;

    tg.sendMessage('知道了');
  }

  get routes() {
    return {
      'simplifiedChineseCommand': 'simplifiedChineseHandler'
    }
  }
}

tg.router
  .when(new TextCommand('/start', 'startCommand'), new StartController())
  .when(new TextCommand('1', 'startCommand'), new StartController())

  .when(new TextCommand('/tellMeCurrentAndWarning', 'tellMeCurrentAndWarningCommand'), new TellMeCurrentAndWarningController())
  .when(new TextCommand('2', 'tellMeCurrentAndWarningCommand'), new TellMeCurrentAndWarningController())

  .when(new TextCommand('/tellMeCurrent', 'tellMeCurrentCommand'), new TellmeCurrentController())
  .when(new TextCommand('3', 'tellMeCurrentCommand'), new TellmeCurrentController())

  .when(new TextCommand('/tellMeWarning', 'tellMeWarningCommand'), new TellmeWarningController())
  .when(new TextCommand('4', 'tellMeWarningCommand'), new TellmeWarningController())

  .when(new TextCommand('/subscribeWarning', 'subscribeWarningCommand'), new SubscribeWarningController())
  .when(new TextCommand('5', 'subscribeWarningCommand'), new SubscribeWarningController())

  .when(new TextCommand('/unsubscribeWarning', 'unsubscribeWarningCommand'), new UnsubscribeWarningController())
  .when(new TextCommand('6', 'unsubscribeWarningCommand'), new UnsubscribeWarningController())

  .when(new TextCommand('/english', 'englishCommand'), new EnglishController())
  .when(new TextCommand('7', 'englishCommand'), new EnglishController())

  .when(new TextCommand('/繁體中文', 'traditionalChineseCommand'), new TraditionalChineseController())
  .when(new TextCommand('8', 'traditionalChineseCommand'), new TraditionalChineseController())

  .when(new TextCommand('/简体中文', 'simplifiedChineseCommand'), new SimplifiedChineseController())
  .when(new TextCommand('9', 'simplifiedChineseCommand'), new SimplifiedChineseController());
