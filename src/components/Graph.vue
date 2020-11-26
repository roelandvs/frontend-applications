<template>
  <h3>Rolstoel toegankelijke parkeerplaatsen in {{ currentColumn }}</h3>

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
const height = 700;

const margin = { top: 20, right: 20, bottom: 60, left: 150 };
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
        // console.log('Steden')
      } else {
        this.currentColumn = "Provincies"
        // console.log('Provincies')
      }
    }
  },
  setup() {
    let currentColumn = ref("Steden");
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

    g.append('g').attr('class', 'axis-left');
    g.append('g').attr('class', 'axis-bottom');

    select('#app')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);
  },
  updated() {
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
        .attr('x', innerHeight / 2 + 90)
        .attr('class', 'label')
        .text('Aantal parkeerplaatsen')

    g.selectAll('rect').data(data)
      //join is enter update and remove combined    
      .join('rect')
        .attr('y', row => yScale(column === 'Steden' ? row.city : row.state))
        .attr('width', row => xScale(row.capacity))
        .attr('height', yScale.bandwidth())
        .attr('fill', 'coral')
        .attr('class', 'rect');

    g.selectAll(".rect")
      .on("mouseover", (e, data) => {
        console.log(data)
        select('.tooltip').html(
          data.parkingAreas ?
          '<h4>Parkeerlocaties:</h4>' + `${data.parkingAreas.map(item =>'<p>' + item.road + ' (' + item.postcode + ')' + ': ' + item.capacity + '</p>')}` :
          '<h4>Capaciteit steden:</h4>' + `${data.citiesInState.map(item =>'<p>' + item.city + ': ' + item.capacity + '</p>')}`
        )
        .style('left', `${e.pageX}px`)
        .style('top', `${e.pageY - 28}px`)
        .style('opacity', .9)
      })
      .on("mouseout", () => {
        select('.tooltip').style('opacity', 0);
      });

   g.append('text')
  }
};
</script>
<style>
h3 {
  font-family: times;
  font-size: 1.5em;
  margin: 0 50px 10px;
}

h4 {
  margin: 5px 0 10px 10px;
  text-align: left;
}

text {
  font-size: 1.5em;
  font-family: Avenir;
}

button {
  border-radius: 3px;
  margin: 0 2px;
  padding: 5px 10px;
  border: 1px solid black;
}

button:focus {
  border: 2px solid orange;
}

svg {
  margin-bottom: 25px;
}

.label {
  fill: black;
  font-size: 2em;
}

.rect:hover {
  transition: 0.5s all;
  fill: orange;
}

.btn-group {
  padding: 0;
  /*margin: 0 auto;*/
  margin: 0 50px 10px;
  width: 200px;
}


</style>