<template>
  <section>
    <h1>Moeten parkeerplaatsen toegankelijker worden voor rolstoelgangers?</h1>
    <p>
      Uit cijfers van het RDW blijkt dat slechts een klein deel van alle parkeergebieden toegankelijk zijn met een rolstoel (parkeergebieden bestaan uit parkeerterreinen en parkeergarages). Er zijn slechts 54 van de 989 parkeergebieden rond Nederland toegankelijk met een rolstoel (in de dataset. Dit lijkt in eerste instantie erg weinig, maar is dit ook zo?
    </p>
  </section>
  <section>
    <h2>Aantal rolstoelgebruikers</h2>
    <p>
       Volgens de GIP databank waren er in 2019 ruim 125.000 rolstoelgebruikers in Nederland. Dit gaat wel over mensen die constant in een rolstoel zitten. In Nederland zit dus ongeveer  0,7% van de inwoners in een rolstoel. Als je dit vergelijkt met het percentage rolstoeltoegankelijke parkeergebieden (5,5%) lijkt de verhouding niet heel nadelig te zijn. Dit percentage zegt echter niks over de verdeling rond Nederland. 
    </p>
      <Graph 
        :data="data"
      />
    <p>
      De verdeling van parkeergebieden per stad schets een meer nadelig beeld voor rolstoelgebruikers. Zo zijn er wel meerdere parkeerplaatsen in een stad, maar vaak zijn deze over slechts een of enkele parkeerterreinen verdeeld. Als je naar de datavisualisatie kijkt kun je zien dat er in Rotterdam slechts 2 parkeerterreinen toegankelijk zijn met een rolstoel. Dit is niet veel om afhankelijk van te zijn.
    </p>

    <p>
      De reden dat niet elk parkeergebied toegankelijk is met een rolstoel is omdat een parkeerplaats 1,5 keer zo breed moet zijn. Dit is nadelig voor een parkeerplaats eigenaar aangezien dit meer ruimte in neemt. Een oplossing voor dit probleem zou kunnen zijn om een aantal parkeerplaatsen per parkeerterrein te moeten aanleggen. 
    </p>
  </section>

  <section>
    <h2>Conclusie</h2>
    <p>Of er een tekort is aan rolstoel toegankelijke parkeerplaatsen is moeilijk te zeggen. Wel is het zo dat de verdeling van deze plaatsen niet erg verspreid is. In veel steden zijn deze plekken over een of enkele parkeerterreinen verdeeld. Dit zou uitgebreider moeten worden. Een verplichting van een minimum aantal parkeerplaatsen per parkeerterrein of garage zou een goede oplossing zijn.</p>
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
    margin: 0 50px 40px;

  }

</style>
