import { mapGetters } from 'vuex';

import PageTitle from '~/components/PageTitle';
import BaseButton from '~/components/formItems/BaseButton';

const Type = Object.freeze({
  YEAR: '$1',
  MONTH: '$2',
  DAY: '$3',
});

export default {
  components: {
    PageTitle,
    BaseButton,
  },
  data() {
    return {
      contractInfo: null,
    };
  },
  computed: {
    ...mapGetters({
      listContractInfo: 'contracts/getListContractInfo',
      contractId: 'contracts/getContractId',
    }),
    petName() {
      return this.contractInfo?.insCoverageInfo?.[0]?.insTargetProperty
        ?.petName;
    },
    year() {
      return this.getContractDate(this.contractInfo, Type.YEAR);
    },
    month() {
      return this.getContractDate(this.contractInfo, Type.MONTH);
    },
    day() {
      return this.getContractDate(this.contractInfo, Type.DAY);
    },
    texts() {
      return [
        this.$t('contract_renewal_cancel.complete_description.info', {
          name: this.petName,
          year: this.year,
          month: this.month,
          day: this.day,
        }),
        this.$t('contract_renewal_cancel.complete_description.note'),
      ];
    },
  },
  created() {
    this.contractInfo = this.listContractInfo?.contractInfo?.find(
      ({ futureContract }) =>
        futureContract?.policyNo === this.contractId?.policyNo
    );
  },
  methods: {
    getContractDate(data, type) {
      return _.get(data, 'productInfo.insDateTo', '&mdash;').replace(
        /(\d{4})(\d{2})(\d{2})/,
        type
      );
    },
  },
};
