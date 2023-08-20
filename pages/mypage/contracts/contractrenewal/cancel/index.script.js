import { mapGetters, mapActions } from 'vuex';

import PageTitle from '~/components/PageTitle';
import BaseButton from '~/components/formItems/BaseButton';

export default {
  components: {
    PageTitle,
    BaseButton,
  },
  computed: {
    ...mapGetters({
      getContractId: 'contracts/getContractId',
    }),
  },
  methods: {
    ...mapActions({
      cancelContract: 'contracts/cancelContract',
    }),
    async onCancelHandler() {
      try {
        const response = await this.cancelContract({
          linkedMemberId: this.$helpers.getUserId(),
          contractInfo: this.getContractId,
        });

        this.$router.push(
          response
            ? '/mypage/contracts/contractrenewal/cancel/complete'
            : '/errors/system_error'
        );
      } catch (e) {}
    },
  },
};
