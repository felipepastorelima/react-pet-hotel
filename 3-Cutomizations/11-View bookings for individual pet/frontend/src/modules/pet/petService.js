import gql from 'graphql-tag';
import graphqlClient from 'modules/shared/graphql/graphqlClient';

export default class PetService {
  static async update(id, data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation PET_UPDATE(
          $id: String!
          $data: PetInput!
        ) {
          petUpdate(id: $id, data: $data) {
            id
          }
        }
      `,

      variables: {
        id,
        data,
      },
    });

    return response.data.petUpdate;
  }

  static async destroyAll(ids) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation PET_DESTROY($ids: [String!]!) {
          petDestroy(ids: $ids)
        }
      `,

      variables: {
        ids,
      },
    });

    return response.data.petDestroy;
  }

  static async create(data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation PET_CREATE($data: PetInput!) {
          petCreate(data: $data) {
            id
          }
        }
      `,

      variables: {
        data,
      },
    });

    return response.data.petCreate;
  }

  static async import(values, importHash) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation PET_IMPORT(
          $data: PetInput!
          $importHash: String!
        ) {
          petImport(data: $data, importHash: $importHash)
        }
      `,

      variables: {
        data: values,
        importHash,
      },
    });

    return response.data.petImport;
  }

  static async find(id) {
    const response = await graphqlClient.query({
      query: gql`
        query PET_FIND($id: String!) {
          petFind(id: $id) {
            id
            owner {
              id
              fullName
              email
            }
            name
            type
            breed
            size
            bookings {
              id
              arrival
              departure
              status
            }
            createdAt
            updatedAt
          }
        }
      `,

      variables: {
        id,
      },
    });

    return response.data.petFind;
  }

  static async list(filter, orderBy, limit, offset) {
    const response = await graphqlClient.query({
      query: gql`
        query PET_LIST(
          $filter: PetFilterInput
          $orderBy: PetOrderByEnum
          $limit: Int
          $offset: Int
        ) {
          petList(
            filter: $filter
            orderBy: $orderBy
            limit: $limit
            offset: $offset
          ) {
            count
            rows {
              id
              owner {
                id
                fullName
                email
              }
              name
              type
              breed
              size
              updatedAt
              createdAt
            }
          }
        }
      `,

      variables: {
        filter,
        orderBy,
        limit,
        offset,
      },
    });

    return response.data.petList;
  }

  static async listAutocomplete(query, owner, limit) {
    const response = await graphqlClient.query({
      query: gql`
        query PET_AUTOCOMPLETE(
          $query: String
          $owner: String
          $limit: Int
        ) {
          petAutocomplete(
            query: $query
            owner: $owner
            limit: $limit
          ) {
            id
            label
          }
        }
      `,

      variables: {
        query,
        owner,
        limit,
      },
    });

    return response.data.petAutocomplete;
  }

  static async exists() {
    const { count } = await this.list(null, null, 1, null);
    return count > 0;
  }
}
