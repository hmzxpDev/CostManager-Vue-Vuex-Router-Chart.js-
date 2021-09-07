<template>
  <div>
    <h4 class="text-center mb-5">Cost by categories</h4>
    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
import { Doughnut } from "vue-chartjs";
import { mapGetters } from "vuex";

Chart.defaults.global.legend.position = "right";

export default {
  name: "Chart",
  extends: Doughnut,
  data() {
    return {
      chartData: [],
    };
  },
  methods: {
    chartDataComputed() {
      return this.getCategory.map((currentValue) => {
        return this.getData.reduce((total, item) => {
          if (currentValue == item.category) {
            total += item.value;
          }
          return total;
        }, 0);
      });
    },
    chartOption() {
      return {
        labels: this.getCategory,
        datasets: [
          {
            label: "Cost chart",
            data: this.chartDataComputed(),
            backgroundColor: [
              "#3f95cd",
              "#8e5ea2",
              "#3aba9f",
              "#e8c3b9",
              "#c4584f",
            ],
            hoverOffset: 4,
          },
        ],
      };
    },
  },

  computed: {
    ...mapGetters(["categoryGetter", "dataGetter"]),
    getCategory() {
      return this.categoryGetter;
    },
    getData() {
      return this.dataGetter;
    },
  },
  watch: {
    getData() {
      this.renderChart(this.chartOption());
    },
  },
  mounted() {},
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>