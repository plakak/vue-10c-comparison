<template>
  <div class="card">
    <div class="header">
      <div class="title">Card Details</div>
      <img src="../assets/photo.png" />
    </div>

    <div class="type-selector">
      <div class="card-title">Card type</div>
      <div class="cards-list">
        <CardPlate
          v-for="card of cards"
          :key="card.type"
          :src="card.image"
          :selected="card.type === selectedCard"
          @click="selectedCard = card.type"
        />
      </div>
    </div>

    <div class="container">
      <div v-if="selectedCard === CardType.Paypal" class="paypal-info">
        You will be redirected to the paypal checkout in the next step
      </div>
      <div v-else>
        <CardForm v-model="form" :form-instance="v$" />
        <!--        <input name="name" v-model="form.name" />-->
      </div>
      <div class="totals">
        <div>
          <span>Subtotal</span>
          <span class="amount">${{ price }}</span>
        </div>
        <div>
          <span>Shipping</span>
          <span class="amount">$20</span>
        </div>
        <div>
          <span>Total</span>
          <span class="amount">${{ totalWithShipping }}</span>
        </div>
      </div>

      <button class="checkout-button" :disabled="!price" @click="submitHandler">
        <span class="total">
          <span v-if="price > 0">${{ totalWithShipping }}</span>
        </span>
        <span class="text">
          Checkout
          <Arrow class="checkout-icon" />
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import useVuelidate from '@vuelidate/core';
  import { required, numeric, maxLength, helpers } from '@vuelidate/validators';

  import CardPlate from './CardPlate.vue';
  import CardForm from './CardForm.vue';

  import Arrow from '../assets/icons/arrow-left.svg?component';

  import cardMc from '../assets/card-mc.png';
  import cardVisa from '../assets/card-visa.png';
  import cardAe from '../assets/card-ae.png';
  import paypal from '../assets/paypal.png';

  export enum CardType {
    Mastercard,
    Visa,
    AmericanExpress,
    Paypal
  }

  export type CardListItem = { type: CardType; image: string };

  const expValidator = (value: unknown) =>
    /^(0[1-9]|1[0-2]|[1-9])\/(1[4-9]|[2-9][0-9]|20[1-9][1-9])$/.test(
      value as string
    );

  export default defineComponent({
    name: 'Card',
    components: {
      CardForm,
      CardPlate,
      Arrow
    },
    setup() {
      return {
        v$: useVuelidate()
      };
    },
    data() {
      return {
        form: {
          name: '',
          cardNum: '',
          expDate: '',
          cvv: ''
        },
        CardType,
        cards: [
          { type: CardType.Mastercard, image: cardMc },
          { type: CardType.Visa, image: cardVisa },
          { type: CardType.AmericanExpress, image: cardAe },
          { type: CardType.Paypal, image: paypal }
        ],
        selectedCard: CardType.Mastercard
      } as {
        form: {
          name: string;
          cardNum: string;
          expDate: string;
          cvv: string;
        };
        CardType: typeof CardType;
        cards: CardListItem[];
        selectedCard: CardType;
      };
    },
    computed: {
      totalWithShipping() {
        return this.$store.getters.price + 20;
      },
      price() {
        return this.$store.getters.price;
      }
    },
    validations() {
      return {
        form: {
          name: [required],
          cardNum: [required, numeric, maxLength(16)],
          expDate: [
            required,
            helpers.withMessage('Example: 12/2022', expValidator)
          ],
          cvv: [required, numeric, maxLength(3)]
        }
      };
    },
    methods: {
      submitHandler() {
        this.v$.form.$touch();
        console.log(this.v$);
      }
    }
  });
</script>

<style lang="scss" scoped>
  $bg-color: #575cba;

  .card {
    height: 100%;
    background-color: $bg-color;
    border-radius: 2rem;
    padding: 2rem 3rem;
    color: #fcfcff;

    .header {
      height: 6rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {
        font-size: 1.8rem;
        font-weight: 600;
      }

      img {
        border-radius: 0.5rem;
      }
    }

    .type-selector {
      margin-top: 1rem;

      .card-title {
        font-size: 1rem;
        margin-bottom: 0.5rem;
      }
      .cards-list {
        display: flex;
        justify-content: space-between;
      }
    }
    .container {
      display: flex;
      height: calc(100% - 15rem);
      flex-direction: column;
      justify-content: space-between;

      .paypal-info {
        margin-top: 10rem;
        text-align: center;
      }

      .totals {
        margin-top: auto;
        margin-bottom: 2rem;
        border-top: 1px solid lighten($bg-color, 6%);
        font-size: 1.4rem;

        .amount {
          font-weight: 600;
        }

        > div {
          display: flex;
          justify-content: space-between;
          &:first-child {
            margin-top: 3rem;
          }
          &:not(:last-child) {
            margin-bottom: 1.5rem;
          }
        }
      }
    }

    .checkout-button {
      $button-color: #4ee0c1;
      background-color: $button-color;
      border: none;
      outline: none;
      height: 5.5rem;
      border-radius: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
      font-size: 1.4rem;
      padding: 2rem;
      cursor: pointer;

      &:disabled {
        background-color: lightgray;
      }

      &:hover {
        background-color: darken($button-color, 10%);
      }

      .total {
        font-weight: 600;
        letter-spacing: 1px;
      }

      .text {
        display: flex;

        .checkout-icon {
          width: 2rem;
          height: 2rem;
          margin-left: 1rem;
          transform: rotate(180deg);
        }
      }
    }
  }
</style>
