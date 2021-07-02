import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';

export interface BasketItem {
  id: number;
  name: string;
  description: string;
  photoUrl: string;
  count: number;
  price: number;
}

export type Basket = BasketItem[];

export interface State {
  items: Basket;
}

const initialState: Basket = [
  {
    id: 1,
    name: 'OnePlus 7T Pro',
    description: '256GB, Nebula Blue',
    photoUrl: 'https://plakak.smallhost.pl/oneplus.png',
    count: 1,
    price: 800
  },
  {
    id: 2,
    name: 'Google Pixel 4 XL',
    description: '64GB, Jet Black',
    photoUrl: 'https://plakak.smallhost.pl/pixel.png',
    count: 1,
    price: 900
  },
  {
    id: 3,
    name: 'Samsung Galaxy Note 10',
    description: '256GB, Aura Glow',
    photoUrl: 'https://plakak.smallhost.pl/note.png',
    count: 1,
    price: 1000
  },
  {
    id: 4,
    name: 'iPhone 11 Pro',
    description: '256GB, Space Gray',
    photoUrl: 'https://plakak.smallhost.pl/iphone.png',
    count: 1,
    price: 1100
  }
];

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    items: [...initialState]
  },
  mutations: {
    updateBasketItemCount(state, { id, count }) {
      const index = state.items.findIndex(i => i.id == id);
      state.items = [
        ...state.items.slice(0, index),
        { ...state.items[index], count },
        ...state.items.slice(index + 1)
      ];
    },
    deleteBasketItem(state, { id }) {
      state.items = state.items.filter(i => i.id !== id);
    },
    resetBasket(state) {
      state.items = [...initialState];
    }
  },
  getters: {
    price(state) {
      return state.items.reduce(
        (acc, next) => acc + next.price * next.count,
        0
      );
    }
  }
});

export function useStore(): ReturnType<typeof baseUseStore> {
  return baseUseStore(key);
}
