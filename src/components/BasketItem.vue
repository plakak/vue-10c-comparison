<template>
  <div class="basket-item">
    <div class="image">
      <img alt="phone" :src="photoUrl" />
    </div>
    <div class="description">
      <div class="name">{{ name }}</div>
      <div class="specs">{{ description }}</div>
    </div>

    <div class="counter">
      <PlusIcon class="plus" @click="countChange(1)" />
      <input
        type="number"
        :value="count"
        @change="countChange"
        @input="onInput"
      />
      <MinusIcon class="minus" @click="countChange(-1)" />
    </div>

    <div class="price">${{ totalPrice }}</div>

    <TrashIcon class="actions" @click="removeItem" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import PlusIcon from '../assets/icons/plus.svg?component';
  import MinusIcon from '../assets/icons/minus.svg?component';
  import TrashIcon from '../assets/icons/trash-2.svg?component';

  const checkResult = (value: number): number => {
    if (value > 9) return 9;
    if (value < 1) return 1;
    return value;
  };

  export default defineComponent({
    name: 'BasketItem',
    components: {
      PlusIcon,
      MinusIcon,
      TrashIcon
    },
    props: {
      id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      photoUrl: {
        type: String,
        required: true
      },
      count: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    },
    emits: ['updateCount', 'delete'],
    computed: {
      totalPrice(): number {
        return this.price * this.count;
      }
    },
    methods: {
      onInput(event: Event) {
        this.$emit('updateCount', {
          id: this.id,
          count: checkResult(Number((event.target as HTMLInputElement).value))
        });
      },
      removeItem() {
        this.$emit('delete', { id: this.id });
      },
      countChange(value: number | Event) {
        if (typeof value === 'number') {
          this.$emit('updateCount', {
            id: this.id,
            count: checkResult(this.count + value)
          });
        } else {
          this.$emit('updateCount', { id: this.id, count: this.count });
        }
      }
    }
  });
</script>

<style lang="scss" scoped>
  .basket-item {
    border-radius: 2rem;
    background: #fff;
    box-shadow: 0 10px 20px 3px rgba(0, 0, 0, 0.1);
    min-height: 7rem;
    padding: 2rem;
    display: flex;
    align-items: center;
    margin-bottom: 2rem;

    .image {
      width: 6rem;
      height: 6rem;
      background: $brand-green;
      border-radius: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .description {
      flex: 3;
      margin-left: 1rem;

      .name {
        font-weight: 700;
      }

      .specs {
        margin-top: 0.5rem;
        word-spacing: 3px;
        letter-spacing: 0.3px;
        font-weight: 600;
        font-size: 1rem;
        color: lighten(gray, 20%);
      }
    }

    .counter {
      flex: 2;
      display: flex;
      align-items: center;

      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      .plus,
      .minus {
        transform: scale(0.8);
        cursor: pointer;

        &:hover {
          color: #575cba;
        }
      }

      input[type='number'] {
        -moz-appearance: textfield;
      }

      input {
        border-radius: 0.5rem;
        width: 3rem;
        margin: 0 1rem;
        text-align: center;
      }
    }

    .price {
      flex: 1;
      font-weight: 700;
    }

    .actions {
      flex: 0.5;
      margin-left: auto;
      transform: scale(0.8);

      &:hover {
        color: red;
        cursor: pointer;
      }
    }
  }
</style>
