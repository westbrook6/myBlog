import gql from 'graphql-tag'

export default gql`
  mutation ($id: ID!) {
    deleteTicketFile(id: $id) {
      data {
        id
      }
    }
  }
`
