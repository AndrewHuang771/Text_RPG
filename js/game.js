class Game {
	// Defines the initial state of the kingdom. 
	// You have just sucessfully lead a popular revolution. You are now in charge, the kingdom is yours to shape.
	constructor(config) {
		this.wealth = config.wealth;
		this.fame = config.fame;
		this.taxes = config.taxes;
		this.GDP = config.GDP;
		this.military = config.military;

		// The eventQ lists possible events that may or may not occur.
		this.eventQ = [];

		// The eventRecord records the events that have occured and the player choices (if applicable)
		// { event_id: [choices], event_id: [choices], ... }
		this.eventRecord = {};
	}
}