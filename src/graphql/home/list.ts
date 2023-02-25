import gql from 'graphql-tag'

export default gql`
  query ($name: String, $page: Int!, $pageSize: Int!) {
    homes(
      filters: { name: { contains: $name } }
      pagination: { page: $page, pageSize: $pageSize }
    ) {
      data {
        id
        attributes {
          name
          description
          avatar {
            data {
              id
              attributes {
                name
                url
                ext
              }
            }
          }
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
