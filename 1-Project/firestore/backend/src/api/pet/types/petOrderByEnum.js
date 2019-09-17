const schema = `
  enum PetOrderByEnum {
    id_ASC
    id_DESC
    name_ASC
    name_DESC
    type_ASC
    type_DESC
    breed_ASC
    breed_DESC
    size_ASC
    size_DESC
    createdAt_ASC
    createdAt_DESC
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
