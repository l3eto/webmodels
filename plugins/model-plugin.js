import { ModelService } from './../modules/nuxt/model/services/ModelService';
import ModelNormalizer from './../modules/nuxt/model/normalizers/ModelNormalizer';

export default ({ app: { $axios } }, inject) => {
  const normalizer = new ModelNormalizer();
  inject('modelService', new ModelService($axios, normalizer));
}