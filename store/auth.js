// 01EZTX9M3AWK0ZB16B6KYR56F1

import { Auth } from 'aws-amplify';

export default {
  namespaced: true,
  state() {
    return {
      user: null,
    };
  },

  getters: {
    isAuthenticated(state) {
      return !!state.user;
    },
    getAuthUserAttributes(state) {
      return state.user ? state.user.attributes : null;
    },
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },

  actions: {
    async load({ commit }) {
      try {
        const user = await Auth.currentUserInfo();
        commit('setUser', user);
      } catch (e) {
        commit('setUser', null);
        console.log(e);
      }
    },

    async register(_, { email, password, affinityCode }) {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          'custom:affinityCode': affinityCode,
        },
      });
    },

    async forgotPasswordSubmit(_, { uid, code, password }) {
      await Auth.forgotPasswordSubmit(uid, code, password);
    },

    async verifyUserAttributeSubmit(_, { code }) {
      await Auth.verifyCurrentUserAttributeSubmit('email', code);
    },

    async confirmSignUp(_, { code, uid }) {
      try {
        await Auth.confirmSignUp(uid, code);
      } catch {}
    },

    async confirmRegistrationStatus(_, { email }) {
      try {
        // 適当なパスワードでログインを試してアカウントが存在するかチェックする
        return Auth.signIn(email, '1234')
          .then((_) => false)
          .catch((error) => {
            const code = error.code;
            if (code === 'NotAuthorizedException') {
              return true;
            }
            return false;
          });
      } catch (e) {}
    },

    async login(_, { email, password }) {
      await Auth.signIn({ username: email, password });
    },

    async changePassword(_, { oldPassword, newPassword }) {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(user, oldPassword, newPassword);
    },

    async changeEmail(_, { email }) {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, {
        email,
      });
    },

    async sendMagicLink(_, { email }) {
      try {
        const result = await Auth.signIn(email);

        window.localStorage.setItem('email', email);
        window.localStorage.setItem('session', result.Session);
        window.localStorage.setItem('keyPrefix', result.keyPrefix);
      } catch (e) {
        console.log(e);
      }
    },

    async forgotPassword(_, { email }) {
      await Auth.forgotPassword(email);
      sessionStorage.setItem('forgot_password_email', email);
    },

    async registerAndSendMagicLink({ dispatch }, { email, password }) {
      let canLogin = false;

      try {
        await dispatch('register', {
          email,
          password,
        });

        canLogin = true;
      } catch (e) {
        if (e.code === 'UsernameExistsException') {
          canLogin = true;
        } else {
          console.log(e);
        }
      }

      if (canLogin) {
        try {
          await dispatch('sendMagicLink', {
            email,
          });

          return true;
        } catch (e) {
          console.log(e);
        }
      }

      return false;
    },

    async confirmChallenge(_, { token }) {
      try {
        const email = window.localStorage.getItem('email');
        const session = window.localStorage.getItem('session');

        const cognitoUser = Auth.createCognitoUser(email);
        cognitoUser.Session = session;

        await Auth.sendCustomChallengeAnswer(cognitoUser, token);
      } catch (e) {
        throw e;
      }
    },

    async logout({ commit }) {
      await Auth.signOut();

      commit('setUser', null);
    },
  },
};
