import gql from 'graphql-tag'

export default gql`
  query ($page: Int!, $pageSize: Int!) {
    lawArticles(
      pagination: { page: $page, pageSize: $pageSize }
      sort: ["createdAt:desc"]
    ) {
      data {
        id
        attributes {
          title
          subTitle
          content
          createdAt
        }
      }
      meta {
        pagination {
          total
          page
          pageSize
          pageCount
        }
      }
    }
  }
`
