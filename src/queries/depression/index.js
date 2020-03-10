import gql from 'graphql-tag';

export const ADDdepressionFirst = gql`
  mutation AddDepressionFirst(
    $res1: Boolean
    $res2: Boolean
    $res3: Boolean
    $res4: Boolean
  ) {
    insert_depression_first(
      objects: {
        res1: $res1
        res2: $res2
        res3: $res3
        res4: $res4
      }
    ) {
      returning {
        created_at
        id
        res1
        res2
        res3
        res4
      }
    }
  }
`;