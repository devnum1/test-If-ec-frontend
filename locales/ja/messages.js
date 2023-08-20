// 01EZTX9M3AWK0ZB16B6KYR56F1

export default {
  required: (field, param) => {
    switch (_.last(param)) {
      case 'radio':
        return `${field}を選択してください`; // MFZN1011E
      case 'date-time-picker':
        return `${field}を選択してください`; // MFZN1005E
      default:
        return `${field}を入力してください`; // MFZN1001E
    }
  },
  max: (field, max) => `${field}は${max}文字以内で入力してください`, // MFZN1002E
  regex: (field, param) => `${field}は${_.last(param)}で入力してください`, // MFZN1003E
  min_value: (field, param) =>
    `${field}は${_.last(param)}以上で入力してください`, // MFZN1010E
  max_value: (field, param) =>
    `${field}は${_.last(param)}以内で入力してください`, // MFZN1004E
  email: (field, param) => `${field}は${param}で入力してください`,
  length: (field, param) => `${field}は${param[2]}で入力してください`, // MFZN1003E

  params_message: {
    regex_KANJI_KANA_HIRA_MIX: '全角文字(漢字、ひらがな、カタカナ、英数字)',
    regex_NUMBER_HALFSIZE: '半角数字',
    regex_NUMBER_ZIP_HALFSIZE: '半角数字',
    regex_KANA_FULLSIZE: '全角カタカナ',
    regex_KANJI_KANA_HIRA_FULLSIZE: '全角文字',
    regex_HALFSIZE: '半角数値記号英文字',
    regex_KANJI_NUMBER_THREE_CHAR: '漢数字3桁',
    regex_NUMBER_SYMBOLS_HALFSIZE: '半角数値記号',
    time_before_now: 'は来月以降の年月を選択してください。', // MFZN1006E
  },

  check_age_pet_past_year: 'お誕生日(ペット)は過去の年月を選択してください',
  check_insStartDate_over_date:
    '補償開始日は30日後から~60日の間で選択できます。',
  check_age_customer: '18歳未満又は150歳以上は保険のご契約ができません',
  check_payment_gmo:
    '決済情報登録でエラーが発生しました。<br>登録情報をご確認ください。',
  check_payment_gmo_edit:
    '決済情報変更でエラーが発生しました。<br>登録情報をご確認ください。',
  petName: 'うちの子のお名前を入力してください',
  petType: '種別を選択してください',
  petBreed: '犬種を選択してください',
  petWeight: '体重を入力してください',
  petSexCd: '性別を選択してください',
  noticeCd01: '去勢・避妊を選択してください',
  petBirthdayDiv: 'お誕生日(ペット)を選択してください',
  petBirthday: 'お誕生日(ペット)を選択してください',
  noticeCd02: '病気診断確認を選択してください',
  petInsJoinFlg: 'ペット保険加入の有無を選択してください',
  checkRegistrationInformation: '登録情報を確認する',
};
