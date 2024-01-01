import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiperSkinComponent } from './swiper-skin.component';

describe('SwiperSkinComponent', () => {
  let component: SwiperSkinComponent;
  let fixture: ComponentFixture<SwiperSkinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwiperSkinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SwiperSkinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
