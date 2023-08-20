// 01EZTX9M3AWK0ZB16B6KYR56F1

import Vue from 'vue';

class AuthService {
  constructor(store) {
    this.$store = store;
  }

  get isAuthenticated() {
    return this.$store.getters.auth.isAuthenticated;
  }

  get user() {
    return this.$store.state.auth.user;
  }

  get email() {
    return this.user ? this.user.attributes.email : '';
  }
}

export default ({ store }) => {
  const authService = new AuthService(store);
  Vue.prototype.$auth = authService;
  Vue.$auth = authService;
};
