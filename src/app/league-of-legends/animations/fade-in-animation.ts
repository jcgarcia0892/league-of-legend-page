import { animate, keyframes, state, style, transition, trigger } from "@angular/animations";

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