// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div :class="{ 'date-container--error': error }">
    <div class="base-date-picker row-sp justify-content-start">
      <div :class="`col-sp col-${12 / formatCol}`">
        <div class="list-overlay-hide">
          <multiselect
            ref="yearSelect"
            v-model="year"
            error
            name="yearSelect"
            placeholder="年"
            :disabled="disabled"
            select-label=""
            selected-label=""
            deselect-label=""
            :allow-empty="false"
            :options="years"
            :searchable="false"
            @open.once="() => initializeSelect('year')"
          >
            <template #option="{ option }">
              <span :data-year-select="`${option}`" class="tracking">{{
                option
              }}</span>
            </template>
          </multiselect>
        </div>
      </div>
      <div
        v-if="dateFormat.includes(`MM`)"
        :class="`col-sp col-${12 / formatCol}`"
      >
        <div class="list-overlay-hide">
          <multiselect
            ref="monthSelect"
            v-model="month"
            error
            name="month"
            placeholder="月"
            :disabled="disabled"
            select-label=""
            selected-label=""
            deselect-label=""
            :allow-empty="false"
            :options="months"
            :searchable="false"
            @open.once="() => initializeSelect('month')"
          >
            <template #option="{ option }">
              <span :data-month-select="`${option}`" class="tracking">{{
                option
              }}</span>
            </template>
          </multiselect>
        </div>
      </div>
      <div
        v-if="dateFormat.includes(`DD`)"
        :class="`col-sp col-${12 / formatCol}`"
      >
        <div class="list-overlay-hide">
          <multiselect
            ref="daySelect"
            v-model="day"
            error
            name="day"
            placeholder="日"
            :disabled="disabled"
            select-label=""
            selected-label=""
            deselect-label=""
            :allow-empty="false"
            :options="days"
            :searchable="false"
            @open.once="() => initializeSelect('day')"
          >
            <template #option="{ option }">
              <span :data-day-select="`${option}`" class="tracking">{{
                option
              }}</span>
            </template>
          </multiselect>
        </div>
      </div>
    </div>
    <span v-if="error" class="date-container__error-text">{{ error }}</span>
  </div>
</template>

<script>
import moment from 'moment';
import Multiselect from 'vue-multiselect';

