<template>
  <div class="page-content bg-gray">
    <Header
      btn-back="/mypage/contracts"
      :logo="false"
      :title-page="$t('contract_id.title_page_detail')"
    />
    <div class="container contract-info">
      <div class="d-flex mb-4 justify-content-between align-items-center">
        <div class="rules-title mb-0">
          {{ $t('contract_id.title_insurance_contract') }}
        </div>
      </div>

      <div class="contract-card mb-57">
        <div class="contract-card__title pt-2">
          <p>{{ $t('contract_id.product_name') }}</p>
          <p>
            {{
              contractInfo.policy
                ? contractInfo.policy.contractProductList[0].planCode ===
                  'L9999001-01'
                  ? constContract.plan_rate.SEVENTY.name
                  : constContract.plan_rate.FIFTY.name
                : ''
            }}
          </p>
        </div>
        <div v-if="isStatusNot11" class="contract-card__date">
          {{ $t('contract_id.insurance_FromTo') }}
          {{
            contractInfo.policy
              ? getFormatDate(contractInfo.policy?.validateDate)
              : ''
          }}
          〜
          {{
            contractInfo.policy
              ? getFormatDate(contractInfo.policy?.expiryDate)
              : ''
          }}
        </div>
      </div>

      <div class="d-flex mb-4 justify-content-between align-items-center">
        <div class="rules-title mb-0">
          {{ $t('contract_id.title_condition_contract') }}
        </div>
        <a class="text-dark-gray"
          >{{ currentDate }}{{ $t('contract_id.current_date') }}</a
        >
      </div>

      <div class="contract-card mb-15">
        <div class="contract-card__title m-0">
          <p
            class="contract-type"
            v-html="
              _.get(contractInfo, 'contractStatus.name', '').replace(
                '\n',
                '<br>'
              )
            "
          />
        </div>
      </div>

      <div v-if="!isEnded && isStatusNot11" class="update-schedule">
        <div class="update-schedule__date">
          <div>
            {{
              contractInfo.policy
                ? getFormatDate(contractInfo.policy?.expiryDate)
                : ''
            }}
            {{ $t('contract_id.schedule_updated') }}
          </div>
        </div>
      </div>

      <!-- TODO: 満期関連ロジックのため、あとで確認実装 -->
      <!--      <div v-if="isShow" class="contract-info__expiration mt-40">-->
      <!--        <p-->
      <!--          v-if="hasBeenEdited"-->
      <!--          class="m-0"-->
      <!--          v-text="$t('contract_id.has_been_edited')"-->
      <!--        />-->
      <!--        <p-->
      <!--          v-else-->
      <!--          class="m-0"-->
      <!--          v-html="-->
      <!--            $t('contract_id.expiration', {-->
      <!--              year: _.get(-->
      <!--                contractInfo,-->
      <!--                'productInfo.insDateTo',-->
      <!--                '&mdash;'-->
      <!--              ).replace(/(\d{4})\d{2}\d{2}/, '$1'),-->
      <!--              month: +_.get(-->
      <!--                contractInfo,-->
      <!--                'productInfo.insDateTo',-->
      <!--                '&mdash;'-->
      <!--              ).replace(/\d{4}(\d{2})\d{2}/, '$1'),-->
      <!--              day: +_.get(-->
      <!--                contractInfo,-->
      <!--                'productInfo.insDateTo',-->
      <!--                '&mdash;'-->
      <!--              ).replace(/\d{4}\d{2}(\d{2})/, '$1'),-->
      <!--            })-->
      <!--          "-->
      <!--        />-->
      <!--        <p-->
      <!--          v-if="!hasBeenEdited && isToday"-->
      <!--          class="m-0"-->
      <!--          v-text="$t('contract_id.not_change')"-->
      <!--        />-->
      <!--        <base-button-->
      <!--          :label="$t('contract_id.button.change')"-->
      <!--          :disabled="hasBeenEdited || isToday || isCanceled"-->
      <!--          btn-class="mt-3 tracking"-->
      <!--          btn-size="mw-183"-->
      <!--          btn-green-outline-->
      <!--          @click="changePath"-->
      <!--        />-->
      <!--      </div>-->

      <div class="d-flex mb-4 justify-content-between align-items-center mt-56">
        <div class="rules-title mb-0">
          {{ $t('contract_id.title_pet_info') }}
        </div>
      </div>
      <InfoBox class="mb-57 pet-detail" :data-info="dataInfo" />

      <div class="d-flex mb-4 justify-content-between align-items-center">
        <div class="rules-title mb-0">
          {{ $t('contract_id.title_claim_detail') }}
        </div>
      </div>
      <div class="info-box contract-info-table mb-57">
        <ul class="info-box__list">
          <li
            class="info-box__item d-flex align-items-center justify-content-between mb-15"
          >
            <div class="info-box__title text-">
              {{ $t('contract_id.payment_system') }}
            </div>
            <div class="info-box__text text-right text-darker">
              <span class="font-24px">
                {{
                  contractInfo.policy
                    ? contractInfo.policy.contractProductList[0].planCode ===
                      'L9999001-01'
                      ? constContract.plan_rate.SEVENTY.rate * 100
                      : constContract.plan_rate.FIFTY.rate * 100
                    : 0
                }}
              </span>
              <span class="unit font-10px"> %</span>
            </div>
          </li>
          <li
            class="info-box__item d-flex align-items-center justify-content-between mb-15"
          >
            <div class="info-box__title text-">
              {{ $t('contract_id.no_resident') }}
            </div>
            <div
              v-if="contractInfo.policy"
              class="info-box__text text-right text-darker"
            >
              {{ $t('contract_id.maximum') }}
              {{ 300000 | formatPrice }}
              {{ $t('contract_id.up_to_year') }}
            </div>
          </li>
          <li
            class="info-box__item d-flex align-items-center justify-content-between mb-15"
          >
            <div class="info-box__title text-">
              {{ $t('contract_id.to_hospital') }}
            </div>
            <div
              v-if="contractInfo.policy"
              class="info-box__text text-right text-darker"
            >
              {{ $t('contract_id.maximum') }}
              {{ 600000 | formatPrice }}
              {{ $t('contract_id.up_to_year') }}
            </div>
          </li>
          <li
            class="info-box__item d-flex align-items-center justify-content-between"
          >
            <div class="info-box__title text-">
              {{ $t('contract_id.dissection') }}
            </div>
            <div
              v-if="contractInfo.policy"
              class="info-box__text text-right text-darker"
            >
              {{ $t('contract_id.maximum') }}
              {{ 300000 | formatPrice }}
              {{ $t('contract_id.up_to_year') }}
            </div>
          </li>
        </ul>
      </div>

      <div class="d-flex mb-4 justify-content-between align-items-center">
        <div class="rules-title mb-0">
          {{ $t('contract_id.title_condition_guarantee') }}
        </div>
      </div>
      <div class="explain mb-15" v-html="$t('contract_id.noti_insurance')" />

      <div class="sick-box mb-57">
        <div class="sick-box__content">
          <ul
            v-for="disease in diseaseList"
            :key="disease.id"
            class="sick-box__list font-12px"
          >
            <li class="sick-box__item">
              {{ disease.text }}
            </li>
          </ul>
          <p v-if="diseaseList.length === 0" class="sick-box__item">
            {{ $t('illness.no_disease') }}
          </p>
        </div>
      </div>

      <div class="d-flex mb-4 justify-content-between align-items-center">
        <div class="rules-title mb-0">
          {{ $t('contract_id.title_view_document') }}
        </div>
      </div>
      <div class="info-box contract-info-table mb-57 view-document">
        <ul class="info-box__list">
          <li
            onclick="window.open('/pdf/terms_and_conditions.pdf', '_blank')"
            class="info-box__item d-flex align-items-center justify-content-between"
          >
            <div class="info-box__title text-">
              <span>{{ $t('contract_id.title_terms') }}</span>
              <span class="green-tag">PDF</span>
            </div>
            <div class="info-box__text text-right text-darker icon-view mr-2">
              <i class="icon-fonts icon-fonts--back" />
            </div>
          </li>
          <li
            onclick="window.open('/pdf/important_matters.pdf', '_blank')"
            class="info-box__item d-flex align-items-center justify-content-between"
          >
            <div class="info-box__title text-">
              <span>{{ $t('contract_id.important_problem') }}</span>
              <span class="green-tag">PDF</span>
            </div>
            <div class="info-box__text text-right text-darker icon-view mr-2">
              <i class="icon-fonts icon-fonts--back" />
            </div>
          </li>
        </ul>
      </div>

      <div class="d-flex mb-4 justify-content-between align-items-center">
        <div class="rules-title mb-0">
          {{ $t('contract_id.title_payment_contract') }}
        </div>
      </div>
      <div class="info-box contract-info-table mb-57">
        <ul class="info-box__list">
          <li
            class="info-box__item d-flex align-items-center justify-content-between"
          >
            <div class="info-box__title text-">
              {{ $t('contract_id.method_refund') }}
            </div>
            <div class="info-box__text text-right text-darker">
              {{ $t('contract_id.monthly_payment') }}
            </div>
          </li>
          <li
            class="info-box__item d-flex align-items-center justify-content-between"
          >
            <div class="info-box__title text-">
              {{ $t('contract_id.insurance_premium') }}
            </div>
            <div class="info-box__text text-right text-darker">
              <span class="font-24px">
                {{
                  _.get(
                    contractInfo.policy,
                    'contractProductList[0].premTerm',
                    ''
                  ) | formatPrice
                }}
              </span>
              <span class="font-10px"> {{ $t('contract_id.unit_money') }}</span>
            </div>
          </li>
          <li
            class="info-box__item d-flex justify-content-between contain-table"
          >
            <div class="info-box__title text-">
              {{ $t('contract_id.insurance_date') }}
            </div>
            <div class="info-box__text text-right text-darker table-inside">
              <div class="payment-date">
                {{ $t('contract_id.payment_date') }}
              </div>
            </div>
          </li>
          <li>
            <div class="noti-anniversary">
              {{ $t('contract_id.noti_anniversary') }}
            </div>
          </li>
        </ul>
      </div>

      <div
        v-if="_.get(contractInfo, 'policy.contractPolicyHolder.cardSeq')"
        class="credit-card pb-72"
      >
        <div class="mb-4">
          <div class="rules-title mb-0">
            {{ $t('contract_id.payment_info') }}
          </div>
        </div>
        <InfoBox class="mb-57 payment" :data-info="paymentInfo" />
      </div>
      <!-- <ButtonBack
        class="pb-35"
        :label="$t('common.button.return_previous')"
        @click="$router.push('/mypage/contracts/')"
      /> -->
    </div>
  </div>
