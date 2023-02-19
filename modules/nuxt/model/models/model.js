export default class Model {
  constructor (data = {}) {
    this.id = data.id;
    this.name = data.name;
    this.avatar = data.avatar;
    this.age = data.age;
    this.gender = data.gender;
    this.email = data.email;
    this.is_moderated = data.is_moderated;
    this.created_at = data.created_at;
    this.tags = data.tags;
    this.eyes = data.eyes;
  }
}
