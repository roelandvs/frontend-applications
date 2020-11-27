# Frontend-Applications
This project is made for De Volkskrant. They asked us to make a interactive datavisualisation based on 37 datasets with parking data. We had to find an topic that interested us, and create a research question based on that topic. The question I'm researching is:   

**Which cities/pronvinces in the Netherland take the wheelchair accessibility of the parking spaces most into consideration?**

More information about the research question is in the [Wiki](https://github.com/roelandvs/frontend-data/wiki/Concept)

## What does this project do?
This project is made to create an interactive datavisualisation of the research question. In this project the data of RDW is being filtered and cleaned, and then a interactive chart is made using D3.

## Which features have I used?
This project uses the framework Vue to build the article. To make and update the datavisualisation it implements the D3 library. The datavisualisation contains an update function to switch between an overview of wheelchair accessable parking spaces in cities and in counties. It also contains an tooltip that show the individual location and capacitty of parkinig spaces.

## Which data have I used?
The datasets I'm using in this project are from RDW. I'm combining two datasets to get the information I need.

I'm using the [SPECIFICATIES PARKEERGEBIED](https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-SPECIFICATIES-PARKEERGEBIED/b3us-f26s) dataset to get the information about the wheelchair accessibility and the capacity of the parking spaces.

Used columns:
- AreaID
- Capacity
- DisabledAccess

I'm using the [GEOMETRIE GEBIED](https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-GEOMETRIE-GEBIED/nsk3-v9n7) dataset to get the geo locations of the parking spaces.

Used columns:
- AreaID
- GeoDataAsText

After I've filtered the geo locations out of the datasets I fetch the informations about the geo locations using a reversed geocoding API: [OpenCage Geocoding API](https://opencagedata.com/api)

## Preview of data visualisation
<img width="1002" alt="Schermafbeelding 2020-11-27 om 11 47 00" src="https://user-images.githubusercontent.com/59770136/100441156-4d07e700-30a6-11eb-82eb-df3b827ec581.png">
https://roeland-fa.netlify.app/#/

## Installation Guide
Create a directory using your terminal:
```
mkdir <directory name>
```

Navigate to the directory:
```
cd <directory name>
```

Install this project:
```
git clone https://github.com/roelandvs/frontend-data.git
```

## Sources
- [D3](https://www.youtube.com/watch?v=NlBt-7PuaLk&ab_channel=CurranKelleher)
- [Functional Programming]( https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0#:~:text=Functional%20programming%20(often%20abbreviated%20FP,state%20flows%20through%20pure%20functions )
- [Map, Filter, Reduce](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [OpenCage GeoCoding API](https://opencagedata.com/api)
- [Vue installation](https://cli.vuejs.org/guide/)

Received help from:
- Vincent van Leeuwen
- Jonah Meiers
