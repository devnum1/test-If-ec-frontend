import { BASE_END_POINT } from '../setting';

export const API_REGIST_CLAIM = {
  // 請求登録API
  END_POINT: `${BASE_END_POINT}/bff/claim/NWEB024`,

  /**
   * @param {Object} payload
   * @param {number} payload.policyId
   * @param {string} payload.petImageUrl
   * @param {string} payload.petImageName
   * @param {string} [payload.vaccinationCertificateUrl]
   * @param {string} [payload.vaccinationCertificateName]
   * @param {Array} payload.diagnosisDetails
   * @param {string} payload.diagnosisDetails[].consultaionIndi
   * @param {string} payload.diagnosisDetails[].hospitalIndi
   * @param {string} payload.diagnosisDetails[].surgeryIndi
   * @param {string} payload.diagnosisDetails[].over80Thousand
   * @param {string} payload.diagnosisDetails[].diagnosisDate
   * @param {string} payload.diagnosisDetails[].hospitalName
   * @param {string} payload.diagnosisDetails[].hospitalTel
   * @param {string} payload.diagnosisDetails[].diagnosisName
   * @param {string} payload.diagnosisDetails[].diagnosisRegion
   * @param {string} payload.diagnosisDetails[].accidentTime
   * @param {string} payload.diagnosisDetails[].treatProcess
   * @param {number} payload.diagnosisDetails[].symptomsStatus
   * @param {string} payload.diagnosisDetails[].symptomsStill
   * @param {string} payload.diagnosisDetails[].sameSymptomsBf
   * @param {number} payload.diagnosisDetails[].seenDoctorThisTime
   * @param {string} payload.diagnosisDetails[].inHospitalTreatItems
   * @param {string} payload.diagnosisDetails[].inHospitalTreatContent
   * @param {number} payload.diagnosisDetails[].takeMedicine
   * @param {string} payload.diagnosisDetails[].medicineName
   * @param {number} payload.diagnosisDetails[].takeSupplementMedicine
   * @param {string} payload.diagnosisDetails[].supplementMedicineName
   * @param {number} payload.diagnosisDetails[].takePrescription
   * @param {string} payload.diagnosisDetails[].prescriptionQuantity
   * @param {number} payload.diagnosisDetails[].takePrevnetMedicine
   * @param {number} payload.diagnosisDetails[].takeCleanerPrescription
   * @param {string} payload.diagnosisDetails[].requestComment
   * @param {string} payload.diagnosisDetails[].medicalBillUrl
   * @param {string} payload.diagnosisDetails[].medicalBillName
   * @param {string} [payload.diagnosisDetails[].inspectionResultSheetUrl]
   * @param {string} [payload.diagnosisDetails[].inspectionResultSheetName]
   * @param {string} payload.diagnosisDetails[].medicalCertificateUrl
   * @param {string} payload.diagnosisDetails[].medicalCertificateName
   * @param {string} payload.diagnosisDetails[].deathDate
   * @param {string} payload.diagnosisDetails[].continueCharedToUs
   */

  getRequestBody: (payload) => {
    const {
      policyId,
      petImageUrl,
      petImageName,
      vaccinationCertificateUrl,
      vaccinationCertificateName,
      diagnosisDetails,
    } = payload;

    const requectDocList = [
      {
        docType: 1,
        docUrl: petImageUrl,
        docName: petImageName || 'ペット画像',
      },
    ];

    if (vaccinationCertificateUrl) {
      requectDocList.push({
        docType: 2,
        docUrl: vaccinationCertificateUrl,
        docName: vaccinationCertificateName || '混合ワクチン接種証明書',
      });
    }

    const diagnosisDetailList = diagnosisDetails.map((diagnosisDetail) => {
      const docList = [
        {
          docType: 3,
          docUrl: diagnosisDetail.medicalBillUrl,
          docName: diagnosisDetail.medicalBillName || '診療明細',
        },
      ];

      if (diagnosisDetail.inspectionResultSheetUrl) {
        docList.push({
          docType: 4,
          docUrl: diagnosisDetail.inspectionResultSheetUrl,
          docName: diagnosisDetail.inspectionResultSheetName || '検査結果表',
        });
      }

      docList.push({
        docType: 5,
        docUrl: diagnosisDetail.medicalCertificateUrl,
        docName: diagnosisDetail.medicalCertificateName || '診断書',
      });

      return {
        consultaionIndi: diagnosisDetail.consultaionIndi,
        hospitalIndi: diagnosisDetail.hospitalIndi,
        surgeryIndi: diagnosisDetail.surgeryIndi,
        over80Thousand: diagnosisDetail.over80Thousand,
        diagnosisDate: diagnosisDetail.diagnosisDate,
        hospitalName: diagnosisDetail.hospitalName,
        hospitalTel: diagnosisDetail.hospitalTel,
        diagnosisName: diagnosisDetail.diagnosisName,
        diagnosisRegion: diagnosisDetail.diagnosisRegion,
        accidentTime: diagnosisDetail.accidentTime,
        treatProcess: diagnosisDetail.treatProcess,
        symptomsStatus: diagnosisDetail.symptomsStatus,
        symptomsStill: diagnosisDetail.symptomsStill,
        sameSymptomsBf: diagnosisDetail.sameSymptomsBf,
        seenDoctorThisTime: diagnosisDetail.seenDoctorThisTime,
        inHospitalTreatItems: diagnosisDetail.inHospitalTreatItems,
        inHospitalTreatContent: diagnosisDetail.inHospitalTreatContent,
        takeMedicine: diagnosisDetail.takeMedicine,
        medicineName: diagnosisDetail.medicineName,
        takeSupplementMedicine: diagnosisDetail.takeSupplementMedicine,
        supplementMedicineName: diagnosisDetail.supplementMedicineName,
        takePrescription: diagnosisDetail.takePrescription,
        prescriptionQuantity: diagnosisDetail.prescriptionQuantity,
        takePrevnetMedicine: diagnosisDetail.takePrevnetMedicine,
        takeCleanerPrescription: diagnosisDetail.takeCleanerPrescription,
        requestComment: diagnosisDetail.requestComment,
        requectDocList: docList,
        deathDate: diagnosisDetail.deathDate,
        continueCharedToUs: diagnosisDetail.continueCharedToUs,
      };
    });

    return {
      policyId,
      requectDocList,
      diagnosisDetailList,
    };
  },
};
