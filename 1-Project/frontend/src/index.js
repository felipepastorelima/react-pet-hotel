import App from 'App';
import React from 'react';
import ReactDOM from 'react-dom';
import { unregister } from 'registerServiceWorker';
import SettingsService from 'modules/settings/settingsService';
import { i18n } from 'i18n';

(async function() {
  document.title = i18n('app.title');
  await SettingsService.fetchAndApply();

  ReactDOM.render(<App />, document.getElementById('root'));

  /**
   * It may cause cache issues when developing, so, after your app is ready,
   * change those lines
   */
  unregister();
  // registerServiceWorker();
})();
