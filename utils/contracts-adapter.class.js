import moment from 'moment';

import { orderBy } from 'lodash';

import {
  SortingType,
  CheckDateType,
  StatusText,
  ProposalStatus,
  LiabilityState,
  EndCause,
} from './enums';

export class ContractsAdapter {
  constructor() {
    this._adaptedContract = null;
    this._listOfContracts = [];
    this._listOfAdaptedContracts = [];
    this._pendingContracts = [];

    this.init = this.init.bind(this);
    this.sort = this.sort.bind(this);
    this.adaptBy = this.adaptBy.bind(this);
    this.adaptAll = this.adaptAll.bind(this);
    this.setPendingContracts = this.setPendingContracts.bind(this);
  }

  get adaptedContract() {
    return this._adaptedContract;
  }

  get listOfAdaptedContracts() {
    return this._listOfAdaptedContracts;
  }

  get _today() {
    return moment().format('YYYY-MM-DD');
  }

  get pendingContracts() {
    return this._pendingContracts;
  }

  init(listOfContracts = []) {
    this._listOfContracts = Array.isArray(listOfContracts)
      ? listOfContracts
      : [];
    return this;
  }

  adaptAll() {
    // 表示対象の契約
    this._listOfAdaptedContracts = this._listOfContracts.filter(
      this._adaptContract.bind(this)
    );
    // 保険料払い込み待ちの契約
    this._pendingContracts = this._listOfAdaptedContracts.filter(
      (c) => c.policy?.proposalStatus === ProposalStatus.STATUS_80
    );
    return this;
  }

  adaptBy(policyId) {
    const contract = this._listOfContracts.find(
      (policyObj) => policyObj.policy.policyId === policyId
    );

    contract.contractStatus = this._getStatusText(contract);

    this._adaptedContract = contract;

    return this;
  }

  setPendingContracts(cb) {
    // 契約成立前（クレジットカード情報入力待ち）がなければペット画像がない契約を取得
    if (!this.pendingContracts.length) {
      this._pendingContracts = this._listOfAdaptedContracts.filter(
        (c) => !cb(c)
      );
    }

    return this;
  }

  sort(type = SortingType.ASCENDING) {
    this._listOfAdaptedContracts = orderBy(
      this._listOfAdaptedContracts,
      ['productInfo.policy.validateDate'],
      type
    );

    return this;
  }

  isCreditCardUnregistered(contract) {
    return this._isProposalStatus80(contract);
  }

