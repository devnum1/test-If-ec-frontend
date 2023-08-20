// 01EZTX9M3AWK0ZB16B6KYR56F1

export default {
  state() {
    return {
      loading: false,
    };
  },

  getters: {
    //
  },

  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
  },

  actions: {
    nuxtServerInit({ commit, state }, { req }) {
      //
    },
  },
};
