import moment from 'moment';

import { mapGetters, mapMutations } from 'vuex';

import constContract from '~/constants/contract';

import PageTitle from '~/components/PageTitle';
import BaseButton from '~/components/formItems/BaseButton';
import BaseInputCheckbox from '~/components/formItems/BaseInputCheckbox';
import BaseInput from '~/components/formItems/BaseInput';
import InfoBox from '~/components/cards/InfoBox';

export default {
  components: {
    PageTitle,
    BaseButton,
    BaseInput,
    BaseInputCheckbox,
    InfoBox,
  },
  data() {
    return {
      dataInfo: {
        plan: [],
        status: [],
        weight: [],
      },
      form: {
        weight: '',
        isChangedPlan: false,
        isChangedStatus: false,
        isChangedWeight: false,
        isAgree: false,
      },
      contractInfo: null,
      petInfo: null,
    };
  },
  computed: {
    ...mapGetters({
      listContractInfo: 'contracts/getListContractInfo',
      contractId: 'contracts/getContractId',
    }),
    allowPercent() {
      return _.get(this.contractInfo, 'productInfo.compensRate.propVal', 0) *
        100 ===
        50
        ? 70
        : 50;
    },
    isShowAlert() {
      return this.allowPercent === 70 && this.form.isChangedPlan;
    },
    isHybrid() {
      return (
        this.petInfo?.petType?.propVal === constContract.pet_type.DOG &&
        (this.petInfo?.petBreed?.propVal === constContract.pet_breed.MIX ||
          this.petInfo?.petBreed?.propVal ===
            constContract.pet_breed.OTHER_BREED)
      );
    },
    isNeuteringStatusYes() {
      return this.petInfo.noticeCd01?.name === 'あり';
    },
    isDisabled() {
      return (
        [
          this.form.isChangedPlan,
          this.form.isChangedStatus,
          this.form.isChangedWeight,
        ].every((v) => !v) ||
        (this.isShowAlert && !this.form.isAgree)
      );
    },
    showPlanChange() {
      const today = new Date(moment().format('YYYY/MM/DD'));

      const insDateTo = new Date(
        moment(this.contractInfo?.preContract?.productInfo?.insDateTo).format(
          'YYYY/MM/DD'
        )
      );
      insDateTo.setDate(insDateTo.getDate() + 1);

      const diff = parseInt((insDateTo - today) / 1000 / 3600 / 24);

      return (
        this.allowPercent === 50 || (this.allowPercent === 70 && diff > 30)
      );
    },
  },
  watch: {
    'form.isChangedWeight': {
      handler(value) {
        this.form.weight = (value && this.petInfo?.petWeight?.toString()) || '';
      },
    },
  },
  created() {
    this.contractInfo = this.listContractInfo?.contractInfo?.find(
      ({ policyNo }) => policyNo === this.contractId?.policyNo
    );

    this.petInfo = this.contractInfo.insCoverageInfo?.[0]?.insTargetProperty;

    let noticeCd01 = this.contractInfo?.noticeInfo?.find(
      (notice) => notice?.noticeCd == constContract?.notice_cd?.notice_cd01.id
    );

    this.petInfo.noticeCd01 = noticeCd01
      ? noticeCd01.noticeContent.selection.find(
          (selection) =>
            !!selection.answer &&
            selection.answer.selectFlg ==
              constContract.notice_cd.notice_cd01.selectFlg_Y
        )
      : {};

    this.dataInfo.plan.push({
      title: this.$t('contract_renewal_edit.current_contract'),
      text: this.$tc('contract_renewal_edit.plan', 1, {
        percent:
          _.get(this.contractInfo, 'productInfo.compensRate.propVal', 0) * 100,
      }),
    });

    const isYes = this.petInfo.noticeCd01?.name === 'あり';

    this.dataInfo.status.push({
      title: this.$t('contract_renewal_edit.current_contract'),
      text: this.$tc(
        'contract_renewal_edit.neutering_status',
        +Boolean(this.isNeuteringStatusYes)
      ),
    });

    this.dataInfo.weight.push({
      title: this.$t('contract_renewal_edit.current_weight'),
      text: this.$tc('contract_renewal_edit.weight', 1, {
        kg: this.petInfo?.petWeight,
      }),
    });
  },
  methods: {
    ...mapMutations({
      setDataForConfirmation: 'contracts/setDataForConfirmation',
    }),
    onNextHandler() {
      this.setDataForConfirmation({
        data: {
          plan: this.form.isChangedPlan ? this.allowPercent / 100 : null,
          status: this.form.isChangedStatus ? this.isNeuteringStatusYes : null,
          weight: this.form.weight || null,
        },
        insCoverageId: this.contractInfo?.insCoverageInfo?.[0]?.insCoverageId,
      });

      this.$router.push('/mypage/contracts/contractrenewal/edit/confirm');
    },
  },
};
