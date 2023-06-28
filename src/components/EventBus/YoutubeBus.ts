class YoutubeBus<Payload> implements IEventBus<Payload> {
  // The listeners array will store all the events and their corresponding callbacks
  listeners: IListener<Payload>[] = [];

  // The subscribe method is used to add a new event listener and callback
  // or to add a new callback to an existing event listener
  subscribe(eventName: string, callback: ICallback<Payload>): void {
    // Check if a listener for the specified event name already exists
    let listener = this.listeners.find((l) => l.eventName === eventName);

    // If the listener doesn't exist, create a new one and add it to the listeners array
    if (!listener) {
      listener = { eventName, callbacks: [] };
      this.listeners.push(listener);
    }

    // Add the callback to the callbacks array of the found or newly created listener
    listener.callbacks.push(callback);
  }

  // Remove a callback from the specified event
  unsubscribe(eventName: string, callback: ICallback<Payload>): void {
    let listener = this.listeners.find((l) => l.eventName === eventName);
    if (listener) {
      // Update callbacks to exclude the one being unsubscribed
      listener.callbacks = listener.callbacks.filter((cb) => cb !== callback);
    }
  }

  // The publish method is used to trigger all callbacks associated with a specific event
  publish(eventName: string, payload: Payload): void {
    // Find the listener for the specified event name
    const listener = this.listeners.find((l) => l.eventName === eventName);

    // If the listener doesn't exist, throw an error
    if (!listener) {
      throw new Error(`No listeners for event: ${eventName}`);
    }

    // Call all callbacks associated with the event, passing the payload as an argument
    listener.callbacks.forEach((callback) => callback(payload));
  }
}

export const ytBus = new YoutubeBus<boolean>();
