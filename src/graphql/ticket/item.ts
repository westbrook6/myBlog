import gql from 'graphql-tag'

export default gql`
  query ($id: ID!) {
    ticket(id: $id) {
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
