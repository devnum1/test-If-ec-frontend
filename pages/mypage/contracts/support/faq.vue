// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="page-content bg-gray pb-5">
    <Header :logo="false" :title-page="$t('note.support_user')" />
    <!-- List Category DP0063 -->
    <div v-if="!showQuestion" class="container">
      <div class="rules-title mt-4 mb-36">
        {{ $t('page_contract.search_category') }}
      </div>
      <div
        v-for="list in listFAQ"
        :key="list.categoryId"
        class="category-row d-flex align-items-center"
        @click="handleNextCategory(list.categoryId)"
      >
        <div class="category-row__content">
          {{ list.name }}
        </div>
        <div class="category-row__icon-right ml-2" />
      </div>
      <!-- <div class="text-center mt-56 mb-56">
        <BaseButton
          btn-class="mw-156"
          :label="$t('common.button.to_my_page')"
          btn-black-outline
          @click="$router.push('/mypage/contracts/')"
        />
      </div> -->
    </div>

    <!-- Question Item DP0064 -->
    <div v-else class="container">
      <div class="rules-title mt-4 mb-36">
        {{ listQuestionAnswer.name }}
      </div>
      <div v-for="items in listQuestionAnswer.questionList" :key="items.id">
        <div class="question-row d-flex align-items-center">
          <div class="question-row__icon-question">
            {{ items.question }}
          </div>
          <div
            v-b-toggle="`collapse-${items.id}`"
            class="icon-fonts icon-fonts--plus-bold question-row__icon-union ml-2 mr-1"
          />
        </div>
        <b-collapse :id="`collapse-${items.id}`" class="mt-2">
          <div class="answer">
            <div class="answer__icon-answer">
              <span class="answer__icon-text">A</span>
            </div>
            <div class="answer__text font-14px" v-html="items.answer" />
          </div>
        </b-collapse>
      </div>
      <div class="text-center mt-56">
        <BaseButton
          btn-class="mw-156"
          :label="$t('common.button.to_my_page')"
          btn-black-outline
          @click="handleCancelCategory"
        />
      </div>
      <div class="request-email d-flex flex-column align-items-center mb-0">
        <div
          class="request-email__text mb-2"
          v-html="$t('page_contract.accept_email')"
        />
        <div class="text-center pt-1">
          <BaseButton
            id="myPageSupport_inquiries"
            btn-class="mw-219 btn__icon-email tracking"
            :label="$t('common.button.confirm')"
            btn-green-outline
            btn-icon-email
            onclick="window.open('https://helpfeel.com/littlefamily-ec/contact', '_blank')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import constListFAQ from '~/constants/list_FAQ';
import contract from '~/constants/contract';
export default {
  beforeRouteEnter(to, from, next) {
    if (from.path != '/') {
      localStorage.removeItem('show_question');
      localStorage.removeItem('list_question_answer');
    }
    next();
  },
  middleware: ['auth'],
  data() {
    return {
      listFAQ: constListFAQ,
      listQuestionAnswer: null,
      showQuestion: false,
      constContract: contract,
    };
  },
  watch: {
    $route(to, from) {
      this.checkRoute();
    },
  },

  beforeMount() {
    window.addEventListener('pagehide', this.preventNav);
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('pagehide', this.preventNav);
    });
  },

  created() {
    this.checkRoute();
    this.showQuestion = localStorage.getItem('show_question');
    this.listQuestionAnswer = JSON.parse(
      localStorage.getItem('list_question_answer')
    );

    if (this.listQuestionAnswer) {
      this.$router.push({
        query: { category: this.listQuestionAnswer.categoryId },
      });
    }
  },

  methods: {
    handleNextCategory(categoryId) {
      this.$router.push({ query: { category: categoryId } });
      document.querySelector('html').scrollTop = 0;
    },

    checkRoute() {
      return (window.location.href = 'https://helpfeel.com/littlefamily-ec/');
      if (this.$route && this.$route.query.category) {
        this.showQuestion = true;
        const paramsId = this.$route.query.category;
        this.listQuestionAnswer = this.listFAQ.find((item) => {
          return item.categoryId == paramsId;
        });
      } else {
        this.showQuestion = false;
      }
    },

    preventNav() {
      this.showQuestion
        ? localStorage.setItem('show_question', this.showQuestion)
        : '';
      this.showQuestion
        ? localStorage.setItem(
            'list_question_answer',
            JSON.stringify(this.listQuestionAnswer)
          )
        : '';
    },

    handleCancelCategory() {
      this.$router.push('/mypage/contracts/');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/pages/_question-item';
</style>
