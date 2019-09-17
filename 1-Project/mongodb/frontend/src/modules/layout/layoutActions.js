import { setLanguageCode } from 'i18n';

const prefix = 'LAYOUT';

const actions = {
  MENU_TOGGLE: `${prefix}_MENU_TOGGLE`,
  MENU_HIDE: `${prefix}_MENU_HIDE`,
  MENU_SHOW: `${prefix}_MENU_SHOW`,

  doChangeLanguage: (language) => {
    setLanguageCode(language);

    /**
     * I18n is outside Redux store,
     * no we need this hack to load it properly
     */
    window.location.reload();
  },

  doToggleMenu: () => {
    return {
      type: actions.MENU_TOGGLE,
    };
  },

  doShowMenu: () => {
    return {
      type: actions.MENU_SHOW,
    };
  },

  doHideMenu: () => {
    return {
      type: actions.MENU_HIDE,
    };
  },
};

export default actions;
