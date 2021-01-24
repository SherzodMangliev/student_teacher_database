<template>
  <div class="container">
    <div class="row h-100 rounded bg-white p-2">
      <div class="col-2 bg-info d-flex justify-content-center align-items-center rounded">
        <i :class="icon" class="tim-icons text-white"></i>
      </div>
      <div class="col-10">
        <div class="title font-weight-bold">
          {{title}}
        </div>
        <div class="subtitle">
          {{subtitle}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'

export default {
  props: {
    title: VueTypes.string.isRequired.def('Traffic'),
    subtitle: VueTypes.number.isRequired.def(10),
    icon: VueTypes.string.def('icon-single-02')
  }
}
</script>

<style lang="scss" scoped>
  .tim-icons {
      font-size: 16px;
  }
</style>
