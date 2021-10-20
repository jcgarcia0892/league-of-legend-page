import { animate, keyframes, state, style, transition, trigger } from "@angular/animations";


export const translateAnimation = trigger("translateAnimation", [
    state(
      'disappear',
      style({
        transform: 'translate(200%, -50%)'
      })
    ),
    state(
      'appear',
      style({
        transform: 'translate(-50%, -50%)'
      }),
    ),
    transition("appear <=> disappear", [animate(".8s ease-out")]),
])