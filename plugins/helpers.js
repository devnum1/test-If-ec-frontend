// 01EZTX9M3AWK0ZB16B6KYR56F1

import { get, has } from 'lodash';
import constContract from '@/constants/contract';
import moment from 'moment';

export default ({ store }, inject) => {
  inject('helpers', {
    randomString(length = 32, useSymbols = false) {
      let result = '';
      let characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      if (useSymbols) {
        characters += '`~!@#$%^&*()_-+=[]{}\\|;:,<.>/?';
      }

      for (var i = 0, j = characters.length; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * j));
      }

      return result;
    },

    cognitoKeyPrefix: `CognitoIdentityServiceProvider.${process.env.userPoolWebClientId}`,

    getLastAuthUser() {
      return localStorage.getItem(`${this.cognitoKeyPrefix}.LastAuthUser`);
    },

    getAccessToken() {
      return localStorage.getItem(
        `${this.cognitoKeyPrefix}.${this.getLastAuthUser()}.accessToken`
      );
    },

    getUserId() {
      return get(store, 'state.auth.user.attributes.sub', '').replace(/-/g, '');
    },

    getContractStatus(contract) {
      let { insDateFrom, insDateTo } = contract.productInfo;
      let insTimeFrom = contract.productInfo.insTimeFrom.propVal;
      let insTimeTo = contract.productInfo.insTimeTo.propVal;
      let baseDateYmd = moment().format('YYYYMMDD');
      let baseDateYmdH = moment().format('YYYYMMDDHHmmss');

      if (
        contract.insApplicationStatus == constContract.ins_application_status_05
      ) {
        return constContract.contract_status_03;
      }

      if (
        ![
          constContract.ins_application_status_06,
          constContract.ins_application_status_07,
        ].includes(contract.insApplicationStatus)
      ) {
        return null;
      }

      if (!has(contract, 'insContractInfo.referenceDate')) {
        if (insDateFrom > baseDateYmd) {
          return constContract.contract_status_11;
        }

        if (insDateTo + insTimeTo < baseDateYmdH) {
          return constContract.contract_status_21;
        }

        if (insDateFrom + insTimeFrom <= baseDateYmdH) {
          return constContract.contract_status_12;
        }

        return null;
      }

      if (get(contract, 'insContractInfo.referenceDate') > baseDateYmdH) {
        if (
          insDateFrom + insTimeFrom <= baseDateYmdH &&
          insDateTo + insTimeTo >= baseDateYmdH
        ) {
          return constContract.contract_status_12;
        }

        return null;
      }

      switch (get(contract, 'insContractInfo.insContractTermDiv')) {
        case constContract.ins_contract_term.div_01:
          return constContract.contract_status_22;

        case constContract.ins_contract_term.div_02:
          return constContract.contract_status_23;

        case constContract.ins_contract_term.div_04:
          return constContract.contract_status_24;

        case constContract.ins_contract_term.div_03:
          return constContract.contract_status_25;

        case constContract.ins_contract_term.div_05:
          return constContract.contract_status_26;

        default:
          return null;
      }
    },

    setDataFromVuexToLocal(...String) {
      String.forEach((name) => {
        name === 'petInfo'
          ? localStorage.setItem(
              'contract_refresh',
              JSON.stringify(store.state.contracts.petInfo)
            )
          : '';
        name === 'productCd'
          ? localStorage.setItem(
              'repProductCd_refresh',
              store.state.contracts.repProductCd
            )
          : '';
        name === 'customerInfo'
          ? localStorage.setItem(
              'customer_refresh',
              JSON.stringify(store.state.contracts.customerInfo)
            )
          : '';
        // TODO: contractIdがpolicyIdに置き換え変わったらここを消す
        name === 'contractId'
          ? localStorage.setItem(
              'contractId_refresh',
              JSON.stringify(store.state.contracts.contractId)
            )
          : '';
        name === 'policyId'
          ? localStorage.setItem(
              'policyId_refresh',
              store.state.contracts.policyId
            )
          : '';
        name === 'contract_duplicate'
          ? localStorage.setItem(
              'contract_duplicate_refresh',
              store.state.contracts.contractDuplicate
            )
          : '';
        name === 'refresh' ? localStorage.setItem('refresh', true) : '';
      });
    },

    setDataFromLocalToVuex() {
      let getPetInfo = JSON.parse(localStorage.getItem('contract_refresh'));
      let getRepProductCd = localStorage.getItem('repProductCd_refresh');
      let getCustomerInfo = JSON.parse(
        localStorage.getItem('customer_refresh')
      );
      let getContractId = JSON.parse(
        localStorage.getItem('contractId_refresh')
      );
      let getContractDuplicate = JSON.parse(
        localStorage.getItem('contract_duplicate_refresh')
      );
      let refresh = JSON.parse(localStorage.getItem('refresh'));

      if (getPetInfo) {
        store.commit('contracts/setPetInfo', getPetInfo);
        localStorage.removeItem('contract_refresh');
      }

      if (getRepProductCd) {
        store.commit('contracts/setRepProductCd', getRepProductCd);
        localStorage.removeItem('repProductCd_refresh');
      }

      if (getCustomerInfo) {
        store.commit('contracts/setCustomerInfo', getCustomerInfo);
        localStorage.removeItem('customer_refresh');
      }

      if (getContractId) {
        store.commit('contracts/setContractId', getContractId);
        localStorage.removeItem('contractId_refresh');
      }

      if (getContractDuplicate) {
        store.commit('contracts/setContractDuplicate', getContractDuplicate);
        localStorage.removeItem('contract_duplicate_refresh');
      }

      if (refresh) {
        localStorage.removeItem('refresh');
      }
    },

    getCurrentTimeFromServer() {
      return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest();
        request.open('HEAD', window.location.href, true);
        request.send();
        request.onreadystatechange = function () {
          if (request.readyState === 4) {
            resolve(new Date(request.getResponseHeader('Date')));
          }
        };
      });
    },
  });
};
