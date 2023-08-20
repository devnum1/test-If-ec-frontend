<template>
  <div class="page-content bg-gray">
    <page-title
      :title="$t('pre_contract.title_page_detail')"
      btn-back="/mypage/contracts"
    />
    <div class="container contract-info">
      <div class="d-flex mb-4 justify-content-between align-items-center">
        <div class="rules-title mb-0">
          {{ $t('pre_contract.title_insurance_pre_contract') }}
        </div>
      </div>
      <div class="contract-card mb-57">
        <div class="contract-card__title pt-2">
          <p>{{ $t('pre_contract.product_name') }}</p>
          <p>
            {{ _.get(contractInfo, 'productInfo.compensRate.propDispNm', '') }}
          </p>
        </div>
        <div
          v-if="
            contractInfo.insApplicationStatus !=
            constContract.ins_application_status_05
          "
          class="contract-card__date"
        >
          <span v-text="$t('pre_contract.insurance_from_to')" />
          <span
            v-text="
              _.get(contractInfo, 'productInfo.insDateFrom', '').replace(
                /(\d{4})(\d{2})(\d{2})/,
                '$1/$2/$3'
              )
            "
          />
          <span>〜</span>
          <span
            v-text="
              _.get(contractInfo, 'productInfo.insDateTo', '').replace(
                /(\d{4})(\d{2})(\d{2})/,
                '$1/$2/$3'
              )
            "
          />
        </div>
      </div>
      <div class="d-flex mb-4 justify-content-between align-items-center mt-56">
        <div class="rules-title mb-0">
          {{ $t('pre_contract.title_pet_info') }}
        </div>
      </div>
      <info-box :data-info="dataInfo" class="mb-57 pet-detail" />
      <div class="d-flex mb-4 justify-content-between align-items-center">
        <div class="rules-title mb-0">
          {{ $t('pre_contract.title_claim_detail') }}
        </div>
      </div>
      <div class="info-box contract-info-table mb-57">
        <ul class="info-box__list">
          <li
            class="info-box__item d-flex align-items-center justify-content-between mb-15"
          >
            <div
              class="info-box__title"
              v-text="$t('pre_contract.payment_system')"
            />
            <div class="info-box__text text-right text-darker">
              <span
                class="font-24px"
                v-text="
                  _.get(contractInfo, 'productInfo.compensRate.propVal', '') *
                  100
                "
              />
              <span class="unit font-10px"> %</span>
            </div>
          </li>
          <li
            class="info-box__item d-flex align-items-center justify-content-between mb-15"
          >
            <div
              class="info-box__title"
              v-text="$t('pre_contract.no_resident')"
            />
            <div
              v-if="coverProperty02"
              class="info-box__text text-right text-darker"
            >
              <span v-text="$t('pre_contract.maximum')" />
              <span>{{ coverProperty02 | formatPrice }}</span>
              <span v-text="$t('pre_contract.up_to_year')" />
            </div>
          </li>
          <li
            class="info-box__item d-flex align-items-center justify-content-between mb-15"
          >
            <div
              class="info-box__title"
              v-text="$t('pre_contract.to_hospital')"
            />
            <div
              v-if="coverProperty01"
              class="info-box__text text-right text-darker"
            >
              <span v-text="$t('pre_contract.maximum')" />
              <span>{{ coverProperty01 | formatPrice }}</span>
              <span v-text="$t('pre_contract.up_to_year')" />
            </div>
          </li>
          <li
            class="info-box__item d-flex align-items-center justify-content-between"
          >
            <div
              class="info-box__title"
              v-text="$t('pre_contract.dissection')"
            />
            <div
              v-if="coverProperty03"
              class="info-box__text text-right text-darker"
            >
              <span v-text="$t('pre_contract.maximum')" />
              <span>{{ coverProperty03 | formatPrice }}</span>
              <span v-text="$t('pre_contract.up_to_year')" />
            </div>
          </li>
        </ul>
      </div>
      <div class="d-flex mb-4 justify-content-between align-items-center">
        <div
          class="rules-title mb-0"
          v-text="$t('pre_contract.title_condition_guarantee')"
        />
      </div>
      <div class="explain mb-15" v-html="$t('pre_contract.noti_insurance')" />
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
          v-text="$t('pre_contract.title_view_document')"
        />
      </div>
      <div class="info-box contract-info-table mb-57 view-document">
        <ul class="info-box__list">
          <li
            class="info-box__item d-flex align-items-center justify-content-between"
            @click="getPdf('terms_and_conditions')"
          >
            <div class="info-box__title text-">
              <span v-text="$t('pre_contract.title_terms')" />
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
              <span v-text="$t('pre_contract.important_problem')" />
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
          v-text="$t('pre_contract.title_payment_contract')"
        />
      </div>
      <div class="info-box contract-info-table mb-57">
        <ul class="info-box__list">
          <li
            class="info-box__item d-flex align-items-center justify-content-between"
          >
            <div
              class="info-box__title"
              v-text="$t('pre_contract.method_refund')"
            />
            <div
              class="info-box__text text-right text-darker"
              v-text="$t('pre_contract.monthly_payment')"
            />
          </li>
          <li
            class="info-box__item d-flex align-items-center justify-content-between"
          >
            <div
              class="info-box__title"
              v-text="$t('pre_contract.insurance_premium')"
            />
            <div class="info-box__text text-right text-darker">
              <span class="font-24px">{{
                _.get(contractInfo, 'premiumInfo.premiumTotal', '')
                  | formatPrice
              }}</span>
              <span class="font-10px" v-text="$t('pre_contract.unit_money')" />
            </div>
          </li>
          <li
            class="info-box__item d-flex justify-content-between contain-table"
          >
            <div
              class="info-box__title"
              v-text="$t('pre_contract.insurance_date')"
            />
            <div class="info-box__text text-right text-darker table-inside">
              <div
                class="payment-date"
                v-text="$t('pre_contract.payment_date')"
              />
            </div>
          </li>
          <li>
            <div
              class="noti-anniversary"
              v-text="$t('pre_contract.noti_anniversary')"
            />
          </li>
        </ul>
      </div>
      <div
        v-if="_.get(contractInfo, 'creditInfo.creditCardNo4')"
        class="credit-card pb-72"
      >
        <div class="d-flex mb-4 justify-content-between align-items-center">
          <div
            class="rules-title mb-0"
            v-text="$t('pre_contract.payment_info')"
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
          v-text="
            cardLast4Digits(_.get(contractInfo, 'creditInfo.creditCardNo4'))
          "
        />
      </div>
    </div>
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import '~/assets/scss/components/info-box';
@import '~/assets/scss/pages/dp-0045';
</style>
