import moment from 'moment';
import 'moment/locale/ja';
/**
 * 保険の開始日を返す関数。
 * ペット保険のafterLoss(アフロス)対策のため、
 * 現在に日時から+30 ~ 60日の範囲を保険の開始日とする必要がある。
 */
export const getInsStartDateRange = () => {
  moment.locale('ja');
  const today = moment();
  const from = today.clone().add(30, 'days');
  const to = today.clone().add(60, 'days');
  const format = (date) => date.format('YYYY/MM/DD');
  const insStartDateRange = {
    from: format(from),
    to: format(to),
  };
  return insStartDateRange;
};
