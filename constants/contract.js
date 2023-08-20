// 01EZTX9M3AWK0ZB16B6KYR56F1

export default {
  step_progress: [
    {
      index: '1',
      title: 'うちの子情報',
    },
    {
      index: '2',
      title: 'プラン選択',
    },
    {
      index: '3',
      title: '本人認証',
    },
    {
      index: '4',
      title: '飼い主情報の入力',
    },
    {
      index: '5',
      title: '入力内容の確認',
    },
  ],
  pet_type: {
    DOG: 1,
    CAT: 2,
  },
  pet_sex: {
    MALE: 'M',
    FEMALE: 'F',
  },
  pet_notice_cd01: {
    YES: '01',
    NONE: '02',
  },
  // TODO: pet_notice_cd02 -> pet_notice_illnessに置き換え終わったらpet_notice_cd02は消す
  pet_notice_cd02: {
    YES: '01',
    REPLY_LATER: '02',
    NONE: '03',
  },
  pet_notice_contraception: {
    YES: 'Y',
    NONE: 'N',
  },
  pet_notice_illness: {
    YES: '1',
    NONE: '2',
  },
  // TODO: pet_join_ins -> pet_other_insuranceに置き換え終わったらpet_join_insは消す
  pet_join_ins: {
    NONE: '01',
    YES: '02',
  },
  pet_other_insurance: {
    YES: '1',
    NONE: '2',
  },
  pet_birthday: {
    TRUE: {
      id: '1',
      name: '確定',
    },
    MEASURE: {
      id: '2',
      name: 'なし',
    },
  },
  pet_diagnosis: {
    NO: -1,
    UNKNOWN: 0,
    YES: 1,
  },
  wanna_join: {
    NO: -1,
    YES: 1,
  },
  pet_breed: {
    MIX: 1,
    OTHER_BREED: 2,
  },
  pet_breed_id: {
    MIX: 1,
    OTHER_BREED: 2,
  },
  gender: {
    MALE: {
      id: 'M',
      name: '男性',
    },
    FEMALE: {
      id: 'F',
      name: '女性',
    },
  },
  plan_code: {
    SEVENTY: 'L9999001-01',
    FIFTY: 'L9999001-02',
  },
  plan_rate: {
    SEVENTY: {
      rate: 0.7,
      name: '70%補償',
    },
    FIFTY: {
      rate: 0.5,
      name: '50%補償',
    },
  },
  liability_State_1: 1,
  liability_State_3: 3,
  // TODO: ins_application_status_04 -> proposal_status_81なので、
  // 全ての画面で置き換えが終わったらins_application_status_04は消す。
  proposal_status_80: 80,
  proposal_status_81: 81,
  ins_application_status_04: '04',
  ins_application_status_05: '05',
  ins_application_status_06: '06',
  ins_application_status_07: '07',
  ins_application_status_08: '08',
  approval_system: {
    UNDER_WRITING: '01',
    PERSON_ASSESSMENT: '02',
    ABANDONMENT: '03',
  },
  check_type: {
    CHECK_RULE: '01',
    CHECK_DISEASE: '02',
    CHECK_CONTRACT_SIGNER: '03',
    CHECK_BLACK_LIST: '04',
    CHECK_ANTI_SOCIAL: '05',
    CHECK_DUPLICATE_SIGNER: '06',
  },
  ng_type: {
    TOO_OLD: '01',
    UNDER_30DAYS: '02',
    CONTRACT_DENIAL: '03',
  },
  noti_type: {
    CONTRACT_COMPLETE: '01',
    CONTRACT_FAIL: '02',
  },
  insurance_default: {
    PRODUCT_CD: '10100001',
    EVENT_CD: '100',
  },

  contract_status_03: {
    id: '03',
    name: '契約開始前',
  },
  contract_status_11: {
    id: '11',
    name: '契約開始前',
  },
  contract_status_12: {
    id: '12',
    name: '契約中',
  },
  contract_status_21: {
    id: '21',
    name: '契約終了',
  },
  contract_status_22: {
    id: '22',
    name: '契約終了',
  },
  contract_status_23: {
    id: '23',
    name: '契約終了',
  },
  contract_status_24: {
    id: '24',
    name: '契約終了',
  },
  contract_status_25: {
    id: '25',
    name: '契約終了',
  },
  contract_status_26: {
    id: '26',
    name: '契約終了',
  },

  ins_contract_term: {
    div_01: '01',
    div_02: '02',
    div_03: '03',
    div_04: '04',
    div_05: '05',
  },
  notice_cd: {
    notice_cd01: {
      id: '01',
      selectFlg_Y: 'Y',
    },
    notice_cd03: {
      id: '03',
      selectFlg_Y: 'Y',
    },
  },
  WEBCAS_URL: process.env.WEBCAS_URL,
  INSURANCE_CLAIM_URL: process.env.INSURANCE_CLAIM_URL,
  PET_IMAGE_FORMAT: '.jpg',
  COVER_PROPERTY_01: '201000001',
  COVER_PROPERTY_02: '201000002',
  COVER_PROPERTY_03: '201000003',
  insAgentNo: process.env.INS_AGENT_NO,
  endpoints: {
    contractInfo: '/bff/policy/NWEB012',
  },
};
