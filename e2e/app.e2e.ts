import { KumparanNg2Page } from './app.po';

describe('kumparan-ng2 App', function() {
  let page: KumparanNg2Page;

  beforeEach(() => {
    page = new KumparanNg2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('kumparan-ng2 works!');
  });
});
