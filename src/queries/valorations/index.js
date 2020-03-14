import gql from 'graphql-tag';

export const fetchValorations = gql`
  query ValorationList {
    valorations {
      id
      status
      created_at
    }
  }
`

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
