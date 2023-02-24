import gql from 'graphql-tag'

export default gql`
  query($slug:String!){
    forms(filters:{
      slug:{
        eq: $slug
      }
    }) {
      data{
        id,
        attributes {
          slug,
          rule,
          option
        }
      }
    }
  }
`
