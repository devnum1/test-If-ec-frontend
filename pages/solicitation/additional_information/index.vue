// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="page-content bg-gray">
    <PageTitle :title="$t('illness.illness_history')" />
    <div class="container">
      <div v-if="isInsStartDateGenerated" class="insStartDateInform">
        <p class="insStartDateInform__text">
          {{ $t('note.insStartDate_inform') }}
        </p>
        <BaseInputCheckbox
          v-if="!isInsStartDateGeneratedConfirm"
          id="solicitationAdditionalInsStartDate_agree"
          v-model="isInsStartDateGeneratedConfirm"
          :checked="isInsStartDateGeneratedConfirm"
          :label="$t('note.insStartDate_agree')"
          class="tracking"
        />
      </div>
      <div v-if="isInsStartDateGeneratedConfirm">
        <div class="illness-history">
          <div class="pet-info">
            <div class="pet-info__wrapper">
              <div class="pet-info__title">
                <span class="pet-info__text">
                  “{{ _.get(petInfo, 'petName', '') }}
                  {{
                    _.get(petInfo, 'petSexCd', '') == constContract.pet_sex.MALE
                      ? $t('common.kun')
                      : $t('common.chan')
                  }}”
                </span>
                <span>{{ $t('common.tell_some_pet_info') }}</span>
              </div>
              <ul class="pet-info__list">
                <li class="pet-info__item justify-content-between">
                  <div class="pet-info__item-left">
                    {{ $t('common.pet.pet_type') }}
                  </div>
                  <div class="pet-info__item-right">
                    {{
                      _.get(petInfo, 'petType', '') ==
                      constContract.pet_type.DOG
                        ? $t('common.pet.dog')
                        : $t('common.pet.cat')
                    }}
                  </div>
                </li>
                <li
                  v-if="_.get(petInfo, 'petBreed', false)"
                  class="pet-info__item justify-content-between"
                >
                  <div class="pet-info__item-left">
                    {{ $t('contract_confirm.pet_contract_type') }}
                  </div>
                  <div class="pet-info__item-right">
                    {{ showPetBreed }}
                  </div>
                </li>
                <li
                  v-if="_.get(petInfo, 'petWeight', false)"
                  class="pet-info__item justify-content-between"
                >
                  <div class="pet-info__item-left">
                    {{ $t('common.weight') }}
                  </div>
                  <div class="pet-info__item-right">
                    {{ _.get(petInfo, 'petWeight', '') }}kg
                  </div>
                </li>
                <li class="pet-info__item justify-content-between">
                  <div class="pet-info__item-left">
                    {{ $t('common.gender.gender_title') }}
                  </div>
                  <div class="pet-info__item-right">
                    {{
                      _.get(petInfo, 'petSexCd', '') ==
                      constContract.pet_sex.MALE
                        ? listProductInfo.insTargetProperty.petSexCd[0]
                            .propDispNm
                        : listProductInfo.insTargetProperty.petSexCd[1]
                            .propDispNm
                    }}
                  </div>
                </li>
                <li class="pet-info__item justify-content-between">
                  <div class="pet-info__item-left">
                    {{ $t('common.contraception_status.title') }}
                  </div>
                  <div class="pet-info__item-right">
                    {{
                      _.get(petInfo, 'noticeCd01', '') ==
                      constContract.pet_notice_cd01.YES
                        ? listProductInfo.noticeInfo[0].noticeContent
                            .selection[0].name
                        : listProductInfo.noticeInfo[0].noticeContent
                            .selection[1].name
                    }}
                  </div>
                </li>
                <li class="pet-info__item justify-content-between">
                  <div class="pet-info__item-left">
                    {{ $t('common.dob.title') }}
                  </div>
                  <div class="pet-info__item-right">
                    {{ _.get(petInfo, 'petBirthday', '') }}
                    ({{
                      _.get(petInfo, 'petBirthdayDiv', '') ==
                      constContract.pet_birthday.TRUE.id
                        ? listProductInfo.insTargetProperty.petBirthdayDiv[0]
                            .propDispNm
                        : listProductInfo.insTargetProperty.petBirthdayDiv[1]
                            .propDispNm
                    }})
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="form-group custom-position-right mb-28">
            <BaseLabel
              label-class="base-label--custom"
              :label-title="$t('illness.ever_diagnosed_or_treated_illnesses')"
              required
            />
            <BaseLabelTooltip
              id="AddInfo_agree_noticeTooltip"
              :label-title="$t('note.note')"
              :label-content="$t('note.noti_depend_on_user')"
              class="tracking"
            />
          </div>
          <div>
            <template v-for="(diseaseCategory, index) in diseasesMasterData">
              <BaseCheckBoxList
                :id="
                  'AddInfo_diseases_' +
                  _.get(diseaseCategory[0], 'diseases_name', '')
                "
                :key="index"
                :collapse-id="`collapse${index}`"
                :title="_.get(diseaseCategory[0], 'diseases_name', '')"
                class="tracking"
              >
                <ul class="list-checkbox__list">
                  <li
                    v-for="diseaseDetail in diseaseCategory"
                    :key="diseaseDetail.order"
                    class="list-checkbox__list-item"
                  >
                    <BaseInputCheckbox
                      :id="
                        'AddInfo_diseases_' + diseaseDetail.classification_id
                      "
                      v-model="diseaseList"
                      :label="diseaseDetail.classification"
                      name="disease_list"
                      class="tracking"
                      :input-value="diseaseDetail.classification_id"
                      outline
                      check-disease
                      :checked="
                        diseaseList.indexOf(diseaseDetail.classification_id) >=
                        0
                      "
                    />
                  </li>
                </ul>
              </BaseCheckBoxList>
            </template>
          </div>
          <div class="last-checkbox">
            <BaseInputCheckbox
              id="AddInfo_diseasesIn3Month"
              v-model="diseaseList"
              class="tracking"
              :label="_.get(itemElseDisease, 'classification', '')"
              name="disease_list"
              check-disease
              :input-value="_.get(itemElseDisease, 'classification_id', '')"
              :checked="
                diseaseList.indexOf(
                  _.get(itemElseDisease, 'classification_id', '')
                ) >= 0
              "
            />
          </div>
          <div class="label-red">
            <BaseLabel
              label-class="base-label--custom"
              :label-title="$t('illness.insurance_not_cover_cases')"
              required
            />
          </div>
          <div class="illness-history__info">
            <p class="text-default">
              {{ $t('illness.diagnosis_before_insurance') }}
            </p>
            <p
              class="text-default"
              v-html="$t('illness.treatment_for_illness_br')"
            />
          </div>
          <BaseInputCheckbox
            id="solicitationAdditionalInformation_agree"
            v-model="btnActive"
            :checked="btnActive"
            :label="$t('illness.yes_agree')"
            class="tracking"
          />
          <div class="illness-history__button">
            <BaseButton
              id="AddInfo_nextStep"
              btn-class="mw-279 tracking"
              :label="$t('common.button.next')"
              btn-full="btn--full"
              icon-right
              :disabled="!btnActive || notChecked"
              @click="handleNextStep"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import diseasesMasterData from '~/constants/diseases';
