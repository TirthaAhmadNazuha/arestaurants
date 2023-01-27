import { openDB } from 'idb';

const db = {
  name: 'ashen-cecilia-db',
  version: 1,
};

class IdbHelper {
  constructor(objectStoreName) {
    this.objectStoreName = objectStoreName;
    this.dbPromise = openDB(db.name, db.version, {
      upgrade(database) {
        database.createObjectStore(objectStoreName, { keyPath: 'id' });
      },
    });
  }

  async getItem(id, objectStoreName = this.objectStoreName) {
    return (await this.dbPromise).get(objectStoreName, id);
  }

  async getItemAll(objectStoreName = this.objectStoreName) {
    return (await this.dbPromise).getAll(objectStoreName);
  }

  async putItem(item, objectStoreName = this.objectStoreName) {
    if (!item.id) return false;
    return (await this.dbPromise).put(objectStoreName, item);
  }

  async deleteItem(id, objectStoreName = this.objectStoreName) {
    if (!id) return true;
    return (await this.dbPromise).delete(objectStoreName, id);
  }
}
export default IdbHelper;
