// ID of an event is its index in the array
// prereqs: [       ]

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

var events = [

{
	title: "Introduction",
	msg: "Welcome to the Game!",
	// Given the event is in the eventQ, what are the odds it will activate?
	probability: 1,
	priority: 0,
	inQ: 0,
	// Is this event valid to be added onto the eventQ?
	valid: (Session) => {
		return numberOfPastEventRuns(Session, "Introduction") === 0;
	},
	// What happens when you trigger the event
	run: (Session) => {
		$("body").css("background-color","green");
		console.log("RUNNING INTRO");
	}
},

{
	title: "Public Uprising",
	msg: "Your townsfolk are starting a revolt!",
	// Given the event is in the eventQ, what are the odds it will activate?
	probability: 1,
	priority: 1,
	inQ: 0,
	// Is this event valid to be added onto the eventQ?
	valid: (Session) => {
		return Session.wealth > 9;
	},
	// What happens when you trigger the event
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

]