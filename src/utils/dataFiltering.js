export function getData(urls) {
  const RDWDatasets = urls.map(url => fetch(url));
  return Promise.all(RDWDatasets);
}

export function makeJSON(response) {
  return Promise.all(response.map(response => response.json()));
}

export function filterEntries(datasets, columnNames) {
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

export function mergeObjects(dataset) {
  let accessDataset = dataset[0];
  let locationDataset = dataset[1];

  return accessDataset
    .map(entry => {
      //vergelijkt id's van beide datasets, en als deze overeenkomen bewaard hij ze
      let locationItem = locationDataset.find(
        item => item.areaid === entry.areaid
      );

      if (locationItem) {
        const mergedItem = { ...entry, ...locationItem};
        return mergedItem;
      }
    }).filter(entry => entry !== undefined)
    .reduce((acc, curr) => {
      return acc.find(item => curr.areaid === item.areaid) ? acc : [...acc, curr]
    }, []);
}

export function filterGeoLocations(dataset) {
  return dataset.map(entry => {
    //RegEx is geschreven door Jonah Meijers
    const geoLocation = entry.areageometryastext.match(/\d+\.\d+/g);
    const lng = +geoLocation[0];
    const lat = +geoLocation[1];

    entry.geo = [lat, lng];
    return entry;
  });
};

export async function mergeGeoData(RDWdataset) {
  const geoDatasets = await fetch("http://209.250.254.119")
    .then(response => response.json())
  // console.log('geo', geoDatasets)
  // console.log('RDW', RDWdataset)

  return RDWdataset.map(entry => {
    let geoItem = geoDatasets.find(
      item => item.id === entry.areaid
    );

    if (geoItem) {
      const mergedItem = { ...entry, ...geoItem};
      return mergedItem;  
    }
  }).filter(entry => entry !== undefined);

  // return RDWdataset.reduce((acc, cur, i) => {
  //   const mergedItem = {...cur, ...geoDataset[i]};
  //   if(i <= 1002) {
  //     acc.push(mergedItem);
  //   }
  //   return acc;
  // }, []);
};

export function filterAllEntries(dataset) {
  // console.log(dataset)

  return dataset.map(item => {
    let city;

    if(item.cityInfo.town) {
      city = item.cityInfo.town;
      // console.log('town', city)
    } else if(item.cityInfo.village) {
      city = item.cityInfo.village;
      // console.log('village', city)
    } else if(item.cityInfo.city){
      city = item.cityInfo.city;
      // console.log('city', city)
    }

    let cleanObject = {
      city: city,
      disabledaccess: item.disabledaccess,
      capacity: +item.capacity,
      road: item.cityInfo.road,
      postcode: item.cityInfo.postcode,
      state: item.cityInfo.state,
    };

    return cleanObject;
  }).filter(item => item.disabledaccess == 1 && item.capacity != 0);
};

export function mergeCities(dataset) {
  // console.log(dataset)
  return dataset.reduce((acc, cur) => {
    let city = cur.city;
    let capacity = cur.capacity;
    let postcode = cur.postcode;
    let road = cur.road;
    let state = cur.state;

    const findMatchIndex = acc.findIndex(item => item.city === city);

    if(findMatchIndex != -1) {
      let parkingArea = {
        capacity: capacity,
        road: road,
        postcode: postcode
      };

      acc[findMatchIndex].capacity += capacity;
      acc[findMatchIndex].parkingAreas.push(parkingArea);
     } else {
      let newCity = {
        city: city,
        capacity: capacity,
        state: state,
        parkingAreas: [{
          capacity: capacity,
          road: road,
          postcode: postcode,
        }]
      }

      acc.push(newCity);
    }

    return acc;
  }, [])
};

export function mergeStates(dataset) {
  let stateDataset = dataset.reduce((acc, cur) => {
    let city = cur.city;
    let capacity = cur.capacity;
    let state = cur.state;

    const findMatchIndex = acc.findIndex(item => item.state === state);

    if(findMatchIndex != -1) {
      let newCity = {
        city: city,
        capacity: capacity,
      };

      acc[findMatchIndex].capacity += capacity;
      acc[findMatchIndex].citiesInState.push(newCity);
     } else {
      let newState = {
        state: state,
        capacity: capacity,
        citiesInState: [{
          city: city,
          capacity: capacity,
        }]
      }

      acc.push(newState);
    }

    return acc;
  }, [])

  return [dataset, stateDataset];
};






