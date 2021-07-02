<template>
  <div class="back-button" @click="$store.commit('resetBasket')">
    <ArrowLeftIcon class="icon" />
    <div class="text">Continue Shopping</div>
  </div>

  <div class="hr" />

  <header>
    <div class="description">
      <div class="title">Shopping Cart</div>
      <div class="cart-information">
        You have {{ $store.state.items?.length }} in your cart
      </div>
    </div>
    <div class="sorting" @click="sortByPrice = !sortByPrice">
      Sort by: Price
    </div>
  </header>

  <main>
    <transition-group name="list" tag="div">
      <BasketItem
        v-for="basketItem in sortedItems"
        :key="basketItem.name"
        v-bind="basketItem"
        @delete="onDelete"
        @updateCount="onUpdateCount"
      />
    </transition-group>
  </main>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import BasketItem from './BasketItem.vue';
  import ArrowLeftIcon from '../assets/icons/arrow-left.svg?component';
  import { Basket } from '../store';

  export default defineComponent({
    name: 'Basket',
    components: {
      BasketItem,
      ArrowLeftIcon
    },
    data() {
      return {
        sortByPrice: false
      };
    },
    computed: {
      sortedItems(): Basket {
        return this.sortByPrice
          ? [...this.$store.state.items].sort((a, b) =>
              a.price > b.price ? -1 : 1
            )
          : this.$store.state.items;
      }
    },
    methods: {
      onUpdateCount(event: { id: number; count: number }) {
        this.$store.commit('updateBasketItemCount', event);
      },
      onDelete(event: { id: number }) {
        this.$store.commit('deleteBasketItem', event);
      }
    }
  });
</script>

<style lang="scss" scoped>
  .list-enter-active {
    transition: all 0.4s linear;
  }
  .list-leave-active {
    transition: all 0.4s linear;
  }
  .list-enter,
  .list-leave-to {
    box-shadow: none;
    min-height: 0;
    height: 0;
    opacity: 0;

    * {
      height: 0;
      opacity: 0;
    }
  }

  .hr {
    border-bottom: 1px solid gray;
    opacity: 0.2;
    margin: 1rem auto;
  }

  .back-button {
    display: flex;
    align-items: center;
    font-weight: 600;
    color: $text-color;
    cursor: pointer;

    .icon {
      margin-right: 1rem;
    }
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 3rem;
    color: $text-color;

    .title {
      font-weight: 700;
      letter-spacing: 0.2px;
    }

    .cart-information {
      font-size: 1.3rem;
      margin-top: 0.5rem;
      font-weight: 500;
    }

    .sorting {
      font-size: 1.3rem;
      cursor: pointer;
    }
  }

  main {
    margin-top: 4rem;
  }
</style>
