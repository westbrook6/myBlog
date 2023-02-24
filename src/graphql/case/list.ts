import gql from 'graphql-tag'

export default gql`
  query (
    $number: String
    $idNumber: String
    $name: String
    $phone: String
    $status: String
    $page: Int!
    $pageSize: Int!
  ) {
    cases(
      filters: {
        number: { eq: $number }
        idNumber: { eq: $idNumber }
        name: { eq: $name }
        phone: { eq: $phone }
        status: { eq: $status }
      }
      pagination: { page: $page, pageSize: $pageSize }
      sort: ["createdAt:desc"]
    ) {
      data {
        id
        attributes {
          number
          idNumber
          name
          cause
          phone
          status
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
