import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from '../../components/button/button.component';

import { RulesComponent } from './rules.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RulesComponent', () => {
  let component: RulesComponent;
  let fixture: ComponentFixture<RulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear el componente rules', () => {
    expect(component).toBeTruthy();
  });

  it('Debe colocar todas las propiedades isShown del array powers en false', () => {
    component.hidePowers();
    let isShown = false;
    component.powersInfo().forEach((power: any) => {
        if(power.isShown) {
          isShown = true;
          return;
        }
    });
    expect(isShown).toBeFalsy();
  })

  it('Debe mostrar la propiedad seleccionada', () => {
    component.showSelectedPower('OBTENER ORO', 1);
    const videoPath = component.powersInfo()[1].videoPath;
    const isEqual = videoPath === component.videoPowerPath();
    expect(isEqual).toBeTruthy();
  });

  xit('Debe cambiar el item de la carta en +1', () => {
    const nextPageNumber = component.rulesInfo()[0].card.currentPageNumber + 1;
    component.changeItemList('objetivo', 'next', 1);
    const isEqual = nextPageNumber === component.rulesInfo()[0].card.currentPageNumber;
    expect(isEqual).toBeTruthy();
  });

  it('Debe cambiar el item de la carta en -1', () => {
    component.rulesInfo()[0].card.currentPageNumber = 2;
    const prevPageNumber = component.rulesInfo()[0].card.currentPageNumber - 1;
    component.changeItemList('objetivo', 'prev', 2);
    const isEqual = prevPageNumber === component.rulesInfo()[0].card.currentPageNumber;
    expect(isEqual).toBeTruthy();
  });

  it('Debe mantener el item de la carta en 1', () => {
    component.rulesInfo()[0].card.currentPageNumber = 1;
    const prevPageNumber = component.rulesInfo()[0].card.currentPageNumber;
    component.changeItemList('objetivo', 'prev', 1);
    const isEqual = prevPageNumber === component.rulesInfo()[0].card.currentPageNumber;
    expect(isEqual).toBeTruthy();
  });  

  it('Debe ser igual el item de la carta al length del array rulesInfo[0].card.list.length', () => {
    component.rulesInfo()[0].card.currentPageNumber = component.rulesInfo()[0].card.list.length;
    const nextPageNumber = component.rulesInfo()[0].card.list.length;

    component.changeItemList('objetivo', 'next', component.rulesInfo()[0].card.list.length);

    const isEqual = nextPageNumber === component.rulesInfo()[0].card.currentPageNumber;
    expect(isEqual).toBeTruthy();
  });


  xit('Debe mover el scroll hacia la zona de rules', (done) => {
    document.body.style.minHeight = '1000px';
    let element = fixture.debugElement.query( By.css('.rules') );
    fixture.whenStable().then(() => {
      const elementPositionY = element.nativeElement.getBoundingClientRect().top;
      component.scrollToRules();
      const isEqual = elementPositionY === component.scollInY
      expect(isEqual).toBeTruthy();
      done();
    })

  });

  it('El método scrollToRules debe ser ejecutado', () => {
    spyOn(component, 'scrollToRules');
    const button = fixture.debugElement.query( By.directive(ButtonComponent) );
    button.triggerEventHandler('click', null);
    expect(component.scrollToRules).toHaveBeenCalled();

  });
});
