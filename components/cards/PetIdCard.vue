// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="pet-id-card">
    <div class="id-card-container">
      <div class="peco-title">
        {{ $t('common.peco_title') }}
      </div>
      <div v-show="editCardPet" class="id-edit">
        <button class="id-edit__button" @click="handleClick">
          {{ $t('common.button.edit') }}
        </button>
      </div>
      <h4 class="pet-name font-weight-400" :class="editCardPet ? '' : 'mt-26'">
        <span>{{ get(petInfo, 'petName', '') }}</span>
        <span class="pet-gender">
          {{
            get(petInfo, 'gender') === constContract.pet_sex.FEMALE
              ? $t('common.chan')
              : $t('common.kun')
          }}
        </span>
      </h4>
      <div class="id-card__pet-info-container">
        <div class="pet-info-grid">
          <div class="info-row">
            <div class="card-icon">
              <i class="icon-fonts icon-fonts--cake" />
            </div>
            <div class="">
              {{ petBirthday }}
            </div>
          </div>
          <div class="info-row">
            <div class="card-icon">
              <i class="icon-fonts icon-fonts--dog-foot" />
            </div>
            <div class="">
              {{
                get(petInfo, 'petType') === constContract.pet_type.DOG
                  ? get(petInfo, 'petBreedDesc')
                  : $t('common.pet.cat')
              }}
            </div>
          </div>
          <div class="info-row">
            <div class="card-icon">
              <i class="icon-fonts icon-fonts--paper" />
            </div>
            <div class="">
              {{ compensRate }}
            </div>
          </div>
          <div class="info-row">
            <img
              class="card-logo"
              src="~/assets/images/logo/2line_bg_white.svg"
              height="36"
            />
          </div>
        </div>
        <div v-if="petImage" class="pet-image-container">
          <img class="pet-image" :src="petImage" />
        </div>
        <div v-else class="no-image-container">
          <img
            v-if="get(petInfo, 'petType') === constContract.pet_type.CAT"
            class="no-image cat-invert"
            src="~/assets/images/icon-cat.svg"
          />
          <img v-else class="no-image" src="~/assets/images/icon-dog.svg" />
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import contract from '~/constants/contract';
import { get } from 'lodash';
export default {
  props: {
    petInfo: {
      type: Object,
      default: () => ({}),
    },
    productInfo: {
      type: Object,
      default: () => ({}),
    },
    editCardPet: {
      type: Boolean,
      default: false,
    },
    policyNo: {
      type: String,
      default: '',
    },
    policyId: {
      type: String,
      default: '',
    },
    subscriberNo: {
      type: [String, Number],
      default: '',
    },
    noPetImage: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      petImage: null,
      constContract: contract,
    };
  },
  computed: {
    petBirthday() {
      const petBirthday = get(this.petInfo, 'birthDate', '______');

      return petBirthday.substring(0, 4) + '.' + petBirthday.substring(5, 7);
    },
    compensRate() {
      const plan = get(this.productInfo, 'planCode');
      if (!plan) {
        return 'Unknown';
      }

      return (
        (plan === contract.plan_code.SEVENTY ? 70 : 50) +
        this.$t('common.compens_rate')
      );
    },
  },
  async created() {
    // DP-0019画面ではペット画像を取得しない
    if (this.noPetImage) {
      return;
    }
    const petImageKey = get(this.petInfo, 'petPhotoDoc');

    if (petImageKey) {
      const res = await this.$store.dispatch('contracts/s3download', {
        imageKey: petImageKey,
      });

      if (res.result === 1) {
        this.petImage = res.docShareUrl;
      }
    }
  },

  methods: {
    get,
    handleClick() {
      this.$store.commit('contracts/setPolicyId', this.policyId);
      this.$emit('edit');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/components/cards';
</style>
