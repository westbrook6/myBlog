import gql from 'graphql-tag'

export default gql`
  query ($id: ID!) {
    person(id: $id) {
      data {
        id
        attributes {
          name
          phone
        }
      }
    }
  }
`
