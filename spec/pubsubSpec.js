describe("PubSub", function(){
	it('should create a new instance for the given event name', function(){
		//Arrange
		var evtName = 'event-1',
			expectedResult = 'event-1'

		//Act
		var sut = pubsub(evtName);

		//Assert
		expect(sut._evtName).toBe(expectedResult);
	});

	//write a test to verity the default event subscriptions are 0


	it('should accommodate subscriptions for the given event name', function(){
		var evtName = 'event-1',
			subscription = function(){};

		var sut = pubsub(evtName);

		var existingSubscriptions = sut._evtSubscriptions.length,
			expectedSubscriptions = existingSubscriptions + 1;

		sut.subscribe(subscription);

		expect(sut._evtSubscriptions.length).toBe(expectedSubscriptions);

	});

	it('should invoke the subscription when the event is published', function(){
		var evtName = 'event-1',
			subscriptionFn = jasmine.createSpy();	

		var sut = pubsub(evtName);
		sut.subscribe(subscriptionFn);

		sut.publish();

		expect(subscriptionFn).toHaveBeenCalled();

		

	});

	it('should invoke the subscription with the data when the event is published', function(){
		var evtName = 'event-1',
			subscriptionFn = jasmine.createSpy(),
			data = 'dummyData'	

		var sut = pubsub(evtName);
		sut.subscribe(subscriptionFn);

		sut.publish(data);

		expect(subscriptionFn).toHaveBeenCalledWith(data);

		

	});

});