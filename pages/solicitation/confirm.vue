// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="page-content bg-gray">
    <PageTitle :title="$t('contract_confirm.page_title')" />
    <div class="container pb-1">
      <StepProgress :step-list="constContract.step_progress" current="5" />
      <div class="form-group mb-41" />
      <div class="form-group mb-24">
        <div class="headline-change">
          <div class="headline-change__title">
            {{ $t('common.selected_plan') }}
          </div>
          <div class="headline-change__change-link">
            <nuxt-link
              id="solicitationConfirm_changePlan"
              class="tracking"
              :to="{ path: '/solicitation/step2/', hash: 'edit' }"
            >
              {{ $t('common.change') }}
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="form-group mb-34">
        <SelectedInsuranceCard
          :compensation="`${getCompensateRate}%`"
          :price="calculationResult ? calculationResult.calcResult : ''"
        />
      </div>
      <BaseButton
        id="solicitationConfirm_submit_top"
        btn-class="test tracking"
        :label="$t('common.button.complete_app')"
        btn-full="btn--full"
        icon-right
        class="btn-confim"
        @click="handleConfirmRegistration"
      />
      <div class="form-group mb-24">
        <div class="headline-change">
          <div class="headline-change__title">
            {{ $t('note.about.insFromTo') }}
          </div>
          <div class="headline-change__change-link">
            <nuxt-link
              id="solicitationConfirm_changeInsStartDateInfo"
              class="tracking"
              :to="{ path: '/solicitation/step1/', hash: 'edit' }"
            >
              {{ $t('common.change') }}
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="form-group mb-40">
        <div>
          <span>
            {{ validateDate ? getFormatDate(validateDate) : '' }}
          </span>
          <span>~</span>
          <span>
            {{ expiryDate ? getFormatDate(expiryDate) : '' }}
          </span>
        </div>
      </div>

      <div class="form-group mb-24">
        <div class="headline-change">
          <div class="headline-change__title">
            {{ $t('note.about.my_child') }}
          </div>
          <div class="headline-change__change-link">
            <nuxt-link
              id="solicitationConfirm_changePetInfo"
              class="tracking"
              :to="{ path: '/solicitation/step1/', hash: 'edit' }"
            >
              {{ $t('common.change') }}
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="form-group mb-57">
        <div class="information-table info-table table--double">
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.owner.name') }}
            </div>
            <div class="info-table__content">
              {{ dataContract.petName }}
            </div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.pet.pet_type') }}
            </div>
            <div class="info-table__content">
              {{
                dataContract.petType === constContract.pet_type.DOG
                  ? $t('common.pet.dog')
                  : $t('common.pet.cat')
              }}
            </div>
          </div>
          <div v-if="dataContract.petBreed" class="information-table__row">
            <div class="info-table__label">
              {{ $t('contract_confirm.pet_contract_type') }}
            </div>
            <div class="info-table__content">
              {{ showPetBreed }}
            </div>
          </div>
          <div v-if="dataContract.petWeight" class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.weight') }}
            </div>
            <div class="info-table__content">
              {{ dataContract.petWeight }}kg
            </div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.gender.gender_title') }}
            </div>
            <div class="info-table__content">
              {{
                dataContract.petSexCd === constContract.pet_sex.MALE
                  ? $t('common.gender.boy')
                  : $t('common.gender.girl')
              }}
            </div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.contraception_status.title') }}
            </div>
            <div class="info-table__content">
              {{
                dataContract.noticeCd01 ==
                constContract.pet_notice_contraception.YES
                  ? $t('common.yep')
                  : $t('common.none')
              }}
            </div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.dob.title') }}
            </div>
            <div class="info-table__content">
              {{ dataContract.petBirthday }}
              ({{
                dataContract.petBirthdayDiv ==
                constContract.pet_birthday.TRUE.id
                  ? $t('common.dob.confirm')
                  : $t('common.dob.estimated')
              }})
            </div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('contract_confirm.notice_disease') }}
            </div>
            <div class="info-table__content">
              {{
                dataContract.noticeCd02 == constContract.pet_notice_illness.NONE
                  ? $t('common.contraception_status.none')
                  : dataContract.noticeCd02 ==
                    constContract.pet_notice_illness.YES
                  ? $t('common.contraception_status.yep')
                  : $t('common.none')
              }}
            </div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('contract_confirm.ins_pet_register') }}
            </div>
            <div class="info-table__content">
              {{
                dataContract.petInsJoinFlg ==
                constContract.pet_other_insurance.NONE
                  ? $t('common.contraception_status.none')
                  : $t('common.contraception_status.yep')
              }}
            </div>
          </div>
        </div>
      </div>

      <div class="form-group mb-24">
        <div class="headline-change">
          <div class="headline-change__title">
            {{ $t('note.about.owner') }}
          </div>
          <div
            v-if="!isCustomerInfoRegistered"
            class="headline-change__change-link"
          >
            <nuxt-link
              id="solicitationConfirm_changeOwnerInfo"
              class="tracking"
              :to="{ path: '/solicitation/step4/', hash: 'edit' }"
            >
              {{ $t('common.change') }}
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="form-group mb-40">
        <div class="information-table table--double">
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.owner.name') }}
            </div>
            <div class="info-table__content">
              {{ dataCustomerInfo.lastName1 }}
              {{ dataCustomerInfo.firstName1 }}
            </div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.name.name_kana') }}
            </div>
            <div class="info-table__content">
              {{ dataCustomerInfo.lastName2 }}
              {{ dataCustomerInfo.firstName2 }}
            </div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.gender.gender_title') }}
            </div>
            <div class="info-table__content">
              {{
                dataCustomerInfo.gender === 'M'
                  ? constContract.gender.MALE.name
                  : constContract.gender.FEMALE.name
              }}
            </div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.dob.birthday') }}
            </div>
            <div class="info-table__content">
              {{ dataCustomerInfo.birthDate ? dataCustomerInfo.birthDate : '' }}
            </div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.postal_code') }}
            </div>
            <div class="info-table__content">
              {{ dataCustomerInfo.postCode }}
            </div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.dob.prefectureCode') }}
            </div>
            <div class="info-table__content">
              {{ dataCustomerInfo.prefectureCode }}
            </div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.dob.address1') }}
            </div>
            <div class="info-table__content">
              {{ dataCustomerInfo.address1 }}
            </div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.dob.address2') }}
            </div>
            <div class="info-table__content">
              {{ dataCustomerInfo.address2 }}
            </div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.dob.address3') }}
            </div>
            <div class="info-table__content">
              {{ dataCustomerInfo.address3 }}
            </div>
          </div>
          <div class="information-table__row information-table__mail">
            <span class="info-table__label">
              {{ $t('common.mail') }}
            </span>
            <span
              ref="refEmail"
              class="info-table__content"
              v-html="txtEmail"
            />
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.phone') }}
            </div>
            <div class="info-table__content">
              {{ dataCustomerInfo.telephone }}
            </div>
          </div>
        </div>
      </div>
      <BaseButton
        id="solicitationConfirm_submit_bottom"
        btn-class="test tracking"
        :label="$t('common.button.complete_app')"
        btn-full="btn--full"
        icon-right
        class="btn-confim"
        @click="handleConfirmRegistration"
      />
    </div>
  </div>
