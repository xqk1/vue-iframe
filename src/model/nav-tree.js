class navTree {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.icon = data.icon;
    this.url = data.url;
    this.childNode = [];
  }
}

export default navTree;
