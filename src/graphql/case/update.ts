import gql from 'graphql-tag'

export default gql`
  mutation (
    $id: ID!
    $number: String
    $idNumber: String
    $name: String
    $phone: String
    $cause: String
    $status: String
  ) {
    updateCase(
      id: $id
      data: {
        number: $number
        idNumber: $idNumber
        name: $name
        phone: $phone
        cause: $cause
        status: $status
      }
    ) {
      data {
        id
        attributes {
          number
          idNumber
          name
          phone
          cause
          status
        }
      }
    }
  }
`
