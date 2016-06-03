export class KumparanNg2Page {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('kumparan-ng2-app h1')).getText();
  }
}
