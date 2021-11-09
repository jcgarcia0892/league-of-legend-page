import { animate, animation, keyframes, state, style, transition, trigger, useAnimation } from "@angular/animations";
export const fadeAnimation = animation([
  style({ opacity: '{{start}}' }),
  animate('{{time}}'),
  style({ opacity: '{{end}}' }),
])
export const fadeInAnimation = trigger('fadeInAnimation', [
    state(
      'fadeIn',
      style({
        opacity: '1'
      })
    ),
    state(
      'fadeOut',
      style({
        opacity: '0'
      }),
    ),
    transition("fadeIn <=> fadeOut", [animate(".4s ease-out")]),
  ]);

