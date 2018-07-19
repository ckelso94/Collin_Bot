const Discord = require('discord.js');
const client = new Discord.Client();

const TalkedRecently = new Set();

var conditionOverride = false;
var allowStatusUpdate = true;
var isReady = true;
var audioQueue = [];

function randomWholeNum(value) {
    return Math.floor(Math.random() * value) + 1;
}

function triggerMessage(message, trigger, msgResponse, shouldDelete) {

  if (TalkedRecently.has(message.author.id + "_" + trigger)) {
    return;
  } else {

    isReady = false;
      
    try {
      message.channel.send(msgResponse);
    } catch(err) {
      return;   
    }
    
    if(shouldDelete) {

      message.delete()
        .then(msg => console.log(`Deleted message from ${msg.author.username}`))
        .catch(console.error);

    }

    isReady = true;

    TalkedRecently.add(message.author.id + "_" + trigger);
    setTimeout(() => {
      // Removes the user from the set after a minute
      TalkedRecently.delete(message.author.id + "_" + trigger);
    }, 60000);

  }
    
  if (TalkedRecently.has(message.author.id + "_" + trigger)) {
    return;
  } else {

    message.channel.send({files: ["./assets/images/" + trigger + ".png"]});
    
    if(shouldDelete) {

      message.delete()
        .then(msg => console.log(`Deleted message from ${msg.author.username}`))
        .catch(console.error);

    }

    TalkedRecently.add(message.author.id + "_" + trigger);
    setTimeout(() => {
      // Removes the user from the set after a minute
      TalkedRecently.delete(message.author.id + "_" + trigger);
    }, 60000);

  }


}

function triggerAudio(message, trigger, voiceChannelId) {

  if (TalkedRecently.has(message.author.id + "_" + trigger)) {
    return;
  } else {

    isReady = false;
    var voiceChannel = null;

    if (voiceChannelId == "") {
      var voiceChannel = message.member.voiceChannel;
    } else {
      var voiceChannel = client.channels.get(voiceChannelId);
    }

    try {
      voiceChannel.join().then(connection => {
        const dispatcher = connection.playFile("./assets/audio/" + trigger + ".mp3");
        dispatcher.on("end", end => {
            voiceChannel.leave();
        });
      }); 
    } catch(err) {
      return;   
    }
    
    message.delete()
      .then(msg => console.log(`Deleted message from ${msg.author.username}`))
      .catch(console.error);

    isReady = true;

    TalkedRecently.add(message.author.id + "_" + trigger);
    setTimeout(() => {
      // Removes the user from the set after a minute
      TalkedRecently.delete(message.author.id + "_" + trigger);
    }, 60000);

  }

}

function triggerImage(message, trigger, shouldDelete) {

  if (TalkedRecently.has(message.author.id + "_" + trigger)) {
    return;
  } else {

    message.channel.send({files: ["./assets/images/" + trigger + ".png"]});
    
    if(shouldDelete) {

      message.delete()
        .then(msg => console.log(`Deleted message from ${msg.author.username}`))
        .catch(console.error);

    }

    TalkedRecently.add(message.author.id + "_" + trigger);
    setTimeout(() => {
      // Removes the user from the set after a minute
      TalkedRecently.delete(message.author.id + "_" + trigger);
    }, 60000);

  }

}

function statusUpdate(message, statusType, slicePoint) {

  if (!allowStatusUpdate && !TalkedRecently.has(message.author.id + "_timeout")) {

    message.channel.send("Command is on a Timeout");
          
    message.delete()
      .then(msg => console.log(`Deleted message from ${msg.author.username}`))
      .catch(console.error);
    
    TalkedRecently.add(message.author.id + "_timeout");
    setTimeout(() => {
      // Removes the user from the set after a minute
      TalkedRecently.delete(message.author.id + "_timeout");
    }, 60000);

  } else {

    var statusValue = message.content.slice(slicePoint);

      client.user.setPresence({
        game: {
            name: statusValue,
            type: statusType
          }
      })
        .then(console.log)
        .catch(console.error);
      
      message.channel.send("Presence Set");
      
      message.delete()
        .then(msg => console.log(`Deleted message from ${msg.author.username}`))
        .catch(console.error);

      allowStatusUpdate = false;

      setTimeout(() => {
        // Allows for the Game Name to be Set After 5 Minutes
        allowStatusUpdate = true;
      }, 300000);

  }

}

