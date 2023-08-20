import { BASE_END_POINT } from '../setting';

export const API_DOWNLOAD_FILE = {
  // ファイル取得API
  END_POINT: `${BASE_END_POINT}/bff/common/NWEB026`,
  /**
   * @param {Object} payload
   * @param {string} payload.imageKey
   *
   */
  getRequestBody: (payload) => {
    const { imageKey } = payload;
    return {
      fileUrl: imageKey,
    };
  },
};
