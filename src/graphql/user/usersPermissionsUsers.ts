import gql from 'graphql-tag'

export default gql`
  query ($userName: String, $email: String, $page: Int!, $pageSize: Int!) {
    usersPermissionsUsers(
      filters: { username: { contains: $userName }, email: { eq: $email } }
      pagination: { page: $page, pageSize: $pageSize }
    ) {
      data {
        id
        attributes {
          username
          email
          permissions
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
