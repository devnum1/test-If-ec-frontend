// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="pet-info-card">
    <div class="pet-info info-title">
      <div class="pet-info__name">“{{ information.name }}”</div>
      <div class="">
        {{ $t('common.tell_some_pet_info') }}
      </div>
    </div>
    <div class="pet-info info-row">
      <div class="info-label">
        {{ $t('common.gender.gender_title') }}
      </div>
      <div class="info-description">
        {{
          parseInt(information.gender) == 0
            ? $t('common.gender.boy')
            : $t('common.gender.girl')
        }}
      </div>
    </div>
    <div class="pet-info info-row">
      <div class="info-label">
        {{ $t('common.contraception_status.title') }}
      </div>
      <div class="info-description">
        {{ information.contraception }}
      </div>
    </div>
    <div class="pet-info info-row">
      <div class="info-label">
        {{ $t('common.dob.title') }}
      </div>
      <div class="info-description">
        {{ information.dob }}
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    petInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      progress: 1,
      information: {},
    };
  },
  updated() {},
  mounted() {
    this.petInfo ? (this.information = this.petInfo) : {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.pet-info-card {
  border: 1px solid rgba($green-border, 0.15);
  border-radius: 6px;
  text-align: center;
  background-color: white;
  display: flex;
  flex-direction: column;

  .pet-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px 20px;

    &:not(:first-child) {
      border-top: 1px dashed rgba($green-border, 0.15);
    }
  }

  .info {
    &-title {
      display: block;
      font-size: 18px;
      padding: 13px 13px;

      div {
        display: inline;
        color: rgba($black, 0.6);

        &.pet-info__name {
          color: $red;
        }
      }
    }

    &-label {
      font-size: 14px;
      color: rgba($black, 0.6);
    }
  }
}
</style>
