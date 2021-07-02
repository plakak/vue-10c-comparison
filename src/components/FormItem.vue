<template>
  <div class="form-input" :class="{ 'has-error': errors.length }">
    <label>{{ label }}</label>
    <input name="name" :value="modelValue" @input="onChange" />
    <p v-if="errors.length" class="error">
      {{ errors[0].$message }}
    </p>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { ErrorObject } from '@vuelidate/core';

  export default defineComponent({
    name: 'FormItem',
    props: {
      label: {
        type: String,
        required: true
      },
      errors: {
        type: Object as PropType<ErrorObject[]>,
        default: () => []
      },
      modelValue: {
        type: String,
        required: true
      }
    },
    emits: ['update:modelValue'],
    methods: {
      onChange(event: Event) {
        const target = event.target as HTMLInputElement;
        this.$emit('update:modelValue', target.value);
      }
    }
  });
</script>

<style lang="scss" scoped>
  .form-input {
    margin-top: 2rem;

    &.has-error input {
      background-color: rgba(lightcoral, 0.4) !important;
    }

    input {
      background-color: #6368c6;
      width: 100%;
      border: none;
      outline: none;
      color: #eaeaea;
      font-size: 1rem;
      padding: 1.2rem;
      border-radius: 0.5rem;
    }

    label {
      font-size: 1rem;
      margin-bottom: 0.6rem;
      color: #eaeaea;
    }

    .error {
      position: absolute;
      font-size: 10px;
      color: lighten(tomato, 10%);
      margin: 0;
    }
  }
</style>
