import { BASE_END_POINT } from '../setting';

export const API_UPDATE_PET_PHOTO = {
  // ペット画像変更API
  END_POINT: `${BASE_END_POINT}/bff/cs/NWEB015`,
  /**
   * @param {Object} payload
   * @param {string} payload.fileUrl
   * @param {string} payload.policyId
   * @param {number} payload.policyVersion
   *
   */
  getRequestBody: (payload) => {
    const { fileUrl, policyId, policyVersion } = payload;
    return {
      portrayUrl: fileUrl,
      policyId,
      version: policyVersion,
    };
  },
};
