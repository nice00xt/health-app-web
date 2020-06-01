import gql from 'graphql-tag';

export const showMedication = gql`
  subscription Medication {
    medication {
      name
      description
      quantity
      created_at
      taken
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
  mutation EditMedication($taken: Boolean, $id: Int!) {
    update_medication(
      where: {id: {_eq: $id}},
      _set: {taken: $taken}) {
      returning {
        id
        taken
      }
    }
  }
`;

export const medicationDefault = gql`
  mutation EditMedication($taken: Boolean, $id: Int!) {
    update_medication(
      where: {},
      _set: {taken: false}) {
      returning {
        id
        taken
      }
    }
  }
`;