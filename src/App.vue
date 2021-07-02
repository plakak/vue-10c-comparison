<template>
  <main>
    <div class="container">
      <div class="basket">
        <Basket />
      </div>
      <div class="card">
        <Card />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import Basket from './components/Basket.vue';
  import Card from './components/Card.vue';

  export default defineComponent({
    name: 'App',
    components: {
      Basket,
      Card
    }
  });
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,500,600,700&display=swap');
  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
    background: #f1f3f4;
    font-family: 'Open Sans', sans-serif;
  }

  input,
  button,
  select,
  textarea {
    font-family: inherit;
    font-size: inherit;
    -webkit-padding: 0.4em 0;
    padding: 0.4em;
    margin: 0 0 0.5em 0;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 2px;
  }
</style>

<style lang="scss" scoped>
  main {
    background-color: #fefefe;
    width: 110rem;
    height: 77rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 4rem;

    .container {
      .basket {
        flex: 1.5;
        margin-rigth: 1rem;
      }

      .card {
        flex: 1;
        margin-left: 1rem;
      }

      display: flex;
      padding: 4rem;
      height: 100%;
    }
  }
</style>
