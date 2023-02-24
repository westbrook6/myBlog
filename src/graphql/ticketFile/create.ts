import gql from 'graphql-tag'

export default gql`
  mutation ($guid: String, $files: [ID]) {
    createTicketFile(data: { guid: $guid, files: $files }) {
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
