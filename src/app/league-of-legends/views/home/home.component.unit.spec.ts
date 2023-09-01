import { fakeAsync, tick } from "@angular/core/testing";
import { Router, UrlSerializer } from "@angular/router";
import { AnimationsService } from "../../services/animations.service";
import { HomeComponent } from "./home.component";


describe('HomeComponent Unit Test',() => {

    let component: HomeComponent;
    let router: Router;

    beforeEach(() => {
        component = new HomeComponent( router );
    })

    it('Verificar que el número aleatorio sea menor o igual a la longitud del array videoPaths', () => {

        const arrayLength = component.videoPaths.length;
        const randomNumber = component.randomNumber();
        
        expect(randomNumber).toBeLessThanOrEqual(arrayLength);
    });

    it('Verificar que despues del ngOnInit se obtenga la ruta de un video', () => {

        component.ngOnInit();
        const videoPath = component.videoPath;
        expect(videoPath).toContain('assets/videos/');
    });

    it('Verificar que se haya creado el FormControl de los roles con el valor de assassins', () => {
        const rolValue = component.rolSelectionControl.value;
        expect(rolValue).toBe('assassins');
    });
})