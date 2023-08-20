import { BASE_END_POINT } from '../setting';
import moment from 'moment';

export const API_CREATE_PROPOSAL = {
  // 申込情報保存API
  END_POINT: `${BASE_END_POINT}/bff/proposal/NWEB005`,
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

    // 特定の環境だと moment('YYYY/MM') が invalid date になってしまうため、
    // birthdate が 'YYYY/MM' の形式なら事前に 'YYYY/MM/01' に変換しておく
    let bd = birthdate;
    if (moment(birthdate, 'YYYY/MM').isValid()) {
      bd = `${birthdate}/01`;
    }

    return {
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
      jpPetInfo: {
        petName: petName,
        petType: petType,
        gender: petSexCd,
        birthdate: moment(bd).endOf('month').format('YYYY-MM-DD'), // 【重要】仕様上ペットの誕生日は月末日付にしないといけない
        petBreed: petBreed,
        weight: Number(weight),
        contraception: noticeCd01,
        birthDateDiv,
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
