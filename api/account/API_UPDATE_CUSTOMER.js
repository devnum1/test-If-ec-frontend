import { BASE_END_POINT } from '../setting';
import moment from 'moment';

export const API_UPDATE_CUSTOMER = {
  // ユーザー情報更新API
  END_POINT: `${BASE_END_POINT}/bff/account/NWEB008`,
  /**
   * @param {Object} payload
   * @param {string} payload.email
   * @param {string} payload.firstnameKanji
   * @param {string} payload.firstnameKana
   * @param {string} payload.lastnameKanji
   * @param {string} payload.lastnameKana
   * @param {string} payload.sexCd
   * @param {string} payload.birthDate
   * @param {string} payload.addressZip
   * @param {string} payload.prefectureCode
   * @param {string} payload.address1
   * @param {string} payload.address2
   * @param {string} payload.address3
   * @param {string} payload.telephone
   * @param {number} payload.version
   *
   */
  getRequestBody: (payload) => {
    const {
      email,
      firstName1,
      firstName2,
      lastName1,
      lastName2,
      gender,
      birthDate,
      postCode,
      prefectureCode,
      address1,
      address2,
      address3,
      telephone,
      version,
    } = payload;
    return {
      email,
      firstName1,
      firstName2,
      lastName1,
      lastName2,
      gender,
      birthDate: moment(birthDate).format('YYYY-MM-DD'),
      postCode,
      prefectureCode,
      address1,
      address2,
      address3,
      telephone,
      version, // /bff/account/NWEB008を使ってユーザー情報が更新された回数？なので初回は1が入る
    };
  },
};
