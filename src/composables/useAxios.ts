import { unref } from 'vue'
import * as qs from 'qs'
import axios from 'axios'
import { MaybeRef } from '~/type'
import _ from 'lodash'

interface Req<Body> {
  data?: MaybeRef<Body>
  id?: MaybeRef<string>
  query?: MaybeRef<{}>
  headers?: headers
}
interface headers {
  ['Content-Type']?: string
}

interface Requ<Body, T> {
  data?: MaybeRef<Body>
  id?: MaybeRef<string>
  query?: MaybeRef<T>
}

const service = axios.create({
  baseURL: import.meta.env.VITE_HOST_URL,
  timeout: 30 * 1000
})
service.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token')
    if (token && config && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error)
  }
)
const replaceUrl = (url: MaybeRef<string>, id?: MaybeRef<string>) => {
  if (!id) {
    return unref(url)
  } else {
    return unref(url).replace(/:id/, unref(id) || '')
  }
}
const help = <Body>(
  url: MaybeRef<string>,
  { data, query, id, headers }: Req<Body>
) => {
  const _data = unref(data) || {}
  const _query = unref(query) || {}
  const _url = replaceUrl(url, id)
  const _headers = unref(headers) || {}
  return {
    url: _url,
    data: _data,
    query: _query,
    headers: _headers
  }
}

export const usePost = <Body, Result>(_url: MaybeRef<string>) => {
  return (_data: Req<Body>) => {
    const { url, query, data, headers } = help(_url, _data)
    return service
      .post<Result>(`${url}?${qs.stringify(query)}`, data, {
        headers: { ...headers },
        timeout: 10 * 60 * 1000
      })
      .then((res) => res.data)
  }
}

export const usePut = <Result>(_url: MaybeRef<string>) => {
  return (_data: Req<Result>) => {
    const { url, query, data } = help(_url, _data)
    return service
      .put<Result>(`${url}?${qs.stringify(query)}`, data)
      .then((res) => res.data)
  }
}

export const useDel = <Result>(_url: MaybeRef<string>) => {
  return (_data: Req<Result>) => {
    const { url, query, data } = help(_url, _data)
    return service
      .delete<Result>(`${url}?${qs.stringify(query)}`, data)
      .then((res) => res.data)
  }
}

export const useGet = <Result>(_url: MaybeRef<string>) => {
  return (_data: Req<Result>) => {
    const { url, query, data } = help(_url, _data)
    return service
      .request<Result>({ url: `${url}?${qs.stringify(_.merge(query, data))}` })
      .then((res) => res.data)
  }
}

export const useGetData = <Body, Result, Query>(_url: MaybeRef<string>) => {
  return (_data: Requ<Body, Query>) => {
    const { url, query, data } = help(_url, _data)
    return service
      .request<Result>({ url: `${url}?${qs.stringify(_.merge(query, data))}` })
      .then((res) => res.data)
  }
}
