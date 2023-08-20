// 01EZTX9M3AWK0ZB16B6KYR56F1

import { mockContractInfo } from '@/mock/api';
import { getInsStartDateRange } from '~/utils/contracts/getInsStartDateRange';
import {
  API_CREATE_PROPOSAL,
  API_PREMIUM_CALCULATION,
  API_FETCH_DOG_BREED,
  API_GET_CONTRACT_INFO,
  API_UPDATE_CUSTOMER,
  API_GET_ACCOUNT_INFO,
  API_CREATE_CONTRACT,
  API_FETCH_POLICY_INFO,
  API_UPDATE_PET_PHOTO,
  API_UPLOAD_FILE,
  API_DOWNLOAD_FILE,
  API_CONFIRM_ACCEPTATION,
  API_FETCH_PROPOSAL,
} from '~/api';
import moment from 'moment';

export default {
  namespaced: true,
  state() {
    return {
      canAccessLandingPage: true,
      listCalculationProduct: null,
      listProductInfo: null,
      newContract: null,
      repProductCd: '',
      petInfo: null,
      customerInfo: null,
      listContractInfo: [],
      policyId: '',
      contractId: {},
      ngType: '',
      contractDuplicate: false,
      diseaseOption: null,
      updatedDataForConfirmation: null,
      dogBreeds: [],
    };
  },

  getters: {
    getContractId(state) {
      return state.contractId;
    },
    getPolicyId(state) {
      return state.policyId;
    },
    getListContractInfo(state) {
      return state.listContractInfo;
    },
    getPetBreedList(state) {
      return state.petBreedList;
    },
    getAccessLandingPage(state) {
      return state.canAccessLandingPage;
    },
    getDataForConfirmation(state) {
      return state.updatedDataForConfirmation;
    },
    getDogBreed(state) {
      return state.dogBreeds;
    },
    getPetInfo(state) {
      return state.petInfo;
    },
    getRepProductCd(state) {
      return state.repProductCd;
    },
  },
  mutations: {
    changeAccessLandingPage(state, payload) {
      state.canAccessLandingPage = payload.value;
    },
    setPremiumCalculation(state, payload) {
      state.listCalculationProduct = payload;
    },
    setProductInfo(state, payload) {
      state.listProductInfo = payload;
    },
    setNewContract(state, payload) {
      state.newContract = payload;
    },
    setRepProductCd(state, payload) {
      state.repProductCd = payload;
    },
    setCustomerInfo(state, payload) {
      state.customerInfo = payload;
    },
    setPetInfo(state, payload) {
      state.petInfo = payload;
    },
    setPetInfoInsStartDate(state, payload) {
      if (state.petInfo) {
        state.petInfo.insStartDate = payload;
      }
    },
    setContractInfo(state, payload) {
      state.listContractInfo = payload;
    },
    setPetBreedList(state, payload) {
      state.petBreedList = payload;
    },
    // TODO: setPolicyIdに置き換え後、setContractIdは不要になったら消す。
    setContractId(state, payload) {
      state.contractId = payload;
    },
    setPolicyId(state, payload) {
      state.policyId = payload;
    },
    setNgType(state, payload) {
      state.ngType = payload;
    },
    setContractDuplicate(state, payload) {
      state.contractDuplicate = payload;
    },
    setDiseaseOption(state, payload) {
      state.diseaseOption = payload;
    },
    setDataForConfirmation(state, payload) {
      state.updatedDataForConfirmation = payload;
    },
    setDogBreeds(state, payload) {
      state.dogBreeds = payload;
    },
  },

  actions: {
    changeAccessLandingPage(context, payload) {
      context.commit('changeAccessLandingPage', payload);
    },

    async premiumCalculation(context) {
      try {
        const { END_POINT, getRequestBody } = API_PREMIUM_CALCULATION;
        const petInfo = context.getters.getPetInfo;
        const { petType, petWeight, insStartDate, petBreed, petBirthday } =
          petInfo;
        const requestBody = getRequestBody({
          insStartDate,
          petBirthday,
          petBreed: petBreed,
          petType: petType,
          petWeight: petWeight,
        });
        return await this.$axios.post(END_POINT, requestBody); // POSTリクエストを送信
      } catch (e) {
        console.log(e);
        // TODO
      }
    },

    async newContract(context, params) {
      try {
        const { END_POINT, getRequestBody } = API_CREATE_CONTRACT;
        const { validateDate, expiryDate, totalPremAf, repProductCd } = params;
        const petInfo = context.getters.getPetInfo;
        const {
          petSexCd,
          petType,
          petWeight,
          petName,
          petInsJoinFlg,
          petBreed,
          petBirthday,
          noticeCd02,
          noticeCd01,
          petBirthdayDiv,
        } = petInfo;
        const requestBody = getRequestBody({
          repProductCd,
          totalPremAf,
          expiryDate,
          validateDate,
          weight: petWeight,
          petName,
          petType,
          birthdate: petBirthday,
          birthDateDiv: petBirthdayDiv,
          petBreed,
          petSexCd,
          noticeCd01,
          noticeCd02,
          petInsJoinFlg,
        });
        const response = await this.$axios.post(END_POINT, requestBody);
        context.commit('setPolicyId', response?.policy?.policyId);
        return response;
      } catch (e) {
        console.error(e);
        return this.$router.push('/errors/system_error');
      }
    },

    async cancelContract(context, params) {
      try {
        const resApi = await this.$axios.post('/api/stopContinue', {
          ...params,
        });
        return resApi;
      } catch (e) {
        console.error(e);
        return this.$router.push('/errors/system_error');
      }
    },

    async updateContract(_, params) {
      try {
        const resApi = await this.$axios.post('/api/updateApplication', {
          ...params,
        });
        return resApi;
      } catch (e) {
        console.error(e);
        return this.$router.push('/errors/system_error');
      }
    },

    async contractInfo(context, params) {
      try {
        const listContractInfo = mockContractInfo();
        context.commit('setContractInfo', listContractInfo);
      } catch (e) {
        throw e;
      }
    },
    // contractInfoをinsuremoの申込情報取得APIに置き換えたもの
    // TODO: 他の画面で、contractInfoを使っている部分もAPIを置き換えできたら、上のcontractInfoを消して、こっちをcontractInfoとする。
    async contractInfoV2(context, params) {
      try {
        const { END_POINT, getRequestBody } = API_FETCH_POLICY_INFO;
        const { policyId } = params;
        const requestBody = getRequestBody({ policyId });
        const listContractInfo = await this.$axios.post(END_POINT, requestBody);
        context.commit('setContractInfo', listContractInfo);
      } catch (e) {
        throw e;
      }
    },

    // 契約情報取得　マイページで使用
    async contractInfoForMyPage(context) {
      try {
        const { END_POINT } = API_GET_CONTRACT_INFO;
        const listContractInfo = await this.$axios.get(END_POINT);
        context.commit('setContractInfo', listContractInfo.policyInfoList);
        context.commit('setPetBreedList', listContractInfo.petBreedList);
      } catch (e) {
        throw e;
      }
    },

    // step4画面で呼び出されるもの
    async updateCustomerInfo(context, params) {
      try {
        const { END_POINT, getRequestBody } = API_UPDATE_CUSTOMER;
        const {
          email,
          postCode,
          firstName1,
          firstName2,
          lastName1,
          lastName2,
          gender,
          prefectureCode,
          address1,
          address2,
          address3,
          telephone,
          birthDate,
          version,
        } = params;
        const requestBody = getRequestBody({
          email,
          postCode,
          firstName1,
          firstName2,
          lastName1,
          lastName2,
          gender,
          prefectureCode,
          address1,
          address2,
          address3,
          telephone,
          birthDate,
          version,
        });
        return await this.$axios.post(END_POINT, requestBody);
      } catch (e) {
        console.error(e);
        // TODO
      }
    },

    async customerInfo() {
      try {
        const { END_POINT } = API_GET_ACCOUNT_INFO;
        return await this.$axios.get(END_POINT);
      } catch (e) {
        throw e;
      }
    },

    async uploadPhotoPet(context, params) {
      try {
        const { file, policyId, policyVersion } = params;
        const uploadResponse = await context.dispatch('uploadFile', { file });
        const { END_POINT, getRequestBody } = API_UPDATE_PET_PHOTO;
        const { fileUrl } = uploadResponse;
        const requestBody = getRequestBody({
          policyId,
          policyVersion,
          fileUrl,
        });
        const response = await this.$axios.post(END_POINT, requestBody);
        return response;
      } catch (e) {
        console.log('uploadPhotoPet error', e);
        // memo:拡張子エラーが返却されたきた場合のみ、その旨を表示側に返却する。それ以外は従来通りundefinedで返却する。
        if (
          e.petImage &&
          e.petImage[0] &&
          e.petImage[0] ===
            'The pet image must be a file of type: png, bmp, dib, jpg, jpe, jfif, gif, tif, tiff, heic.'
        ) {
          return 'imageExtensionErrorDetected';
        }
      }
    },

    async uploadFile(context, params) {
      try {
        const { END_POINT, getRequestBody } = API_UPLOAD_FILE;
        const requestBody = getRequestBody(params);
        const response = await this.$axios.post(END_POINT, requestBody);
        return response;
      } catch (e) {
        console.log('uploadFile error', e);
        // memo:拡張子エラーが返却されたきた場合のみ、その旨を表示側に返却する。それ以外は従来通りundefinedで返却する。
        if (
          e.petImage &&
          e.petImage[0] &&
          e.petImage[0] ===
            'The image must be a file of type: png, bmp, dib, jpg, jpe, jfif, gif, tif, tiff, heic.'
        ) {
          return 'imageExtensionErrorDetected';
        }
      }
    },

    async updateContractNotice(context, params) {
      try {
        const resApi = await this.$axios.post('/api/updateContract/notice', {
          ...params,
        });
        return resApi;
      } catch (e) {
        // TODO
      }
    },

    async updateContractStatus(context, params) {
      try {
        const { END_POINT } = API_CONFIRM_ACCEPTATION;
        const { policyId } = params;
        return await this.$axios.get(END_POINT + `?policyId=${policyId}`, {});
      } catch (e) {
        throw e;
      }
    },

    async s3download(context, params) {
      try {
        const { END_POINT, getRequestBody } = API_DOWNLOAD_FILE;
        const requestBody = getRequestBody(params);
        return await this.$axios.post(END_POINT, requestBody);
      } catch (e) {}
    },

    async insStartDate(context, params) {
      try {
        return getInsStartDateRange();
      } catch (e) {
        console.error(e);
        return this.$router.push('/errors/system_error');
      }
    },

    async FetchDogBreed(context) {
      try {
        const { END_POINT } = API_FETCH_DOG_BREED;
        const response = await this.$axios.get(END_POINT); // GETリクエストを送信
        context.commit('setDogBreeds', response.petBreedList);
      } catch (e) {
        throw new Error(e);
      }
    },
    async CreateProposal(context, params) {
      try {
        const { totalPremAf, expiryDate, validateDate, repProductCd } = params;
        const petInfo = context.getters.getPetInfo;
        const {
          petSexCd,
          petType,
          petWeight,
          petName,
          petInsJoinFlg,
          petBreed,
          petBirthday,
          noticeCd02,
          noticeCd01,
          petBirthdayDiv,
        } = petInfo;
        const { END_POINT, getRequestBody } = API_CREATE_PROPOSAL;
        const requestBody = getRequestBody({
          totalPremAf,
          expiryDate,
          validateDate,
          weight: petWeight,
          petName,
          petType,
          birthdate: petBirthday,
          birthDateDiv: petBirthdayDiv,
          petBreed,
          petSexCd,
          noticeCd01,
          repProductCd,
          noticeCd02,
          petInsJoinFlg,
        });
        const response = await this.$axios.post(END_POINT, requestBody);
        return response;
      } catch (e) {
        console.error(e);
      }
    },
    async fetchProposal(context) {
      try {
        const affinityCode =
          context.rootGetters['auth/getAuthUserAttributes'][
            'custom:affinityCode'
          ];
        const { END_POINT, getRequestBody } = API_FETCH_PROPOSAL;
        const requestBody = getRequestBody({
          affinityCode,
        });
        const response = await this.$axios.post(END_POINT, requestBody);

        const { coverages, subjectPets, customerDeclines } =
          response.proposalPolicy;
        const { validateDate, planCode } = coverages[0];
        const {
          birthDate,
          birthDateDiv,
          contraception,
          gender,
          petBreed,
          petName,
          petType,
          weight,
        } = subjectPets[0];
        const hasIllnessHistory = customerDeclines.find(
          (d) => d.declNo === '1'
        ).declAnswer;
        const isOtherPetInsuranceJoined = customerDeclines.find(
          (d) => d.declNo === '2'
        ).declAnswer;
        const petInfo = {
          petBirthday: moment(birthDate).format('YYYY/MM'),
          petBirthdayDiv: birthDateDiv,
          noticeCd01: contraception,
          noticeCd02: hasIllnessHistory,
          petInsJoinFlg: isOtherPetInsuranceJoined,
          petBreed,
          petSexCd: gender,
          petName,
          petType: petType,
          petWeight: weight,
          insStartDate: validateDate.replace(/-/g, '/'),
        };
        context.commit('setPetInfo', petInfo);
        context.commit('setRepProductCd', planCode);
      } catch (e) {
        console.error(e);
      }
    },
  },
};
