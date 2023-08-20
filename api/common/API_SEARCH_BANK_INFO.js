import { BASE_END_POINT } from '../setting';

export const API_SEARCH_BANK_INFO = {
  // 銀行マスタ取得API
  END_POINT: `${BASE_END_POINT}/bff/common/NWEB029`,

  /**
   * @param {Object} payload
   * @param {string} payload.acquisitionMode
   * @param {string} payload.financialCode
   */
  getRequestBody: (payload) => {
    const { acquisitionMode, financialCode } = payload;
    return {
      acquisitionMode,
      financialCode,
    };
  },
};
