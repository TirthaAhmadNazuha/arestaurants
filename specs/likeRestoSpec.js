/* eslint-disable no-undef */
import 'regenerator-runtime';
import FavoriteInitiator from '../src/scripts/untils/favorite-initiator';

describe('TEST FAVORITE RESTO: ', () => {
  beforeEach(async () => {
    FavoriteInitiator.init();
    const allItem = await FavoriteInitiator.getItemIdAll();
    allItem.forEach(async (item) => {
      await FavoriteInitiator.removeFromFavoriteHandle(item);
    });
  });

  it('Mesti ada diIndexDB kalau restaurant ditambahkan ke favorite', async () => {
    const itemExample = { id: 1, name: 'Foo' };
    await FavoriteInitiator.addToFavoriteHandle(itemExample);
    expect(await FavoriteInitiator.getItem(itemExample.id)).toEqual(itemExample);
  });

  it('Mesti ada restaurants jika tidak removeFromFavorite', async () => {
    const itemsExample = [
      { id: 1, name: 'Foo', favorited: true },
      { id: 2, name: 'Baar', favorited: true },
      { id: 3, name: 'eqeqeq', favorited: true },
    ];
    itemsExample.forEach(async (item) => {
      await FavoriteInitiator.addToFavoriteHandle(item);
    });
    await FavoriteInitiator.removeFromFavoriteHandle(itemsExample[1]);
    expect(await FavoriteInitiator.getItemIdAll()).toEqual([{ id: 1, name: 'Foo', favorited: true }, { id: 3, name: 'eqeqeq', favorited: true }]);
  });

  it('Mesti tidak ada restaurant jika tidak ditambahkan', async () => {
    await FavoriteInitiator.addToFavoriteHandle({});
    expect(await FavoriteInitiator.getItemIdAll()).toEqual([]);
  });

  it('Mesti tidak mengalami error jika menghapus restaurant yang memang tidak ada', async () => {
    expect(await FavoriteInitiator.removeFromFavoriteHandle({})).toBeFalse();
  });
});
