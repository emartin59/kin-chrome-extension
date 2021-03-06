import '../Storage';
import * as externalMessages from './ExternalMessages';
import * as internalMessages from './InternalMessages';

// initialize onMessage listeners
Object.values(internalMessages).forEach(action => {
  chrome.runtime.onMessage.addListener((msg, sender, cb) => {
    if (typeof action === 'function') {
      action(msg, sender, cb);
    }
  });
});

// initialize onMessageExternal listeners
Object.values(externalMessages).forEach(action => {
  chrome.runtime.onMessageExternal.addListener((msg, sender, cb) => {
    if (typeof action === 'function') {
      action(msg, sender, cb);
    }
  });
});

chrome.runtime.onInstalled.addListener(details => {
  if (details.reason === 'install' || details.reason === 'update') {
    chrome.tabs.create({ url: './setup/index.html' });
  }
});
