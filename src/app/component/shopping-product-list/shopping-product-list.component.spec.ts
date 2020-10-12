import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingProductListComponent } from './shopping-product-list.component';

describe('ShoppingProductListComponent', () => {
  let component: ShoppingProductListComponent;
  let fixture: ComponentFixture<ShoppingProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingProductListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
