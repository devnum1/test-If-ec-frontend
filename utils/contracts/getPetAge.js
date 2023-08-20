import moment from 'moment';
import 'moment/locale/ja';
/**
 * 保険始期日から換算してペットの年齢を返却する関数
 */
export const getPetAge = (baseDate, birthday) => {
  // 【重要】仕様上ペットの誕生日は月末日付にしないといけない
  const petBirthDate = moment(birthday).endOf('month');
  const bsDate = moment(baseDate, 'YYYY-MM-DD');
  const ageInYears = bsDate.diff(petBirthDate, 'years');
  const ageInMonths = bsDate.diff(petBirthDate, 'months');
  return {
    ageInYears,
    ageInMonths,
  };
};