</template>

<script>
import moment from 'moment';

import contract from '~/constants/contract';
import { get } from 'lodash';
import { mapActions, mapState } from 'vuex';

import InfoBox from '~/components/cards/InfoBox';

import { ContractsAdapter } from '~/utils/contracts-adapter.class';

export default {
  components: { InfoBox },
  middleware: ['auth'],
  async asyncData({ store }) {
    await store.dispatch('contracts/contractInfoForMyPage');
    await store.dispatch('contracts/FetchDogBreed');
  },
  data() {
    return {
      constContract: contract,
      contractInfo: {
        futureContract: undefined,
      },
      currentDate: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
      dataInfo: [],
      paymentInfo: [],
      diseaseList: [],
      cardInfo: {
        cardNo: null,
        expire: null,
      },
    };
  },
  computed: {
    ...mapState({
      policyId: (state) => state.contracts.policyId,
      listContractInfo: (state) => state.contracts.listContractInfo,
      dogBreeds: (state) => state.contracts.dogBreeds,
    }),
    isEnded() {
      return false;
      //return this.contractInfo?.contractStatus?.name === StatusText.ENDED;
    },

    // TODO 満期関連ロジックのため、あとで確認実装
    isStatusNot11() {
      // return this.contractInfo?.insApplicationStatus !== StatusType.STATUS_11;
      return true;
    },

    // TODO 満期関連ロジックのため、あとで確認実装
    // hasBeenEdited() {
    //   return (
    //     this.contractInfo?.futureContract?.insApplicationStatus !==
    //     StatusType.STATUS_O2
    //   );
    // },

    // TODO 満期関連ロジックのため、あとで確認実装
    // isShow() {
    //   return this.contractInfo?.futureContract;
    // },

    // TODO 満期関連ロジックのため、あとで確認実装
    // isToday() {
    //   return (
    //     this.contractInfo?.productInfo?.insDateTo ===
    //     moment().format('YYYYMMDD')
    //   );
    // },

    // TODO 満期関連ロジックのため、あとで確認実装
    // isCanceled() {
    //   return !!this.contractInfo?.insContractInfo;
    // },
  },
  beforeMount() {
    window.addEventListener('pagehide', this.preventNav);
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('pagehide', this.preventNav);
    });
  },
  async created() {
    if (!this.policyId) {
      this.$store.commit(
        'contracts/setPolicyId',
        JSON.parse(localStorage.getItem('policyId_refresh'))
      );
      localStorage.removeItem('policyId_refresh');
    }

    if (this.policyId) {
      const { adaptedContract } = new ContractsAdapter()
        .init(this.listContractInfo)
        .adaptBy(this.policyId);

      this.contractInfo = adaptedContract;

      const petInfo = get(
        this.contractInfo,
        'policy.contractSubjectPetList[0]'
      );

      if (petInfo.petType === this.constContract.pet_type.DOG) {
        this.dataInfo = this.getDogDataInfo(petInfo);
      } else {
        this.dataInfo = this.getCatDataInfo(petInfo);
      }

      // カード情報取得
      this.cardInfo = await this.getContractCardInfo(this.policyId);
      this.paymentInfo = this.getPaymentInfo();
    }

    // Todo: 契約情報から病歴告知情報を取得し、diseaseList に格納
    // let exclusionSpRuleInfo = get(this.contractInfo, 'exclusionSpRuleInfo');
    // _.forEach(exclusionSpRuleInfo, ({ exclusionSpProperty }) => {
    //   this.diseaseList.push(exclusionSpProperty);
    // });

    // TODO 満期関連ロジックのため、あとで確認実装
    // this.contractInfo.futureContract =
    //   this.listContractInfo?.contractInfo?.find(
    //     ({ prePolicyNo }) => prePolicyNo === this.contractInfo?.policyNo
    //   );
  },

  methods: {
    ...mapActions({
      getContractCardInfo: 'payments/contractCardInfo',
    }),
    getDogDataInfo(petInfo) {
      const info = [];
      info.push({ title: this.$t('common.owner.name'), text: petInfo.petName });
      info.push({
        title: this.$t('common.pet.pet_type'),
        text: this.$t('common.pet.dog'),
      });

      const dogBreed = this.dogBreeds.find(
        (obj) => obj.listId === petInfo.petBreed
      );
      info.push({
        title: this.$t('contract_pet.pet_contract_type'),
        text: dogBreed.typeName,
      });

      if (
        petInfo.petBreed === this.constContract.pet_breed_id.MIX ||
        petInfo.petBreed === this.constContract.pet_breed_id.OTHER_BREED
      ) {
        const petWeight = Number(petInfo.weight).toFixed(1);
        info.push({ title: this.$t('common.weight'), text: `${petWeight}kg` });
      }

      const gender = petInfo.gender === 'M' ? '男の子' : '女の子';
      info.push({ title: this.$t('common.gender.gender_title'), text: gender });

      const contraception = petInfo.contraception === 'Y' ? 'あり' : 'なし';
      info.push({
        title: this.$t('common.contraception_status.title'),
        text: contraception,
      });

      const div =
        petInfo.birthDateDiv === this.constContract.pet_birthday.TRUE.id
          ? '確定'
          : '推定';
      info.push({
        title: this.$t('common.dob.title'),
        text: this.petBirthday(petInfo.birthDate, div),
      });

      return info;
    },

    getCatDataInfo(petInfo) {
      const info = [];
      info.push({ title: this.$t('common.owner.name'), text: petInfo.petName });
      info.push({
        title: this.$t('common.pet.pet_type'),
        text: this.$t('common.pet.cat'),
      });

      const gender = petInfo.gender === 'M' ? '男の子' : '女の子';
      info.push({ title: this.$t('common.gender.gender_title'), text: gender });

      const contraception = petInfo.contraception === 'Y' ? 'あり' : 'なし';
      info.push({
        title: this.$t('common.contraception_status.title'),
        text: contraception,
      });

      const div =
        petInfo.birthDateDiv === this.constContract.pet_birthday.TRUE.id
          ? '確定'
          : '推定';
      info.push({
        title: this.$t('common.dob.title'),
        text: this.petBirthday(petInfo.birthDate, div),
      });

      return info;
    },

    getPaymentInfo() {
      try {
        const info = [];

        info.push(
          {
            title: this.$t('contract_id.card_number'),
            text: this.cardInfo?.cardNo,
          },
          {
            title: this.$t('contract_id.expire'),
            text: this.expireLabel(this.cardInfo?.expire),
          },
          { title: this.$t('contract_id.security_code'), text: '***' }
        );

        return info;
      } catch (e) {
        throw e;
      }
    },

    petBirthday(petBirthday, petBirthdayDiv) {
      const formattedDate = moment(petBirthday).format('YYYY/MM');
      return `${formattedDate} (${petBirthdayDiv})`;
    },

    getFormatDate(date) {
      return moment(date).format('YYYY/MM/DD');
    },

    preventNav() {
      localStorage.setItem('policyId_refresh', this.policyId);
    },

    expireLabel(value) {
      if (!value) {
        return '/';
      }
      return value.substr(2) + '/' + value.substr(0, 2);
    },

    // TODO 満期関連ロジックのため、あとで確認実装
    // changePath() {
    //   this.$store.commit('contracts/setContractId', {
    //     policyNo: this.contractInfo?.futureContract.policyNo,
    //     subscriberNo: this.contractInfo?.futureContract.subscriberNo,
    //   });
    //
    //   this.$router.push('/mypage/contracts/contractrenewal');
    // },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/components/info-box';
@import '~/assets/scss/pages/dp-0045';
</style>
