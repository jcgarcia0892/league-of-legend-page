import { animate, state, style, transition, trigger } from "@angular/animations";


export const followingMouseXAnimation = trigger('followingMouseXAnimation', [
    state(
      'toXsLeft',
      style({
        transform: 'translateX(-100px)'
      })
    ),
    state(
      'toSmLeft',
      style({
        transform: 'translateX(-80px)'
      })
    ),
    state(
      'toMdLeft',
      style({
        transform: 'translateX(-60px)'
      })
    ),
    state(
      'toLgLeft',
      style({
        transform: 'translateX(-40px)'
      })
    ),
    state(
      'toXlLeft',
      style({
        transform: 'translateX(-20px)'
      })
    ),
    state(
      'toXsRight',
      style({
        transform: 'translateX(20px)'
      })
    ),
    state(
      'toSmRight',
      style({
        transform: 'translateX(40px)'
      })
    ),
    state(
      'toMdRight',
      style({
        transform: 'translateX(60px)'
      })
    ),
    state(
      'toLgRight',
      style({
        transform: 'translateX(80px)'
      })
    ),
    state(
      'toXlRight',
      style({
        transform: 'translateX(100px)'
      })
    ),
    transition("* => *", animate('.3s linear'))
  ])