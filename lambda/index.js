
'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//Global vars.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = "amzn1.ask.skill.9251c791-fa3f-4c63-8f43-02d7f121a6a4";

const SKILL_NAME = 'ninety nine bottles of beer';
const START_MESSAGE = "Starting 99 bottles of beer! ";
const VERSE_P1 = " bottles of beer on the wall! ";
const VERSE_P2 = " bottles of beer!Take one down. Pass it around. ";
const VERSE_P2_ALT = " bottles beer!Take one down. Pass it around. ";
const VERSE_P3 = VERSE_P1;
const HELP_MESSAGE = 'You can say start 99 bottles of beer, or, you can say exit.';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//Helper functions.
//=========================================================================================================================================

function createSong(bottles){
  var s = START_MESSAGE;
  var alt = false;
  for (var i = bottles; i >= 0; i--) {
    if (i <= 90) {
      alt = true;
    }

    if (i===0) {
      s = s + "No" + VERSE_P1 + "No bottles of beer! Make a frown. Head into town. Find more bottles of beer for the wall!"; 
    }else if(i===1){
      s = s + String(i) + " bottle of beer on the wall! " + String(i) + " bottle of beer! Take it down. Pass it around. ";  
    }else{
      if (alt) {
        s = s + String(i) + VERSE_P1 + String(i) + VERSE_P2_ALT;
      }else{
         s = s + String(i) + VERSE_P1 + String(i) + VERSE_P2;  
      }
    }
  }
  return s;
}


//=========================================================================================================================================
//Handlers
//=========================================================================================================================================

const handlers = {
    'LaunchRequest': function () {
        this.emit('PlaySongIntent');
    },
    'PlaySongIntent': function () {
        const speechOutput = createSong(99);

        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

//=========================================================================================================================================
//Testing
//=========================================================================================================================================


var main = function(){
    // main code
    var lyrics = createSong(99);
    console.log(lyrics);
    console.log(lyrics.length);

}

if (require.main === module) {
    main();
}