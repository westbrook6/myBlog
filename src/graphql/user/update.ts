import gql from 'graphql-tag'

export default gql`
  mutation (
    $id: ID!
    $username: String
    $email: String
    $password: String
    $permissions: String
  ) {
    updateUsersPermissionsUser(
      id: $id
      data: {
        username: $username
        email: $email
        password: $password
        permissions: $permissions
      }
    ) {
      data {
        id
        attributes {
          username
          email
          permissions
        }
      }
    }
  }
`
