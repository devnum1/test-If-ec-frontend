import { BASE_END_POINT } from '../setting';
import { getPetAge } from '~/utils/contracts/getPetAge';
import moment from 'moment';
import contract from '~/constants/contract';

export const API_PREMIUM_CALCULATION = {
  // 保険料算出API
  END_POINT: `${BASE_END_POINT}/bff/product/NWEB002`,
  /**
   * @param {Object} payload
   * @param {string} payload.petBirthday
   * @param {string} payload.insStartDate
   * @param {number} payload.petType
   * @param {number} payload.petBreed
   * @param {number} payload.petWeight
   */
  getRequestBody: (payload) => {
    const { insStartDate, petBirthday, petBreed, petType, petWeight } = payload;
    // 特定の環境だと moment('YYYY/MM') が invalid date になってしまうため、
    // 'YYYY/MM' の形式なら事前に 'YYYY/MM/01' に変換しておく
    let bd = petBirthday;
    if (moment(petBirthday, 'YYYY/MM').isValid()) {
      bd = `${petBirthday}/01`;
    }
    const ageInfo = getPetAge(insStartDate, bd);
    return {
      productCode: 'L9999001',
      calcDate: moment(insStartDate).format('YYYY-MM-DD'),
      usableParams: {
        chargeType: 4,
        petAge: ageInfo.ageInYears,
        petCategory: petType,
        dogType: petType === contract.pet_type.DOG ? petBreed : null,
        petMonthAge: ageInfo.ageInMonths,
        petWeight: Number(petWeight),
      },
    };
  },
};

// export const { API_PREMIUM_CALCULATION}
