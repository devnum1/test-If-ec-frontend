import { BASE_END_POINT } from '../setting';
import moment from 'moment';

export const API_CREATE_CONTRACT = {
  // 契約情報登録API
  END_POINT: `${BASE_END_POINT}/bff/policy/NWEB003`,
  /**
   * @param {Object} payload
   * @param {string} payload.repProductCd
   * @param {number} payload.totalPremAf
   * @param {string} payload.validateDate
   * @param {string} payload.expiryDate
   * @param {string} payload.petType
   * @param {string} payload.petName
   * @param {string} payload.petSexCd
   * @param {number} payload.weight
   * @param {string} payload.gender
   * @param {string} payload.birthdate
   * @param {string} payload.birthDateDiv
   * @param {number} payload.petBreed
   * @param {string} payload.weight
   * @param {string} payload.contraception
   * @param {string} payload.petInsJoinFlg
   *
   */
  getRequestBody: (payload) => {
    const {
      totalPremAf,
      expiryDate,
      weight,
      petName,
      petType,
      petBreed,
      petSexCd,
      noticeCd02,
      noticeCd01,
      validateDate,
      birthdate,
      petInsJoinFlg,
      birthDateDiv,
      repProductCd,
    } = payload;
    const petBirthday = birthdate.replace(/\//g, ''); // /があるとsafariでmomentがうまく動かないので削除
    return {
      productCode: 'L9999001',
      planCode: repProductCd,
      coverageInfoList: [
        {
          productCode: 'L9999001',
          paymentFreq: '4',
          totalPremAf: totalPremAf,
          chargePeriod: '2',
          chargeYear: 1,
          coveragePeriod: '2',
          coverageYear: 1,
          planCode: repProductCd,
          coverageSerialId: 0,
          masterCoverageSerialId: 0,
          countWay: 1,
          validateDate: validateDate,
          expiryDate: expiryDate,
        },
      ],
      petInfo: {
        petName: petName,
        petType,
        gender: petSexCd,
        birthdate: moment(petBirthday).endOf('month').format('YYYY-MM-DD'), // 【重要】仕様上ペットの誕生日は月末日付にしないといけない
        petBreed: petBreed,
        weight: Number(weight),
        contraception: noticeCd01,
        birthDateDiv: birthDateDiv,
        declInpatient: [
          {
            declNo: '1',
            declAnswer: noticeCd02,
          },
          {
            declNo: '2',
            declAnswer: petInsJoinFlg,
          },
        ],
      },
    };
  },
};
