import gql from 'graphql-tag';

export const ADDdepression = gql`
  mutation AddDepression(
    $status: numeric
  ) {
    insert_depression(
      objects: { status: $status }
    ) {
      returning {
        created_at
        id
        status
      }
    }
  }
`;