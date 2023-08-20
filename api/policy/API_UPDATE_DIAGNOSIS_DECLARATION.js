import { BASE_END_POINT } from '../setting';

export const API_UPDATE_DIAGNOSIS_DECLARATION = {
  // 告知情報更新API
  END_POINT: `${BASE_END_POINT}/bff/policy/NWEB021`,

  /**
   * @param {Object} payload
   * @param {number} payload.policyId
   * @param {string} payload.hasOtherJoin
   * @param {string} payload.otherCompanyName
   * @param {string} payload.otherHolderName
   * @param {string} payload.otherPolicyStatus
   */
  getRequestBody: (payload) => {
    const { policyId } = payload;
    return {
      policyId,
      hasOtherJoin,
      otherCompanyName,
      otherHolderName,
      otherPolicyStatus,
    };
  },
};
