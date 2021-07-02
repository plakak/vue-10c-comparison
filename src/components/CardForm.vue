<template>
  <form class="card-form">
    <FormItem
      v-model="formInstance.form.name.$model"
      label="Name on Card"
      :errors="formInstance.form.name.$errors"
    />
    <FormItem
      v-model="modelValue.cardNum"
      label="Card Number"
      :errors="formInstance.form.cardNum.$errors"
    />
    <div class="horizontal">
      <FormItem
        v-model="modelValue.expDate"
        label="Expiration date"
        :errors="formInstance.form.expDate.$errors"
      />
      <FormItem
        v-model="modelValue.cvv"
        label="Name on Card"
        :errors="formInstance.form.cvv.$errors"
      />
    </div>
  </form>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import FormItem from './FormItem.vue';

  export default defineComponent({
    name: 'CardForm',
    components: {
      FormItem
    },
    props: {
      modelValue: {
        type: Object,
        required: true
      },
      formInstance: {
        type: Object,
        required: true,
        default: () => ({})
      }
    },
    emits: ['update:modelValue']
  });
</script>

<style lang="scss" scoped>
  .horizontal {
    display: flex;
    width: 100%;

    * {
      width: 100%;
    }

    *:first-of-type {
      margin-right: 2rem;
    }
  }

  .card-form {
    margin-top: 2rem;
  }
</style>
