import gql from 'graphql-tag'

export default gql`
  query ($id: ID!) {
    jingjianArticle(id: $id) {
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
