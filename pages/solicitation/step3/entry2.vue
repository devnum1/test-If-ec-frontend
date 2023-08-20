<template>
  <div class="page-content bg-gray">
    <page-title logo />
    <div class="container pb-44">
      <div>
        <h1>
          {{ $t('solicitation_step3_entry2.pageTitle') }}
        </h1>
        <divider />
        <div class="content">
          <img src="~/assets/images/step_check.svg" />
          <div class="complete-text">
            {{ $t('solicitation_step3_entry2.subTitle') }}
          </div>
          <i18n
            path="solicitation_step3_entry2.description"
            class="description"
          >
            <a class="help-link" :href="url">{{
              $t('solicitation_step3_entry2.helperLink')
            }}</a>
          </i18n>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Divider from '@/components/commons/Divider';
import PageTitle from '@/components/PageTitle';

export default {
  components: {
    Divider,
    PageTitle,
  },
  data() {
    return {
      url: '',
    };
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 24px;
  margin-bottom: 0;
  line-height: 125%;
  padding: 16px;
}

.page-content {
  max-width: 375px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.content {
  margin-top: 34px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .complete-text {
    margin-top: 13px;
    font-size: 18px;
    color: #5fbbb5;
  }

  .description {
    margin-top: 40px;
    font-size: 14px;
    white-space: break-spaces;
    .help-link {
      color: #5fbbb5;
      cursor: pointer;
    }
  }
}
</style>
