const configNum = 0;
const eventRecordMaxLength = 10;
const numPriorityLevels = 5;
const eventInterval = 1000;
const taxInterval = 1000;

// Keeps the EventRecord a limited length to avoid latency issues
function snipHistory(Session, title) {
	if ( Session.eventRecord[title].length > eventRecordMaxLength ) {
		Session.eventRecord[title].shift();
	}
}

function updateEventQ(Session) {
	// Add new events that are now allowed to occur. For instance, your popularity decreases past a threshold
	for ( var i = 0; i < events.length; i ++ ) {
		var event = events[i];
		if ( event.valid(Session) && event.inQ === 0 ) {
			event.id = i;
			Session.eventQ[event.priority.toString()].push(event);
			event.inQ = 1;
		}
	}			

	// Remove old events that can't happen anymore.
	for ( var p = 0; p < numPriorityLevels; p ++ ) {
		for ( var i = 0; i < Session.eventQ[p.toString()].length; i ++ ) {
			var event = Session.eventQ[p.toString()][i];
			if ( !event.valid(Session) ) {
				Session.eventQ[p.toString()].splice(i, 1);
				events[event.id].inQ = 0;
			}
		}
	}
}

function runEvent(Session, event) {
	var result = event.run(Session);
	var d = new Date();
	var data = {
		result: result,
		time: d.getTime(),
	}

	Session.eventRecord[event.title].push(data);
	snipHistory(Session, event.title);
}

function findEventToRun(Session) {
	//Find an event to run, possible that no event occurs.
	for ( var p = 0; p < numPriorityLevels; p ++ ) {
		for ( var i = 0; i < Session.eventQ[p.toString()].length; i ++ ) {
			var event = Session.eventQ[p.toString()][i];
			if ( Math.random() <= event.probability ) {
				return event;
			}
		}
	}
}

var Session;
$(document).ready( function() {
	// See configs in config.js in info folder
	Session = new Game(config[configNum]);
	console.assert(Session.wealth, "Config not loaded");

	var taxLoop = setInterval(() => {
		// Session.wealth += Session.GDP * Session.taxes;
	}, taxInterval);
	
	var eventLoop = setInterval(() => {

		updateEventQ(Session);
		var event = findEventToRun(Session);
		if ( event ) {
			runEvent(Session, event);
		}

	}, eventInterval);

});

/* Ideas:
	-2-D Grid based city, can expand out new blocks... demolish old ones... etc
	-For events, there is a "do nothing" option which happens by default if the player doesn't respond to the action in time.
*/