<template>
  <div>
    <DatetimePickerScroll
      v-if="isOpenInsStartDateScrollPicker"
      :value="value"
      :days-min="daysMin"
      :days-max="daysMax"
      :current-year="currentYear"
      :current-month="currentMonth"
      :current-date="currentDate"
      :options-years="years"
      :options-months="months"
      :options-date="date"
      :change-value="changeValue"
      @closeModal="closeModal"
    />
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    value: {
      type: String,
    },
    daysMin: {
      type: String,
    },
    daysMax: {
      type: String,
    },
  },
  data() {
    return {
      //scroll-pickerで使うフィールド
      currentYear: 0,
      currentMonth: 0,
      currentDate: 0,
      isOpenInsStartDateScrollPicker: false,
    };
  },
  computed: {
    min_ins_start_year() {
      return Number(moment(this.daysMin).format('YYYY'));
    },
    max_ins_start_year() {
      return Number(moment(this.daysMax).format('YYYY'));
    },
    min_ins_start_month() {
      return Number(moment(this.daysMin).format('MM'));
    },
    max_ins_start_month() {
      return Number(moment(this.daysMax).format('MM'));
    },
    min_ins_start_date() {
      return Number(moment(this.daysMin).format('DD'));
    },
    max_ins_start_date() {
      return Number(moment(this.daysMax).format('DD'));
    },
    yearMonthDateList() {
      // 年の計算
      const target = {};
      const yearsDiff = moment(this.daysMax)
        .startOf('year')
        .diff(moment(this.daysMin).startOf('year'), 'years');
      const years = [];
      for (var i = 0; i <= yearsDiff; i++) {
        const setYear = this.min_ins_start_year + i;
        years.push(setYear);
      }
      years.forEach((d) => {
        target[d] = {};
      });
      // 月の計算
      let startMonth = this.min_ins_start_month;
      const monthDiff = moment(this.daysMax)
        .startOf('month')
        .diff(moment(this.daysMin).startOf('month'), 'months');
      let targetYearsIdx = 0;
      for (var i = 0; i <= monthDiff; i++) {
        if (startMonth === 13) {
          targetYearsIdx++;
          startMonth = 1;
        }
        target[years[targetYearsIdx]][startMonth] = [];
        startMonth++;
      }
      // 日の計算
      Object.keys(target).forEach((year) => {
        Object.keys(target[year]).forEach((month) => {
          let dateArray = [];
          const numberMonth = Number(month);
          let lastDay = new Date(year, month, 0).getDate();
          if (numberMonth == this.min_ins_start_month) {
            if (numberMonth == this.max_ins_start_month) {
              lastDay = this.max_ins_start_date;
            }
            dateArray = [
              ...Array(lastDay - this.min_ins_start_date + 1).keys(),
            ].map((i) => {
              return this.min_ins_start_date + i;
            });
          } else if (numberMonth == this.max_ins_start_month) {
            dateArray = [...Array(this.max_ins_start_date).keys()].map(
              (i) => ++i
            );
          } else {
            dateArray = [...Array(lastDay).keys()].map((i) => ++i);
          }
          target[year][month] = dateArray;
        });
      });
      return target;
    },
    years() {
      return Object.keys(this.yearMonthDateList);
    },
    months() {
      if (!this.currentYear) {
        return;
      }
      return Object.keys(this.yearMonthDateList[this.currentYear]).map((d) =>
        this.getStringMMDD(d)
      );
    },
    date() {
      if (
        !this.currentYear ||
        !this.currentMonth ||
        !this.yearMonthDateList[this.currentYear][this.currentMonth]
      ) {
        return;
      }
      return this.yearMonthDateList[this.currentYear][this.currentMonth].map(
        (d) => this.getStringMMDD(d)
      );
    },
    selectedDate() {
      return moment(
        this.currentYear +
          this.getStringMMDD(this.currentMonth) +
          this.getStringMMDD(this.currentDate)
      ).format('YYYYMMDD');
    },
  },
  mounted() {
    if (this.value) {
      const value = this.value;
      const year = moment(value).format('YYYY');
      const month = moment(value).format('MM');
      const date = moment(value).format('DD');
      this.currentYear = Number(year);
      this.currentMonth = Number(month);
      this.currentDate = Number(date);
    } else {
      this.currentYear = this.min_ins_start_year;
      this.currentMonth = this.min_ins_start_month;
      this.currentDate = this.min_ins_start_date;
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal', this.selectedDate);
    },
    toggleModal() {
      this.isOpenInsStartDateScrollPicker =
        !this.isOpenInsStartDateScrollPicker;
    },
    getStringMMDD(monthOrDate) {
      let str = monthOrDate.toString();
      if (str.length === 1) {
        str = '0' + str;
      }
      return str;
    },
    resetModalState() {
      this.currentYear = 0;
      this.currentMonth = 0;
      this.currentDate = 0;
    },
    changeValue(target, value) {
      this[target] = Number(value);
    },
  },
};
</script>
