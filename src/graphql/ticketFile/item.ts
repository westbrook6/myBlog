import gql from 'graphql-tag'

export default gql`
  query ($id: ID!) {
    ticketFile(id: $id) {
      data {
        id
        attributes {
          guid
          files(pagination: { limit: 99 }) {
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
