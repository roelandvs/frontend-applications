<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
  <Graph 
    :data="data"
  />
</template>

<script>
import { 
  getData,
  makeJSON,
  filterEntries,
  mergeObjects,
  filterGeoLocations,
  mergeGeoData,
  filterAllEntries,
  mergeCities,
  mergeStates
 } from "@/utils/dataFiltering.js";

 import Graph from "@/components/Graph.vue";
 import { geoData } from "@/data/geodata"
 import { ref } from "vue";

const endpoints = [
  "https://opendata.rdw.nl/resource/b3us-f26s.json?$limit=2000",
  "https://opendata.rdw.nl/resource/nsk3-v9n7.json?$limit=7000"
];

const usefullColumns = [
  "areaid",
  "capacity",
  "disabledaccess",
  "areageometryastext"
];

export default {
  name: "Fetching",
  components: { 
    Graph
  },

  setup() {
    let data = ref([]);
    getData(endpoints)
      .then(makeJSON)
      .then(RDWData => filterEntries(RDWData, usefullColumns))
      .then(mergeObjects)
      .then(filterGeoLocations)
      .then(RDWFilteredData => mergeGeoData(RDWFilteredData, geoData))
      .then(filterAllEntries)
      .then(mergeCities)
      .then(mergeStates)
      .then(data => geoData.value = data);

      return { data };
  }

};
</script>
