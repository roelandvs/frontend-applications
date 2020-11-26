<template>
  <section>
    <h1>Parkeerplaatsen moeten toegankelijker worden voor rolstoelgangers</h1>
    <p>
      Uit data van de RDW blijkt dat slechts een zeer klein deel van alle parkeergebieden toegankelijk is met een rolstoel. Uit de data blijkt dat er slechts 
    </p>
  </section>
  <section>
    <h2>Nieuwe dingen</h2>
    <p>
       Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in t
    </p>
      <Graph 
        :data="data"
      />
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    </p>
  </section>
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
 // import { geoData } from "@/data/geodata";
 import { ref } from "vue";
 // import { onMounted } from "@vue/runtime-core";

const endpoints = [
  "https://opendata.rdw.nl/resource/b3us-f26s.json?$limit=2000",
  "https://opendata.rdw.nl/resource/nsk3-v9n7.json?$limit=7000",
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
      .then(RDWFilteredData => mergeGeoData(RDWFilteredData))
      .then(filterAllEntries)
      .then(mergeCities)
      .then(mergeStates)
      .then(completedData => {
        data.value = completedData;
      })
      // .then(console.log)
      .catch(error => console.log(error))

      return { data };
  }

};
</script>
<style>
  section {
    max-width: 900px;
    text-align: left;
    margin: auto;
  }

  h1 {
    font-size: 3em;
    font-family: times;
    margin: 0 50px 20px;
  }

  h2 {
    font.size: 2em;
    font-family: times;
    margin: 0 50px 10px;
  }

  p {
    font-size: 1.1em;
    margin: 0 50px 50px;

  }

</style>
