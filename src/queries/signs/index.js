import gql from 'graphql-tag';

export const fetchList = gql`
  subscription VitalSign {
    vitalsigns {
      blood_pressure
      systolic
      diastolic
      created_at
      heart_rate
      weight
      id
    }
  }
`

export const addVitalSign = gql`
  mutation addSigns(
    $heart_rate: numeric
    $blood_pressure: String
    $weight: numeric
    $systolic: numeric
    $diastolic: numeric
  ) {
    insert_vitalsigns(
      objects: {
        heart_rate: $heart_rate
        blood_pressure: $blood_pressure
        weight: $weight
        systolic: $systolic
        diastolic: $diastolic
      }
    ) {
      returning {
        blood_pressure
        created_at
        heart_rate
        id
        updated_at
        weight
        systolic
        diastolic
      }
    }
  }
`;