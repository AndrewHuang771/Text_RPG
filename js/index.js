function updateEventQ(Session) {
	// Add new events that are now allowed to occur. For instance, your popularity decreases past a threshold
	for ( var i = 0; i < events.length; i ++ ) {
		var event = events[i];
		if ( event.valid(Session) && event.inQ === 0 ) {
			Session.eventQ[event.priority.toString()].push(event);
			event.inQ = 1;
		}
	}			

	// Remove old events that can't happen anymore.
	for ( var p = 0; p < 5; p ++ ) {
		for ( var i = 0; i < Session.eventQ[p.toString()].length; i ++ ) {
			var event = Session.eventQ[p.toString()][i];
			if ( !event.valid(Session) ) {
				Session.eventQ[p.toString()].splice(i, 1);
				events[event.id].inQ = 0;
			}
		}
	}
}
var Session;
$(document).ready( function() {
	// See configs in config.js in info folder
	Session = new Game(config[0]);
	// See events in events.js in info folder

	console.assert(Session.wealth, "Config not loaded");

	var taxLoop = setInterval(() => {
		// Session.wealth += Session.GDP * Session.taxes;
	}, 1000);
	
	var eventLoop = setInterval(() => {

		updateEventQ(Session);

		//Find an event to run, possible that no event occurs.
		for ( var p = 0; p < 5; p ++ ) {
			for ( var i = 0; i < Session.eventQ[p.toString()].length; i ++ ) {
				var event = Session.eventQ[p.toString()][i];
				if ( Math.random() <= event.probability ) {
					var result = event.run(Session);
					Session.eventRecord[event.id.toString()].push(result);
					break;
				}
			}
		}

	}, 1000);

});