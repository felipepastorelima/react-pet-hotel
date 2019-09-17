module.exports = function mergeGraphqlResolvers(
  types,
  queries,
  mutations,
) {
  const resolvers = {
    Query: {},
    Mutation: {},
  };

  types.forEach((type) => {
    Object.keys(type).forEach((typeKey) => {
      resolvers[typeKey] = type[typeKey];
    });
  });

  queries.forEach((query) => {
    Object.keys(query).forEach((queryKey) => {
      resolvers.Query[queryKey] = query[queryKey];
    });
  });

  mutations.forEach((mutation) => {
    Object.keys(mutation).forEach((mutationKey) => {
      resolvers.Mutation[mutationKey] =
        mutation[mutationKey];
    });
  });

  return resolvers;
};
