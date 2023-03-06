import gql from 'graphql-tag'

export default gql`
  mutation (
    $username: String
    $email: String
    $password: String
    $permissions: String
  ) {
    createUsersPermissionsUser(
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
          password
          permissions
        }
      }
    }
  }
`
