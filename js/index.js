function addBasicEvents(Session) {
	for ( var i = 0; i < 5; i ++ ) {
		Session.eventQ[i] = events[i];
	}
}

function runEvent(event) {


	//add followups to the eventQ
	//remove the event from the eventQ
}

function updateEventQ(Session) {
	// Add new events that are now allowed to occur. For instance, your popularity decreases past a threshold
	for ( var i = 0; i < events.length; i ++ ) {
		if ( events[i].valid(Session) ) {
			Session.eventQ.push(events[i]);
		}
	}

	// Remove old events that can't happen anymore.
	for ( var i = 0; i < Session.eventQ.length; i ++ ) {
		if ( !Session.eventQ[i].valid() ) {
			Session.eventQ.splice(i, 1);
		}
	}
}

$(document).ready( function() {
	// See configs in config.js in info folder
	var Session = new Game(config[0]);
	// See events in events.js in info folder
	addBasicEvents(Session);
	console.assert(Session.wealth, "Config not loaded");
	events[0].run(Session)


	var taxLoop = setInterval(() => {
		Session.wealth += Session.GDP * Session.tax;
	}, 10000);
	
	var eventLoop = setInterval(() => {

		updateEventQ(Session);

		//Find an event to run, possible that no event occurs.
		for ( var i = 0; i < Session.eventQ.length; i ++ ) {
			var event = Session.eventQ[i];
			if ( Math.random() <= event.probability ) {
				runEvent(event);
				break;
			}
		}



	}, 1000);

});