import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, computed, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../../animations/fade-in-animation';
import { translateAnimation } from '../../animations/translate-animation';
import { RoleName, Role, RoleInfo } from '../../interfaces/roles.interface';
import * as data from './../../../../assets/json/roles.json';
import { LoadingComponent } from '../../components/loading/loading.component';
import { ButtonComponent } from '../../components/button/button.component';
import { RoleBoxComponent } from '../../components/role-box/role-box.component';
import { MoveDetectionDirective } from '../../directives/moveDetection/move-detection.directive';
import { TitleAppearsDirective } from '../../directives/titleAppears/title-appears.directive';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [
        ButtonComponent,
        LoadingComponent,
        RoleBoxComponent,
        ReactiveFormsModule,
        MoveDetectionDirective,
        TitleAppearsDirective,
    ],
    animations: [
        translateAnimation,
        fadeInAnimation,
    ]
})
export class HomeComponent implements OnInit, AfterViewInit {
  // GETTING HTML ELEMENTS
  @ViewChild('homeVideo') homeVideo!: ElementRef;
  // END GETTIN HTML ELEMENTS

  // ANIMATIONS VAR
  imgAnimation = signal<boolean>(false);

  fadeInAnimation = signal<boolean>(true);
  
  loading = signal<boolean>(false);
  // END ANIMATION VAR
  
  champion = signal<RoleInfo>({
    name: 'Akali',
    nickName: 'La Asesina Furtiva'
  });
  
  rolesArray = signal<Role[]>((data as any).default);
  
  rolSelectionControl = new FormControl<RoleName>(this.rolesArray()[0].roleName, {nonNullable: true});

  videoPaths = signal<string[]>(['caitlyn', 'kaisa', 'sylas-entrace', 'sylas']);
  
  videoPath = computed(() => `assets/videos/${this.videoPaths()[this.randomNumber()]}.mp4`);

  imgRolPath = signal<string>(`assets/images/champions-role/${this.rolSelectionControl.value}.png`);

  roleAltImage = computed<string>(() => `${this.rolSelectionControl.value}-image`);

  private router = inject(Router);

  ngOnInit(): void {
    this.rolSelectionFunction();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.playToVideo();
    },10);
    
  }
  
  goTo(route: string) {
    this.router.navigate([`/main/${route}`]);
  }

  randomNumber(): number {
    return Math.floor(Math.random() * this.videoPaths().length);
  };

  playToVideo(): void {
    const isPlaying = this.homeVideo.nativeElement.currentTime > 0 && !this.homeVideo.nativeElement.paused && !this.homeVideo.nativeElement.ended && this.homeVideo.nativeElement.readyState > this.homeVideo.nativeElement.HAVE_CURRENT_DATA
    if(!isPlaying) {
      this.homeVideo.nativeElement.muted = true;
      this.homeVideo.nativeElement.play().finally(() => this.loading.set(true));
    }
  }

  rolSelectionFunction(): void {
    this.rolSelectionControl.valueChanges.subscribe((roleName: RoleName) => {
      this.imgAnimation.set(true);
      this.fadeInAnimation.set(false);
      setTimeout(() => {
        this.imgRolPath.set(`assets/images/champions-role/${roleName}.png`);
      }, 300);

    });
  }

  loadImg(): any {
    let index = this.rolesArray().findIndex(element => element.roleName === this.rolSelectionControl.value);
    this.champion.set({
      name: this.rolesArray()[index].name,
      nickName: this.rolesArray()[index].nickName,
    });
    this.imgAnimation.set(false);
    this.fadeInAnimation.set(true);
  }
}
