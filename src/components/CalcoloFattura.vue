<template>
  <v-container fluid :class="{'pa-5':isMobile}"></v-container>
</template>

<script>
export default {
  props: {
    isMobile: Boolean
  }
};
</script>
