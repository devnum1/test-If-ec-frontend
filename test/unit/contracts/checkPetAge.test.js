import { isPetUnder9Years } from '../../../utils/contracts/isPetUnder9Years';

describe('isPetUnder9Years', () => {
  const baseDate = '20230814';

  test.each([
    ['2014/06', false], // 9歳を迎えているケース
    ['2014/07', false], // 9歳を迎えているケース
    ['2014/08', true], // 9歳を迎えていないケース
    ['2014/09', true], // 9歳を迎えていないケース
  ])('誕生日が %s の場合のテスト', (birthday, expected) => {
    expect(isPetUnder9Years(baseDate, birthday)).toBe(expected);
  });
});
