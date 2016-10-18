import {Component} from '@angular/core';
import {PageService} from './page.service'

@Component({
  selector: 'page',
  providers: [PageService],
  template: `
    <h2>This is page with some http</h2>
    <li *ngFor="let item of items;">{{ item }}</li>
  `
})
export class PageComponent {
  items = ['Initial List Item'];

  constructor(private pageService: PageService){
    pageService.getList()
      .subscribe(
        res => this.items = res,
        err => console.log('Couldnt fetch url')
      );
  }
}
