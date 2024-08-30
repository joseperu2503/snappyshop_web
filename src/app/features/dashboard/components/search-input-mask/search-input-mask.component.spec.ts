import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputMaskComponent } from './search-input-mask.component';

describe('SearchInputMaskComponent', () => {
  let component: SearchInputMaskComponent;
  let fixture: ComponentFixture<SearchInputMaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchInputMaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchInputMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
