<template>
  <div class="page-content bg-gray">
    <page-title
      :title="$t('contract_renewal.title')"
      btn-back="/mypage/contracts/detail"
    />
    <div class="container contract-info">
      <p class="text-dark-gray" v-text="$t('contract_renewal.subtitle')" />
      <div class="contract-card my-4">
        <ul class="contract-card-list text-left text-dark-gray">
          <li
            v-if="isShowCompensation"
            class="contract-card-list__item"
            v-text="$t('contract_renewal.compensation')"
          />
          <li
            class="contract-card-list__item"
            v-text="$t('contract_renewal.castration_state')"
          />
          <li
            v-if="hasPetWeight"
            class="contract-card-list__item"
            v-text="$t('contract_renewal.pet_weight')"
          />
        </ul>
      </div>
      <base-button
        :label="$t('contract_renewal.button.change')"
        btn-class="mw-279 tracking"
        btn-full="btn--full"
        icon-right
        @click="$router.push('/mypage/contracts/contractrenewal/edit')"
      />
      <h4
        class="my-5 contract-info__section-title"
        v-text="$t('contract_renewal.title_detail')"
      />
      <div class="contract-card mb-57">
        <div class="contract-card__title pt-2">
          <p v-text="$t('contract_renewal.product_name')" />
          <p
            v-text="
              _.get(contractInfo, 'productInfo.compensRate.propDispNm', '')
            "
          />
        </div>
        <div
          v-if="
            contractInfo.insApplicationStatus !=
            constContract.ins_application_status_05
          "
          class="contract-card__date"
        >
          <span v-text="$t('contract_renewal.insurance_FromTo')" />
          <span v-html="dateFrom" />
          <span>〜</span>
          <span v-html="dateTo" />
        </div>
      </div>
      <div class="d-flex mb-4 justify-content-between align-items-center mt-56">
        <div
          class="rules-title mb-0"
          v-text="$t('contract_renewal.title_pet_info')"
        />
      </div>
      <info-box :data-info="dataInfo" class="mb-57 pet-detail" />
      <div class="d-flex mb-4 justify-content-between align-items-center">
        <div
          class="rules-title mb-0"
          v-text="$t('contract_renewal.title_claim_detail')"
        />
      </div>
      <div class="info-box contract-info-table mb-57">
        <ul class="info-box__list">
          <li
            class="info-box__item d-flex align-items-center justify-content-between mb-15"
          >
            <div
              class="info-box__title"
              v-text="$t('contract_renewal.payment_system')"
            />
            <div class="info-box__text text-right text-darker">
              <span class="font-24px" v-text="compensRate" />
              <span class="unit font-10px">%</span>
            </div>
          </li>
          <li
            class="info-box__item d-flex align-items-center justify-content-between mb-15"
          >
            <div
              class="info-box__title"
              v-text="$t('contract_renewal.no_resident')"
            />
            <div
              v-if="coverProperty02"
              class="info-box__text text-right text-darker"
            >
              <span v-text="$t('contract_renewal.maximum')" />
              <span>{{ coverProperty02 | formatPrice }}</span>
              <span v-text="$t('contract_renewal.up_to_year')" />
            </div>
          </li>
          <li
            class="info-box__item d-flex align-items-center justify-content-between mb-15"
          >
            <div
              class="info-box__title"
              v-text="$t('contract_renewal.to_hospital')"
            />
            <div
              v-if="coverProperty01"
              class="info-box__text text-right text-darker"
            >
              <span v-text="$t('contract_renewal.maximum')" />
              <span>{{ coverProperty01 | formatPrice }} </span>
              <span v-text="$t('contract_renewal.up_to_year')" />
            </div>
          </li>
          <li
            class="info-box__item d-flex align-items-center justify-content-between"
          >
            <div
              class="info-box__title"
              v-text="$t('contract_renewal.dissection')"
            />
            <div
              v-if="coverProperty03"
              class="info-box__text text-right text-darker"
            >
              <span v-text="$t('contract_renewal.maximum')" />
              <span>{{ coverProperty03 | formatPrice }}</span>
              <span v-text="$t('contract_renewal.up_to_year')" />
            </div>
          </li>
        </ul>
      </div>
      <div class="d-flex mb-4 justify-content-between align-items-center">
        <div
          class="rules-title mb-0"
          v-text="$t('contract_renewal.title_condition_guarantee')"
        />
      </div>
      <div
        class="explain mb-15"
        v-html="$t('contract_renewal.noti_insurance')"
      />
      <div class="sick-box mb-57">
        <div class="sick-box__content">
          <ul
            v-for="disease in diseaseList"
            :key="disease.id"
            class="sick-box__list font-12px"
          >
            <li class="sick-box__item" v-text="disease.text" />
          </ul>
          <p
            v-if="diseaseList.length === 0"
            class="sick-box__item"
            v-text="$t('illness.no_disease')"
          />
        </div>
      </div>
      <div class="d-flex mb-4 justify-content-between align-items-center">
        <div
          class="rules-title mb-0"
          v-text="$t('contract_renewal.title_view_document')"
        />
      </div>
      <div class="info-box contract-info-table mb-57 view-document">
        <ul class="info-box__list">
          <li
            class="info-box__item d-flex align-items-center justify-content-between"
            @click="getPdf('terms_and_conditions')"
          >
            <div class="info-box__title text-">
              <span v-text="$t('contract_renewal.title_terms')" />
              <span class="green-tag">PDF</span>
            </div>
            <div class="info-box__text text-right text-darker icon-view mr-2">
              <i class="icon-fonts icon-fonts--back" />
            </div>
          </li>
          <li
            class="info-box__item d-flex align-items-center justify-content-between"
            @click="getPdf('important_matters')"
          >
            <div class="info-box__title text-">
              <span v-text="$t('contract_renewal.important_problem')" />
              <span class="green-tag">PDF</span>
            </div>
            <div class="info-box__text text-right text-darker icon-view mr-2">
              <i class="icon-fonts icon-fonts--back" />
            </div>
          </li>
        </ul>
      </div>
      <div class="d-flex mb-4 justify-content-between align-items-center">
        <div
          class="rules-title mb-0"
          v-text="$t('contract_renewal.title_payment_contract')"
        />
      </div>
      <div class="info-box contract-info-table pb-5">
        <ul class="info-box__list">
          <li
            class="info-box__item d-flex align-items-center justify-content-between"
          >
            <div
              class="info-box__title"
              v-text="$t('contract_renewal.method_refund')"
            />
            <div
              class="info-box__text text-right text-darker"
              v-text="$t('contract_renewal.monthly_payment')"
            />
          </li>
          <li
            class="info-box__item d-flex align-items-center justify-content-between"
          >
            <div
              class="info-box__title"
              v-text="$t('contract_renewal.insurance_premium')"
            />
            <div class="info-box__text text-right text-darker">
              <span class="font-24px">
                {{
                  _.get(contractInfo, 'premiumInfo.premiumTotal', '')
                    | formatPrice
                }}
              </span>
              <span
                class="font-10px"
                v-text="$t('contract_renewal.unit_money')"
              />
            </div>
          </li>
          <li
            class="info-box__item d-flex justify-content-between contain-table"
          >
            <div
              class="info-box__title"
              v-text="$t('contract_renewal.insurance_date')"
            />
            <div class="info-box__text text-right text-darker table-inside">
              <div
                class="payment-date"
                v-text="$t('contract_renewal.payment_date')"
              />
            </div>
          </li>
          <li>
            <div
              class="noti-anniversary"
              v-text="$t('contract_renewal.noti_anniversary')"
            />
          </li>
        </ul>
      </div>
      <div v-if="creditCardNo4" class="credit-card pb-5">
        <div class="d-flex mb-4 justify-content-between align-items-center">
          <div
            class="rules-title mb-0"
            v-text="$t('contract_renewal.payment_info')"
          />
          <base-button
            v-if="isEditButton"
            id="myPageContractDetail_paymentEdit"
            btn-class="mw-100 tracking"
            :label="$t('common.button.edit')"
            btn-green-outline
            @click="handleChangeEditPayment"
          />
        </div>
        <div
          class="d-flex card-number flex-row-reverse"
          v-text="cardLast4Digits(creditCardNo4)"
        />
      </div>
      <base-button
        :label="$t('contract_renewal.button.change')"
        btn-class="mw-279 tracking"
        btn-full="btn--full"
        icon-right
        @click="$router.push('/mypage/contracts/contractrenewal/edit')"
      />
      <nuxt-link to="/mypage/contracts/contractrenewal/cancel">
        <div class="text-center py-5 contract-info__button-cancel">
          <span v-text="$t('contract_renewal.button.cancel')" />
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import '~/assets/scss/components/info-box';
@import '~/assets/scss/pages/dp-0138';
</style>
