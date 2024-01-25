import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiperSkinComponent } from './swiper-skin.component';

describe('SwiperSkinComponent', () => {
  let component: SwiperSkinComponent;
  let fixture: ComponentFixture<SwiperSkinComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(SwiperSkinComponent);
    fixture.componentRef.setInput('skins', [{
      chromas: false,
      id: "266000",
      name: "default",
      num: 0
    }]);
    fixture.componentRef.setInput('name', 'Aatrox');
    fixture.componentRef.setInput('idChamp', 'Aatrox');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
