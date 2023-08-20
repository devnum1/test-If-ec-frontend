export const mockExamination = () => {
  return {
    linkdMemberId: null,
    repProductCd: '10100001',
    productCd: '10100001',
    insPolicyBaseDate: '20230612',
    policyNo: null,
    subscriberNo: null,
    checkList: [
      {
        checkDiv: '01',
        checkCondition: {
          baseDate: '20230612',
          petBirthday: '202205',
          diseaseId: null,
          linkdMemberId: null,
          lastnameKanji: null,
          firstnameKanji: null,
          lastnameKana: null,
          firstnameKana: null,
          sexCd: null,
          birthday: null,
        },
      },
    ],
    checkResult: [
      {
        approvalSystemJadge: '01',
        msgID: '',
        msg: '',
      },
    ],
  };
};
