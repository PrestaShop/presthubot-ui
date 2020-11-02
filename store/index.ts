/* eslint-disable */
import URLS from '~/constants/urls';
import { LocalConfig, Store } from '~/interfaces/StoreInterface';

export const strict = false;

export const state = (): Store => {
  let localConfig = {
    isDark: false,
  };

  return {
    pageTitle: 'PresthuBot UI',
    localConfig,
  };
};

export const mutations = {
  changeLocalConfig(state: Store, config: LocalConfig) {
    Object.assign(state.localConfig, config);

    localStorage.setItem('localConfig', JSON.stringify(state.localConfig));
  },
};
