// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="page-content bg-gray">
    <Header
      btn-back="/mypage/contracts"
      :logo="false"
      :title-page="$t('note.confirm_customer_info')"
    />
    <div class="container owner-info">
      <div class="owner-info__label mb-1">
        {{ $t('insurance.title_ins') }}
      </div>
      <div class="owner-info__top mb-40 text-center">
        <div class="owner-info__top-title">
          {{ nameCustomer?.lastName1 + ' ' + nameCustomer?.firstName1 }}
        </div>
        <span class="owner-info__top-subtitle">
          {{ nameCustomer?.lastName2 + ' ' + nameCustomer?.firstName2 }}
        </span>
      </div>
      <div class="d-flex mb-4 justify-content-between align-items-center">
        <div class="rules-title mb-0">
          {{ $t('contract_id.title_owner_info') }}
        </div>
      </div>
      <InfoBox class="mb-57" :data-info="dataInfo" />
    </div>
  </div>
</template>

<script>
import InfoBox from '~/components/cards/InfoBox';
import { mapGetters } from 'vuex';

export default {
  components: { InfoBox },
  middleware: ['auth'],
  data() {
    return {
      dataInfo: null,
      nameCustomer: null,
      email: '',
    };
  },

  computed: {
    ...mapGetters({
      getAuthUserAttributes: 'auth/getAuthUserAttributes',
    }),
  },

  async created() {
    const customer = await this.$store.dispatch('contracts/customerInfo');
    this.nameCustomer = {
      lastName1: customer.lastName1,
      firstName1: customer.firstName1,
      lastName2: customer.lastName2,
      firstName2: customer.firstName2,
    };

    this.dataInfo = [
      {
        title: this.$t('common.dob.name'),
        text: customer.lastName1 + ' ' + customer.firstName1,
      },
      {
        title: this.$t('common.dob.nameKana'),
        text: customer.lastName2 + ' ' + customer.firstName2,
      },
      {
        title: this.$t('common.dob.birthday'),
        text: customer.birthDate?.replaceAll('-', '/'),
      },
      { title: this.$t('common.postal_code'), text: customer.postCode },
      {
        title: this.$t('common.dob.prefectureCode'),
        text: customer.prefectureCode,
      },
      { title: this.$t('common.dob.address1'), text: customer.address1 },
      { title: this.$t('common.dob.address2'), text: customer.address2 },
      { title: this.$t('common.dob.address3'), text: customer.address3 },
      { title: this.$t('common.mail'), text: this.getAuthUserAttributes.email },
      { title: this.$t('common.phone'), text: customer.telephone },
    ];
  },
};
</script>

<style lang="scss" scoped>
.owner-info {
  margin-top: 51px;
  font-family: $font-family-primary;

  &__label {
    background-color: rgba($green, 0.1);
    height: 18px;
    font-size: 12px;
    color: $green;
    line-height: 18px;
    border-radius: 2px;
    padding: 0 8px;
    margin-right: auto;
    margin-left: auto;
    width: fit-content;
  }

  &__top {
    &-title {
      font-size: 24px;
      line-height: 30px;
      color: rgba($black, 0.6);
      margin-bottom: 5px;
    }

    &-subtitle {
      color: rgba($black, 0.5);
      font-size: $font-size-base;
      line-height: 21px;
    }
  }

  &::v-deep .info-box__item {
    align-items: flex-start !important;
  }
}
</style>
