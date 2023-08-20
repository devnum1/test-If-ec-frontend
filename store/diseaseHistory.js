import { API_FETCH_DISEASE_CODE_MASTER, API_SAVE_DISEASE_HISTORY } from '~/api';
import { DISEASE_MASTER } from '../constants/diseases';
import moment from 'moment/moment';

export default {
  namespaced: true,
  state() {
    return {
      diseaseCodeMaster: [],
      declarationDisease: [
        // TODO 自動生成する
        {
          bodySiteCode: '1',
          declaration: [],
        },
        {
          bodySiteCode: '2',
          declaration: [],
        },
        {
          bodySiteCode: '3',
          declaration: [],
        },
        {
          bodySiteCode: '4',
          declaration: [],
        },
        {
          bodySiteCode: '5',
          declaration: [],
        },
        {
          bodySiteCode: '6',
          declaration: [],
        },
        {
          bodySiteCode: '7',
          declaration: [],
        },
        {
          bodySiteCode: '8',
          declaration: [],
        },
        {
          bodySiteCode: '9',
          declaration: [],
        },
        {
          bodySiteCode: '10',
          declaration: [],
        },
        {
          bodySiteCode: '11',
          declaration: [],
        },
        {
          bodySiteCode: '12',
          declaration: [],
        },
        {
          bodySiteCode: '13',
          declaration: [],
        },
        {
          bodySiteCode: '14',
          declaration: [],
        },
        {
          bodySiteCode: '15',
          declaration: [],
        },
      ],
      vaccination: {},
      rabiesVaccination: {},
    };
  },
  getters: {
    getDiseaseCode: (state) => (bodySiteCode) => {
      return state.diseaseCodeMaster.filter(
        (item) => item.bodySiteCode === bodySiteCode
      );
    },
    getDeclarationDisease: (state) => (bodySiteCode) => {
      return state.declarationDisease.find(
        (item) => item.bodySiteCode === bodySiteCode
      ).declaration;
    },
    getVaccination: (state) => () => {
      return state.vaccination;
    },
    getRabiesVaccination: (state) => () => {
      return state.rabiesVaccination;
    },
    getAllDeclarationDisease: (state) => () => {
      // TODO: refactor
      return [
        ...state.declarationDisease[0].declaration,
        ...state.declarationDisease[1].declaration,
        ...state.declarationDisease[2].declaration,
        ...state.declarationDisease[3].declaration,
        ...state.declarationDisease[4].declaration,
        ...state.declarationDisease[5].declaration,
        ...state.declarationDisease[6].declaration,
        ...state.declarationDisease[7].declaration,
        ...state.declarationDisease[8].declaration,
        ...state.declarationDisease[9].declaration,
        ...state.declarationDisease[10].declaration,
        ...state.declarationDisease[11].declaration,
        ...state.declarationDisease[12].declaration,
        ...state.declarationDisease[13].declaration,
        ...state.declarationDisease[14].declaration,
      ];
    },
  },
  mutations: {
    setDiseaseCode(state, diseaseCode) {
      const diseaseCodeMaster = [...state.diseaseCodeMaster, ...diseaseCode];

      // 画面にアクセスするたびに毎回同じものを取得してしまうので、重複を削除
      // TODO: API一撃でmaster全ての取得できるようにAPIが取得されたら修正する
      state.diseaseCodeMaster = Array.from(
        new Map(
          diseaseCodeMaster.map((item) => [item.diagnosisCode, item])
        ).values()
      );
    },
    setDeclarationDiseaseDetail(state, payload) {
      state.declarationDisease = state.declarationDisease.map((item) => {
        if (item.bodySiteCode === payload.bodySiteCode) {
          console.log(payload);
          return {
            ...item,
            declaration: payload.declarationDiseaseDetail,
          };
        }
        return item;
      });
    },
    setVaccination(state, payload) {
      state.vaccination = payload;
    },
    setRabiesVaccination(state, payload) {
      state.rabiesVaccination = payload;
    },
  },
  actions: {
    async getDiseaseCodeMaster(context, bodySiteCode) {
      const { END_POINT } = API_FETCH_DISEASE_CODE_MASTER;
      const response = await this.$axios.post(END_POINT, {
        bodySiteCode,
      });
      if (response.result === 1) {
        context.commit('setDiseaseCode', response.bodySiteDiagnosisCfgList);
      }
    },
    async saveDiseaseHistory(context, payload) {
      const { END_POINT } = API_SAVE_DISEASE_HISTORY;

      const vaccination = [context.state.vaccination];
      if (payload.petType === '01') {
        vaccination.push(context.state.rabiesVaccination);
      }

      const allDeclarationDisease = context.getters.getAllDeclarationDisease();
      const request = {
        policyId: payload.policyId,
        declarationInfo: {
          contractDiagnosisTwoDeclList: allDeclarationDisease.map((item) => {
            const convertItem = {
              ...item,
              diseaseDate: item.diseaseDate
                ? moment(item.diseaseDate).format('YYYY-MM-DD')
                : '',
              healingDate: item.healingDate
                ? moment(item.healingDate).format('YYYY-MM-DD')
                : '',
              examinationResultDocId: '',
            };

            // ステータスが完治状態でない場合は完治日はrequestに含めない
            if (convertItem.diseaseStatus !== '4') {
              delete convertItem.healingDate;
            }

            return convertItem;
          }),
          contractDiagnosisThreeDeclList: vaccination.map((item) => {
            const convertItem = {
              ...item,
              vaccineDate: item.vaccineDate
                ? moment(item.vaccineDate).format('YYYY-MM-DD')
                : '',
            };

            if (convertItem.vaccineOrNot === 'N') {
              delete convertItem.vaccineDate;
            }
            return convertItem;
          }),
        },
      };

      const response = await this.$axios.post(END_POINT, request);
      if (response.result === 1) {
        await this.$router.push('/solicitation/contracts/before_agree');
      } else {
        await this.$router.push('/errors/system_error');
      }
    },
    async fetchAllDeclarationDisease(context) {
      const { END_POINT } = API_FETCH_DISEASE_CODE_MASTER;

      // bodySiteCode (病気のカテゴリ) は 1 から 15 まである
      const codes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
      const requests = codes.map((code) =>
        this.$axios.post(END_POINT, {
          bodySiteCode: code.toString(),
        })
      );
      const responses = await Promise.all(requests);

      // return [{diagnosisCode: "XXX", diagnosisName: "YYY"}, {diagnosisCode: "XXX", diagnosisName: "YYY"}, ...]
      return responses
        .map((response) => {
          return response.bodySiteDiagnosisCfgList.map((item) => ({
            diagnosisCode: item.diagnosisCode,
            diagnosisName: item.diagnosisName,
          }));
        })
        .flat();
    },
  },
};
