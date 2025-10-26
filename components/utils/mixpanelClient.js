// src/utils/mixpanelClient.js
import { Mixpanel } from 'mixpanel-react-native';

// --- CONFIG ---
const PROJECT_TOKEN = 'a96deb4e8333cb16eea263b1eff8e477';
const trackAutomaticEvents = false;

// --- INIT INSTANCE ---
const mixpanel = new Mixpanel(PROJECT_TOKEN, trackAutomaticEvents);

// Initialize Mixpanel
mixpanel.init();

// --- EXPORT INSTANCE & HELPER FUNCTIONS ---
export const trackEvent = (eventName, properties = {}) => {
  mixpanel.track(eventName, properties);
};

export const identifyUser = (userId) => {
  mixpanel.identify(userId);
};

export const setUserProperties = (properties) => {
  mixpanel.getPeople().set(properties);
};

export default mixpanel;
