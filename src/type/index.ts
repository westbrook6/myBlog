import type { Ref } from 'vue'

export interface PaginationInput {
  page: number
  pageSize: number
}

export interface TableQuery {
  pagination?: PaginationInput
}

export interface MetaPagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface TableMeta {
  pagination: MetaPagination
}

export interface DmsItem<T> {
  id: string
  attributes: T & { createdAt: string }
}

export interface DmsData<T> {
  data: DmsItem<T>
}

export interface DmsDataArr<T> {
  data: DmsItem<T>[]
}

export interface TableResponse<T> {
  data: DmsItem<T>[]
  meta: TableMeta
}

export interface ItemResponse<T> {
  data: DmsItem<T>
  meta: {}
}

export interface PostBody<T> {
  data: T
}

export type MaybeRef<T> = T | Ref<T>

export interface DmsArr<T> {
  data: DmsItem<T>[]
}
