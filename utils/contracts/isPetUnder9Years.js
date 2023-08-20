import moment from 'moment';
import 'moment/locale/ja';
/**
 * 保険始期日から換算してペットの年齢が9歳未満であることを確認する
 *
 * @param {string} baseDate - 保険始期日
 * @param {string} birthday - ペットの誕生日
 * @returns {boolean} ペットの年齢が9歳未満であれば true を返し、それ以外の場合は false を返す
 * @example
 * isPetUnder9Years('20230814', '2014/07'); // false
 * isPetUnder9Years('20230814', '2014/08'); // true
 */
export const isPetUnder9Years = (baseDate, birthday) => {
  // 特定の環境だと moment('YYYY/MM') が invalid date になってしまうため、
  // 'YYYY/MM' の形式なら事前に 'YYYY/MM/01' に変換しておく
  let bd = birthday;
  if (moment(birthday, 'YYYY/MM').isValid()) {
    bd = `${birthday}/01`;
  }

  const base = moment(baseDate);
  // 【重要】仕様上ペットの誕生日は月末日付にしないといけない
  const birth = moment(bd).endOf('month');

  const ageYears = base.diff(birth, 'years');
  return ageYears < 9;
};
