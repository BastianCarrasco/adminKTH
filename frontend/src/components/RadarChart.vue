<template>
    <Radar v-if="chartData" :data="chartData" :options="options" />
  </template>
  
  <script>
  import { Radar } from 'vue-chartjs'
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler
  } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, RadialLinearScale, PointElement, LineElement, Filler)
  
  export default {
    name: 'RadarChart',
    props: {
      chartData: {
        type: Object,
        required: true
      }
    },
    computed: {
      options() {
        return {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            }
          },
          scales: {
            r: {
              angleLines: { display: true },
              suggestedMin: 0,
              suggestedMax: 10
            }
          }
        }
      }
    },
    components: {
      Radar
    }
  }
  </script>
  