  _adaptContract(contract) {
    try {
      this._checkShowing(contract);
      // 表示文言の設定
      contract.contractStatus = this._getStatusText(contract);
      if (contract?.contractStatus?.name === StatusText.ENDED) {
        contract.isEnded = true;
      }

      // 契約期間ラベルの設定
      contract.period = this._createPeriodLabel(contract);

      // 保険金請求、クレカ変更機能、詳細画面閲覧機能の利用フラグの付与
      contract.isContractDetailActive = this._isContractDetailActive(contract);
      contract.isCardChangeActive = this._isCardChangeActive(contract);
      contract.isClaimActive = this._isClaimActive(contract);

      return contract;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  _getStatusText(contract) {
    switch (true) {
      // 契約成立前（クレジットカード情報入力待ち）
      case this._isProposalStatus80(contract):
        return { name: StatusText.NO_CREDIT_CARD };
      // 契約終了（始期前失効）
      case this._isContractLapseBeforeStartDate(contract):
        return { name: StatusText.BEFORE_START_LAPSE };
      // 契約終了（失効）
      case this._isContractLapseBetween(contract):
        return { name: StatusText.LAPSE };
      // 契約終了（解除）
      case this._isContractAutoOrSystemCancelled(contract):
        return { name: StatusText.RELEASE };
      // 契約終了（無効）
      case this._isContractInvalidated(contract):
        return { name: StatusText.INVALID };
      // 契約終了（始期前解約）
      case this._isContractPreCancelled(contract):
        return { name: StatusText.BEFORE_START_CANCELLATION_OF_CONTRACT };
      // 契約終了（解約）
      case this._isContractCancelled(contract):
        return { name: StatusText.CANCELLATION_OF_CONTRACT };
      // 契約終了
      case this._isContractMatured(contract):
        return { name: StatusText.ENDED };
      //　契約終了（取消）
      case this._isContractAborted(contract):
        return { name: StatusText.CANCEL };
      //　契約開始前
      case this._isContractNotStarted(contract):
        return { name: StatusText.BEFORE_START };
      // 契約中
      case this._isContractActive(contract):
        return { name: StatusText.RUNNING };
      default:
        // 発生しない想定
        return { name: '' };
    }
  }

  /**
   * 契約期間のラベルを作成
   */
  _createPeriodLabel(_contract) {
    const policy = _contract.policy;
    switch (true) {
      case this._isContractNotStarted(_contract):
      case this._isContractActive(_contract):
      case this._isContractMatured(_contract):
        return (
          policy.validateDate.replace('-', '/') +
          '~' +
          policy.expiryDate.replace('-', '/')
        );
      case this._isContractLapseBetween(_contract):
      case this._isContractAutoOrSystemCancelled(_contract):
      case this._isContractCancelled(_contract):
        return (
          policy.validateDate.replace('-', '/') +
          '~' +
          policy.endDate.replace('-', '/')
        );
      default:
        return '';
    }
  }

  /**
   * 保険請求機能が有効かどうかを判定する
   */
  _isContractDetailActive(contract) {
    // Notion仕様における対応ケース
    // 12,13,17,14,18,19,15,16,20,21
    return (
      this._isContractNotStarted(contract) ||
      this._isContractActive(contract) ||
      this._isContractLapseBetween(contract) ||
      this._isContractLapseBeforeStartDate(contract) ||
      this._isContractAutoOrSystemCancelled(contract) ||
      this._isContractInvalidated(contract) ||
      this._isContractPreCancelled(contract) ||
      this._isContractCancelled(contract) ||
      this._isContractMatured(contract) ||
      this._isContractAborted(contract)
    );
  }
  /**
   * クレジットカード変更機能が有効かどうかを判定する
   */
  _isCardChangeActive(contract) {
    // Notion仕様における対応ケース
    // 12,13
    return (
      this._isContractNotStarted(contract) || this._isContractActive(contract)
    );
  }
  /**
   * 保険請求機能が有効かどうかを判定する
   */
  _isClaimActive(contract) {
    // Notion仕様における対応ケース
    // 13,14,18,16,20
    const petImage = contract?.policy?.contractSubjectPetList[0].petPhotoDoc;
    if (!petImage) return false;

    return (
      this._isContractActive(contract) ||
      this._isContractLapseBetween(contract) ||
      this._isContractAutoOrSystemCancelled(contract) ||
      this._isContractCancelled(contract) ||
      this._isContractMatured(contract)
    );
  }

  /**
   * https://www.notion.so/littlefamily/DP-0027-28b54be49bf04faa90691c51a18ddf18
   *  に記載の契約状態ステータスに対応するメソッド(Notion記載順)
   */

  // ケース12 契約中:契約期間中
  _isContractActive(contract) {
    return (
      this._isLiabilityState1(contract) &&
      this._isProposalStatus85(contract) &&
      this._checkDate(contract, CheckDateType.BETWEEN)
    );
  }
  // ケース13 契約中:契約期間前
  _isContractNotStarted(contract) {
    return (
      this._isLiabilityState1(contract) &&
      this._isProposalStatus85(contract) &&
      this._checkDate(contract, CheckDateType.NOT_STARTED_YET)
    );
  }
  // ケース17 解約済み:契約期間前の失効
  _isContractLapseBeforeStartDate(contract) {
    return (
      this._isLiabilityState3(contract) &&
      this._isEndCauseLapse(contract) &&
      this._checkDate(contract, CheckDateType.END_BEFORE_VALIDATE_DATE)
    );
  }
  // ケース14 解約済み:契約期間中の失効
  _isContractLapseBetween(contract) {
    return (
      this._isLiabilityState3(contract) &&
      this._isEndCauseLapse(contract) &&
      this._checkDate(contract, CheckDateType.END_AFTER_VALIDATE_DATE)
    );
  }
  // ケース18 解約済み:自動解除またはシステム解除
  _isContractAutoOrSystemCancelled(contract) {
    return (
      this._isLiabilityState3(contract) &&
      (this._isEndCauseAutoCancelled(contract) ||
        this._isEndCauseSystemCancelled(contract))
    );
  }
  // ケース19 解約済み:無効
  _isContractInvalidated(contract) {
    return (
      this._isLiabilityState3(contract) && this._isEndCauseInvalid(contract)
    );
  }
  // ケース15 解約済み:始期前解約
  _isContractPreCancelled(contract) {
    return (
      this._isLiabilityState3(contract) &&
      this._isEndCausePrecancel(contract) &&
      this._checkDate(contract, CheckDateType.END_BEFORE_VALIDATE_DATE)
    );
  }
  // ケース16 解約済み:解約
  _isContractCancelled(contract) {
    return (
      this._isLiabilityState3(contract) &&
      this._isEndCauseCancel(contract) &&
      this._checkDate(contract, CheckDateType.END_AFTER_VALIDATE_DATE)
    );
  }
  // ケース20 解約済み:満期解約
  _isContractMatured(contract) {
    return (
      this._isLiabilityState3(contract) && this._isEndCauseMaturity(contract)
    );
  }
  // ケース21 解約済み:取り消し
  _isContractAborted(contract) {
    return this._isLiabilityState3(contract) && this._isEndCauseAbort(contract);
  }

  _checkDate(contract, type) {
    // 保険始期日
    const startDate = contract.policy.validateDate;
    // 保険終期日
    const expiryDate = contract.policy.expiryDate;
    // 中途終了日
    const endDate = contract.policy.endDate;

    switch (type) {
      case CheckDateType.BETWEEN:
        return this._today >= startDate && this._today <= expiryDate;
      case CheckDateType.NOT_STARTED_YET:
        return startDate > this._today;
      case CheckDateType.AFTER_REFERENCE_DATE:
        return this._today > expiryDate;
      case CheckDateType.END_BEFORE_VALIDATE_DATE:
        return endDate < startDate;
      case CheckDateType.END_AFTER_VALIDATE_DATE:
        return endDate >= startDate;
      default:
        return false;
    }
  }

  _checkShowing(contract) {
    switch (true) {
      // 契約成立前（クレジットカード情報入力待ち）
      case !this._isLiabilityState1or2or3(contract) &&
        this._isProposalStatus80(contract):
        break;
      // 契約成立前
      case !this._isLiabilityState1or2or3(contract):
        throw new Error('do not show');
      // その他
      default:
        break;
    }
  }

  _isProposalStatus80(contract) {
    return contract?.policy.proposalStatus === ProposalStatus.STATUS_80;
  }
  // 申込ステータスが有効か
  _isProposalStatus85(contract) {
    return contract?.policy.proposalStatus === ProposalStatus.STATUS_85;
  }
  // 解約理由が失効
  _isEndCauseLapse(contract) {
    return contract?.policy.endCause === EndCause.LAPSE;
  }
  // 解約理由が自動解除
  _isEndCauseAutoCancelled(contract) {
    return contract?.policy.endCause === EndCause.AUTO_CANCELLED;
  }
  // 解約理由がシステム解除
  _isEndCauseSystemCancelled(contract) {
    return contract?.policy.endCause === EndCause.SYSTEM_CANCELLED;
  }
  // 解約理由が始期前解約
  _isEndCausePrecancel(contract) {
    return contract?.policy.endCause === EndCause.PRECANCEL;
  }
  // 解約理由が解約
  _isEndCauseCancel(contract) {
    return contract?.policy.endCause === EndCause.CANCEL;
  }
  // 解約理由が満期解約
  _isEndCauseMaturity(contract) {
    return contract?.policy.endCause === EndCause.MATURITY;
  }
  // 解約理由が取り消し
  _isEndCauseAbort(contract) {
    return contract?.policy.endCause === EndCause.ABORT;
  }
  // 解約理由が無効
  _isEndCauseInvalid(contract) {
    return contract?.policy.endCause === EndCause.INVALID;
  }
  _isLiabilityState1(contract) {
    return contract?.policy.liabilityState === LiabilityState.STATUS_1;
  }

  _isLiabilityState2(contract) {
    return contract.policy.liabilityState === LiabilityState.STATUS_2;
  }

  _isLiabilityState3(contract) {
    return contract?.policy.liabilityState === LiabilityState.STATUS_3;
  }

  _isLiabilityState1or2or3(contract) {
    return [
      LiabilityState.STATUS_1,
      LiabilityState.STATUS_2,
      LiabilityState.STATUS_3,
    ].includes(contract?.policy.liabilityState);
  }
}
