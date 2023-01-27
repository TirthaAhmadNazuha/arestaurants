/* eslint-disable no-undef */
Feature('Sebuah Overview Restaurant');

Before(({ I }) => {
  I.amOnPage('');
});

Scenario('Favoritkan restaurant lalu tidak difavoritkan', ({ I }) => {
  I.waitForElement('item-list a:nth-child(4)', 5);
  I.click('item-list a:nth-child(4)');
  I.wait(2);
  I.click('#addFavorite');
  I.wait(2);
  I.click('#removeFavorite');
});

Scenario('Favoritkan restaurant lalu dicek dihalaman favorite', ({ I }) => {
  I.waitForElement('item-list a:nth-child(6)', 5);
  I.click('item-list a:nth-child(6)');
  I.wait(2);
  I.click('#addFavorite');
  I.click('nav a[href="#favorite"]');
  I.wait(2);
  I.click('.con a');
});
