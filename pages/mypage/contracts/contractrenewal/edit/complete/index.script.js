import PageTitle from '~/components/PageTitle';
import BaseButton from '~/components/formItems/BaseButton';

export default {
  components: {
    PageTitle,
    BaseButton,
  },
  computed: {
    isCompleteTypeExamination() {
      return this.$route.query?.completeType === 'examination';
    },
  },
};
