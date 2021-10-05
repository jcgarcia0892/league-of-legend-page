import { animate, animation, keyframes, state, style, transition, trigger, useAnimation } from "@angular/animations";
export const fadeAnimation = animation([
  style({ opacity: '{{start}}' }),
  animate('{{time}}'),
  style({ opacity: '{{end}}' }),
])
export const fadeInAnimation = trigger('fadeInAnimation', [
    state(
      'fadeIn',
      style({})
    ),
    state(
      'fadeOut',
      style({})
    ),
    transition("fadeIn <=> fadeOut", [animate("1s ease-out", 
      keyframes([
        style({opacity: '1'}),
        style({opacity: '0'}),
        style({opacity: '1'}),
      ])
    )])
  ])

  export const sasa = trigger('sasa', [
    state(
      'fadeIn',
      style({})
    ),
    state(
      'fadeOut',
      style({})
    ),
    transition("fadeIn <=> fadeOut", [useAnimation(fadeAnimation)])
  ])

