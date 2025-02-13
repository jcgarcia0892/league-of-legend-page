
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoImageDirective } from './no-image.directive';

@Component({
    imports: [NoImageDirective],
    template: `
        <img [src]="imgSource" loading="lazy" appNoImage>
  `
})
class TestHost {
  imgSource = './assets/images/lol-icon.svg';

  @ViewChild(NoImageDirective) noImageDirective!: NoImageDirective;
}

describe('NoImageDirective', () => {
  let fixture: ComponentFixture<TestHost>;
  let component: TestHost;

  beforeEach(async () => {
    fixture = await TestBed.configureTestingModule({
      imports: [TestHost],
    })
    .createComponent(TestHost);

    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should set defaultImagePath when error method is triggered', () => {
    let imgTag = fixture.debugElement.query(By.css('img')).nativeElement as HTMLImageElement;
    imgTag.dispatchEvent(new Event('error'));
    fixture.detectChanges();
    imgTag = fixture.debugElement.query(By.css('img')).nativeElement as HTMLImageElement;
    expect(imgTag.src).toContain(component.noImageDirective.defaultImagePath);
  });

  it('should call showErrorImage when an error event is triggered', () => {
    let imgTag = fixture.debugElement.query(By.css('img')).nativeElement as HTMLImageElement;
    const showErrorImageMock = spyOn(component.noImageDirective, 'showErrorImage');
    imgTag.dispatchEvent(new Event('error'));
    fixture.detectChanges();

    expect(showErrorImageMock).toHaveBeenCalled();
  });
});
