import gql from 'graphql-tag';

export const fetchDepression = gql`
  query DepressionList {
    depression {
      id
      status
      updated_at
    }
  }
`

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