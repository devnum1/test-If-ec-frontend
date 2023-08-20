import { get } from 'lodash';

import { mapState } from 'vuex';

import contract from '~/constants/contract';

import PageTitle from '~/components/PageTitle';
import BaseButton from '~/components/formItems/BaseButton';
import InfoBox from '~/components/cards/InfoBox';

import { ContractsAdapter } from '~/utils/contracts-adapter.class';
import { StatusText } from '~/utils/enums';

export default {
  components: {
    PageTitle,
    InfoBox,
    BaseButton,
  },
  middleware: ['auth'],
  data() {
    return {
      constContract: contract,
      contractInfo: {},
      currentDate: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
      dataInfo: [],
      diseaseList: [],
    };
  },
  computed: {
    ...mapState({
      contractId: (state) => state.contracts.contractId,
      listContractInfo: (state) => state.contracts.listContractInfo,
    }),
    coverProperty01() {
      let coverProperty = get(this.contractInfo, 'productInfo.coverProperty');
      let coverProperty01 = coverProperty
        ? coverProperty.find(
            (coverProperty) =>
              coverProperty.coverCd == this.constContract.COVER_PROPERTY_01
          )
        : '';

      return get(coverProperty01, 'insAmount.propVal');
    },
    coverProperty02() {
      let coverProperty = get(this.contractInfo, 'productInfo.coverProperty');
      let coverProperty02 = coverProperty
        ? coverProperty.find(
            (coverProperty) =>
              coverProperty.coverCd == this.constContract.COVER_PROPERTY_02
          )
        : '';

      return get(coverProperty02, 'insAmount.propVal');
    },
    coverProperty03() {
      let coverProperty = get(this.contractInfo, 'productInfo.coverProperty');
      let coverProperty03 = coverProperty
        ? coverProperty.find(
            (coverProperty) =>
              coverProperty.coverCd == this.constContract.COVER_PROPERTY_03
          )
        : '';

      return get(coverProperty03, 'insAmount.propVal');
    },
    isEditButton() {
      return [StatusText.BEFORE_START, StatusText.RUNNING].includes(
        this.contractInfo?.contractStatus?.name
      );
    },
  },
  beforeMount() {
    window.addEventListener('pagehide', this.preventNav);
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('pagehide', this.preventNav);
    });
  },
  async created() {
    if (_.isEmpty(this.contractId)) {
      this.$store.commit(
        'contracts/setContractId',
        JSON.parse(localStorage.getItem('contractId_refresh'))
      );
      localStorage.removeItem('contractId_refresh');
    }

    await this.$store.dispatch('contracts/contractInfo', {
      linkdMemberId: this.$helpers.getUserId(),
      // contractInfo: [this.contractId],
    });

    const { adaptedContract } = new ContractsAdapter()
      .init(this.listContractInfo?.contractInfo)
      .adaptBy(this.contractId);

    this.contractInfo = adaptedContract;

    let petInfo = this.contractInfo.insCoverageInfo[0].insTargetProperty;

    let noticeCd01 = this.contractInfo.noticeInfo.find(
      (notice) => notice.noticeCd == this.constContract.notice_cd.notice_cd01.id
    );

    petInfo.noticeCd01 = noticeCd01
      ? noticeCd01.noticeContent.selection.find(
          (selection) =>
            !!selection.answer &&
            selection.answer.selectFlg ==
              this.constContract.notice_cd.notice_cd01.selectFlg_Y
        )
      : {};

    let exclusionSpRuleInfo = get(this.contractInfo, 'exclusionSpRuleInfo');
    _.forEach(exclusionSpRuleInfo, ({ exclusionSpProperty }) => {
      this.diseaseList.push(exclusionSpProperty);
    });

    petInfo.birthdayData = this.petBirthday(
      petInfo.petBirthday,
      petInfo.petBirthdayDiv.propDispNm
    );

    let dataInfo = [
      { title: this.$t('common.owner.name'), text: petInfo.petName },
    ];

    if (petInfo.petType.propVal === this.constContract.pet_type.DOG) {
      dataInfo.push(
        {
          title: this.$t('common.pet.pet_type'),
          text: this.$t('common.pet.dog'),
        },
        {
          title: this.$t('contract_pet.pet_contract_type'),
          text: petInfo.petBreed.propDispNm,
        }
      );

      if (
        petInfo.petBreed.propVal === this.constContract.pet_breed.MIX ||
        petInfo.petBreed.propVal === this.constContract.pet_breed.OTHER_BREED
      ) {
        let petWeight = petInfo.petWeight.toString();
        if (petWeight.indexOf('.') == -1) {
          petWeight = (petWeight * 1).toFixed(1);
        }
        dataInfo.push({
          title: this.$t('common.weight'),
          text: petWeight + 'kg',
        });
      }
    } else {
      dataInfo.push({
        title: this.$t('common.pet.pet_type'),
        text: this.$t('common.pet.cat'),
      });
    }
    dataInfo.push(
      {
        title: this.$t('common.gender.gender_title'),
        text: petInfo.petSexCd.propDispNm,
      },
      {
        title: this.$t('common.contraception_status.title'),
        text: get(petInfo, 'noticeCd01.name', ''),
      },
      { title: this.$t('common.dob.title'), text: petInfo.birthdayData }
    );

    this.dataInfo = dataInfo;
  },
  methods: {
    getPdf(route_name) {
      window.open(`/pdf/${route_name}.pdf`, '_blank');
    },
    petBirthday(petBirthday, petBirthdayDiv) {
      return (
        petBirthday.substring(0, 4) +
        '/' +
        petBirthday.substring(4) +
        ' (' +
        petBirthdayDiv +
        ')'
      );
    },
    preventNav() {
      localStorage.setItem(
        'contractId_refresh',
        JSON.stringify(this.contractId)
      );
    },
    cardLast4Digits(value) {
      value = value.replace(/\s+/g, '');

      if (value.length < 12) {
        value = value.padStart(12, '*');
      }

      return (
        value
          .substring(0, value.length - 4)
          .replace(/[0-9]/gi, '*')
          .replace(/(.{4})/g, '$1 ')
          .trim() +
        ' ' +
        value.substring(value.length - 4)
      );
    },
    handleChangeEditPayment() {
      localStorage.setItem(
        'credit_card',
        _.get(this.contractInfo, 'creditInfo.creditCardNo4')
      );
      localStorage.removeItem('refresh');
      this.$router.push('/mypage/contracts/payment/edit/');
    },
  },
};
