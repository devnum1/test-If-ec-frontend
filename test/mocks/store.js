import Vue from 'vue';
import Vuex from 'vuex';

import auth from '@/store/auth';
import contracts from '@/store/contracts';
import payments from '@/store/payments';
import diseaseHistory from '@/store/diseaseHistory';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    contracts,
    auth,
    payments,
    diseaseHistory,
  },
});
