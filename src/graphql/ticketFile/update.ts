import gql from 'graphql-tag'

export default gql`
  mutation ($id: ID!, $guid: String, $files: [ID]) {
    updateTicketFile(id: $id, data: { guid: $guid, files: $files }) {
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
