// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="page-content bg-gray">
    <PageTitle logo />
    <div class="container">
      <div class="form-group mt-56 mb-40">
        <div class="contract-complete-notification">
          <div class="checked__icon">
            <i class="icon-fonts icon-fonts--check" />
          </div>
          <div
            class="complete-text"
            v-html="$t('success.complete_of_regis_insurance_br')"
          />
        </div>
      </div>
      <div class="form-group mb-40 px-3 pt-2">
        <p
          class="text-normal text-left color-red mb-4"
          v-html="$t('note.app_procedure_not_completed_br')"
        />
        <p class="text-normal text-left">
          「次へ」を押して、{{ petInfo.petName
          }}{{
            petInfo.petSexCd === '02' ? 'ちゃん' : 'くん'
          }}の告知情報（病歴）登録へとお進みください。
        </p>
      </div>
      <div class="page-button mt-52 pb-0">
        <BaseButton
          id="solicitationLanding_nextStep"
          btn-class="mw-279 tracking"
          :label="$t('common.button.next')"
          btn-full="btn--full"
          icon-right
          @click="nextStep"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '~/components/formItems/BaseButton';
import { mapGetters } from 'vuex';

export default {
  components: {
    BaseButton,
  },
  beforeRouteEnter(to, from, next) {
    if (
      ![
        'solicitation-confirm',
        'solicitation-additional_information',
        'solicitation-disease-declaration-heart',
      ].includes(from.name)
    ) {
      return next((vm) => vm.$router.push('/'));
    }

    next();
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'solicitation-confirm') {
      return next('/solicitation/step1/');
    }
    next();
  },
  data() {
    return {
      petInfo: {},
    };
  },
  mounted() {
    this.petInfo = this.getPetInfo;
  },
  computed: {
    ...mapGetters({ getPetInfo: 'contracts/getPetInfo' }),
  },
  methods: {
    nextStep() {
      localStorage.removeItem('disease_option');
      this.$router.push('/solicitation/disease/declaration/heart');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/pages/new-contract';
</style>
