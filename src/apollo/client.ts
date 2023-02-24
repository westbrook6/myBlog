import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  concat,
  createHttpLink,
} from '@apollo/client/core'

// 与 API 的 HTTP 连接
const httpLink = createHttpLink({
  // 你需要在这里使用绝对路径
  uri: import.meta.env.VITE_GRAPHQL_HOST,
  fetchOptions: {
    mode: 'cors',
  },
})
const authMiddleware = new ApolloLink((operation, forward) => {
  const token = sessionStorage.getItem('token') || ''
  operation.setContext(({ headers = {}, forbidToken = false }) => {
    const options: any = {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    }
    if (forbidToken)
      delete options.headers.Authorization

    return options
  })
  return forward(operation)
})

// 缓存实现
const cache = new InMemoryCache()

// 创建 apollo 客户端
const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache,
})

export default apolloClient
