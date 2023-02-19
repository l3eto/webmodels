export class ModelService {
  constructor ($axios, ModelNormalizer) {
    this._axios = $axios;
    this._modelNormalizer = ModelNormalizer;
  }
 
  async getAll (params = []) {
    const data = await this._axios.$get(`/models`, { params });
    return this._modelNormalizer.normalizeList(data);
  }

  async get (id) {
    const data = await this._axios.$get(`/models/${id}`);
    return this._modelNormalizer.normalizeItem(data);
  }

  async update(id, model) {
    const data = await this._axios.$put(`models/${id}`, model, {});
    return this._modelNormalizer.normalizeItem(data);
  }
}