function playAudioInQueue() {

  if (typeof audioQueue[0] === 'undefined') {
    return;
  } else {

    console.log(audioQueue);

    var request = audioQueue.shift();
    var command = request[0];
    var voiceChannel = request[1];

    console.log(command);

    try {
      voiceChannel.join().then(connection => {
        const dispatcher = connection.playFile("./assets/audio/" + command + ".mp3");
        dispatcher.on("end", end => {
            voiceChannel.leave();
        });
      }); 
    } catch(err) {
      return;   
    }

  }

  playAudioInQueue();

}

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', async message => {

  if(message.author.bot) return;

  var voiceChannelId = null;

  var messageParts = message.content.split(' ');
  var command = messageParts[0];
  var parameters = messageParts.slice(1, messageParts.length);

  if (typeof parameters[0] === 'undefined') {
    voiceChannel = message.member.voiceChannel;
  } else {
    try {
      voiceChannel = client.channels.get(parameters[0]);
    } catch(err) {
      console.log(parameters[0] + " is an invalid voiceChannel");
      voiceChannel = message.member.voiceChannel;
    }
  }

  switch (command) {

    case "!help":
      var helpResponse = "```Since Your Little Bitch Ass Can't Remember Shit!\n\n" +
      "Presense Triggers:\n!setGame Overwatch\n!setListening Spotify\n!setWatching Youtube\n\n" +
      "Audio Triggers:\n!aram\n!comeOn\n!dumbassGame\n!horn\n!kirk\n!lag\n!licker\n!magicResist\n!monkey\n!sameGame\n!snap\n!tinsel\n!yooo\n!warus\n!watch\n\n" +
      "Image Triggers:\n!prime\n!zieg\n\n" +
      "Keywords: (black, fortnite, tank, mexican)```"
      triggerMessage(message, "help", helpResponse, true);
      break;

    case "!aram":
      audioQueue.push(["aram", voiceChannel]);
      message.delete();
      break;

    case "!comeOn":
      audioQueue.push(["comeOn", voiceChannel]);
      message.delete();
      break;

    case "!dumbassGame":
      audioQueue.push(["dumbassGame", voiceChannel]);
      message.delete();
      break;

    case "!horn":
      audioQueue.push(["horn", voiceChannel]);
      message.delete();
      break;

    case "!kirk":
      audioQueue.push(["kirk", voiceChannel]);
      message.delete();
      break;

    case "!lag":
      audioQueue.push(["lag", voiceChannel]);
      message.delete();
      break;

    case "!licker":
      audioQueue.push(["windowlicker", voiceChannel]);
      message.delete();
      break;

    case "!magicResist":
      audioQueue.push(["magicResist", voiceChannel]);
      message.delete();
      break;

    case "!monkey":
      audioQueue.push(["monkey", voiceChannel]);
      message.delete();
      break;

    case "!sameGame":
      audioQueue.push(["sameGame", voiceChannel]);
      message.delete();
      break;

    case "!snap":
      audioQueue.push(["snap", voiceChannel]);
      message.delete();
      break;

    case "!tinsel":
      audioQueue.push(["tinsel", voiceChannel]);
      message.delete();
      break;

    case "!yooo":
      audioQueue.push(["yooo", voiceChannel]);
      message.delete();
      break;

    case "!warus":
      audioQueue.push(["warus", voiceChannel]);
      message.delete();
      break;

    case "!watch":
      audioQueue.push(["watch", voiceChannel]);
      message.delete();
      break;

    playAudioInQueue();

  }


  // if(isReady) {
      
  //   if (message.content.indexOf('!override') === 0 && message.author.id == "148630426548699136") {
        
  //       var overrideValue = message.content.slice(10);
  //       if (overrideValue == "true") {
  //           conditionOverride = true;
  //           message.channel.send("Condition Override Set: " + conditionOverride);
  //           message.delete()
  //             .then(msg => console.log(`Deleted message from ${msg.author.username}`))
  //             .catch(console.error);
            
  //       } else {
  //           conditionOverride = false;
  //           console.log("Condition Override Set: " + conditionOverride);
  //           message.channel.send("Condition Override Set: false");
  //           message.delete()
  //             .then(msg => console.log(`Deleted message from ${msg.author.username}`))
  //             .catch(console.error);
  //       }
        
  //   }

  //   /********************************************/
  //   /*            MESSAGE TRIGGERS              */
  //   /********************************************/
  //   if (message.content.indexOf('!help') === 0) {

  //     var helpResponse = "```Since Your Little Bitch Ass Can't Remember Shit!\n\n" +
  //     "Presense Triggers:\n!setGame Overwatch\n!setListening Spotify\n!setWatching Youtube\n\n" +
  //     "Audio Triggers:\n!aram\n!comeOn\n!dumbassGame\n!horn\n!kirk\n!lag\n!licker\n!magicResist\n!monkey\n!sameGame\n!snap\n!tinsel\n!yooo\n!warus\n!watch\n\n" +
  //     "Image Triggers:\n!prime\n!zieg\n\n" +
  //     "Keywords: (black, fortnite, tank, mexican)```"
  //     triggerMessage(message, "help", helpResponse, true);

  //   }
    
  //   if (message.content.toLowerCase().includes('overwatch') && (message.author.id == "93107357470433280" || conditionOverride)) {

  //     triggerMessage(message, "zachGif", "https://gfycat.com/gifs/detail/BothAdventurousIslandcanary", false);

  //   }

  //   /********************************************/
  //   /*             STATUS TRIGGERS              */
  //   /********************************************/
  //   if (message.content.indexOf('!setGame') === 0) {

  //     statusUpdate(message, 0, 9);

  //   }
  //   if (message.content.indexOf('!setListening') === 0) {

  //     statusUpdate(message, 2, 14);

  //   }
  //   if (message.content.indexOf('!setWatching') === 0) {

  //     statusUpdate(message, 3, 13);

  //   }

  //   /********************************************/
  //   /*              AUDIO TRIGGERS              */
  //   /********************************************/
  //   var splitMessage = message.content.split(" ");

  //   if (message.content.indexOf('!aram') === 0) {

  //     if (typeof splitMessage[1] === 'undefined') {
  //       triggerAudio(message, "goodOleArams", "");
  //     } else {
  //       triggerAudio(message, "goodOleArams", splitMessage[1]);
  //     }

  //   }
  //   if (message.content.indexOf('!comeOn') === 0) {

  //     if (typeof splitMessage[1] === 'undefined') {
  //       triggerAudio(message, "comeOn", "");
  //     } else {
  //       triggerAudio(message, "comeOn", splitMessage[1]);
  //     }

  //   }
  //   if (message.content.indexOf('!dumbassGame') === 0) {

  //     if (typeof splitMessage[1] === 'undefined') {
  //       triggerAudio(message, "dumbassGame", "");
  //     } else {
  //       triggerAudio(message, "dumbassGame", splitMessage[1]);
  //     }

  //   }
  //   if (message.content.indexOf('!horn') === 0) {

  //     if (typeof splitMessage[1] === 'undefined') {
  //       triggerAudio(message, "horn", "");
  //     } else {
  //       triggerAudio(message, "horn", splitMessage[1]);
  //     }

  //   }
  //   if (message.content.indexOf('!kirk') === 0) {

  //     if (typeof splitMessage[1] === 'undefined') {
  //       triggerAudio(message, "kirk", "");
  //     } else {
  //       triggerAudio(message, "kirk", splitMessage[1]);
  //     }

  //   }
  //   if (message.content.indexOf('!lag') === 0) {

  //     if (typeof splitMessage[1] === 'undefined') {
  //       triggerAudio(message, "lag", "");
  //     } else {
  //       triggerAudio(message, "lag", splitMessage[1]);
  //     }

  //   }
  //   if (message.content.indexOf('!licker') === 0) {

  //     if (typeof splitMessage[1] === 'undefined') {
  //       triggerAudio(message, "licker", "");
  //     } else {
  //       triggerAudio(message, "licker", splitMessage[1]);
  //     }

  //   }
  //   if (message.content.indexOf('!magicResist') === 0) {

  //     if (typeof splitMessage[1] === 'undefined') {
  //       triggerAudio(message, "magicResist", "");
  //     } else {
  //       triggerAudio(message, "magicResist", splitMessage[1]);
  //     }

  //   }
  //   if (message.content.indexOf('!monkey') === 0) {

  //     if (typeof splitMessage[1] === 'undefined') {
  //       triggerAudio(message, "monkey", "");
  //     } else {
  //       triggerAudio(message, "monkey", splitMessage[1]);
  //     }

  //   }
  //   if (message.content.indexOf('!sameGame') === 0) {

  //     if (typeof splitMessage[1] === 'undefined') {
  //       triggerAudio(message, "sameGame", "");
  //     } else {
  //       triggerAudio(message, "sameGame", splitMessage[1]);
  //     }

  //   }
  //   if (message.content.indexOf('!snap') === 0) {

  //     if (typeof splitMessage[1] === 'undefined') {
  //       triggerAudio(message, "snap", "");
  //     } else {
  //       triggerAudio(message, "snap", splitMessage[1]);
  //     }

  //   }
  //   if (message.content.indexOf('!tinsel') === 0) {

  //     if (typeof splitMessage[1] === 'undefined') {
  //       triggerAudio(message, "tinsel", "");
  //     } else {
  //       triggerAudio(message, "tinsel", splitMessage[1]);
  //     }

  //   }
  //   if (message.content.indexOf('!yooo') === 0) {

  //     if (typeof splitMessage[1] === 'undefined') {
  //       triggerAudio(message, "yooo", "");
  //     } else {
  //       triggerAudio(message, "yooo", splitMessage[1]);
  //     }

  //   }
  //   if (message.content.indexOf('!warus') === 0) {

  //     if (typeof splitMessage[1] === 'undefined') {
  //       triggerAudio(message, "warus", "");
  //     } else {
  //       triggerAudio(message, "warus", splitMessage[1]);
  //     }
  //   }
  //   if (message.content.indexOf('!watch') === 0) {

  //     if (typeof splitMessage[1] === 'undefined') {
  //       triggerAudio(message, "watch", "");
  //     } else {
  //       triggerAudio(message, "watch", splitMessage[1]);
  //     }

  //   }

  //   /********************************************/
  //   /*              IMAGE TRIGGERS              */
  //   /********************************************/
  //   if (message.content.indexOf('!prime') === 0) {

  //     triggerImage(message, "prime", true);

  //   }
  //   if (message.content.indexOf('!zieg') === 0) {

  //     triggerImage(message, "goat_fucker", true);

  //   }

  //   /********************************************/
  //   /*             KEYWORD TRIGGERS             */
  //   ******************************************
  //   if (message.content.toLowerCase().includes('black')) {

  //     triggerImage(message, "cmonbruh", false);

  //   }
  //   if (message.content.toLowerCase().includes('fortnite')) {

  //     triggerImage(message, "fortnite_sucks", false);

  //   }
  //   if (message.content.toLowerCase().includes('tank')) {

  //     triggerImage(message, "league_of_tanks", false);

  //   }
  //   if (message.content.toLowerCase().includes('mexican')) {

  //     triggerImage(message, "mexican", false);

  //   }

  // }

});

