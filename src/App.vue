<template>
  <div id="nav">
<!--     <router-link to="/">Home</router-link> |
    <router-link to="/calculator">Calculator</router-link> | -->
    <!-- <router-link to="/">Fetching</router-link> -->
  </div>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.tooltip {
  pointer-events: none;
  position: absolute;
  font-weight: 400;
  padding: 2px 2px 22px 2px;
  background-color: white;
  border: 2px solid lightgrey;
  border-radius: 10px;
  transition: 0.3s all;
  min-width: 170px;
}

.tooltip > p {
  margin: 0 0 -20px 0;
  padding: 0px 10px;
  background-color: white;
  position: relative;
  z-index: 2;
  text-align: left;
  border-radius: 10px;
}

</style>
