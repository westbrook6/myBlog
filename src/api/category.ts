import { MaybeRef } from '@vueuse/core'
import { useRequest } from '~/composables/useGqlRequest'
import { TableResponse } from '~/type'
import categoryListGql from '~/graphql/category/list'

export interface Category {
    id?: string
    name: string
    createdAt?: Date
}

interface CategoryVars extends Partial<Category> {
    page: number
    pageSize: number
}

export const useFetchCategories = (vars: MaybeRef<CategoryVars>) => {
    const { result, onSuccess, onFail, fetch, loading } = useRequest<
        TableResponse<Category>,
        MaybeRef<CategoryVars>
    >('categories', categoryListGql, vars, {
        immediate: false
    })

    return {
        result,
        onSuccess,
        onFail,
        fetch,
        loading
    }
}
