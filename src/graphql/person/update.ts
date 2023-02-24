import gql from 'graphql-tag'

export default gql`
  mutation ($id: ID!, $name: String, $phone: String) {
    updatePerson(id: $id, data: { name: $name, phone: $phone }) {
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
