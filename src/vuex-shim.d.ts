import { Store } from 'vuex';
import { State } from '../src/store/index';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
