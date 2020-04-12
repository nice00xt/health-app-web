import gql from 'graphql-tag';

export const showMedication = gql`
  subscription Medication {
    medication {
      name
      description,
      quantity
      created_at
      id
    }
  }
`

export const addMedication = gql`
  mutation AddMedication(
    $name: String
    $description: String
    $quantity: String
  ) {
    insert_medication(
      objects: {
        name: $name
        description: $description
        quantity: $quantity
      }
    ) {
      returning {
        created_at
        id
      }
    }
  }
`;

export const deleteMedication = gql`
  mutation DeleteMedication($id: Int) {
    delete_medication(where: {
      id: {_eq: $id}}
    ) {
      returning {
        id
      }
    }
  }
`;

export const editMedication = gql`
  mutation EditMedication(
    $name: String,
    $id: Int!
  ) {
    update_medication(
      where: {id: {_eq: $id}},
      _set: {
        name: $name
      }) {
      returning {
        id
        name
      }
    }
  }
`;