client.on('voiceStateUpdate', (oldMember, newMember) => {
  
    let newUserChannel = newMember.voiceChannel
    let oldUserChannel = oldMember.voiceChannel
    
//     let channels = newMember.guild.channels;
//     var generalChannel = (client.guilds.get(newMember.guild.id)).channels.find("name", "general");
    
    if (newMember.id === '93121331700195328') {
        
        if(oldUserChannel === undefined && newUserChannel !== undefined) {
            
            randomNum = randomWholeNum(20);
            
            if (randomNum === 1) {
//                 generalChannel.send("Hey, Eeyore (Kelso) is here!", {files: ["./assets/images/eeyore.png"]});
                try {
                  newUserChannel.join().then(connection => {
                    const dispatcher = connection.playFile("./assets/audio/warus.mp3");
                    dispatcher.on("end", end => {
                        newUserChannel.leave();
                    });
                  }); 
                } catch(err) {
                  return;   
                }
            }

        } else if(newUserChannel === undefined){

            // User leaves a voice channel

        }
        
    }
    
    if (newMember.id === '93140127949287424') {
        
        if(oldUserChannel === undefined && newUserChannel !== undefined) {
            
            randomNum = randomWholeNum(20);
            
            if (randomNum === 1) {
                try {
                  newUserChannel.join().then(connection => {
                    const dispatcher = connection.playFile("./assets/audio/kirkWilhelm.mp3");
                    dispatcher.on("end", end => {
                        newUserChannel.leave();
                    });
                  }); 
                } catch(err) {
                  return;   
                }
            }

        } else if(newUserChannel === undefined){

            // User leaves a voice channel

        }
        
    }
    
})

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
