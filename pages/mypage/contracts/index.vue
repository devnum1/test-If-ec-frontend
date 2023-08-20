// 01EZTX9M3AWK0ZB16B6KYR56F1
<!--マイページトップ-->
<template>
  <div class="page-content bg-gray">
    <Header title-page="PECO" />
    <div class="">
      <div v-if="notice.content" class="notice-container notice-pet">
        <div class="notice">
          <div class="notice__top">
            <div v-if="!notice.isCreditCardUnregistered" class="notice__icon" />
            <div class="notice__content">
              <span
                v-if="!notice.isCreditCardUnregistered"
                v-text="notice.content"
              />
              <div v-else class="text-center">
                <p
                  class="font-weight-bold mb-0"
                  v-text="notice.content.title"
                />
                <span v-text="notice.content.content" />
                <u
                  :class="{
                    'd-block cursor-pointer': !notice.contract.creditInfo,
                  }"
                >
                  <span
                    class="font-weight-bold"
                    @click="handleClick(notice)"
                    v-text="notice.content.link"
                  />
                </u>
              </div>
            </div>
          </div>
          <div
            v-if="!notice.isCreditCardUnregistered && notice.note"
            class="notice__note"
            @click="handleClick(notice)"
          >
            <span class="m-0 cursor-pointer">{{ notice.note }}</span>
          </div>
        </div>
      </div>
      <!--契約情報-->
      <VueSlickCarousel v-if="listContractInfo.length" v-bind="settings">
        <div
          v-for="contractInfo in listContractInfo"
          :key="contractInfo.policy.policyCode"
          class="slide-item"
        >
          <div class="slide-item--inner">
            <PetIdCard
              :pet-info="getPetInfo(contractInfo)"
              :product-info="
                _.get(contractInfo.policy, 'contractProductList[0]', {})
              "
              :policy-no="_.get(contractInfo.policy, 'policyCode', '')"
              :edit-card-pet="!contractInfo.isEnded"
              class="pet-card"
              @edit="goToNextPage(contractInfo, '/mypage/contracts/pet/')"
            />
            <p class="contract-no">
              {{ $t('common.contract.policy_number') }}：{{
                contractInfo.policy.policyCode
              }}
            </p>
            <div class="slide-item__pet-info">
              <div class="">
                <div class="title-rightline">
                  <p class="title-rightline--title">
                    {{ $t('common.contract.status') }}
                  </p>
                </div>
                <!--契約状態-->
                <p
                  class="contract-type"
                  v-html="
                    _.get(contractInfo, 'contractStatus.name').replace(
                      '\n',
                      '<br>'
                    )
                  "
                />

                <div class="contract-date">
                  {{ contractInfo.period }}
                </div>
                <!-- TODO：満期対応
                <div
                  v-if="_.get(contractInfo, 'hasBeenStopped', false)"
                  class="ended-text mt-3"
                  v-text="$t('page_contract.ended_text')"
                />
                -->
              </div>
              <div class="news">
                <div class="title-rightline mb-24">
                  <p class="title-rightline--title">{{ $t('common.news') }}</p>
                </div>
                <div class="news__container">
                  <div
                    class="news__item"
                    :class="[
                      contractInfo.isContractDetailActive
                        ? ''
                        : 'contract-disable',
                    ]"
                    @click="
                      goToNextPage(contractInfo, '/mypage/contracts/detail/')
                    "
                  >
                    <div>{{ $t('page_contract.confirm_detail_contract') }}</div>
                    <div class="news__desc">
                      {{ $t('page_contract.desc_detail_contract') }}
                    </div>
                  </div>
                  <div
                    class="news__item"
                    :class="[
                      contractInfo.isClaimActive ? '' : 'contract-disable',
                    ]"
                    @click="
                      goToNextPage(contractInfo, '/mypage/contracts/claim/')
                    "
                  >
                    <div>{{ $t('page_contract.confirm_insurance') }}</div>
                    <div class="news__desc">
                      {{ $t('page_contract.desc_insurance') }}
                    </div>
                  </div>
                  <!-- TODO：満期対応
                  <div>
                    v-if="_.get(contractInfo, 'hasPreContract', false)"
                    class="news__item"
                    @click="goToPreContract(contractInfo)"
                  >
                    <div>{{ $t('page_contract.maturity_info') }}</div>
                  </div>
                  -->
                  <div
                    class="news__item"
                    :class="[
                      contractInfo.isCardChangeActive ? '' : 'contract-disable',
                    ]"
                    @click="handleChangeEditPayment(contractInfo)"
                  >
                    <span v-text="$t('page_contract.change_card_data')" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </VueSlickCarousel>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import contract from '~/constants/contract';

import VueSlickCarousel from 'vue-slick-carousel';

import PetIdCard from '~/components/cards/PetIdCard';

import { ContractsAdapter } from '~/utils/contracts-adapter.class';
import { SortingType } from '~/utils/enums';
import moment from 'moment';
import Contract from '../../../constants/contract';
import { CheckDateType, EndCause } from '../../../utils/enums';

