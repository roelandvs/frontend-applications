<template>
  <div>Ellue</div>
</template>

<script>

export default {
  name: "Graph",
  props: [
    "data"
  ],
  setup(props) {
    console.log(props.data)
  }
};
</script>