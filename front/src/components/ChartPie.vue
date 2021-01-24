<template>
  <div class="small">
    <pie-chart :chart-data="getDataCollection" :options="getOptionCollection" />
  </div>
</template>

<script>
import PieChart from './Charts/PieChart.js'
import VueTypes from 'vue-types'
export default {
  components: {
    PieChart
  },
  props: {
    titleText: VueTypes.string,
    labels: VueTypes.arrayOf(VueTypes.string),
    datasets: VueTypes.arrayOf(VueTypes.shape({
      label: VueTypes.string,
      backgroundColor: VueTypes.arrayOf(VueTypes.string),
      data: VueTypes.arrayOf(VueTypes.number)
    }))
  },
  data () {
    return {
      datacollection: {},
      optionCollection: {}
    }
  },
  async created () {
    console.log(this.titleText)
  },
  computed: {
    getDataCollection () {
      const datacollection = {
        labels: this.labels,
        datasets: [
          {
            label: this.datasets[0].label,
            backgroundColor: this.datasets[0].backgroundColor,
            data: this.datasets[0].data
          }
        ]
      }
      return datacollection
    },
    getOptionCollection () {
      const optionCollection = {
        title: {
          display: true,
          text: this.titleText
        }
      }
      return optionCollection
    }
  }
}
</script>

<style>
  .small {
    max-width: 600px;
  }
</style>
