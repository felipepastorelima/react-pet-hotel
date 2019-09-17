import gql from 'graphql-tag';
import graphqlClient from 'modules/shared/graphql/graphqlClient';

export default class IamService {
  static async enable(ids) {
    return this._changeStatus(ids, false);
  }

  static async disable(ids) {
    return this._changeStatus(ids, true);
  }

  static async _changeStatus(ids, disabled) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation IAM_CHANGE_STATUS(
          $ids: [String!]!
          $disabled: Boolean
        ) {
          iamChangeStatus(ids: $ids, disabled: $disabled)
        }
      `,

      variables: {
        ids,
        disabled: !!disabled,
      },
    });

    return response.data.iamChangeStatus;
  }

  static async edit(data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation IAM_EDIT($data: IamEditInput!) {
          iamEdit(data: $data)
        }
      `,

      variables: {
        data,
      },
    });

    return response.data.iamEdit;
  }

  static async remove(emails, roles, all = false) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation IAM_REMOVE(
          $emails: [String!]!
          $roles: [String!]!
          $all: Boolean
        ) {
          iamRemove(
            emails: $emails
            roles: $roles
            all: $all
          )
        }
      `,

      variables: {
        emails,
        roles,
        all,
      },
    });

    return response.data.iamRemove;
  }

  static async create(data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation IAM_CREATE($data: IamCreateInput!) {
          iamCreate(data: $data)
        }
      `,

      variables: {
        data,
      },
    });

    return response.data.iamCreate;
  }

  static async import(values, importHash) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation IAM_IMPORT(
          $data: IamImportInput!
          $importHash: String!
        ) {
          iamImport(data: $data, importHash: $importHash)
        }
      `,

      variables: {
        data: {
          ...values,
        },
        importHash,
      },
    });

    return response.data.iamImport;
  }

  static async find(id) {
    const response = await graphqlClient.query({
      query: gql`
        query IAM_FIND($id: String!) {
          iamFind(id: $id) {
            id
            fullName
            firstName
            lastName
            authenticationUid
            phoneNumber
            email
            roles
            createdAt
            updatedAt
            disabled
            avatars {
              id
              name
              sizeInBytes
              publicUrl
              privateUrl
            }
          }
        }
      `,

      variables: {
        id,
      },
    });

    return response.data.iamFind;
  }

  static async fetchUsers(filter, orderBy, limit, offset) {
    const response = await graphqlClient.query({
      query: gql`
        query IAM_LIST_USERS(
          $filter: IamListUsersFilterInput
          $orderBy: UserWithRolesOrderByEnum
          $limit: Int
          $offset: Int
        ) {
          iamListUsers(
            filter: $filter
            orderBy: $orderBy
            limit: $limit
            offset: $offset
          ) {
            count
            rows {
              id
              fullName
              email
              phoneNumber
              avatars {
                id
                name
                sizeInBytes
                publicUrl
                privateUrl
              }
              disabled
              roles
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

    return response.data.iamListUsers;
  }

  static async fetchRoles(filter, orderBy, limit, offset) {
    const response = await graphqlClient.query({
      query: gql`
        query IAM_LIST_ROLES(
          $filter: IamListRolesFilterInput
          $orderBy: RoleWithUsersOrderByEnum
        ) {
          iamListRoles(filter: $filter, orderBy: $orderBy) {
            role
            users {
              id
              fullName
              email
              disabled
              createdAt
            }
          }
        }
      `,

      variables: {
        filter,
        orderBy,
      },
    });

    const rows = response.data.iamListRoles;

    return {
      rows,
      count: rows.length,
    };
  }

  static async fetchUserAutocomplete(query, limit) {
    const response = await graphqlClient.query({
      query: gql`
        query IAM_USER_AUTOCOMPLETE(
          $query: String
          $limit: Int
        ) {
          iamUserAutocomplete(
            query: $query
            limit: $limit
          ) {
            id
            label
          }
        }
      `,

      variables: {
        query,
        limit,
      },
    });

    return response.data.iamUserAutocomplete;
  }
}
