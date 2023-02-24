import gql from 'graphql-tag'

export default gql`
  mutation ($id: ID!, $title: String, $subTitle: String, $content: String) {
    updateJingjianArticle(
      id: $id
      data: { title: $title, subTitle: $subTitle, content: $content }
    ) {
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
