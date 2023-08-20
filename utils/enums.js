export const CheckDateType = Object.freeze({
  PAST: 'PAST',
  TODAY: 'TODAY',
  BETWEEN: 'BETWEEN',
  BEFORE_REFERENCE_DATE: 'BEFORE_REFERENCE_DATE',
  AFTER_REFERENCE_DATE: 'AFTER_REFERENCE_DATE',
  STARTED: 'STARTED',
  NOT_STARTED_YET: 'NOT_STARTED_YET',
  MORE_START_DATE: 'MORE_START_DATE',
  END_BEFORE_VALIDATE_DATE: 'END_BEFORE_VALIDATE_DATE',
  END_AFTER_VALIDATE_DATE: 'END_AFTER_VALIDATE_DATE',
});

export const SortingType = Object.freeze({
  ASCENDING: 'asc',
  DESCENDING: 'desc',
});

export const ContractTermDiv = Object.freeze({
  DIV_01: '01',
  DIV_02: '02',
  DIV_03: '03',
  DIV_04: '04',
  DIV_05: '05',
});

export const ProposalStatus = Object.freeze({
  STATUS_80: 80, // 引受済　状態：クレジットカード情報入力待ち
  STATUS_85: 85, // 有効
});

export const LiabilityState = Object.freeze({
  STATUS_0: 0, // 未成立
  STATUS_1: 1, // 契約中
  STATUS_2: 2, // 失効中
  STATUS_3: 3, // 解約済み
});

export const EndCause = Object.freeze({
  CANCEL: 1, // 解約
  INVALID: 2, // 無効
  ABORT: 3, // 取り消し
  MATURITY: 5, // 満期解約
  PRECANCEL: 6, // 始期前解約
  LAPSE: 10, // 失効
  AUTO_CANCELLED: 7, // 自動解除
  SYSTEM_CANCELLED: 11, // システム解除
});

// マイページの表示文言
export const StatusText = Object.freeze({
  NO_CREDIT_CARD: '契約成立前\n（クレジットカード情報入力待ち）',
  BEFORE_START: '契約開始前',
  RUNNING: '契約中',
  BEFORE_START_LAPSE: '契約終了\n（始期前失効）',
  LAPSE: '契約終了\n（失効）',
  RELEASE: '契約終了\n（解除）',
  INVALID: '契約終了\n（無効）',
  BEFORE_START_CANCELLATION_OF_CONTRACT: '契約終了\n（始期前解約）',
  CANCELLATION_OF_CONTRACT: '契約終了\n（解約）',
  ENDED: '契約終了',
  CANCEL: '契約終了\n（取消）',
});
