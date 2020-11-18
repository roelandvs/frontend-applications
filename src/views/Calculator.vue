<template>
  <div class="calculator">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h3>Lekkerrr Rekenenn!</h3>
    <input type="text" v-model="num1" class="field" maxlength="2" />
    <span> + </span>
    <input type="text" v-model="num2" class="field" maxlength="2" />
    <span> = </span>
    <span>{{ result }}</span>
  </div>
</template>

<script>
import { reactive, computed, toRefs } from "vue";

function calculateValue() {
  let state = reactive({
    num1: 0,
    num2: 0,
    result: computed(() => +state.num1 + +state.num2)
  });

  return toRefs(state);
}

export default {
  name: "Calculator",

  setup() {
    let { num1, num2, result } = calculateValue();

    return {
      num1,
      num2,
      result
    };
  }
};
</script>
