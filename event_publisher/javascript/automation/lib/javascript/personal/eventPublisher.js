/**
 * Constructor, initializes the logger, imports the needed stuff.
 */
var EventPublisher = function () {
    'use strict';
    this.log = Java.type("org.slf4j.LoggerFactory").getLogger("org.openhab.model.script.Rules.EventPublisher");
    this.log.debug("Building eventPublisher instance.");
    this.ThingEventFactory = Java.type("org.openhab.core.thing.events.ThingEventFactory");
    this.ChannelUID = Java.type("org.openhab.core.thing.ChannelUID");
    this.eventPublisher = Java.type("org.openhab.core.model.script.ScriptServiceUtil").getEventPublisher();
    this.log.debug("Event Publisher is ready to operate.");
}

/**
 * Posts an event through the event bus in an asynchronous way.
 * 
 * @param {org.openhab.core.events.Event} event the event posted through the event bus
 */
EventPublisher.prototype._postEvent = function (event) {
    this.log.debug("Posting event (event: {})/", event);
    this.eventPublisher.post(event);
}

/**
 *  Posts an channel trigger event through the event bus in an asynchronous way.
 * 
 * @param {string} eventName the name of event
 * @param {string} channelUid the unique identifier of the channel in form a string
 */
EventPublisher.prototype.postChannelTriggerEvent = function (eventName, channelUid) {
    this.log.debug("Creating channel trigger event (eventName: {}, channelUid: {}).", [eventName, channelUid]);
    this._postEvent(this.ThingEventFactory.createTriggerEvent(eventName, new this.ChannelUID(channelUid)));
}
