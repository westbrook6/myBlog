import gql from 'graphql-tag'

export default gql`
  query ($name: String, $page: Int!, $pageSize: Int!) {
    categories(
      filters: { name: { contains: $name } }
      pagination: { page: $page, pageSize: $pageSize }
    ) {
      data {
        id
        attributes {
          name
        }
      }
      meta {
        pagination {
          total
          page
          pageSize
          pageCount
        }
      }
    }
  }
`
