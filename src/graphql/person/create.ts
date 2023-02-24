import gql from 'graphql-tag'

export default gql`
  mutation ($name: String, $phone: String) {
    createPerson(data: { name: $name, phone: $phone }) {
      data {
        id
        attributes {
          name
          phone
        }
      }
    }
  }
`
