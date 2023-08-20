import { BASE_END_POINT } from '../setting';

export const API_UPLOAD_FILE = {
  // ファイルアップロード API
  END_POINT: `${BASE_END_POINT}/bff/common/NWEB014`,
  /**
   * @param {Object} payload
   * @param {file} payload.file
   *
   */
  getRequestBody: (payload) => {
    const { file } = payload;
    let formData = new FormData();
    formData.append('file', file);
    return formData;
  },
};
