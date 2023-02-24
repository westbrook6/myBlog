import gql from 'graphql-tag'

export default gql`
  mutation ($id: ID!) {
    deleteUsersPermissionsUser(id: $id) {
      data {
        id
      }
    }
  }
`
