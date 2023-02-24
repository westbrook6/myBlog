import gql from 'graphql-tag'

export default gql`
  query ($id: ID!) {
    usersPermissionsUser(id: $id) {
      data {
        id
        attributes {
          username
          email
          createdAt
        }
      }
    }
  }
`
