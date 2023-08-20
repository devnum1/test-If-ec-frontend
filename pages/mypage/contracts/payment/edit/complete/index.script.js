import { mapGetters } from 'vuex';

import PageTitle from '~/components/PageTitle';
import BaseButton from '~/components/formItems/BaseButton';

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
      policyId: 'contracts/getPolicyId',
    }),
    petName() {
      if (this.contractInfo) {
        return _.get(
          this.contractInfo.policy,
          'contractSubjectPetList[0].petName',
          '&mdash;'
        );
      }

      return '';
    },
    petTitle() {
      const info = this.contractInfo;
      if (info) {
        return info.policy.contractSubjectPetList[0].gender === 'M'
          ? 'くん'
          : 'ちゃん';
      }
      return '';
    },
  },
  created() {
    this.contractInfo = this.listContractInfo?.find(
      ({ policy }) => policy.policyId === this.policyId
    );
  },
};