</template>

<script>
import contract from '~/constants/contract';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import moment from 'moment';
import SelectedInsuranceCard from '~/components/cards/SelectedInsuranceCard';
import BaseButton from '~/components/formItems/BaseButton';

export default {
  components: { BaseButton, SelectedInsuranceCard },
  middleware: ['auth'],
  async asyncData({ $helpers, store }) {
    // TODO:
    $helpers.setDataFromLocalToVuex();

    if (store.state.contracts.dogBreeds.length === 0) {
      await store.dispatch('contracts/FetchDogBreed');
    }
  },
  data() {
    return {
      constContract: contract,
      dataContract: {},
      dataCustomerInfo: {},
      txtEmail: '',
      moment,
      calculationResult: null,
      expiryDate: '', ///product/NWEB002のレスポンスから取得
      validateDate: '', ///product/NWEB002のレスポンスから取得
    };
  },
  computed: {
    ...mapState({
      repProductCd: (state) => state.contracts.repProductCd,
      customerInfo: (state) => state.contracts.customerInfo,
      petInfo: (state) => state.contracts.petInfo,
      contractDuplicate: (state) => state.contracts.contractDuplicate,
    }),
    ...mapGetters({
      getDogBreed: 'contracts/getDogBreed',
    }),

    showPetBreed() {
      let nameBreed = this.getDogBreed.find(
        (it) => it.listId == this.dataContract.petBreed
      );
      return nameBreed.typeName;
    },
    getCompensateRate() {
      const plan = this.repProductCd;
      if (!plan) {
        return 0;
      }
      return plan === contract.plan_code.SEVENTY ? 70 : 50;
    },
    // versionが2以上であるということは一度以上、NWEB008(ユーザー情報更新)にてユーザー情報が登録されたということ
    isCustomerInfoRegistered() {
      return this.dataCustomerInfo && this.dataCustomerInfo.version > 1;
    },
  },
  beforeMount() {
    window.addEventListener('pagehide', this.preventNav);
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('pagehide', this.preventNav);
    });
  },
  async created() {
    localStorage.removeItem('reload');
    // petInfoがない = 新規契約とみなし、authから取得したaffinityCodeから申し込み情報取得APIを叩き、
    // storeのpetInfoを復元する
    if (!this.petInfo) {
      await this.fetchProposal();
    }
    this.dataContract = this.petInfo;

    if (this.customerInfo) {
      this.dataCustomerInfo = this.customerInfo;
    } else {
      const storeCustomer = await this.getCustomerInfo();

      (storeCustomer.birthDate = storeCustomer.birthDate.replace(
        /(\d{4})-(\d{2})-(\d{2})/,
        '$1/$2/$3'
      )),
        (this.dataCustomerInfo = storeCustomer);
    }
    const email = this.dataCustomerInfo.email;
    this.txtEmail = email;

    // TODO
    // ここで、保険料計算を再計算しているが申し込み情報取得APIでstep2で計算した保険料を取得できるので
    // それを利用した方がいいかもしれない。相談し必要なら修正すること
    const premiumInfo = await this.premiumCalculation();
    this.validateDate = premiumInfo.validateDate;
    this.expiryDate = premiumInfo.expiryDate;
    const targetPlan = premiumInfo.planList.find(
      (plan) => plan.planCode === this.repProductCd
    );
    this.calculationResult = targetPlan;
  },
  mounted() {
    if (this.$refs.refEmail.clientHeight > 40) {
      this.txtEmail = this.txtEmail.split('@').join('<br>@');
    }
  },
  methods: {
    ...mapActions({
      newContract: 'contracts/newContract',
      getCustomerInfo: 'contracts/customerInfo',
      updateCustomerInfo: 'contracts/updateCustomerInfo',
      premiumCalculation: 'contracts/premiumCalculation',
      fetchProposal: 'contracts/fetchProposal',
    }),
    ...mapMutations({
      setPetInfo: 'contracts/setPetInfo',
      setCustomerInfo: 'contracts/setCustomerInfo',
      setRepProductCd: 'contracts/setRepProductCd',
      setPolicyId: 'contracts/setPolicyId',
    }),
    getFormatDate(date) {
      return moment(date).format('YYYY年MM月DD日');
    },
    preventNav() {
      this.$helpers.setDataFromVuexToLocal(
        'productCd',
        'customerInfo',
        'contract_duplicate'
      );
    },
    async handleConfirmRegistration() {
      // ユーザー情報が登録されていない場合、登録する
      if (!this.isCustomerInfoRegistered) {
        await this.updateCustomerInfo(this.dataCustomerInfo);
      }

      const payload = {
        validateDate: this.validateDate,
        expiryDate: this.expiryDate,
        totalPremAf: this.calculationResult.calcResult,
        repProductCd: this.repProductCd,
      };

      const response = await this.newContract(payload);

      if (response) {
        // TODO:レスポンス内容によって、遷移先を制御
        // W.病歴がある場合
        // Y.審査自動通過の場合
        // N.審査の場合
        if (response.isAutoUwPass === 'W') {
          this.$router.push('/solicitation/landing/');
        } else if (response.isAutoUwPass === 'Y') {
          this.setPolicyId(response.policy.policyId);
          this.$router.push('/solicitation/contracts/payment/new/');
        } else if (response.isAutoUwPass === 'N') {
          this.$router.push('/solicitation/contracts/assessment/');
        }
      } else {
        // return this.$router.push('/errors/system_error');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/pages/new-contract';
::v-deep.btn-pdf {
  padding: 9px 15px 9px 36px !important;
}
.btn-confim {
  max-width: 279px;
  margin: 0 auto;
  margin-bottom: 76px;
}
</style>
