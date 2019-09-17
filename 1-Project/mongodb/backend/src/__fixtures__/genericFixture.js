module.exports = ({ createFn, data, idField = 'id' }) => ({
  buildAll() {
    return JSON.parse(JSON.stringify(data));
  },

  build(id, overrides) {
    const item = this.buildAll().find(
      (item) => item[idField] === id,
    );

    if (!item) {
      throw new Error(`Not found fixture with id: ${id}.`);
    }

    return {
      ...item,
      ...overrides,
    };
  },

  async createAll() {
    const items = [];

    for (let item of this.buildAll()) {
      items.push(await this.create(item.id));
    }

    return items;
  },

  async create(id, overrides) {
    const item = this.build(id, overrides);

    if (!createFn) {
      return item;
    }

    return createFn(item);
  },
});
