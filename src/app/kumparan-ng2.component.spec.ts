import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { KumparanNg2AppComponent } from '../app/kumparan-ng2.component';

beforeEachProviders(() => [KumparanNg2AppComponent]);

describe('App: KumparanNg2', () => {
  it('should create the app',
      inject([KumparanNg2AppComponent], (app: KumparanNg2AppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'kumparan-ng2 works!\'',
      inject([KumparanNg2AppComponent], (app: KumparanNg2AppComponent) => {
    expect(app.title).toEqual('kumparan-ng2 works!');
  }));
});
