import gql from 'graphql-tag'

export default gql`
  mutation ($username: String!, $email: String!, $password: String!) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
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
