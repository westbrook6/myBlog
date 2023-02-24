import gql from 'graphql-tag'

export default gql`
  query (
    $number: String
    $typeName: String
    $status: Int
    $submitter: String
    $phone: String
    $page: Int!
    $pageSize: Int!
  ) {
    tickets(
      filters: {
        number: { eq: $number }
        typeName: { eq: $typeName }
        status: { eq: $status }
        submitter: { eq: $submitter }
        phone: { eq: $phone }
      }
      sort: ["createdAt:desc"]
    ) {
      data {
        id
        attributes {
          number
          typeName
          status
          submitter
          phone
          detail
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
