/* eslint-disable no-undef */
Feature('Costumer Review');

Before(({ I }) => {
  I.amOnPage('');
});

Scenario('Inisiatif sign terlebih dahulu setelah itu menambahkan review', ({ I }) => {
  I.waitForElement('nav', 2);
  I.click('sign', 'nav');
  I.fillField('name', 'Tirtha Ahmad Nazuha');
  I.click('form button');
  I.click('item-list a:nth-child(2)');
  I.waitForElement('.addNewReview', 4);
  I.fillField('.addNewReview input', 'Keren');
  I.click('.addNewReview button[type="submit"]');
});

Scenario('Menambahkan review secara langsung', ({ I }) => {
  I.waitForElement('item-list a:nth-child(3)', 5);
  I.click('item-list a:nth-child(3)');
  I.waitForElement('.addNewReview', 4);
  I.fillField('.addNewReview', 'Yokatta, I can do it!');
  I.click('.addNewReview button[type="submit"]');
  I.see('Enter your name', 'geting-name h2');
  I.fillField('name', 'Tirtha Ahmad Nazuha');
  I.click('Submit', 'geting-name form');
  I.click('.addNewReview button[type="submit"]');
});