export default {
  components: {
    VueSlickCarousel,
    PetIdCard,
  },
  middleware: ['auth'],
  data() {
    return {
      listContractInfo: [],
      notice: {
        contract: null,
        content: null,
        note: null,
      },
      settings: {
        centerMode: true,
        centerPadding: '35px',
        focusOnSelect: true,
        infinite: false,
        slidesToShow: 1,
        speed: 500,
        button: false,
        arrows: false,
        responsive: [
          {
            breakpoint: 576,
            settings: {
              centerPadding: '28px',
            },
          },
          {
            breakpoint: 320,
            settings: {
              centerPadding: '12px',
            },
          },
        ],
      },
      constContract: contract,
    };
  },
  async fetch({ store }) {
    await store.dispatch('contracts/contractInfoForMyPage');
  },
  computed: {
    ...mapGetters({
      contractsList: 'contracts/getListContractInfo',
      petBreedList: 'contracts/getPetBreedList',
    }),
  },
  watch: {
    'notice.contract': {
      handler: function (_contract) {
        const adaptedContract = new ContractsAdapter();
        const name = _contract.policy.contractSubjectPetList[0].petName;

        let gender = '';
        switch (_contract.policy.contractSubjectPetList[0].gender) {
          case contract.pet_sex.MALE:
            gender = this.$t('common.kun');
            break;
          case contract.pet_sex.FEMALE:
            gender = this.$t('common.chan');
            break;
        }
        // クレジットカード情報入力待ち
        if (adaptedContract.isCreditCardUnregistered(_contract)) {
          this.notice.isCreditCardUnregistered = true;

          this.notice.content = {
            title: this.$t('error.couldnt_pay_need_reset.title'),
            content: this.$t('error.couldnt_pay_need_reset.content', {
              name,
              gender,
            }),
            link: this.$t('error.couldnt_pay_need_reset.link'),
          };
        } else if (!this.hasDocument(_contract)) {
          this.notice.content = this.$t('error.unregistered_pet_photo', {
            name,
            gender,
          });
          this.notice.note = this.$t('error.click_to_register');
        }
      },
    },
  },
  async created() {
    const { listOfAdaptedContracts, pendingContracts } = new ContractsAdapter()
      .init(this.contractsList)
      .adaptAll()
      .setPendingContracts(this.hasDocument)
      .sort(SortingType.DESCENDING);

    if (!listOfAdaptedContracts.length) {
      this.notice.content = this.$t('contract_pet.no_contracts');

      return;
    }

    this.listContractInfo = listOfAdaptedContracts;

    if (pendingContracts.length) {
      this.notice.contract = this.getPriorityContract(pendingContracts);
    }
  },
  methods: {
    // TODO 満期処理
    // goToPreContract(contractInfo) {
    //   const preContract = this.contractsList.contractInfo.find(
    //     ({policyNo}) => policyNo === contractInfo?.prePolicyNo
    //   );
    //
    //   this.goToNextPage(preContract, '/mypage/precontracts/');
    // },

    handleClick({ contract, isCreditCardUnregistered }) {
      if (
        Boolean(contract?.policy.contractPolicyHolder.cardSeq) &&
        isCreditCardUnregistered
      ) {
        return;
      }

      let linkRedirect = '';

      switch (true) {
        case isCreditCardUnregistered:
          linkRedirect = '/mypage/contracts/payment/new/';
          break;
        case !this.hasDocument(contract):
          linkRedirect = '/mypage/contracts/pet/';
          break;
      }

      this.goToNextPage(contract, linkRedirect);
    },

    getPriorityContract(listContract) {
      return listContract.reduce(function (contractX, contractY) {
        return contractX.policy.policyCode > contractY.policy.policyCode
          ? contractX
          : contractY;
      });
    },

    setPolicyId(policyId) {
      this.$store.commit('contracts/setPolicyId', policyId);
    },

    goToNextPage(dataContract, linkRedirect) {
      this.setPolicyId(dataContract.policy.policyId);
      this.$router.push(linkRedirect);
    },

    // 支払い情報編集
    handleChangeEditPayment(contractInfo) {
      localStorage.setItem(
        'credit_card',
        _.get(contractInfo.policy, 'contractPolicyHolder.cardMaskNumber')
      );
      localStorage.removeItem('refresh');

      // policyIdをセット
      this.setPolicyId(contractInfo.policy.policyId);

      this.$router.push('/mypage/contracts/payment/edit/');
    },

    hasDocument(_contract) {
      return _contract.policy.contractSubjectPetList[0].petPhotoDoc;
    },

    today() {
      return moment().format('YYYYMMDDHHmmss');
    },

    getPetInfo(_contract) {
      let petInfo = _contract.policy.contractSubjectPetList[0];
      const petBreed = this.petBreedList.findLast((e) => {
        return e.listId === petInfo.petBreed;
      });
      petInfo['petBreedDesc'] = petBreed?.typeName ?? '';

      return petInfo;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/pages/slide-page';

.ended-text {
  white-space: break-spaces;
  max-width: fit-content;
  margin: auto;
  color: rgba($black, 0.5);
}

::v-deep.pet-card {
  height: 250px;

  @include breakpoint-down(smallnormal) {
    height: 225px;
  }

  .pet-name {
    margin-bottom: 20px;

    @include breakpoint-down(smallnormal) {
      margin-bottom: 6px;
    }
  }

  .id-card__pet-info-container {
    min-height: 150px;
  }
}
</style>
