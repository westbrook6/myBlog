import gql from 'graphql-tag'

export default gql`
  query ($title: String, $page: Int!, $pageSize: Int!) {
    articles(
      filters: { title: { contains: $title } }
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
