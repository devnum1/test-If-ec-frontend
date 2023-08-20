// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="page-content bg-gray">
    <PageTitle :title="$t('note.confirm_info')" />
    <div class="container">
      <div class="rules-title mt-4 mb-36">
        {{ $t('illness.illness_history') }}
      </div>
      <p
        v-for="(code, index) in diseaseList.list"
        :key="index"
        class="text-width-dot"
      >
        ・{{
          _.find(diseasesMasterData, ['classification_id', code]).classification
        }}
      </p>
      <p
        v-if="_.get(diseaseList, 'list', '').length === 0"
        class="text-width-dot"
      >
        ・{{ $t('illness.no_disease') }}
      </p>
      <div v-show="diseaseOther">
        <br />
        <p class="text-width-dot">
          {{ $t('illness.diagnostic_disease') }}
        </p>
      </div>
      <div class="separator mt-12 mb-4" />
      <div class="notice">
        <div class="notice__content">
          <div class="notice__top d-flex align-items-center">
            <span class="notice__icon" />
            <span class="notice__title text-color-default">{{
              $t('note.warning_note')
            }}</span>
          </div>
          <div class="text-normal text-left">
            {{ $t('note.is_content_annouce_correct') }}
            <br />
            {{ $t('note.check_confirm_and_send') }}
          </div>
          <div class="mt-30">
            <BaseInputCheckbox
              id="AddInfoConfirm_confirmed"
              v-model="btnActive"
              center
              :label="$t('note.confirmed')"
            />
          </div>
        </div>
      </div>
      <div class="page-button mt-53 pb-0">
        <BaseButton
          id="AddInfoConfirm_nextStep"
          btn-class="mb-28 tracking"
          :label="$t('note.send')"
          btn-full="btn--full"
          icon-right
          :disabled="!btnActive"
          @click="handleNextStep"
        />

        <!-- <ButtonBack
          id="solicitationAdditionalInformationConfirm_back"
          :label="$t('common.button.return_previous')"
          class="pb-72 tracking"
          @click="$router.push('/solicitation/additional_information/')"
        /> -->
      </div>
    </div>
  </div>
</template>

<script>
import contract from '@/constants/contract';
import diseasesMasterData from '~/constants/diseases';
import { mapActions, mapState } from 'vuex';
import moment from 'moment';
import { get, find } from 'lodash';

