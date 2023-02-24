import gql from 'graphql-tag'

export default gql`
  query ($id: ID!) {
    functionalArticle(id: $id) {
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
