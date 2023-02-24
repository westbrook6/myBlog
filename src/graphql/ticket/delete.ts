import gql from 'graphql-tag'

export default gql`
  mutation ($id: ID!) {
    deleteTicket(id: $id) {
      data {
        id
      }
    }
  }
`
