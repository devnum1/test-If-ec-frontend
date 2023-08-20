import { BASE_END_POINT } from '../setting';
import moment from 'moment';

export const API_FETCH_PROPOSAL = {
  // 申込情報取得API
  END_POINT: `${BASE_END_POINT}/bff/proposal/NWEB013`,
  /**
   * @param {Object} payload
   * @param {string} payload.affinityCode
   */
  getRequestBody: (payload) => {
    const { affinityCode } = payload;

    return {
      affinityCode,
    };
  },
};
