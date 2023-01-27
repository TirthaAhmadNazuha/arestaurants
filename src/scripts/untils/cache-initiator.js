const cacheInitiator = {
  cacheName: 'api,v1',
  async _openCache() {
    return caches.open(this.cacheName);
  },

  async cachingAPI(restaurants, api) {
    const cache = await this._openCache();
    const apiListAndDetailResto = [`${api}list`, 'https://fonts.gstatic.com/s/sevillana/v21/KFOlCnWFscmDt1Bfiy1fBBc4.woff2', 'https://fonts.gstatic.com/s/plusjakartasans/v3/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_qU79TR_V.woff2', 'https://fonts.gstatic.com/s/materialsymbolsoutlined/v76/kJEhBvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oFsI.woff2'];//
    for (const { id } of restaurants) {
      apiListAndDetailResto.push(`${api}detail/${id}`);//
    }

    apiListAndDetailResto.forEach(async (reqUrl) => {
      if (await cache.match(reqUrl) === undefined) {
        cache.add(reqUrl);
      }
    });
  },

  async revalidateCache(req) {
    const cache = await this._openCache();
    const resWithCache = await cache.match(req);
    const requestCloned = req.clone();

    if (resWithCache) {
      this._putCache(req);
      return resWithCache;
    }

    const responseWithFetch = await this._fetchRequest(requestCloned);
    if (!responseWithFetch) return;

    cache.add(req.url);
    return responseWithFetch;
  },

  async _putCache(req) {
    const cache = await this._openCache();
    const fetchResponse = await this._fetchRequest(req);
    if (!fetchResponse) return;
    cache.put(req, fetchResponse);
  },

  async _fetchRequest(req) {
    const res = await fetch(req);
    if (res.status >= 200) return false;
    return res;
  },

};
export default cacheInitiator;
