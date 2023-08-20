// 01EZTX9M3AWK0ZB16B6KYR56F1

import Vue from 'vue';
import VeeValidate from 'vee-validate';
import { Validator, ValidationProvider } from 'vee-validate';

import validatorDefaultEn from 'vee-validate/dist/locale/en';
import validatorDefaultJa from 'vee-validate/dist/locale/ja';
import validatorMessagesJa from '~/locales/ja';

Vue.component('ValidationProvider', ValidationProvider);

Vue.use(VeeValidate, {
  locale: 'ja',
  mode: 'passive',
});

Validator.localize({
  en: validatorDefaultEn,
  ja: validatorDefaultJa,
});

Validator.localize({
  ja: validatorMessagesJa,
});

Validator.extend('account_number', {
  getMessage: (field) => `${field}は半角数字7桁で入力してください`,
  validate: (value) => {
    return /^[0-9]{7}$/.test(value);
  },
});

// MFZN1007E
Validator.extend('length_between', {
  getMessage: (field, param) =>
    param[2] == 'security_code'
      ? `${field}は${param[0]}桁または${param[1]}桁の半角数字で入力してください`
      : `${field}は${param[0]}桁から${param[1]}桁の半角数字で入力してください`,
  validate: (value, [min, max]) => {
    return min <= value.length && value.length <= max;
  },
});

Validator.extend('regex_telephone', {
  getMessage: '電話番号をハイフンなしで入力ください 例：050XXXXXXXX',
  validate: (value, [min, max]) => {
    return /^0([0-9]|[57-9]0)[0-9]{8}$/.test(value);
  },
});

Validator.extend('regex_postCode', {
  getMessage: '郵便番号は半角数字で入力してください',
  validate: (value, [min, max]) => {
    return /^[0-9]{7}$/.test(value);
  },
});

Validator.extend('password', {
  getMessage: '8文字以上の半角英数・記号',
  validate: (value) => {
    if (value.length < 8 || value.length >= 100) return false;
    // 英大文字
    if (!/[A-Z]/.test(value)) return false;
    // 英小文字
    if (!/[a-z]/.test(value)) return false;
    // 数字
    if (!/[0-9]/.test(value)) return false;
    // 記号
    if (!/[!@#$%^&*()\-_+=\[\]{};':",.<>\/?]/.test(value)) return false;
    return true;
  },
});