export default {
  name: 'BaseDatePicker',
  components: {
    Multiselect,
  },
  props: {
    valueInput: {
      type: [Date, String],
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    minDate: {
      type: [String, Number, Date],
      default: `${new Date().getFullYear() - 100}-01-01`,
    },
    maxDate: {
      type: [String, Number, Date],
      required: false,
      default: `${new Date().getFullYear() + 100}-01-01`,
    },
    dateFormat: {
      type: String,
      default: 'YYYY/MM/DD',
    },
    defaultDate: {
      type: [Date, String],
      required: false,
      default: `${new Date()}`,
    },
    error: {
      type: String,
      default: '',
    },
  },
  data() {
    // moment で YYYY/MMをパースすると
    // IOS だと invalid date になってしまう？ため、
    // YYYY/MM の形式なら事前に YYYY/MM/01 に変換しておく
    let formatInput = this.valueInput;
    if (
      formatInput &&
      this.dateFormat === 'YYYY/MM' &&
      !moment(this.valueInput).isValid()
    ) {
      formatInput = `${this.valueInput}/01`;
    }

    if (formatInput) {
      return {
        year: moment(formatInput).year(),
        month: moment(formatInput).month() + 1,
        day: moment(formatInput).date(),
        formatCol: this.dateFormat.split('/').length,
      };
    } else {
      return {
        year: null,
        month: null,
        day: null,
        formatCol: this.dateFormat.split('/').length,
      };
    }
  },
  computed: {
    // TODO
    days() {
      // 日のレンジを出すためにはyearとmonthが必要のため
      // まだyearとmonthが選択されていない場合は現在の年月を使う
      const year = this.year ?? moment(this.defaultDate).year();
      const month = this.month ?? moment(this.defaultDate).month() + 1;
      let length = moment(`${year}-${month}`, 'YYYY-MM').daysInMonth();
      let add = 1;
      const maxMonth = this.getDateInfo(this.maxDate, 'YYYY-MM');
      const minMonth = this.getDateInfo(this.minDate, 'YYYY-MM');
      const cDate = this.getDateInfo(`${this.year}-${this.month}`, 'YYYY-MM');

      if (minMonth == cDate) {
        add = moment(this.minDate).date();
        length =
          moment(this.minDate).daysInMonth() - moment(this.minDate).date() + 1;
      }

      if (maxMonth == cDate) {
        length = moment(this.maxDate).date();
      }

      if (minMonth == maxMonth) {
        length = moment(this.maxDate).date() - moment(this.minDate).date() + 1;
        add = moment(this.minDate).date();
      }

      return Array.from({ length }, (_, index) => index + add);
    },
    months() {
      let length = 12,
        add = 1;
      const maxYear = this.getDateInfo(this.maxDate, 'YYYY');
      const minYear = this.getDateInfo(this.minDate, 'YYYY');
      if (minYear == this.year) {
        add = moment(this.minDate).month() + 1;
        length = 12 - moment(this.minDate).month();
      }

      if (maxYear == this.year) {
        length = moment(this.maxDate).month() + 1;
      }

      if (minYear == maxYear) {
        length =
          moment(this.maxDate).month() - moment(this.minDate).month() + 1;
        add = moment(this.minDate).month() + 1;
      }

      return Array.from({ length }, (_, index) => index + add);
    },
    years() {
      let length =
        moment(this.maxDate).year() - moment(this.minDate).year() + 1;
      return Array.from(
        { length: !length ? 1 : length },
        (_, index) => index + moment(this.minDate).year()
      );
    },
    isAllFieldFilled() {
      if (this.dateFormat === 'YYYY/MM') {
        return this.year && this.month;
      } else {
        return this.year && this.month && this.day;
      }
    },
  },
  watch: {
    year: function (value) {
      if (
        this.getDateInfo(`${this.year}`, 'YYYY') ==
        this.getDateInfo(this.maxDate, 'YYYY')
      ) {
        this.month =
          this.day > moment(this.maxDate).month()
            ? moment(this.maxDate).month() + 1
            : this.month;
      }

      if (
        this.getDateInfo(`${this.year}`, 'YYYY') ==
        this.getDateInfo(this.minDate, 'YYYY')
      ) {
        this.month =
          this.day < moment(this.minDate).month()
            ? moment(this.minDate).month() + 1
            : this.month;
      }
      if (!this.isAllFieldFilled) {
        return;
      }
      if (this.dateFormat === 'YYYY/MM' && !this.day) {
        this.day = 1;
      }
      // 選択された月の最終日より現在のdayが大きい場合(2月選択時に日が31になっている場合など)
      // はdayをその月の最終日に自動的に変換する
      if (
        this.day > moment(`${value}-${this.month}`, 'YYYY-MM').daysInMonth()
      ) {
        this.day = moment(`${value}-${this.month}`, 'YYYY-MM').daysInMonth();
      }

      return this.$emit(
        'input',
        moment(`${value}/${this.month}/${this.day}`).format(this.dateFormat)
      );
    },
    month: function (value) {
      if (
        this.getDateInfo(`${this.year}-${value}`, 'YYYY-MM') ==
        this.getDateInfo(this.maxDate, 'YYYY-MM')
      ) {
        this.day =
          this.day > moment(this.maxDate).date()
            ? moment(this.maxDate).date()
            : this.day;
      }

      if (
        this.getDateInfo(`${this.year}-${value}`, 'YYYY-MM') ==
        this.getDateInfo(this.minDate, 'YYYY-MM')
      ) {
        this.day =
          this.day < moment(this.minDate).date()
            ? moment(this.minDate).date()
            : this.day;
      }

      if (!this.isAllFieldFilled) {
        return;
      }
      if (this.dateFormat === 'YYYY/MM' && !this.day) {
        this.day = 1;
      }
      // 選択された月の最終日より現在のdayが大きい場合(2月選択時に日が31になっている場合など)
      // はdayをその月の最終日に自動的に変換する
      if (this.day > moment(`${this.year}-${value}`, 'YYYY-MM').daysInMonth()) {
        this.day = moment(`${this.year}-${value}`, 'YYYY-MM').daysInMonth();
      }

      return this.$emit(
        'input',
        moment(`${this.year}/${value}/${this.day}`).format(this.dateFormat)
      );
    },
    day: function (value) {
      if (!this.isAllFieldFilled) {
        return;
      }
      return this.$emit(
        'input',
        moment(`${this.year}/${this.month}/${value}`).format(this.dateFormat)
      );
    },
  },

  methods: {
    getDateInfo(date, type) {
      let tmpDate = date;
      if (!moment(tmpDate).isValid()) {
        // 区切りが`/`の場合もあるかもしれないので`-`に置換してから分割する
        const splitValue = tmpDate.replace('///g', '-').split('-');
        tmpDate = `${splitValue[0]}/${splitValue[1].padStart(2, '0')}/01`;
      }
      return moment(tmpDate).format(type);
    },
    // セレクトボックスを開いた時の処理
    initializeSelect(targetSelect) {
      let target;
      if (targetSelect === 'year') {
        target = this.year ?? moment(this.defaultDate).year();
      } else if (targetSelect === 'month') {
        target = this.month ?? moment(this.defaultDate).month() + 1;
      } else if (targetSelect === 'day') {
        target = this.day ?? moment(this.defaultDate).date();
      }
      this.$nextTick(() => {
        // 選択されているoption要素までスクロールする
        const targetElement = this.$refs[
          `${targetSelect}Select`
        ].$el.querySelector(`[data-${targetSelect}-select="${target}"]`)
          ?.parentElement.parentElement;
        if (targetElement) {
          const parent = targetElement.parentElement.parentElement;
          parent.scrollTop = targetElement.offsetTop;
        }
      });
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
@import '~/assets/scss/components/base-date-picker';
</style>
