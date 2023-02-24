import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import App from './App.vue'
import ElementPlus from 'element-plus'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import '~/styles/global.scss'

import { DefaultApolloClient } from '@vue/apollo-composable'
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client/core'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: import.meta.env.VITE_GRAPHQL_HOST
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache
})

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App)
})
const pinia = createPinia()
app.use(pinia)
app.use(ElementPlus)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
app.use(router)
app.provide(DefaultApolloClient, apolloClient)
app.mount('#app')
