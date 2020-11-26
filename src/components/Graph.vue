<template>
  <div>{{ currentColumn }}</div>
  <div class="btn-group">
    <button @click="updateAxis">Steden</button>
    <button @click="updateAxis">Provincies</button>
  </div>
  <svg></svg>

</template>

<script>
import { 
  select,
  scaleLinear,
  max,
  scaleBand,
  axisLeft,
  axisBottom
} from 'd3';  
import { ref } from "vue";

const width = 960;
const height = 500;

const margin = { top: 20, right: 20, bottom: 60, left: 125 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

export default {
  name: "Graph",
  props: [
    'data'
  ],
  methods: {
    //e is an event
    updateAxis(e) {
      //target is the source of event
      if (e.target.innerText === "Steden") {
        this.currentColumn = "Steden"
        console.log(this.currentColumn)
      } else {
        this.currentColumn = "Provincies"
        console.log(this.currentColumn)
      }
    }
  },
  setup() {
    let currentColumn = ref("Steden")
    return {
      currentColumn
    };
  },
  mounted() {
    //Here is the d3 code that only needs to run once
    const svg = select('svg')

    svg
      .attr('viewBox', `0 0 ${width} ${height}`)

    //adds margin to group g
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    g.append('g').attr('class', 'axis-left')
    g.append('g').attr('class', 'axis-bottom');
  },
  updated() {
    // If there is no data (length of data array is 0), stop the function by returning immediately
    if (!this.data.length) return
    let column = this.currentColumn;
    // Selects which dataset is being used
    let data = column === 'Steden' ? this.data[0] : this.data[1]
    const g = select('svg > g');
    const xScale = scaleLinear()
      .domain([0, max(data, row => row.capacity)])
      .range([0, innerWidth]);

    const yScale = scaleBand()
      .domain(data.map(row => {
        if (column === 'Steden') { 
          return row.city
        } else {
          return row.state
        }
      }))
      .range([0, innerHeight])
      .padding(0.2)

    //call is a function that takes a function, and envokes it with the selection before the .call
    //y-as
    g.select('.axis-left').call(axisLeft(yScale))
      .selectAll('.tick line')
      .remove();

    //x-as
    g.select('.axis-bottom').call(axisBottom(xScale))
      .attr('transform', `translate(0, ${innerHeight})`)
      .append('text')
        .attr('y', 50)
        .attr('x', innerHeight / 2 + 80)
        .attr('class', 'label')
        .text('Aantal parkeerplaatsen')

    g.selectAll('rect').data(data)
      //join is enter update and remove combined    
      .join('rect')
        .attr('y', row => yScale(column === 'Steden' ? row.city : row.state))
        .attr('width', row => xScale(row.capacity))
        .attr('height', yScale.bandwidth())
        .attr('fill', 'coral')
        .attr('class', 'rect')
        //.mouseover + datameegeven

    g.append('text')
  }
};
</script>