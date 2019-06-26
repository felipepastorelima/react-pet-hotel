class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }

  prefixArrayWithStandard(arr) {
    const that = this;
    const callback = function(value) {
      return that.prefix + value;
    };

    return arr.map(callback);
  }

  prefixArrayWithArrow(arr) {
    const callback = value => {
      return this.prefix + value;
    };

    return arr.map(callback);
  }
}

console.log(
  "standard",
  new Prefixer("scaffoldhub_").prefixArrayWithStandard(["1", "2"])
);

// console.log(
//   "arrow",
//   new Prefixer("scaffoldhub_").prefixArrayWithArrow(["1", "2"])
// );
