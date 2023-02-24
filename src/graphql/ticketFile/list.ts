import gql from 'graphql-tag'

export default gql`
  query ($guid: String, $page: Int!, $pageSize: Int!) {
    ticketFiles(
      filters: { guid: { eq: $guid } }
      pagination: { page: $page, pageSize: $pageSize }
    ) {
      data {
        id
        attributes {
          guid
          files(pagination: { limit: 99 }) {
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
