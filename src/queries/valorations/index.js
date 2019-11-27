import gql from 'graphql-tag';

export const ADDvaloration = gql`
  mutation AddValoration(
    $res1: Boolean
    $res2: Boolean
    $res3: Boolean
    $res4: Boolean
    $res5: Boolean
    $res6: Boolean
    $res7: Boolean
  ) {
    insert_valorations(
      objects: {
        res1: $res1
        res2: $res2
        res3: $res3
        res4: $res4
        res5: $res5
        res6: $res6
        res7: $res7
      }
    ) {
      returning {
        created_at
        id
        res1
        res2
        res3
        res4
        res5
        res6
        res7
      }
    }
  }
`;
