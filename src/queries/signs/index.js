import gql from 'graphql-tag';

export const fetchList = gql`
  query VitalSignList {
    vitalsigns {
      blood_pressure
      created_at
      heart_rate
      weight
      id
    }
  }
`

export const addVitalSign = gql`
  mutation addSigns(
    $heart_rate: String
    $blood_pressure: String
    $weight: String
  ) {
    insert_vitalsigns(
      objects: {
        heart_rate: $heart_rate
        blood_pressure: $blood_pressure
        weight: $weight
      }
    ) {
      returning {
        blood_pressure
        created_at
        heart_rate
        id
        updated_at
        weight
      }
    }
  }
`;