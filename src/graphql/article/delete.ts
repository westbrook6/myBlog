import gql from 'graphql-tag'

export default gql`
  mutation ($id: ID!) {
    deleteArticle(id: $id) {
      data {
        id
      }
    }
  }
`
