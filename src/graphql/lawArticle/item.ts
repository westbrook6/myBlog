import gql from 'graphql-tag'

export default gql`
  query ($id: ID!) {
    lawArticle(id: $id) {
      data {
        id
        attributes {
          title
          subTitle
          content
        }
      }
    }
  }
`
