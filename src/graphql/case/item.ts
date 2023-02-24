import gql from 'graphql-tag'

export default gql`
  query ($id: ID!) {
    case(id: $id) {
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