export default {
  beforeRouteEnter(to, from, next) {
    let checkReload = JSON.parse(localStorage.getItem('reload'));
    if (checkReload) {
      return next((vm) => {
        localStorage.removeItem('reload');
        vm.$router.push('/solicitation/additional_information/');
      });
    }

    next();
  },

  middleware: ['auth'],

  data() {
    return {
      btnActive: false,
      diseaseList: [],
      dataCustomerInfo: {},
      linkdMemberId: null,
      diseasesMasterData,
      diseaseOther: false,
      dataContract: {},
    };
  },
  computed: {
    ...mapState({
      listProductInfo: (state) => state.contracts.listProductInfo,
      repProductCd: (state) => state.contracts.repProductCd,
      petInfo: (state) => state.contracts.petInfo,
      contractDuplicate: (state) => state.contracts.contractDuplicate,
      contractId: (state) => state.contracts.contractId,
      customerInfoFromVuex: (state) => state.contracts.customerInfo,
    }),
    dogType() {
      return find(this.listProductInfo.insTargetProperty.petType, {
        propVal: contract.pet_type.DOG,
      });
    },
  },

  created() {
    this.$helpers.setDataFromLocalToVuex();
    this.linkdMemberId = this.$helpers.getUserId();

    if (this.contractDuplicate) {
      this.$store
        .dispatch('contracts/customerInfo', {
          linkdMemberId: this.linkdMemberId,
        })
        .then((response) => {
          if (response) {
            let { customerInfo } = response;

            this.dataCustomerInfo = {
              ...customerInfo.customer,
              telephone: customerInfo.contact.telephone,
              addressZip: customerInfo.address.addressZip,
              birthday: customerInfo.customer.birthday.replace(
                /(\d{4})(\d{2})(\d{2})/,
                '$1/$2/$3'
              ),
            };
          }
        });
    } else {
      this.dataCustomerInfo = this.customerInfoFromVuex;
    }
    this.diseaseOther = JSON.parse(localStorage.getItem('disease_other'));
    localStorage.removeItem('disease_other');
    let getPetInfo = JSON.parse(localStorage.getItem('contract_refresh'));
    let getRepProductCd = localStorage.getItem('repProductCd_refresh');
    let getCustomerInfo = JSON.parse(localStorage.getItem('customer_refresh'));

    getPetInfo ? this.$store.commit('contracts/setPetInfo', getPetInfo) : '';
    getRepProductCd
      ? this.$store.commit('contracts/setRepProductCd', getRepProductCd)
      : '';
    getCustomerInfo
      ? this.$store.commit('contracts/setCustomerInfo', getCustomerInfo)
      : '';

    this.$store.dispatch('contracts/productInfo', {
      productCd: contract.insurance_default.PRODUCT_CD,
      eventCd: contract.insurance_default.EVENT_CD,
      insDateFrom: this.petInfo.insStartDate,
    });
    this.dataContract = this.petInfo;
  },

  beforeMount() {
    window.addEventListener('pagehide', this.preventNav);
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('pagehide', this.preventNav);
    });
  },

  mounted() {
    this.diseaseList = JSON.parse(localStorage.getItem('disease_option')) || [];
  },

  methods: {
    ...mapActions({
      newContract: 'contracts/newContract',
    }),

    preventNav() {
      this.$helpers.setDataFromVuexToLocal(
        'petInfo',
        'productCd',
        'customerInfo',
        'contract_duplicate'
      );
      localStorage.setItem('reload', true);
    },

    async handleNextStep() {
      this.$helpers.setDataFromLocalToVuex();
      let response = await this.createNewContract();
      if (!response) {
        return this.$router.push('/errors/system_error');
      } else {
        localStorage.removeItem('disease_option');
        localStorage.removeItem('premiumCalculation');
        localStorage.removeItem('time_send_mail_confirm');
        this.$cookies.set(
          'IS',
          'null',
          new Date('2017, 03, 12'),
          '/',
          window.location.hostname.replace('www', '')
        );
        this.$cookies.remove('IS');

        if (this.diseaseList.list.length > 0) {
          // DP-0095
          return this.$router.push('/solicitation/contracts/before_agree/');
        }

        if (
          response.checkResult[0].approvalSystemJadge ===
          contract.approval_system.UNDER_WRITING
        ) {
          const { policyNo, subscriberNo } = response.contractInfo;
          this.$store.commit('contracts/setContractId', {
            policyNo,
            subscriberNo,
          });
          this.$router.push(
            '/solicitation/additional_information/nodisease/payment/new/'
          );
        } else {
          this.$router.push('/solicitation/contracts/before_agree/');
        }
      }
    },

    createNewContract() {
      const coverProperty = this.listProductInfo.productInfo.coverProperty.map(
        (item) => {
          return { ...item, insAmount: item.insAmount[0] };
        }
      );
      const displayProperty = {
        ...this.listProductInfo.productInfo.productProperty,
        displayGroup:
          this.listProductInfo.productInfo.productProperty.displayGroup.propVal,
      };
      let insAgentNoCookie = this.$cookies.get('IS');
      let dataInsAgentNo;
      if (insAgentNoCookie && insAgentNoCookie.insAgentNo) {
        if (_.isArray(insAgentNoCookie.insAgentNo)) {
          dataInsAgentNo = _.take(insAgentNoCookie.insAgentNo)[0];
        } else if (
          !_.isArray(insAgentNoCookie.insAgentNo) &&
          insAgentNoCookie.insAgentNo.length < 14
        ) {
          dataInsAgentNo = contract.insAgentNo;
        } else {
          dataInsAgentNo = insAgentNoCookie.insAgentNo;
        }
      } else {
        dataInsAgentNo = contract.insAgentNo;
      }

      let paramNewContract = {
        linkdMemberId: this.linkdMemberId,
        agentInfo: [
          {
            insAgentNo: dataInsAgentNo,
            sharingRatio: 1.0,
          },
        ],
        customerInfo: this.contractDuplicate
          ? null
          : {
              customer: {
                lastnameKanji: this.dataCustomerInfo.lastnameKanji,
                firstnameKanji: this.dataCustomerInfo.firstnameKanji,
                lastnameKana: this.dataCustomerInfo.lastnameKana,
                firstnameKana: this.dataCustomerInfo.firstnameKana,
                sexCd:
                  this.dataCustomerInfo.sexCd == contract.gender.MALE.id
                    ? contract.gender.MALE.id
                    : contract.gender.FEMALE.id,
                birthday: this.dataCustomerInfo.birthday.replace(/\//g, ''),
              },
              address: {
                addressZip: this.dataCustomerInfo.addressZip,
                prefectures: null,
                addressCity: null,
                addressNo: null,
                building: null,
              },
              contact: {
                mailAddress: this.$helpers.getLastAuthUser(),
                telephone: this.dataCustomerInfo.telephone,
                mobilePhone: null,
              },
            },
        contractInfo: {
          insApplicationStatus: '02',
          insPolicyBaseDate: this.listProductInfo.insPolicyBaseDate,
          productInfo: {
            eventCd: contract.insurance_default.EVENT_CD,
            productCd: contract.insurance_default.PRODUCT_CD,
            productNm: this.listProductInfo.productInfo.productNm,
            productTag: this.listProductInfo.productInfo.productTag,
            repProductCd: this.listProductInfo.productInfo.repProductCd,
            compensRate: {
              propVal: parseInt(this.repProductCd) / 100,
              propDispNm: this.repProductCd,
            },
            insDateFrom: this.listProductInfo.productInfo.insDateFrom,
            insTimeFrom: this.listProductInfo.productInfo.insTimeFrom[0],
            insDateTo: this.listProductInfo.productInfo.insDateTo,
            insTimeTo: this.listProductInfo.productInfo.insTimeTo[0],
            insTerm: this.listProductInfo.productInfo.insTerm[0],
            autoContinue: this.listProductInfo.productInfo.autoContinue,
            paymentCd: this.listProductInfo.productInfo.paymentCd[0],
            payTimes: this.listProductInfo.productInfo.payTimes[0],
            gracePeriodType: this.listProductInfo.productInfo.gracePeriodType,
            gracePeriod: this.listProductInfo.productInfo.gracePeriod,
            frontBeforeStartCancelDiv:
              this.listProductInfo.productInfo.frontBeforeStartCancelDiv,
            insPolicyBaseDateDiv:
              this.listProductInfo.productInfo.insPolicyBaseDateDiv,
            contractAddInfo: this.listProductInfo.productInfo.contractAddInfo,
            productProperty: displayProperty,
            coverProperty: coverProperty,
          },
          premiumInfo: JSON.parse(localStorage.getItem('premiumCalculation')),
          insCoverageInfo: {
            insCoverageId: null,
            insTargetProperty: {
              petName: this.dataContract.petName,
              petType: {
                propVal: this.dataContract.petType,
                propDispNm: this.listProductInfo.insTargetProperty.petType.find(
                  (it) => it.propVal == this.dataContract.petType
                ).propDispNm,
              },
              petBreed: {
                propVal: this.dataContract.petBreed
                  ? this.dataContract.petBreed
                  : '000', //TODO
                propDispNm: this.dataContract.petBreed
                  ? this.dogType.petBreed.find(
                      (it) => it.propVal == this.dataContract.petBreed
                    ).propDispNm
                  : '',
              },
              petSexCd: {
                propVal: this.dataContract.petSexCd,
                propDispNm:
                  this.listProductInfo.insTargetProperty.petSexCd.find(
                    (it) => it.propVal == this.dataContract.petSexCd
                  ).propDispNm,
              },
              petWeight: this.dataContract.petWeight
                ? this.dataContract.petWeight
                : 0,
              petBirthdayDiv: {
                propVal: this.dataContract.petBirthdayDiv,
                propDispNm:
                  this.listProductInfo.insTargetProperty.petBirthdayDiv.find(
                    (it) => it.propVal == this.dataContract.petBirthdayDiv
                  ).propDispNm,
              },
              petBirthday: this.dataContract.petBirthday.replace('/', ''),
              petInsJoinFlg: {
                propVal: this.dataContract.petInsJoinFlg,
                propDispNm:
                  this.listProductInfo.insTargetProperty.petInsJoinFlg.find(
                    (it) => it.propVal == this.dataContract.petInsJoinFlg
                  ).propDispNm,
              },
            },
            document: {
              docCd: null,
              reqDocumentNo: null,
              docFileName: null,
            },
          },
          noticeInfo: [
            {
              noticeCd: this.listProductInfo.noticeInfo[0].noticeCd,
              noticeContent: {
                notice: this.listProductInfo.noticeInfo[0].noticeContent.notice,
                selection:
                  this.listProductInfo.noticeInfo[0].noticeContent.selection.map(
                    (it) => ({
                      ...it,
                      answer:
                        it.id === this.dataContract.noticeCd01
                          ? { selectFlg: 'Y', freeText: '' }
                          : null,
                    })
                  ),
                detail: [
                  {
                    id: null,
                    name: null,
                    category: null,
                    group: null,
                  },
                ],
              },
            },
            {
              noticeCd: this.listProductInfo.noticeInfo[1].noticeCd,
              noticeContent: {
                notice: this.listProductInfo.noticeInfo[1].noticeContent.notice,
                selection:
                  this.listProductInfo.noticeInfo[1].noticeContent.selection.map(
                    (it) => ({
                      ...it,
                      answer:
                        it.id === this.dataContract.noticeCd02
                          ? { selectFlg: 'Y', freeText: '' }
                          : null,
                    })
                  ),
                detail: this.listProductInfo.noticeInfo[1].noticeContent.detail,
              },
            },
            {
              noticeCd: this.listProductInfo.noticeInfo[2].noticeCd,
              noticeContent: {
                notice: this.listProductInfo.noticeInfo[2].noticeContent.notice,
                selection: this.formatSelectionDisease(),
                detail: [
                  {
                    id: null,
                    name: null,
                    category: null,
                    group: null,
                  },
                ],
              },
            },
          ],
        },
      };

      return this.newContract(paramNewContract).catch((e) => {
        console.error(e);
        return false;
      });
    },

    formatSelectionDisease() {
      let selection = [];

      this.diseasesMasterData.map((item) => {
        let selectionData = {
          id: item.classification_id,
          name: item.classification,
          category: item.category,
          freeTextDisplayDiv: '',
          answer: null,
        };

        if (this.diseaseList.list.includes(item.classification_id)) {
          selectionData.answer = {
            selectFlg: 'Y',
            freeText: '',
          };
        }

        selection.push(selectionData);
      });

      return selection;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/pages/new-contract';
</style>
