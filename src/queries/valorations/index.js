import gql from 'graphql-tag';

export const ADDvaloration = gql`
  mutation AddValoration(
    $status: numeric
  ) {
    insert_valorations(
      objects: {
        status: $status
      }
    ) {
      returning {
        created_at
        id
        status
      }
    }
  }
`;
