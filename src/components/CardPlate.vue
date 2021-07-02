<template>
  <div
    class="card-plate"
    :class="{ selected: selected }"
    @click="$emit('click')"
  >
    <Check v-if="selected" class="checkmark" />
    <img :src="src" />
  </div>
</template>

<script lang="ts" setup="{ defineProps, defineEmit }">
  import Check from '../assets/icons/check.svg?component';

  defineProps({
    selected: {
      type: Boolean,
      default: false,
      required: true
    },
    src: {
      type: String,
      required: true
    }
  });

  defineEmit(['click']);
</script>

<style lang="scss" scoped>
  .card-plate {
    cursor: pointer;
    width: 8rem;
    height: 6rem;
    border: 1px solid gray;
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    img {
      width: 45%;
    }

    &.selected {
      border-color: white;
    }

    .checkmark {
      top: 0;
      right: 0;
      position: absolute;
      transform: scale(0.5);
    }
  }
</style>
