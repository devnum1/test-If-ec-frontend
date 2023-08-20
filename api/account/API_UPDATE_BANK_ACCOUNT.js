import { BASE_END_POINT } from '../setting';

export const API_UPDATE_BANK_ACCOUNT = {
  // 口座情報登録API
  END_POINT: `${BASE_END_POINT}/bff/account/NWEB022`,
  /**
   * @param {Object} payload
   * @param {string} payload.accoName
   * @param {number} payload.accountType
   * @param {string} payload.bankAccount
   * @param {string} payload.bankCode
   * @param {string} payload.branchCode
   * @param {number} payload.version
   * @param {string} payload.accountRelaToPH
   */
  getRequestBody: (payload) => {
    const {
      accountHolderName,
      relationshipWithContractor,
      financialInstitutionName,
      branchName,
      accountType,
      accountNumber,
      version,
    } = payload;

    return {
      accoName: accountHolderName,
      accountType: accountType,
      bankAccount: accountNumber,
      bankCode: financialInstitutionName,
      branchCode: branchName,
      version: version,
      accountRelaToPH: relationshipWithContractor,
    };
  },
};
