// 01EZTX9M3AWK0ZB16B6KYR56F1
import { mockUpdateContractPayment } from '@/mock/api';
import {
  API_SAVE_CARD_INFO,
  API_UPDATE_CARD_INFO,
  API_GET_CARD_INFO,
} from '~/api';

export default {
  namespaced: true,
  state() {
    return {
      paymentInfo: null,
      creditCardData: null,
      cardInfo: null, // insureMO APIからのレスポンス
    };
  },

  getters: {
    //
    getPaymentInfo(state) {
      return state.paymentInfo;
    },
  },

  mutations: {
    setPaymentInfo(state, payload) {
      state.paymentInfo = payload;
    },
    setCreditCardData(state, data) {
      state.creditCardData = data;
    },
    setCardInfo(state, data) {
      state.cardInfo = data;
    },
  },

  // TODO: 全画面での置き換えが終わったらこっちを消す
  actions: {
    async updateContractPayment(context, params) {
      try {
        // const resApi = await this.$axios.post('/api/updateContract/payment', { ...params });
        const resApi = mockUpdateContractPayment();
        return resApi;
      } catch (e) {
        console.log(e);
      }
    },

    // TODO: 他の画面で、updateContractPaymentを使っている部分もAPIを置き換えできたら、上のupdateContractPaymentを消して、こっちをupdateContractPaymentとする。
    // カード情報の新規登録
    async updateContractPaymentV2(context, params) {
      try {
        const { policyId, cardToken } = params;
        const { END_POINT, getRequestBody } = API_SAVE_CARD_INFO;
        const requestBody = getRequestBody({
          policyId,
          cardToken,
        });

        return await this.$axios.post(END_POINT, requestBody);
      } catch (e) {
        console.log(e);
      }
    },

    // カード情報の更新
    async updateContractCard(context, params) {
      try {
        const { policyId, cardToken } = params;
        const { END_POINT, getRequestBody } = API_UPDATE_CARD_INFO;
        const requestBody = getRequestBody({ policyId, cardToken });

        return await this.$axios.post(END_POINT, requestBody);
      } catch (e) {
        console.log(e);
      }
    },

    // カード情報の取得
    async contractCardInfo(context, policyId) {
      try {
        const { END_POINT } = API_GET_CARD_INFO;
        const res = await this.$axios.get(
          END_POINT + `?policyId=${policyId}`,
          {}
        );
        context.commit('setCardInfo', res);
        return res;
      } catch (e) {
        throw e;
      }
    },
  },
};
