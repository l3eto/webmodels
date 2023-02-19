import Model from './../models/model';

export default class ModelNormalizer {
  normalizeItem (data = {}) {
    return new Model(data);
  }

  normalizeList (data = []) {
    return data.map(this.normalizeItem);
  }
}
