// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="page-content bg-gray">
    <PageTitle :title="$t('note.condition_special')" />
    <div class="container">
      <div class="form-group pet-id-container pb-0">
        <PetIdCard
          :pet-info="petInfo"
          :product-info="productInfo"
          :no-pet-image="true"
        />
      </div>
      <BaseNotice
        v-if="listErrors.length > 0"
        :list-error="listErrors"
        class="mb-41"
        :title="$t('error.input_has_error')"
      />
      <div id="terms" class="form-group mt-40 pb-0">
        <div class="tag-notification">
          {{ $t('note.warning_note') }}
        </div>
        <div class="annouce-list">
          <ul>
            <span class="annouce-list__title">{{
              $t('common.announced')
            }}</span>
            <li v-for="(item, index) in illnessList" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="annouce-text">
          {{ $t('common.is') }}
        </div>
        <div class="annouce-highlight-text">
          {{ $t('common.wont_insurance') }}
        </div>
        <div class="annouce-text">
          {{ $t('common.confirm_if_agree') }}
        </div>
      </div>
      <div class="form-group pb-0">
        <BaseInputCheckbox
          v-model="agreement"
          v-validate="'required'"
          data-vv-as="agreement"
          name="agreement"
          center
          :error="errors.first('agreement')"
          :label="$t('note.confirmed')"
        />
      </div>
      <div class="page-button mt-40">
        <BaseButton
          id="solicitationContractsAgreement_confirm"
          btn-class="test tracking"
          :label="$t('common.button.to_input_insurance')"
          btn-full="btn--full"
          icon-right
          :disabled="!agreement"
          @click="confirmAgree"
        />
      </div>
      <div class="annouce-text confirm-text">
        {{ $t('common.confirm_text') }}
      </div>
    </div>
  </div>
</template>

<script>
import { get } from 'lodash';
import { mapActions, mapMutations, mapState } from 'vuex';
import contract from '@/constants/contract';
import PetIdCard from '@/components/cards/PetIdCard';
import BaseInputCheckbox from '@/components/formItems/BaseInputCheckbox';
import BaseButton from '@/components/formItems/BaseButton';

export default {
  components: {
    PetIdCard,
    BaseInputCheckbox,
    BaseButton,
  },
  middleware: ['auth'],
  data() {
    return {
      petInfo: {},
      illnessList: [],
      agreement: false,
      listErrors: [],
      scrolledToBottom: false,
      contractInfo: {},
      productInfo: {},
    };
  },

  computed: {
    ...mapState({
      listContractInfo: (state) => state.contracts.listContractInfo,
      contractId: (state) => state.contracts.contractId,
    }),
  },

  created() {
    this.$helpers.setDataFromLocalToVuex();
  },

  mounted() {
    this.scroll();
    // Find contract with param from url
    const { policyId } = this.$route.query;
    this.$store.commit('contracts/setPolicyId', policyId);
    this.$store
      .dispatch('contracts/contractInfoV2', {
        policyId,
      })
      .then(() => {
        this.contractInfo = this.listContractInfo.policy;
        if (this.contractInfo.proposalStatus != contract.proposal_status_81) {
          return this.$router.push(
            '/solicitation/contracts/agreement/expired/'
          );
        }

        const exclusionList = get(
          this.contractInfo,
          'contractPolicyExclusionList'
        );

        _.forEach(exclusionList, ({ exclusionCode }) => {
          this.illnessList.push(exclusionCode);
        });

        const policyId = this.contractInfo.policyId;

        this.petInfo = this.contractInfo.contractSubjectPetList.find(
          (pet) => pet.policyId === policyId
        );
        this.petInfo.petBreedDesc = this.listContractInfo.petBreedDesc;
        this.productInfo = this.contractInfo.contractProductList.find(
          (product) => product.policyId === policyId
        );
      })
      .catch((e) => {
        console.log(e);
        this.$router.push('/solicitation/contracts/agreement/expired/');
      });
  },

  methods: {
    ...mapMutations({
      setNgType: 'contracts/setNgType',
    }),

    ...mapActions({
      updateContractStatus: 'contracts/updateContractStatus',
    }),

    confirmAgree() {
      this.$validator.validate().then((result) => {
        if (!result) {
          this.listErrors = this.errors.items.reduce((arr, it) => {
            it.msg = '「確認しました」に チェックをしてください。';

            return [...arr, it.msg];
          }, []);

          return true;
        }

        const { policyId } = this.$route.query;

        this.updateContractStatus({
          policyId,
        }).then(() => {
          this.$router.push(
            '/solicitation/additional_information/payment/new/'
          );
        });
      });
    },

    scroll() {
      window.onscroll = () => {
        const bottomOfWindow =
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) +
            window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          this.scrolledToBottom = true;
        }
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/pages/new-contract';
@import '~/assets/scss/pages/dp-0012';

.complete-check {
  &__content {
    margin-top: 34px;
    margin-bottom: 52px;
  }

  &__text {
    text-align: left;
  }
}

.page-content {
  font-family: $font-family-primary;
}

.pet-id-container {
  padding: 24px 25px 41px 25px;
  margin-bottom: 0;
}

.page-button {
  margin-top: 40px;
  padding-bottom: 25px;
}

.input-checkbox {
  &__title {
    color: rgba($black, 0.6);
  }
}

.form-group {
  padding-bottom: 18px;
}

.mw-142 {
  min-width: 142px;
}

.confirm-text {
  font-size: 14px;
}
</style>
