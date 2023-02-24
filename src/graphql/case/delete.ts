import gql from 'graphql-tag'

export default gql`
  mutation ($id: ID!) {
    deleteCase(id: $id) {
      data {
        id
      }
    }
  }
`
