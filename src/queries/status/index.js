import gql from 'graphql-tag';

export const showStatus = gql`
  subscription Status {
    status {
      name
      description
      updated
      created_at
      updated_at
      id
    }
  }
`;

export const updateStatus = gql`
  mutation UpdateStatus(
    $name: String
    $description: String
    $updated: String
    $id: Int!
  ) {
    update_status(
      where: { id: { _eq: $id } }
      _set: { name: $name, description: $description, updated: $updated }
    ) {
      returning {
        id
        updated_at
      }
    }
  }
`;

export const createStatus = gql`
  mutation CreateStatus(
    $name: String
    $description: String
    $updated: String
  ) {
    insert_status(
      objects: {
        name: $name
        description: $description
        updated: $updated
      }
    ) {
      returning {
        id
        updated_at
      }
    }
  }
`;
