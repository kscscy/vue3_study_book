// import { createApp, h } from "vue";
// import App from './components/basic/input-example/App.vue';

import { createApp } from "vue/dist/vue.esm-bundler";
const app = createApp({
  template: '<div>create app</div>'
});

// const app = createApp({
//   render: () => h('div', { class: 'testClass', innerHTML: '<h2>HELLO</h2>', })
// })

// app.component('TestComponent', {
//   template: `<div>hello</div>`
// });

app.mount('#app');

// createApp(App).mount('#app');