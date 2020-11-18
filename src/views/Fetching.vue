<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script>
export default {
  name: "Fetching",

  //for sending variables to html
  setup() {
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

    // const geoData = geoAPI;

    getData(endpoints)
      .then(response => makeJSON(response))
      .then(RDWData => filterEntries(RDWData, usefullColumns))
      .then(RDWFilteredEntries => mergeObjects(RDWFilteredEntries))
      .then(RDWSingleObject => filterGeoLocations(RDWSingleObject))
      // .then(RDWFilteredData => mergeGeoData(RDWFilteredData, geoData))
      // .then(mergedAllData => filterAllEntries(mergedAllData))
      // .then(console.log);

    function getData(urls) {
      const RDWDatasets = urls.map(url => fetch(url));
      return Promise.all(RDWDatasets);
    }

    function makeJSON(response) {
      return Promise.all(response.map(response => response.json()));
    }

    function filterEntries(datasets, columnNames) {
      return datasets.map(endpoint => {
        return endpoint.map(entry => {
          let newEntry = {};

          columnNames.forEach(column => {
            if (entry[column]) {
              newEntry[column] = entry[column];
            }
          });

          return newEntry;
        });
      });
    }

    function mergeObjects(dataset) {
      let accessDataset = dataset[0];
      let locationDataset = dataset[1];

      return accessDataset
        .map(entry => {
          //vergelijkt id's van beide datasets, en als deze overeenkomen bewaard hij ze
          let locationItem = locationDataset.find(
            item => item.areaid === entry.areaid
          );

          if (locationItem) {
            const mergedItem = { ...entry, ...locationItem };
            return mergedItem;
          }
        })
        .filter(entry => entry !== undefined);
    }

    function filterGeoLocations(dataset) {
      return dataset.map(entry => {
        //RegEx is geschreven door Jonah Meijers
        const geoLocation = entry.areageometryastext.match(/\d+\.\d+/g);
        const lng = +geoLocation[0];
        const lat = +geoLocation[1];

        entry.geo = [lat, lng];
        return entry;
      });
    };

    // function mergeGeoData(RDWdataset, geoDataset) {
    //   return RDWdataset.reduce((acc, cur, i) => {
    //     const mergedItem = {...cur, ...geoDataset[i]};
    //     acc.push(mergedItem);
    //     return acc;
    //   }, []);
    // };

    // function filterAllEntries(dataset) {
    //   return dataset.map(item => {
    //     let city;

    //     if(item.cityInfo.town) {
    //       city = item.cityInfo.town;
    //     } else if(item.cityInfo.village) {
    //       city = item.cityInfo.village;
    //     } else {
    //       city = item.cityInfo.city;
    //     }

    //     let cleanObject = {
    //       city: city,
    //       disabledaccess: item.disabledaccess,
    //       capacity: +item.capacity,
    //       // road: item.cityInfo.road,
    //       postcode: item.cityInfo.postcode,
    //       state: item.cityInfo.state,
    //     };

    //     return cleanObject;
    //   }).filter(item => item.disabledaccess == 1 && item.capacity != 0);
    // };
  }
};
</script>
