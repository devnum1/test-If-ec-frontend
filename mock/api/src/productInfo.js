export const mockProductInfo = () => {
  return {
    eventCd: '100',
    productCd: '10100001',
    insPolicyBaseDate: '20230612',
    productInfo: {
      eventCd: '100',
      productCd: '10100001',
      productNm: {
        propVal: 'わんデイズ・にゃんデイズ',
        propDispNm: 'わんデイズ・にゃんデイズ',
      },
      productTag: {
        propVal: 'PT0001',
        propDispNm: 'PT0001',
      },
      repProductCd: {
        propVal: '10100001',
        propDispNm: '10100001',
      },
      compensRate: [
        {
          propVal: 0.5,
          propDispNm: '50%補償',
        },
        {
          propVal: 0.7,
          propDispNm: '70%補償',
        },
      ],
      insDateFrom: '20230612',
      insTimeFrom: [
        {
          propVal: '000000',
          propDispNm: '0時',
        },
      ],
      insDateTo: '20240611',
      insTimeTo: [
        {
          propVal: '240000',
          propDispNm: '24時',
        },
      ],
      insTerm: [
        {
          propVal: 'Y001',
          propDispNm: '1年',
        },
      ],
      autoContinue: {
        propVal: 'Y',
        propDispNm: '継続',
      },
      paymentCd: [
        {
          propVal: '01',
          propDispNm: 'クレジットカード払',
        },
      ],
      payTimes: [
        {
          propVal: '12',
          propDispNm: '月払',
        },
      ],
      gracePeriodType: {
        propVal: '02',
        propDispNm: '応当日',
      },
      gracePeriod: {
        propVal: 'M002',
        propDispNm: '翌々月',
      },
      frontBeforeStartCancelDiv: {
        propVal: 'N',
        propDispNm: '否',
      },
      insPolicyBaseDateDiv: {
        propVal: '02',
        propDispNm: '保険始期日',
      },
      contractAddInfo: null,
      productProperty: {
        displayGroup: {
          propVal: null,
          propDispNm: null,
        },
        fnpBackOfficeInsClaim: {
          propVal: '10100001_insclaim.html',
          propDispNm: '10100001_insclaim.html',
        },
        fnpBackOfficeNotice: {
          propVal: '10100001_notice.html',
          propDispNm: '10100001_notice.html',
        },
        fnpBackOfficeInsCoverage: {
          propVal: '10100001_inscoverage.html',
          propDispNm: '10100001_inscoverage.html',
        },
        fnpBackOfficeInsCoverageForList: {
          propVal: '10100001_inscoverageforlist.html',
          propDispNm: '10100001_inscoverageforlist.html',
        },
      },
      coverProperty: [
        {
          coverCd: '201000001',
          coverName: {
            propVal: '入院',
            propDispNm: '入院',
          },
          coverType: {
            propVal: '01',
            propDispNm: '基本担保',
          },
          insAmount: [
            {
              propVal: 600000,
              propDispNm: '600000',
            },
          ],
          disclaimerTerm: {
            propVal: null,
            propDispNm: null,
          },
          displayFlg: {
            propVal: 'Y',
            propDispNm: 'Y',
          },
          displayText: {
            propVal: '入院',
            propDispNm: '入院',
          },
          displayGroup: {
            propVal: null,
            propDispNm: null,
          },
          displayOrder: {
            propVal: 10,
            propDispNm: '10',
          },
          displayAbbreviation: {
            propVal: '入院',
            propDispNm: '入院',
          },
          insBenefitsCd: {
            propVal: '00',
            propDispNm: '限度額',
          },
          compensRange: {
            propVal: '01',
            propDispNm: '保険期間',
          },
          compensUnit: {
            propVal: null,
            propDispNm: null,
          },
          compensLimited: {
            propVal: null,
            propDispNm: null,
          },
          paymentLimitNotIncluded: {
            propVal: null,
            propDispNm: null,
          },
          accidentPointDisplayPattern: {
            propVal: '01',
            propDispNm: '表示なし',
          },
          compensDiv: {
            propVal: '03',
            propDispNm: '費用・その他',
          },
        },
        {
          coverCd: '201000002',
          coverName: {
            propVal: '通院',
            propDispNm: '通院',
          },
          coverType: {
            propVal: '01',
            propDispNm: '基本担保',
          },
          insAmount: [
            {
              propVal: 300000,
              propDispNm: '300000',
            },
          ],
          disclaimerTerm: {
            propVal: null,
            propDispNm: null,
          },
          displayFlg: {
            propVal: 'Y',
            propDispNm: 'Y',
          },
          displayText: {
            propVal: '通院',
            propDispNm: '通院',
          },
          displayGroup: {
            propVal: null,
            propDispNm: null,
          },
          displayOrder: {
            propVal: 20,
            propDispNm: '20',
          },
          displayAbbreviation: {
            propVal: '通院',
            propDispNm: '通院',
          },
          insBenefitsCd: {
            propVal: '00',
            propDispNm: '限度額',
          },
          compensRange: {
            propVal: '01',
            propDispNm: '保険期間',
          },
          compensUnit: {
            propVal: null,
            propDispNm: null,
          },
          compensLimited: {
            propVal: null,
            propDispNm: null,
          },
          paymentLimitNotIncluded: {
            propVal: null,
            propDispNm: null,
          },
          accidentPointDisplayPattern: {
            propVal: '01',
            propDispNm: '表示なし',
          },
          compensDiv: {
            propVal: '03',
            propDispNm: '費用・その他',
          },
        },
        {
          coverCd: '201000003',
          coverName: {
            propVal: '手術',
            propDispNm: '手術',
          },
          coverType: {
            propVal: '01',
            propDispNm: '基本担保',
          },
          insAmount: [
            {
              propVal: 300000,
              propDispNm: '300000',
            },
          ],
          disclaimerTerm: {
            propVal: null,
            propDispNm: null,
          },
          displayFlg: {
            propVal: 'Y',
            propDispNm: 'Y',
          },
          displayText: {
            propVal: '手術',
            propDispNm: '手術',
          },
          displayGroup: {
            propVal: null,
            propDispNm: null,
          },
          displayOrder: {
            propVal: 30,
            propDispNm: '30',
          },
          displayAbbreviation: {
            propVal: '手術',
            propDispNm: '手術',
          },
          insBenefitsCd: {
            propVal: '00',
            propDispNm: '限度額',
          },
          compensRange: {
            propVal: '01',
            propDispNm: '保険期間',
          },
          compensUnit: {
            propVal: null,
            propDispNm: null,
          },
          compensLimited: {
            propVal: null,
            propDispNm: null,
          },
          paymentLimitNotIncluded: {
            propVal: null,
            propDispNm: null,
          },
          accidentPointDisplayPattern: {
            propVal: '01',
            propDispNm: '表示なし',
          },
          compensDiv: {
            propVal: '03',
            propDispNm: '費用・その他',
          },
        },
      ],
    },
    insTargetProperty: {
      petType: [
        {
          propVal: '01',
          propDispNm: '犬',
          petBreed: [
            {
              propVal: '001',
              propDispNm: 'ミックス（雑種）',
            },
            {
              propVal: '004',
              propDispNm: 'アーフェンピンシャー',
            },
            {
              propVal: '102',
              propDispNm: 'アイリッシュ・ウルフハウンド',
            },
            {
              propVal: '103',
              propDispNm: 'アイリッシュ・セター',
            },
            {
              propVal: '104',
              propDispNm: '秋田',
            },
            {
              propVal: '105',
              propDispNm: 'アフガン・ハウンド',
            },
            {
              propVal: '046',
              propDispNm: 'アメリカン・コッカー・スパニエル',
            },
            {
              propVal: '047',
              propDispNm: 'アメリカン・スタッフォードシャー・テリア',
            },
            {
              propVal: '106',
              propDispNm: 'アメリカン・ピット・ブルテリア',
            },
            {
              propVal: '048',
              propDispNm: 'アメリカン・フォックスハウンド',
            },
            {
              propVal: '107',
              propDispNm: 'アラスカン・マラミュート',
            },
            {
              propVal: '005',
              propDispNm: 'イタリアン・グレーハウンド',
            },
            {
              propVal: '049',
              propDispNm: 'イングリッシュ・コッカー・スパニエル',
            },
            {
              propVal: '050',
              propDispNm: 'イングリッシュ・スプリンガー・スパニエル',
            },
            {
              propVal: '108',
              propDispNm: 'イングリッシュ・セター',
            },
            {
              propVal: '109',
              propDispNm: 'イングリッシュ・ポインター',
            },
            {
              propVal: '051',
              propDispNm: 'ウィペット',
            },
            {
              propVal: '052',
              propDispNm: 'ウエスト・ハイランド・ホワイト・テリア',
            },
            {
              propVal: '053',
              propDispNm: 'ウェルシュ・コーギー・カーディガン',
            },
            {
              propVal: '054',
              propDispNm: 'ウェルシュ・コーギー・ペンブローク',
            },
            {
              propVal: '055',
              propDispNm: 'ウェルシュ・スプリンガー・スパニエル',
            },
            {
              propVal: '056',
              propDispNm: 'ウェルシュ・テリア',
            },
            {
              propVal: '057',
              propDispNm: 'エアデール・テリア',
            },
            {
              propVal: '058',
              propDispNm: 'オーストラリアン・キャトル・ドッグ',
            },
            {
              propVal: '059',
              propDispNm: 'オーストラリアン・ケルピー',
            },
            {
              propVal: '060',
              propDispNm: 'オーストラリアン・シェパード',
            },
            {
              propVal: '006',
              propDispNm: 'オーストラリアン・シルキー・テリア',
            },
            {
              propVal: '007',
              propDispNm: 'オーストラリアン・テリア',
            },
            {
              propVal: '110',
              propDispNm: 'オールド・イングリッシュ・シープドッグ',
            },
            {
              propVal: '111',
              propDispNm: 'カーリーコーテッド・レトリーバー',
            },
            {
              propVal: '061',
              propDispNm: '甲斐',
            },
            {
              propVal: '008',
              propDispNm: 'カニーンヘン・ダックスフンド',
            },
            {
              propVal: '062',
              propDispNm: 'キースホンド/ジャーマン・ウルフスピッツ',
            },
            {
              propVal: '063',
              propDispNm: '紀州',
            },
            {
              propVal: '009',
              propDispNm: 'キャバリア・キング・チャールズ・スパニエル',
            },
            {
              propVal: '010',
              propDispNm: 'キング・チャールズ・スパニエル',
            },
            {
              propVal: '112',
              propDispNm: 'グレート・デーン',
            },
            {
              propVal: '113',
              propDispNm: 'グレート・ピレニーズ',
            },
            {
              propVal: '114',
              propDispNm: 'グレーハウンド',
            },
            {
              propVal: '011',
              propDispNm: 'ケアーン・テリア',
            },
            {
              propVal: '064',
              propDispNm: 'ケリー・ブルー・テリア',
            },
            {
              propVal: '065',
              propDispNm: 'コーイケルホンディエ',
            },
            {
              propVal: '115',
              propDispNm: 'コーカサス・シープドッグ',
            },
            {
              propVal: '116',
              propDispNm: 'ゴードン・セター',
            },
            {
              propVal: '117',
              propDispNm: 'ゴールデン・レトリーバー',
            },
            {
              propVal: '066',
              propDispNm: 'コリア・ジンドー・ドッグ',
            },
            {
              propVal: '067',
              propDispNm: 'サモエド',
            },
            {
              propVal: '068',
              propDispNm: 'サルーキ',
            },
            {
              propVal: '012',
              propDispNm: 'シー・ズー',
            },
            {
              propVal: '013',
              propDispNm: 'シーリハム・テリア',
            },
            {
              propVal: '069',
              propDispNm: 'シェットランド・シープドッグ',
            },
            {
              propVal: '070',
              propDispNm: '四国',
            },
            {
              propVal: '071',
              propDispNm: '柴（小柴・豆柴も含む）',
            },
            {
              propVal: '119',
              propDispNm: 'シベリアン・ハスキー',
            },
            {
              propVal: '072',
              propDispNm: 'シャー・ペイ',
            },
            {
              propVal: '120',
              propDispNm: 'ジャーマン・シェパード・ドッグ',
            },
            {
              propVal: '073',
              propDispNm: 'ジャーマン・ショートヘアード・ポインター',
            },
            {
              propVal: '074',
              propDispNm: 'ジャーマン・ワイアーヘアード・ポインター',
            },
            {
              propVal: '121',
              propDispNm: 'ジャイアント・シュナウザー',
            },
            {
              propVal: '014',
              propDispNm: 'ジャック・ラッセル・テリア',
            },
            {
              propVal: '015',
              propDispNm: 'スカイ・テリア',
            },
            {
              propVal: '016',
              propDispNm: 'スキッパーキ',
            },
            {
              propVal: '075',
              propDispNm: 'スコティッシュ・テリア',
            },
            {
              propVal: '076',
              propDispNm: 'スタッフォードシャー・ブル・テリア',
            },
            {
              propVal: '077',
              propDispNm: 'スタンダード・シュナウザー',
            },
            {
              propVal: '078',
              propDispNm: 'スタンダード・ダックスフンド',
            },
            {
              propVal: '079',
              propDispNm: 'スタンダード・プードル',
            },
            {
              propVal: '122',
              propDispNm: 'セント・バーナード',
            },
            {
              propVal: '123',
              propDispNm: 'ダルメシアン',
            },
            {
              propVal: '017',
              propDispNm: 'ダンディ・ディンモント・テリア',
            },
            {
              propVal: '124',
              propDispNm: 'チェサピーク・ベイ・レトリーバー',
            },
            {
              propVal: '018',
              propDispNm: 'チベタン・スパニエル',
            },
            {
              propVal: '080',
              propDispNm: 'チベタン・テリア',
            },
            {
              propVal: '125',
              propDispNm: 'チベタン・マスティフ',
            },
            {
              propVal: '019',
              propDispNm: 'チャイニーズ・クレステッド・ドッグ',
            },
            {
              propVal: '081',
              propDispNm: 'チャウ・チャウ',
            },
            {
              propVal: '020',
              propDispNm: 'チワワ',
            },
            {
              propVal: '021',
              propDispNm: '狆（ちん）',
            },
            {
              propVal: '022',
              propDispNm: 'トイ・プードル',
            },
            {
              propVal: '023',
              propDispNm: 'トイ・マンチェスター・テリア',
            },
            {
              propVal: '126',
              propDispNm: 'ドーベルマン',
            },
            {
              propVal: '127',
              propDispNm: 'ドゴ・アルヘンティーノ',
            },
            {
              propVal: '128',
              propDispNm: '土佐',
            },
            {
              propVal: '129',
              propDispNm: 'ナポリタン・マスティフ',
            },
            {
              propVal: '082',
              propDispNm: '日本スピッツ',
            },
            {
              propVal: '024',
              propDispNm: '日本テリア',
            },
            {
              propVal: '130',
              propDispNm: 'ニューファンドランド',
            },
            {
              propVal: '025',
              propDispNm: 'ノーフォーク・テリア',
            },
            {
              propVal: '026',
              propDispNm: 'ノーリッチ・テリア',
            },
            {
              propVal: '131',
              propDispNm: 'バーニーズ・マウンテン・ドッグ',
            },
            {
              propVal: '027',
              propDispNm: 'パグ',
            },
            {
              propVal: '083',
              propDispNm: 'バセット・ハウンド',
            },
            {
              propVal: '084',
              propDispNm: 'バセンジー',
            },
            {
              propVal: '028',
              propDispNm: 'パピヨン',
            },
            {
              propVal: '132',
              propDispNm: 'ハリア',
            },
            {
              propVal: '085',
              propDispNm: 'ビアデッド・コリー',
            },
            {
              propVal: '086',
              propDispNm: 'ビーグル',
            },
            {
              propVal: '029',
              propDispNm: 'ビション・フリーゼ',
            },
            {
              propVal: '133',
              propDispNm: 'ブービエ・デ・フランダース',
            },
            {
              propVal: '087',
              propDispNm: 'プーミー',
            },
            {
              propVal: '088',
              propDispNm: 'プーリー',
            },
            {
              propVal: '089',
              propDispNm: 'プチ・バセット・グリフォン・バンデーン',
            },
            {
              propVal: '030',
              propDispNm: 'プチ・ブラバンソン',
            },
            {
              propVal: '134',
              propDispNm: 'フラットコーテッド・レトリーバー',
            },
            {
              propVal: '090',
              propDispNm: 'ブリタニー・スパニエル',
            },
            {
              propVal: '031',
              propDispNm: 'ブリュッセル・グリフォン',
            },
            {
              propVal: '091',
              propDispNm: 'ブル・テリア',
            },
            {
              propVal: '135',
              propDispNm: 'ブルドッグ',
            },
            {
              propVal: '136',
              propDispNm: 'ブルマスティフ',
            },
            {
              propVal: '092',
              propDispNm: 'フレンチ・ブルドッグ',
            },
            {
              propVal: '032',
              propDispNm: 'ペキニーズ',
            },
            {
              propVal: '093',
              propDispNm: 'ベドリントン・テリア',
            },
            {
              propVal: '137',
              propDispNm: 'ベルジアン・シェパード・ドッグ',
            },
            {
              propVal: '094',
              propDispNm: 'ボーダー・コリー',
            },
            {
              propVal: '033',
              propDispNm: 'ボーダー・テリア',
            },
            {
              propVal: '095',
              propDispNm: 'ポーチュギーズ・ウォーター・ドッグ',
            },
            {
              propVal: '138',
              propDispNm: 'ボクサー',
            },
            {
              propVal: '096',
              propDispNm: 'ボストン・テリア',
            },
            {
              propVal: '097',
              propDispNm: '北海道',
            },
            {
              propVal: '034',
              propDispNm: 'ポメラニアン',
            },
            {
              propVal: '098',
              propDispNm: 'ポリッシュ・ローランド・シープドッグ',
            },
            {
              propVal: '139',
              propDispNm: 'ボルゾイ',
            },
            {
              propVal: '035',
              propDispNm: 'ボロニーズ',
            },
            {
              propVal: '140',
              propDispNm: 'ホワイト・スイス・シェパード・ドッグ',
            },
            {
              propVal: '141',
              propDispNm: 'マスティフ',
            },
            {
              propVal: '036',
              propDispNm: 'マルチーズ',
            },
            {
              propVal: '037',
              propDispNm: 'マンチェスター・テリア',
            },
            {
              propVal: '099',
              propDispNm: 'ミディアム・プードル',
            },
            {
              propVal: '100',
              propDispNm: 'ミニ・オーストラリアン・ブルドッグ',
            },
            {
              propVal: '038',
              propDispNm: 'ミニチュア・シュナウザー',
            },
            {
              propVal: '039',
              propDispNm: 'ミニチュア・ダックスフンド',
            },
            {
              propVal: '040',
              propDispNm: 'ミニチュア・ピンシャー',
            },
            {
              propVal: '041',
              propDispNm: 'ミニチュア・プードル',
            },
            {
              propVal: '101',
              propDispNm: 'ミニチュア・ブル・テリア',
            },
            {
              propVal: '042',
              propDispNm: 'ヨークシャー・テリア',
            },
            {
              propVal: '142',
              propDispNm: 'ラージ・ミュンスターレンダー',
            },
            {
              propVal: '043',
              propDispNm: 'ラサ・アプソ',
            },
            {
              propVal: '118',
              propDispNm: 'ラフ・コリー',
            },
            {
              propVal: '143',
              propDispNm: 'ラブラドール・レトリーバー',
            },
            {
              propVal: '044',
              propDispNm: 'レークランド・テリア',
            },
            {
              propVal: '144',
              propDispNm: 'レオンベルガー',
            },
            {
              propVal: '145',
              propDispNm: 'ローデシアン・リッジバック',
            },
            {
              propVal: '146',
              propDispNm: 'ロットワイラー',
            },
            {
              propVal: '045',
              propDispNm: 'ワイアー・フォックス・テリア',
            },
            {
              propVal: '147',
              propDispNm: 'ワイマラナー',
            },
            {
              propVal: '002',
              propDispNm: 'その他犬種',
            },
          ],
        },
        {
          propVal: '02',
          propDispNm: '猫',
          petBreed: [],
        },
      ],
      petSexCd: [
        {
          propVal: '01',
          propDispNm: '男の子',
        },
        {
          propVal: '02',
          propDispNm: '女の子',
        },
      ],
      petBirthdayDiv: [
        {
          propVal: '01',
          propDispNm: '確定',
        },
        {
          propVal: '02',
          propDispNm: '推定',
        },
      ],
      petInsJoinFlg: [
        {
          propVal: '01',
          propDispNm: '加入していない',
        },
        {
          propVal: '02',
          propDispNm: '加入している',
        },
      ],
    },
    noticeInfo: [
      {
        noticeCd: '01',
        noticeContent: {
          notice: '去勢・避妊',
          selection: [
            {
              id: '01',
              name: 'あり',
              category: '',
              freeTextDisplayDiv: '0',
            },
            {
              id: '02',
              name: 'なし',
              category: '',
              freeTextDisplayDiv: '0',
            },
          ],
          detail: [],
        },
      },
      {
        noticeCd: '02',
        noticeContent: {
          notice: '以下の病気があると診断されたことはありますか？',
          selection: [
            {
              id: '01',
              name: 'はい',
              category: '',
              freeTextDisplayDiv: '0',
            },
            {
              id: '02',
              name: 'わからない',
              category: '',
              freeTextDisplayDiv: '0',
            },
            {
              id: '03',
              name: 'いいえ',
              category: '',
              freeTextDisplayDiv: '0',
            },
          ],
          detail: [
            {
              id: '001',
              name: '心疾患・発作',
              category: 'A',
              group: '',
            },
            {
              id: '002',
              name: '犬糸状虫症（フィラリア症）',
              category: 'A',
              group: '',
            },
            {
              id: '003',
              name: '気管虚脱',
              category: 'A',
              group: '',
            },
            {
              id: '004',
              name: '横隔膜ヘルニア（先天性）',
              category: 'A',
              group: '',
            },
            {
              id: '012',
              name: '慢性膵炎',
              category: 'A',
              group: '',
            },
            {
              id: '011',
              name: '膵外分泌不全',
              category: 'A',
              group: '',
            },
            {
              id: '005',
              name: '巨大結腸症',
              category: 'A',
              group: '',
            },
            {
              id: '006',
              name: '巨大食道症（食道拡張症）',
              category: 'A',
              group: '',
            },
            {
              id: '007',
              name: '肝不全（肝硬変・肝線維症を含む）',
              category: 'A',
              group: '',
            },
            {
              id: '008',
              name: '慢性肝炎',
              category: 'A',
              group: '',
            },
            {
              id: '009',
              name: '門脈シャント',
              category: 'A',
              group: '',
            },
            {
              id: '010',
              name: '門脈低形成',
              category: 'A',
              group: '',
            },
            {
              id: '013',
              name: '腎疾患（腎炎、腎不全、腎結石など）',
              category: 'A',
              group: '',
            },
            {
              id: '015',
              name: '水頭症',
              category: 'A',
              group: '',
            },
            {
              id: '016',
              name: '脳炎・脳神経炎',
              category: 'A',
              group: '',
            },
            {
              id: '018',
              name: 'てんかん・発作（特発性てんかんを含む）',
              category: 'A',
              group: '',
            },
            {
              id: '021',
              name: '免疫介在性溶血性貧血（IMHA）',
              category: 'A',
              group: '',
            },
            {
              id: '099',
              name: '再生不良性貧血',
              category: 'A',
              group: '',
            },
            {
              id: '022',
              name: '免疫介在性血小板減少症',
              category: 'A',
              group: '',
            },
            {
              id: '031',
              name: '自己免疫性疾患（多発性関節炎・リウマチ・天疱瘡・全身性エリテマトーデスなど）',
              category: 'A',
              group: '',
            },
            {
              id: '023',
              name: '甲状腺疾患',
              category: 'A',
              group: '',
            },
            {
              id: '024',
              name: '副腎皮質機能亢進症（クッシング症候群）',
              category: 'A',
              group: '',
            },
            {
              id: '025',
              name: '副腎皮質機能低下症（アジソン病）',
              category: 'A',
              group: '',
            },
            {
              id: '026',
              name: '糖尿病',
              category: 'A',
              group: '',
            },
            {
              id: '027',
              name: '猫白血病ウイルス感染症（FeLV）',
              category: 'A',
              group: '',
            },
            {
              id: '028',
              name: '猫免疫不全ウイルス感染症（猫エイズ・FIV）',
              category: 'A',
              group: '',
            },
            {
              id: '029',
              name: '猫伝染性腹膜炎（FIP）',
              category: 'A',
              group: '',
            },
            {
              id: '030',
              name: '悪性腫瘍・がん（肥満細胞腫を含む）',
              category: 'A',
              group: '',
            },
            {
              id: '053',
              name: 'そけいヘルニア（左側）',
              category: 'B',
              group: '',
            },
            {
              id: '054',
              name: 'そけいヘルニア（右側）',
              category: 'B',
              group: '',
            },
            {
              id: '055',
              name: '臍ヘルニア（でべそを含む）',
              category: 'B',
              group: '',
            },
            {
              id: '056',
              name: '会陰ヘルニア（左側）',
              category: 'B',
              group: '',
            },
            {
              id: '057',
              name: '会陰ヘルニア（右側）',
              category: 'B',
              group: '',
            },
            {
              id: '059',
              name: '炎症性腸疾患（IBD）',
              category: 'B',
              group: '',
            },
            {
              id: '100',
              name: 'リンパ管拡張症',
              category: 'B',
              group: '',
            },
            {
              id: '101',
              name: '膀胱炎（血尿・頻尿など）',
              category: 'B',
              group: '',
            },
            {
              id: '102',
              name: '尿石症（尿管、膀胱、尿道）',
              category: 'B',
              group: '',
            },
            {
              id: '058',
              name: '尿結晶症（ストルバイト・シュウ酸カルシウムなど）',
              category: 'B',
              group: '',
            },
            {
              id: '038',
              name: '椎間板ヘルニア',
              category: 'B',
              group: '',
            },
            {
              id: '103',
              name: '猫コロナウイルス感染症　※猫伝染性腹膜炎（FIP）ではないが「抗体価が高い」場合を含みます。',
              category: 'B',
              group: '',
            },
            {
              id: '048',
              name: '良性腫瘍・腫瘤（できもの・しこり・いぼ）',
              category: 'B',
              group: '',
            },
            {
              id: '019',
              name: '緑内障',
              category: 'B',
              group: '',
            },
            {
              id: '020',
              name: '白内障',
              category: 'B',
              group: '',
            },
            {
              id: '042',
              name: 'ドライアイ',
              category: 'B',
              group: '',
            },
            {
              id: '044',
              name: 'チェリーアイ（左眼）',
              category: 'B',
              group: '',
            },
            {
              id: '045',
              name: 'チェリーアイ（右眼）',
              category: 'B',
              group: '',
            },
            {
              id: '032',
              name: '膝蓋骨脱臼（パテラ）　※「膝が外れやすい、ゆるい」等と獣医師から言われた場合も含みます',
              category: 'B',
              group: '',
            },
            {
              id: '034',
              name: '股関節形成不全',
              category: 'B',
              group: '',
            },
            {
              id: '036',
              name: '大腿骨頭壊死症（レッグペルテス）',
              category: 'B',
              group: '',
            },
            {
              id: '039',
              name: '骨折（脚部）',
              category: 'B',
              group: '',
            },
            {
              id: '040',
              name: '骨折（脚部以外）',
              category: 'B',
              group: '',
            },
            {
              id: '041',
              name: 'じん帯断裂・損傷',
              category: 'B',
              group: '',
            },
            {
              id: '046',
              name: '停留睾丸・潜在精巣',
              category: 'B',
              group: '',
            },
            {
              id: '050',
              name: '再発性または慢性の外耳炎',
              category: 'B',
              group: '',
            },
            {
              id: '052',
              name: '再発性または慢性の皮膚疾患（膿皮症、疥癬、脂漏症など）',
              category: 'B',
              group: '',
            },
            {
              id: '104',
              name: 'ケンネルコフ（犬伝染性気管気管支炎）',
              category: 'B',
              group: '',
            },
            {
              id: '105',
              name: '鼻炎・気管支炎・肺炎',
              category: 'B',
              group: '',
            },
            {
              id: '106',
              name: '短頭種気道症候群（外鼻腔狭窄、軟口蓋過長症など）',
              category: 'B',
              group: '',
            },
            {
              id: '107',
              name: '肺水腫',
              category: 'B',
              group: '',
            },
            {
              id: '108',
              name: '気胸',
              category: 'B',
              group: '',
            },
            {
              id: '109',
              name: '乳び胸',
              category: 'B',
              group: '',
            },
            {
              id: '110',
              name: '口蓋裂',
              category: 'B',
              group: '',
            },
            {
              id: '060',
              name: '再発性または慢性の消化器疾患（下痢・嘔吐など）',
              category: 'B',
              group: '',
            },
            {
              id: '061',
              name: '胃炎・胃潰瘍',
              category: 'B',
              group: '',
            },
            {
              id: '062',
              name: '胃拡張捻転症候群',
              category: 'B',
              group: '',
            },
            {
              id: '063',
              name: '食物アレルギー',
              category: 'B',
              group: '',
            },
            {
              id: '064',
              name: '消化管寄生虫性腸症（回虫、コクシジウム、条虫、ジアルジアなど）',
              category: 'B',
              group: '',
            },
            {
              id: '065',
              name: '細菌性腸症（カンピロバクター、クロストリジウムなど）',
              category: 'B',
              group: '',
            },
            {
              id: '066',
              name: '胆泥症・胆石症',
              category: 'B',
              group: '',
            },
            {
              id: '067',
              name: '胆のう粘液嚢腫',
              category: 'B',
              group: '',
            },
            {
              id: '068',
              name: '胆のう炎・胆管炎',
              category: 'B',
              group: '',
            },
            {
              id: '069',
              name: '異所性尿管',
              category: 'B',
              group: '',
            },
            {
              id: '070',
              name: '環軸不安定症・環軸亜脱臼',
              category: 'B',
              group: '',
            },
            {
              id: '071',
              name: '肝性脳症',
              category: 'B',
              group: '',
            },
            {
              id: '072',
              name: 'ホルネル症候群',
              category: 'B',
              group: '',
            },
            {
              id: '073',
              name: '馬尾症候群',
              category: 'B',
              group: '',
            },
            {
              id: '074',
              name: '変性性脊髄症',
              category: 'B',
              group: '',
            },
            {
              id: '075',
              name: '前庭疾患',
              category: 'B',
              group: '',
            },
            {
              id: '076',
              name: 'バベシア症',
              category: 'B',
              group: '',
            },
            {
              id: '077',
              name: '免疫介在性好中球減少症',
              category: 'B',
              group: '',
            },
            {
              id: '078',
              name: '上皮小体疾患',
              category: 'B',
              group: '',
            },
            {
              id: '079',
              name: '尿崩症',
              category: 'B',
              group: '',
            },
            {
              id: '080',
              name: '結膜炎',
              category: 'B',
              group: '',
            },
            {
              id: '081',
              name: 'ブドウ膜炎',
              category: 'B',
              group: '',
            },
            {
              id: '082',
              name: '水晶体脱臼・亜脱臼',
              category: 'B',
              group: '',
            },
            {
              id: '083',
              name: '網膜の疾患（変性、剥離、進行性網膜萎縮症（PRA）など）',
              category: 'B',
              group: '',
            },
            {
              id: '084',
              name: '角膜の疾患（角膜炎、角膜潰瘍）',
              category: 'B',
              group: '',
            },
            {
              id: '085',
              name: '変形性関節症',
              category: 'B',
              group: '',
            },
            {
              id: '086',
              name: '重症筋無力症',
              category: 'B',
              group: '',
            },
            {
              id: '087',
              name: '漏斗胸',
              category: 'B',
              group: '',
            },
            {
              id: '088',
              name: '咀嚼筋炎',
              category: 'B',
              group: '',
            },
            {
              id: '089',
              name: '肘関節形成不全',
              category: 'B',
              group: '',
            },
            {
              id: '090',
              name: '前立腺肥大・前立腺炎',
              category: 'B',
              group: '',
            },
            {
              id: '091',
              name: '子宮蓄膿症・子宮内膜炎',
              category: 'B',
              group: '',
            },
            {
              id: '092',
              name: '乳腺炎',
              category: 'B',
              group: '',
            },
            {
              id: '093',
              name: '肛門嚢破裂・肛門嚢炎',
              category: 'B',
              group: '',
            },
            {
              id: '094',
              name: '中耳炎・内耳炎',
              category: 'B',
              group: '',
            },
            {
              id: '095',
              name: '耳血種',
              category: 'B',
              group: '',
            },
            {
              id: '049',
              name: 'アレルギー性・アトピー性皮膚炎',
              category: 'B',
              group: '',
            },
            {
              id: '096',
              name: '皮膚糸状菌症・皮膚真菌症（マラセチアなど）',
              category: 'B',
              group: '',
            },
            {
              id: '097',
              name: '毛包虫症（ニキビダニ・アカラス）',
              category: 'B',
              group: '',
            },
            {
              id: '098',
              name: '上記に該当するケガ・病気はない',
              category: 'B',
              group: '',
            },
            {
              id: '111',
              name: 'その他',
              category: 'B',
              group: '',
            },
          ],
        },
      },
      {
        noticeCd: '03',
        noticeContent: {
          notice:
            '過去に下記の病気やケガであると診断されたり、治療をうけたことはありますか？ある場合はその傷病名を全て選択してください。',
          selection: [
            {
              id: '001',
              name: '心疾患・発作',
              category: 'A',
              freeTextDisplayDiv: '0',
            },
            {
              id: '002',
              name: '犬糸状虫症（フィラリア症）',
              category: 'A',
              freeTextDisplayDiv: '0',
            },
            {
              id: '003',
              name: '気管虚脱',
              category: 'A',
              freeTextDisplayDiv: '0',
            },
            {
              id: '004',
              name: '横隔膜ヘルニア（先天性）',
              category: 'A',
              freeTextDisplayDiv: '0',
            },
            {
              id: '012',
              name: '慢性膵炎',
              category: 'A',
              freeTextDisplayDiv: '0',
            },
            {
              id: '011',
              name: '膵外分泌不全',
              category: 'A',
              freeTextDisplayDiv: '0',
            },
            {
              id: '005',
              name: '巨大結腸症',
              category: 'A',
              freeTextDisplayDiv: '0',
            },
            {
              id: '006',
              name: '巨大食道症（食道拡張症）',
              category: 'A',
              freeTextDisplayDiv: '0',
            },
            {
              id: '007',
              name: '肝不全（肝硬変・肝線維症を含む）',
              category: 'A',
              freeTextDisplayDiv: '0',
            },
            {
              id: '008',
              name: '慢性肝炎',
              category: 'A',
              freeTextDisplayDiv: '0',
            },
            {
              id: '009',
              name: '門脈シャント',
              category: 'A',
              freeTextDisplayDiv: '0',
            },
            {
              id: '010',
              name: '門脈低形成',
              category: 'A',
              freeTextDisplayDiv: '0',
            },
            {
              id: '013',
              name: '腎疾患（腎炎、腎不全、腎結石など）',
              category: 'A',
              freeTextDisplayDiv: '0',
            },
            {
              id: '015',
              name: '水頭症',
              category: 'A',
              freeTextDisplayDiv: '0',
            },
            {
              id: '016',
              name: '脳炎・脳神経炎',
              category: 'A',
              freeTextDisplayDiv: '0',
            },
            {
              id: '018',
              name: 'てんかん・発作（特発性てんかんを含む）',
              category: 'A',
              freeTextDisplayDiv: '0',
            },
            {
              id: '021',
              name: '免疫介在性溶血性貧血（IMHA）',
              category: 'A',
              freeTextDisplayDiv: '0',
            },
            {
              id: '099',
              name: '再生不良性貧血',
              category: 'A',
              freeTextDisplayDiv: '0',
            },
            {
              id: '022',
              name: '免疫介在性血小板減少症',
              category: 'A',
              freeTextDisplayDiv: '0',
            },
            {
              id: '031',
              name: '自己免疫性疾患（多発性関節炎・リウマチ・天疱瘡・全身性エリテマトーデスなど）',
              category: 'A',
              freeTextDisplayDiv: '0',
            },
            {
              id: '023',
              name: '甲状腺疾患',
              category: 'A',
              freeTextDisplayDiv: '0',
            },
            {
              id: '024',
              name: '副腎皮質機能亢進症（クッシング症候群）',
              category: 'A',
              freeTextDisplayDiv: '0',
            },
            {
              id: '025',
              name: '副腎皮質機能低下症（アジソン病）',
              category: 'A',
              freeTextDisplayDiv: '0',
            },
            {
              id: '026',
              name: '糖尿病',
              category: 'A',
              freeTextDisplayDiv: '0',
            },
            {
              id: '027',
              name: '猫白血病ウイルス感染症（FeLV）',
              category: 'A',
              freeTextDisplayDiv: '0',
            },
            {
              id: '028',
              name: '猫免疫不全ウイルス感染症（猫エイズ・FIV）',
              category: 'A',
              freeTextDisplayDiv: '0',
            },
            {
              id: '029',
              name: '猫伝染性腹膜炎（FIP）',
              category: 'A',
              freeTextDisplayDiv: '0',
            },
            {
              id: '030',
              name: '悪性腫瘍・がん（肥満細胞腫を含む）',
              category: 'A',
              freeTextDisplayDiv: '0',
            },
            {
              id: '053',
              name: 'そけいヘルニア（左側）',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '054',
              name: 'そけいヘルニア（右側）',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '055',
              name: '臍ヘルニア（でべそを含む）',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '056',
              name: '会陰ヘルニア（左側）',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '057',
              name: '会陰ヘルニア（右側）',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '059',
              name: '炎症性腸疾患（IBD）',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '100',
              name: 'リンパ管拡張症',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '101',
              name: '膀胱炎（血尿・頻尿など）',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '102',
              name: '尿石症（尿管、膀胱、尿道）',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '058',
              name: '尿結晶症（ストルバイト・シュウ酸カルシウムなど）',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '038',
              name: '椎間板ヘルニア',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '103',
              name: '猫コロナウイルス感染症　※猫伝染性腹膜炎（FIP）ではないが「抗体価が高い」場合を含みます。',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '048',
              name: '良性腫瘍・腫瘤（できもの・しこり・いぼ）',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '019',
              name: '緑内障',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '020',
              name: '白内障',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '042',
              name: 'ドライアイ',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '044',
              name: 'チェリーアイ（左眼）',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '045',
              name: 'チェリーアイ（右眼）',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '032',
              name: '膝蓋骨脱臼（パテラ）　※「膝が外れやすい、ゆるい」等と獣医師から言われた場合も含みます',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '034',
              name: '股関節形成不全',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '036',
              name: '大腿骨頭壊死症（レッグペルテス）',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '039',
              name: '骨折（脚部）',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '040',
              name: '骨折（脚部以外）',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '041',
              name: 'じん帯断裂・損傷',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '046',
              name: '停留睾丸・潜在精巣',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '050',
              name: '再発性または慢性の外耳炎',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '052',
              name: '再発性または慢性の皮膚疾患（膿皮症、疥癬、脂漏症など）',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '104',
              name: 'ケンネルコフ（犬伝染性気管気管支炎）',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '105',
              name: '鼻炎・気管支炎・肺炎',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '106',
              name: '短頭種気道症候群（外鼻腔狭窄、軟口蓋過長症など）',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '107',
              name: '肺水腫',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '108',
              name: '気胸',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '109',
              name: '乳び胸',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '110',
              name: '口蓋裂',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '060',
              name: '再発性または慢性の消化器疾患（下痢・嘔吐など）',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '061',
              name: '胃炎・胃潰瘍',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '062',
              name: '胃拡張捻転症候群',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '063',
              name: '食物アレルギー',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '064',
              name: '消化管寄生虫性腸症（回虫、コクシジウム、条虫、ジアルジアなど）',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '065',
              name: '細菌性腸症（カンピロバクター、クロストリジウムなど）',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '066',
              name: '胆泥症・胆石症',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '067',
              name: '胆のう粘液嚢腫',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '068',
              name: '胆のう炎・胆管炎',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '069',
              name: '異所性尿管',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '070',
              name: '環軸不安定症・環軸亜脱臼',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '071',
              name: '肝性脳症',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '072',
              name: 'ホルネル症候群',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '073',
              name: '馬尾症候群',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '074',
              name: '変性性脊髄症',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '075',
              name: '前庭疾患',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '076',
              name: 'バベシア症',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '077',
              name: '免疫介在性好中球減少症',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '078',
              name: '上皮小体疾患',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '079',
              name: '尿崩症',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '080',
              name: '結膜炎',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '081',
              name: 'ブドウ膜炎',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '082',
              name: '水晶体脱臼・亜脱臼',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '083',
              name: '網膜の疾患（変性、剥離、進行性網膜萎縮症（PRA）など）',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '084',
              name: '角膜の疾患（角膜炎、角膜潰瘍）',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '085',
              name: '変形性関節症',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '086',
              name: '重症筋無力症',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '087',
              name: '漏斗胸',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '088',
              name: '咀嚼筋炎',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '089',
              name: '肘関節形成不全',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '090',
              name: '前立腺肥大・前立腺炎',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '091',
              name: '子宮蓄膿症・子宮内膜炎',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '092',
              name: '乳腺炎',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '093',
              name: '肛門嚢破裂・肛門嚢炎',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '094',
              name: '中耳炎・内耳炎',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '095',
              name: '耳血種',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '049',
              name: 'アレルギー性・アトピー性皮膚炎',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '096',
              name: '皮膚糸状菌症・皮膚真菌症（マラセチアなど）',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '097',
              name: '毛包虫症（ニキビダニ・アカラス）',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '098',
              name: '上記に該当するケガ・病気はない',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
            {
              id: '111',
              name: 'その他',
              category: 'B',
              freeTextDisplayDiv: '0',
            },
          ],
          detail: [],
        },
      },
    ],
  };
};