import contract from '~/constants/contract';
import { mapState, mapActions } from 'vuex';
import moment from 'moment';
import { find } from 'lodash';

export default {
  middleware: ['auth'],
  async asyncData({ $helpers, store, redirect }) {
    let isInsStartDateGeneratedConfirm = true;
    let isInsStartDateGenerated = false;
    $helpers.setDataFromLocalToVuex();
    let userSelectInsStartDate =
      store.state.contracts.petInfo &&
      store.state.contracts.petInfo.insStartDate;
    const res = await store.dispatch('contracts/insStartDate', {});
    // 補償開始日が選択されている && それが現在日時から-7日以前である場合期限切れページへ。
    if (
      userSelectInsStartDate &&
      moment(res.from)
        .subtract(7, 'day')
        .isAfter(moment(userSelectInsStartDate))
    ) {
      return redirect('/solicitation/additional_information/expired/');
    }
    if (!userSelectInsStartDate) {
      (userSelectInsStartDate = res.from),
        (isInsStartDateGeneratedConfirm = false);
      isInsStartDateGenerated = true;
      if (store.state.contracts.petInfo) {
        store.commit('contracts/setPetInfoInsStartDate', res.from);
      }
    }
    await store.dispatch('contracts/productInfo', {
      productCd: contract.insurance_default.PRODUCT_CD,
      eventCd: contract.insurance_default.EVENT_CD,
      insDateFrom: userSelectInsStartDate,
    });
    return {
      isInsStartDateGeneratedConfirm,
      isInsStartDateGenerated,
    };
  },

  data() {
    return {
      constContract: contract,
      diseaseList: [],
      btnActive: false,
      diseasesMasterData,
      itemElseDisease: null,
    };
  },

  computed: {
    ...mapState({
      petInfo: (state) => state.contracts.petInfo,
      listProductInfo: (state) => state.contracts.listProductInfo,
    }),
    notChecked() {
      return this.diseaseList.length === 0;
    },
    showPetBreed() {
      const dogType = find(this.listProductInfo.insTargetProperty.petType, {
        propVal: contract.pet_type.DOG,
      });
      let nameBreed = dogType.petBreed.find(
        (it) => it.propVal == this.petInfo.petBreed
      );

      return nameBreed.propDispNm;
    },
  },

  async created() {
    if (this.petInfo == null) {
      // return this.$router.push('/solicitation/additional_information/expired/');
    }
  },

  beforeMount() {
    window.addEventListener('pagehide', this.preventNav);
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('pagehide', this.preventNav);
    });
  },

  mounted() {
    let dataListDisease = _.orderBy(
      _.groupBy(this.diseasesMasterData, 'diseases_name'),
      'order',
      'asc'
    );
    this.diseasesMasterData = _.dropRight(dataListDisease);
    this.itemElseDisease = _.takeRight(dataListDisease)[0][0];
    let getDiseaseOption = JSON.parse(localStorage.getItem('disease_option'));
    if (getDiseaseOption) {
      this.diseaseList = getDiseaseOption.list;
      this.btnActive = getDiseaseOption.btnActive;
    }

    this.$helpers.getCurrentTimeFromServer().then((time) => {
      let timeConfirm = moment(localStorage.getItem('time_send_mail_confirm'));
      if (
        !timeConfirm.isValid() ||
        !moment(time).subtract(7, 'day').isBefore(timeConfirm)
      ) {
        return this.$router.push(
          '/solicitation/additional_information/expired/'
        );
      }
    });
  },

  methods: {
    ...mapActions({
      getProductInfo: 'contracts/productInfo',
      getInsStartDate: 'contracts/insStartDate',
    }),
    getFormatDate(date) {
      return moment(date).format('YYYY年MM月DD日');
    },
    preventNav() {
      this.$helpers.setDataFromVuexToLocal(
        'petInfo',
        'productCd',
        'customerInfo',
        'contract_duplicate'
      );
    },

    handleNextStep() {
      let diseaseOption = {
        list: _.sortBy(this.diseaseList),
        btnActive: this.btnActive,
      };
      localStorage.setItem('disease_option', JSON.stringify(diseaseOption));
      localStorage.removeItem('reload');

      this.$router.push('/solicitation/additional_information/confirm/');
    },
  },
};
</script>

<style lang="scss">
@import '~/assets/scss/pages/dp-0015';
</style>
