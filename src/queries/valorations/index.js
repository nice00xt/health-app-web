import gql from 'graphql-tag'

export const fetchSongs = gql`
  {
    songs {
      id
      title
    }
  }
`;

export const fetchSong = gql`
  query SongQuery($id: Int!) {
    song: songs_by_pk(id: $id) {
      id
      title
    }
  }
`;

export const createSong = gql`
  mutation CreateSong($title: String) {
    insert_songs(objects: {title: $title}) {
      returning {
        id
        title
      }
    }
  }
`
export const updateSong = gql`
  mutation UpdateSong($title: String, $id: Int!) {
    update_songs(
      where: {id: {_eq: $id}},
      _set: {title: $title}) {
      returning {
        id
        title
      }
    }
  }
`;

export const deleteSong = gql`
  mutation DeleteSong($id: Int) {
    delete_songs(where: {id: {_eq: $id}}) {
      returning {
        id
        title
      }
    }
  }
`;
