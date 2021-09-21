import { animate, state, style, transition, trigger } from "@angular/animations";


 
    export const titleAnimation = trigger('titleAnimation', [
        state(
          'appear',
          style({
            opacity: 0,
            transform: "translateY(100px)"
          })
        ),
        state(
          'disappear',
          style({
            opacity: 1,
            transform: "translateY(0)"
          })
        ),
        transition("appear <=> disappear", [animate("1s ease-out")])
    ]);
