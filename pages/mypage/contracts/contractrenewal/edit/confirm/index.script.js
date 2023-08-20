import { mapGetters, mapMutations, mapActions } from 'vuex';

import PageTitle from '~/components/PageTitle';
import BaseButton from '~/components/formItems/BaseButton';

export default {
  components: {
    PageTitle,
    BaseButton,
  },
  computed: {
    ...mapGetters({
      getDataForConfirmation: 'contracts/getDataForConfirmation',
      getContractId: 'contracts/getContractId',
    }),
    dataInfo() {
      return Object.entries(this.getDataForConfirmation?.data)
        .filter(([, value]) => !_.isNull(value))
        .map(([key, value]) => {
          switch (key) {
            case 'plan':
              return this.$t('contract_renewal_edit.confirmation_data.plan', {
                percent: value * 100,
              });
            case 'status':
              return this.$tc(
                'contract_renewal_edit.confirmation_data.status',
                +value
              );
            case 'weight':
              return this.$t('contract_renewal_edit.confirmation_data.weight', {
                kg: value,
              });
          }
        });
    },
    isEmpty() {
      return Object.values(this.getDataForConfirmation?.data).every((value) =>
        _.isNull(value)
      );
    },
  },
  beforeDestroy() {
    this.setDataForConfirmation(null);
  },
  methods: {
    ...mapActions({
      updateContract: 'contracts/updateContract',
    }),
    ...mapMutations({
      setDataForConfirmation: 'contracts/setDataForConfirmation',
    }),
    async onSaveHandler() {
      if (this.isEmpty) {
        return this.$router.push('/mypage/contracts/contractrenewal/edit');
      }

      let insCoverageInfo = null;
      let updateApplicationInfo = null;
      let noticeInfo = null;

      if (this.getDataForConfirmation?.data?.weight) {
        insCoverageInfo = [
          {
            insCoverageId: this.getDataForConfirmation?.insCoverageId,
            insTargetProperty: {
              petWeight: +this.getDataForConfirmation?.data?.weight,
            },
          },
        ];
      }

      if (this.getDataForConfirmation?.data?.plan) {
        updateApplicationInfo = {
          compensRate: this.getDataForConfirmation?.data?.plan,
        };
      }

      if (!_.isNull(this.getDataForConfirmation?.data?.status)) {
        const answer = {
          selectFlg: 'Y',
          freeText: null,
        };

        noticeInfo = [
          {
            noticeCd: '01',
            noticeContent: {
              selection: [
                {
                  id: '01',
                  answer: !this.getDataForConfirmation?.data?.status
                    ? answer
                    : null,
                },
                {
                  id: '02',
                  answer: this.getDataForConfirmation?.data?.status
                    ? answer
                    : null,
                },
              ],
            },
          },
        ];
      }

      try {
        const response = await this.updateContract({
          linkedMemberId: this.$helpers.getUserId(),
          contractInfo: this.getContractId,
          insCoverageInfo,
          updateApplicationInfo,
          noticeInfo,
        });

        this.$router.push({
          path: response
            ? '/mypage/contracts/contractrenewal/edit/complete'
            : '/errors/system_error',
          query: this.getDataForConfirmation?.data?.plan === 0.7 && {
            completeType: 'examination',
          },
        });
      } catch (e) {}
    },
  },
};
