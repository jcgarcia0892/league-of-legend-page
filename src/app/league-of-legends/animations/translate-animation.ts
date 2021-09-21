import { animate, keyframes, state, style, transition, trigger } from "@angular/animations";


export const translateAnimation = trigger("translateAnimation", [
    state(
      'appear',
      style({})
    ),
    state(
      'disappear',
      style({}),
    ),
    transition("appear <=> disappear", [animate("1s ease-out",
      keyframes([
        style({transform: 'translate(-50%, -50%)'}),
        style({transform: 'translate(100%, -50%)'}),
        style({transform: 'translate(-50%, -50%)'})

      ])
    )]),
])