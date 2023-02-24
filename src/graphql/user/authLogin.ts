import gql from 'graphql-tag'

export default gql`
  mutation ($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        id
        username
        blocked
        confirmed
      }
    }
  }
`
