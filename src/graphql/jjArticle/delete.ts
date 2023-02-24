import gql from 'graphql-tag'

export default gql`
  mutation ($id: ID!) {
    deleteJingjianArticle(id: $id) {
      data {
        id
      }
    }
  }
`
