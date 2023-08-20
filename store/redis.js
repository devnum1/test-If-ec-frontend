// 01EZTX9M3AWK0ZB16B6KYR56F1

export default {
  namespaced: true,
  state() {
    return {
      //
    };
  },

  getters: {
    //
  },

  mutations: {
    //
  },

  actions: {
    async createRedis(context, params) {
      try {
        const resApi = localStorage.setItem(
          'redis_save',
          JSON.stringify(params.data)
        );
        return resApi;
      } catch (e) {
        console.error(e);
      }
    },

    async getRedis(context, params) {
      try {
        let resApi = localStorage.getItem('redis_save');
        resApi = JSON.parse(resApi);
        const data = {};
        params.keys.forEach((key) => {
          const target = resApi.find((d) => d.key === key);
          if (!target) return;
          data[key] = target.value;
        });
        return data;
      } catch (e) {
        console.error(e);
      }
    },

    async deleteRedis(context, params) {
      try {
        // pages/login.vue#L146 loginからの呼び出しの場合を想定。この場合処理を行わずreturn
        if (params.keys[0].includes('redirect_after_login')) {
          return;
        }
        const resApi = localStorage.getItem('redis_save');
        return resApi;
      } catch (e) {
        console.error(e);
      }
    },
  },
};
