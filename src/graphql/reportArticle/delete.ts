import gql from 'graphql-tag'

export default gql`
  mutation ($id: ID!) {
    deleteReportArticle(id: $id) {
      data {
        id
      }
    }
  }
`
