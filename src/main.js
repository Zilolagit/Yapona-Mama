
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import {Vue3ProgressPlugin} from '@marcoschulte/vue3-progress';


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vue3ProgressPlugin)
app.mount('#app')
