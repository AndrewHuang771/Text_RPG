function modifySession(Session, wealth, fame, taxes, GDP, military) {
	Session.wealth += wealth;
	Session.fame += fame;
	Session.taxes += taxes;
	Session.GDP += GDP;
	Session.military += military;
	console.log("Gained: " + wealth + " wealth, " + fame + " fame, " + taxes + " taxes, " + GDP + " GDP, " + military + " military.");
}

function addEventsToQueue(Session, events) {
	Session.eventQ.push(...events);
}

function numberOfPastEventRuns(Session, title) {
	return Session.eventRecord[title].length;
}

function timeLastRun(Session, title) {
	if ( Session.eventRecord[title].length > 0 ) {
		return Session.eventRecord[title][Session.eventRecord[title].length - 1].time;
	}
	else {
		return 0;
	}
}

function checkIfTimedout(Session, title, delay) {
	var d = new Date();
	return d.getTime() - timeLastRun(Session, title) > delay;
}

function findEventIdxByTitle(title) {
	for ( var i = 0; i < events.length; i ++ ) {
		if ( events[i].title === title ) {
			return i;
		}
	}
	console.log("Event not found");
	return -1;
}

var events = [

{
	title: "Introduction",
	msg: "Welcome to the Game!",
	probability: 1,
	priority: 0,
	inQ: 0,
	valid: (Session) => {
		return numberOfPastEventRuns(Session, "Introduction") === 0;
	},
	run: (Session) => {
		$("body").css("background-color","green");
	}
},

{
	title: "Public Uprising",
	msg: "Your townsfolk are starting a revolt!",
	probability: 1,
	priority: 1,
	inQ: 0,
	valid: (Session) => {
		return Session.wealth > 9 && checkIfTimedout(Session, "Public Uprising", 10000);
	},
	run: (Session) => {
		modifySession(Session, -1000, -100, 0, 0, 0);
		$("body").css("background-color","red");
	}
},

{
	title: "Bankruptcy",
	msg: "You have run out of money!",
	probability: 1,
	priority: 1,
	inQ: 0,
	valid: (Session) => {
		return Session.wealth <= 0 && numberOfPastEventRuns(Session, "Bankruptcy") === 0;
	},
	run: (Session) => {
		modifySession(Session, 0, -100, 0, 0, 0);
	}
},

{
	title: "Receive income from mine",
	msg: "Your mines are making profit!",
	probability: 1,
	priority: 3,
	inQ: 0,
	valid: (Session) => {
		// If event 2 has already occured, then this event is valid.
		return numberOfPastEventRuns(Session, "Bankruptcy") > 0;
	},
	run: (Session) => {
		modifySession(Session, 1000, 0, 0, 0, 0);
	}
}

];