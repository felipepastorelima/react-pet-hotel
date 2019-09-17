const schema = `
  enum PetTypeEnum {
    cat
    dog
  }

  enum PetSizeEnum {
    small
    medium
    large
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
