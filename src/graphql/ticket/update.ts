import gql from 'graphql-tag'

export default gql`
  query (
    $id: ID!
    $number: String
    $typeName: String
    $status: Int
    $submitter: String
    $phone: String
    $detail: JSON
  ) {
    updateTicket(
      id: $id
      data: {
        number: $number
        typeName: $typeName
        status: $status
        submitter: $submitter
        phone: $phone
        detail: $detail
      }
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
    }
  }
`
