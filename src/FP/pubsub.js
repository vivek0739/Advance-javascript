
// var pubsub = ( function createPubSub() {
//   var eventList = {};
//   return function(eventname) {
//       eventList[eventname] = eventList[eventname] || {};
//       function subscribe() {
//         eventList[eventname].subscribers = eventList[eventname].subscribers || [];
//         for(var i=0, count = arguments.length; i<count; i++) {
//           eventList[eventname].subscribers.push(arguments[i]);
//         }
//       }
//       function publish() {
//         eventList[eventname].data = Array.from(arguments);
//         var eventNameObject = eventList[eventname] || {};
//         var eventNameSubscriberList = eventNameObject.subscribers || [];
//         for(var index = 0, count = eventNameSubscriberList.length||0; index < count;index++) {
//           if(typeof eventNameSubscriberList[index] === "function")
//               eventNameSubscriberList[index](eventList[eventname].data);
//           else if(Array.isArray(eventNameSubscriberList[index])) {
//             if(typeof eventNameSubscriberList[index][0] === "function")
//               eventNameSubscriberList[index][0].call(eventNameSubscriberList[index][1],eventList[eventname].data);
//           }
//         }
//       }
//       function unsubscribe() {
//         eventList[eventname].subscribers = eventList[eventname].subscribers || [];
//         for(var i=0, count = arguments.length; i<count; i++) {
//           if(eventList[eventname].subscribers.indexOf(arguments[i]) >= 0) {
//               eventList[eventname].subscribers.pop(arguments[i]);
//           }
//         }
//      }
//       return {
//         subscribe: subscribe,
//         publish: publish,
//         unsubscribe: unsubscribe
//       }
      
//   }
// }());
// function fn1() {
//     console.log("fn1"+JSON.stringify(arguments[0])+ "   ----"+ this.name);
// }
// function fn2() {
//   console.log("fn2"+JSON.stringify(arguments[0]));
// }
// pubsub('evtname').subscribe(fn1,fn2);
// pubsub('evtname').publish('data',5);
// pubsub('evtname').unsubscribe(fn1);

// var emp = {
//   name: "vivek"
// }

// pubsub('evtname').subscribe([fn1, emp]);
// pubsub('evtname').publish('data',5);


// //code from tutor
// var pubsub = (function(){	
// 	var subscriptions = {}
	
// 	return function pubsub(evtName){
// 		subscriptions[evtName] = subscriptions[evtName] || [];
// 		var evtSubscriptions = subscriptions[evtName]; 
		
// 		function subscribe(){
// 			var fns = Array.from(arguments);
// 			fns.forEach(function(subscriptionFn){
// 				evtSubscriptions.push(subscriptionFn);	
// 			});
// 			return this;
// 		}

// 		function unsubscribe(){
// 			var fns = Array.from(arguments);
// 			fns.forEach(function(subscriptionFn){
// 				var idx = evtSubscriptions.indexOf(subscriptionFn);
// 				if (idx >= 0)
// 					evtSubscriptions.splice(idx, 1);
// 			});
// 			return this;
// 		}

// 		function publish(){
// 			var args = arguments;
// 			evtSubscriptions.forEach(function(evtSubscription){
// 				evtSubscription.apply(undefined, args);
// 			});
// 			return this;
// 		}

// 		return {
// 			subscribe : subscribe,
// 			unsubscribe : unsubscribe,
// 			publish : publish
// 		}
// 	}

// })();

// function PubSub(eventName) {
//   this._eventName = eventName;
// }
// PubSub.prototype.subscriptions = {};
// PubSub.prototype.subscribe= function subscribe(){
//   PubSub.prototype.subscriptions[this.eventName] = PubSub.prototype.subscriptions[this.eventName] || [];
//   var evtSubscriptions = PubSub.prototype.subscriptions[this.eventName]; 
//   var fns = Array.from(arguments);
//   fns.forEach(function(subscriptionFn){
//     evtSubscriptions.push(subscriptionFn);	
//   });
//   return this;
// }
// PubSub.prototype.publish = function publish(){
//   PubSub.prototype.subscriptions[this.eventName] = PubSub.prototype.subscriptions[this.eventName] || [];
// 	var evtSubscriptions = PubSub.prototype.subscriptions[this.eventName]; 
//   var args = arguments;
//   evtSubscriptions.forEach(function(evtSubscription){
//     evtSubscription.apply(undefined, args);
//   });
//   return this;
// }

// PubSub.prototype.unsubscribe = function unsubscribe(){
//   PubSub.prototype.subscriptions[this.eventName] = PubSub.prototype.subscriptions[this.eventName] || [];
// 	var evtSubscriptions = PubSub.prototype.subscriptions[this.eventName]; 
//   var fns = Array.from(arguments);
//   fns.forEach(function(subscriptionFn){
//     var idx = evtSubscriptions.indexOf(subscriptionFn);
//     if (idx >= 0)
//       evtSubscriptions.splice(idx, 1);
//   });
//   return this;
// }
  

//   function fn1() {
//       console.log("fn1"+JSON.stringify(arguments[0])+ "   ----"+ this.name);
//   }
//   function fn2() {
//     console.log("fn2"+JSON.stringify(arguments[0]));
//   }
//   function fn3() {
//     console.log("fn3"+JSON.stringify(arguments[0]));
//   }

//   var pubsub = (function createPubSub() {
//       return function(eventName) {
//           return new PubSub(eventName);
//       }
//   })();

// pubsub('evtname').subscribe(fn1,fn2,fn3);
// pubsub('evtname').publish('data',5);
// pubsub('evtname').unsubscribe(fn1);
//my implementation |

var pubsub = (function(){
	
	var _pubsub_intances = {};

	function PubSub(evtName){
		this._evtName = evtName;
		this._evtSubscriptions = [];
	}
	PubSub.prototype.subscribe = function(){
		var fns = Array.from(arguments),
			self = this;
		fns.forEach(function(subscriptionFn){
			self._evtSubscriptions.push(subscriptionFn);	
		});
		return self;
	}
	PubSub.prototype.unsubscribe = function() {
		var fns = Array.from(arguments),
			self = this;
		fns.forEach(function(subscriptionFn){
			var idx = self._evtSubscriptions.indexOf(subscriptionFn);
			if (idx >= 0)
				self._evtSubscriptions.splice(idx, 1);
		});
		return self;
	};

	PubSub.prototype.publish = function() {
		var args = arguments;
		this._evtSubscriptions.forEach(function(evtSubscription){
			evtSubscription.apply(undefined, args);
		});
		return this;
	};

	return function(evtName){
		_pubsub_intances[evtName] = _pubsub_intances[evtName] || new PubSub(evtName);
		return _pubsub_intances[evtName];
	}
})();