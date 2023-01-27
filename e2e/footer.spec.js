/* eslint-disable no-undef */
Feature('Disebuah Footer');

Before(({ I }) => {
  I.amOnPage('');
});
Scenario('Mengklik media sosial creator', ({ I }) => {
  I.waitForElement('footer', 2);
  I.scrollPageToBottom();
  I.wait(5);
  I.click('footer a[href="https://www.instagram.com/tirtha.ahmad.nazuha/"]');
  I.wait(10);
});
