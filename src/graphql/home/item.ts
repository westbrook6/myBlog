import gql from 'graphql-tag'

export default gql`
  query ($id: ID!) {
    home(id: $id) {
      data {
        id
        attributes {
          name
          description
          avatar {
            data {
              id
              attributes {
                name
                url
                ext
              }
            }
          }
        }
      }
    }
  }
`
