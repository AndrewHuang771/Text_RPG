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

var events = [
{
	id: 0,
	title: "Public Uprising",
	msg: "Your townsfolk are starting a revolt!",
	// Given the event is in the eventQ, what are the odds it will activate?
	probability: 0.05,
	priority: 1,
	// Is this event valid to be added onto the eventQ?
	valid: (Session) => {
		return true;
	},
	// What happens when you trigger the event
	run: (Session) => {
		modifySession(Session, -1000, -100, 0, 0, 0);
		$("body").css("background-color","red");
	}
},{
	id: 1,
	title: "Bankruptcy",
	msg: "You have run out of money!",
	probability: 1,
	priority: 1,
	valid: (Session) => {
		return Session.wealth <= 0;
	},
	run: (Session) => {
		modifySession(Session, 0, -100, 0, 0, 0);
	}
},{
	id: 2,
	title: "Receive income from mine",
	msg: "Your mines are making profit!",
	probability: 0.05,
	priority: 1,
	valid: (Session) => {
		// If event 2 has already occured, then this event is valid.
		return Session.eventRecord["2"].length > 0;
	},
	run: (Session) => {
		printMetadata(this);
		modifySession(Session, -1000, -100, 0, 0, 0);
	}
}
]