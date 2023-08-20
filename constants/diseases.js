// 01EZTX9M3AWK0ZB16B6KYR56F1

export const DISEASE_MASTER = {
  bodySiteMap: {
    heart: {
      name: '心臓',
      code: '1',
      next: 'respiratory',
    },
    respiratory: {
      name: '呼吸器',
      code: '2',
      next: 'digestive',
    },
    digestive: {
      name: '消化器',
      code: '3',
      next: 'liver',
    },
    liver: {
      name: '肝臓・胆道',
      code: '4',
      next: 'urology',
    },
    urology: {
      name: '腎臓・泌尿器',
      code: '5',
      next: 'endocrine',
    },
    endocrine: {
      name: '内分泌・代謝性疾患',
      code: '6',
      next: 'genital',
    },
    genital: {
      name: '生殖器疾患',
      code: '7',
      next: 'nerve',
    },
    nerve: {
      name: '神経',
      code: '8',
      next: 'born',
    },
    born: {
      name: '骨・関節・筋肉',
      code: '9',
      next: 'ophthalmology',
    },
    ophthalmology: {
      name: '眼',
      code: '10',
      next: 'blood',
    },
    blood: {
      name: '血液',
      code: '11',
      next: 'dermatology',
    },
    dermatology: {
      name: '皮膚・耳',
      code: '12',
      next: 'tumor',
    },
    tumor: {
      name: '腫瘍',
      code: '13',
      next: 'infection',
    },
    infection: {
      name: '感染症',
      code: '14',
      next: 'others',
    },
    others: {
      name: 'その他',
      code: '15',
    },
  },
  diseaseStatus: [
    {
      statusName: '疑いあり・検査を予定',
      statusCode: '1',
    },
    {
      statusName: '治療中（薬・サプリ）',
      statusCode: '2',
    },
    {
      statusName: '疑いあり・検査を予定',
      statusCode: '3',
    },
    {
      statusName: '完治',
      statusCode: '4',
    },
  ],
  treatmentMethod: [
    {
      methodName: '検査',
      methodCode: '1',
    },
    {
      methodName: '注射・点滴',
      methodCode: '2',
    },
    {
      methodName: '処方（薬・サプリ・療法食）',
      methodCode: '3',
    },
    {
      methodName: '入院・手術',
      methodCode: '4',
    },
    {
      methodName: 'その他',
      methodCode: '5',
    },
  ],
  diseaseHistory: [
    {
      name: '1回',
      code: '1',
    },
    {
      name: '2回以上',
      code: '2',
    },
    {
      name: 'いいえ',
      code: '0',
    },
  ],
  otherDiagnosisCode: [323, 325, 327, 329, 331, 333, 336, 338],
};
