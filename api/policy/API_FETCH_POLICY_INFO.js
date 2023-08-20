import { BASE_END_POINT } from '../setting';

export const API_FETCH_POLICY_INFO = {
  // 申込情報取得API
  END_POINT: `${BASE_END_POINT}/bff/policy/NWEB012`,
  /**
   * @param {Object} payload
   * @param {string} payload.policyId
   *
   */
  getRequestBody: (payload) => {
    const { policyId } = payload;
    return {
      policyId,
    };
  },
};
