import gql from 'graphql-tag'

export default gql`
  query ($name: String, $phone: String, $page: Int!, $pageSize: Int!) {
    people(
      filters: { name: { eq: $name }, phone: { eq: $phone } }
      pagination: { page: $page, pageSize: $pageSize }
      sort: ["createdAt:desc"]
    ) {
      data {
        id
        attributes {
          name
          phone
          createdAt
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
