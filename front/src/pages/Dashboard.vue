<template>
  <div>

    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-4 mb-3">
            <dash-board-card title="All members" />
          </div>
          <div class="col-4 mb-3">
            <dash-board-card title="Students" />
          </div>
          <div class="col-4 mb-3">
            <dash-board-card title="Teachers"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import LineChart from '@/components/Charts/LineChart';
  import BarChart from '@/components/Charts/BarChart';
  import ChartPie from '@/components/ChartPie.vue'
  import * as chartConfigs from '@/components/Charts/config';
  import TaskList from './Dashboard/TaskList';
  import UserTable from './Dashboard/UserTable';
  import config from '@/config';
  import DashBoardCard from '@/components/dashBoardCard.vue';

  export default {
    components: {
      LineChart,
      ChartPie,
      BarChart,
      TaskList,
      UserTable,
      DashBoardCard
    },
    data() {
      return {
      }
    },
    computed: {
      enableRTL() {
        return this.$route.query.enableRTL;
      },
      isRTL() {
        return this.$rtl.isRTL;
      },
      bigLineChartCategories() {
        return this.$t('dashboard.chartCategories');
      }
    },
    methods: {
    },
    mounted() {
      this.i18n = this.$i18n;
      if (this.enableRTL) {
        this.i18n.locale = 'ar';
        this.$rtl.enableRTL();
      }
    },
    beforeDestroy() {
      if (this.$rtl.isRTL) {
        this.i18n.locale = 'en';
        this.$rtl.disableRTL();
      }
    }
  };
</script>
<style>
</style>
