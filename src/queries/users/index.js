import gql from 'graphql-tag';

export const createPatient = gql`
  mutation CreatePatient(
    $uuid: String
    $fullName: String
    $age: String
    $city: String
    $phone: String
  ) {
    insert_Patients(
      objects: {
        uuid: $uuid
        full_name: $name
        age: $age
        city: $city
        phone: $phone
      }
    ) {
      returning {
        created_at
        id
      }
    }
  }
`;