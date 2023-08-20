import { API_SEARCH_BANK_INFO } from '@/api/common/API_SEARCH_BANK_INFO';
import { mapState } from 'vuex';
import { API_UPDATE_BANK_ACCOUNT } from '@/api/account/API_UPDATE_BANK_ACCOUNT';

export default {
  namespaced: true,
  state() {
    return {
      bankInfo: [],
      bankBranchInfo: [],
    };
  },
  mutations: {
    setBankInfo(state, payload) {
      state.bankInfo = payload;
    },
    setBankBranchInfo(state, payload) {
      state.bankBranchInfo = payload;
    },
  },
  actions: {
    async fetchBankInfo(context) {
      try {
        const { END_POINT, getRequestBody } = API_SEARCH_BANK_INFO;
        const acquisitionMode = '0';
        const financialCode = '0000';
        const requestBody = getRequestBody({ acquisitionMode, financialCode });
        const response = await this.$axios.post(END_POINT, requestBody);
        context.commit('setBankInfo', response.financialBranchList);
      } catch (e) {
        throw new Error(e);
      }
    },

    async fetchBankBranchInfo(context, params) {
      try {
        const { END_POINT, getRequestBody } = API_SEARCH_BANK_INFO;
        const { financialCode } = params;
        const acquisitionMode = '1';
        const requestBody = getRequestBody({ acquisitionMode, financialCode });
        const response = await this.$axios.post(END_POINT, requestBody);
        context.commit('setBankBranchInfo', response.financialBranchList);
      } catch (e) {
        throw new Error(e);
      }
    },

    async updateBankAccount(context, params) {
      try {
        const { END_POINT, getRequestBody } = API_UPDATE_BANK_ACCOUNT;
        const requestBody = getRequestBody(params);
        await this.$axios.post(END_POINT, requestBody);
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
