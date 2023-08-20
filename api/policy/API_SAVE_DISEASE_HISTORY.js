import { BASE_END_POINT } from '../setting';

export const API_SAVE_DISEASE_HISTORY = {
  END_POINT: `${BASE_END_POINT}/bff/policy/NWEB010`,

  createRequestBody: (params) => {
    return {
      policyId: 563356,
      declarationInfo: {
        contractDiagnosisTwoDeclList: [
          {
            bodySiteCode: '2',
            hasDisease: 'Y',
            diagnosisCode: '002',
            diseaseDate: '2023-02-15',
            diseaseStatus: '2',
            examinationResultDocId: '',
            hasHistory: '0',
            healingDate: '2023-02-15',
            otherDiagnosisDesc: '',
            treatmentMethod: '4',
            otherTreatmentMethod: '',
            diseaseSite: '',
          },
          {
            bodySiteCode: '2',
            hasDisease: 'Y',
            diagnosisCode: '200',
            diseaseDate: '2023-02-15',
            diseaseStatus: '2',
            examinationResultDocId: '',
            hasHistory: '0',
            healingDate: '2023-02-15',
            otherDiagnosisDesc: '',
            treatmentMethod: '4',
            otherTreatmentMethod: '',
            diseaseSite: '',
          },
          {
            bodySiteCode: '2',
            hasDisease: 'Y',
            diagnosisCode: '202',
            diseaseDate: '2023-02-15',
            diseaseStatus: '2',
            examinationResultDocId: '',
            hasHistory: '0',
            healingDate: '2023-02-15',
            otherDiagnosisDesc: '',
            treatmentMethod: '4',
            otherTreatmentMethod: '',
            diseaseSite: '',
          },
          {
            diagnosisCode: '308',
            diseaseDate: '2023-02-15',
            diseaseStatus: '2',
            examinationResultDocId: '',
            hasHistory: '0',
            healingDate: '2023-02-15',
            otherDiagnosisDesc: '',
            treatmentMethod: '4',
            otherTreatmentMethod: '',
            diseaseSite: '',
          },
        ],
        contractDiagnosisThreeDeclList: [
          {
            vaccineOrNot: 'N',
            vaccineCode: '1',
            vaccineDate: '',
          },
        ],
      },
    };
  },
};
