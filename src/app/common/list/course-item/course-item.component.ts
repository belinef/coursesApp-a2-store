import { Component, EventEmitter, Input, Output , animate, state, style, transition, trigger} from '@angular/core';
import { Router } from '@angular/router';
import {Store} from '@ngrx/store'
import { coursesActions } from '../../../Store/actions';

@Component({
  selector: 'cdp-course',
  styleUrls: ['course-item.component.styles.css'],
  templateUrl: 'course-item.component.tmpl.html',
  animations: [
    trigger('courseAnimation', [
      state('delete', style({
        'left': '-150%',
        'max-height': 0,
        'margin-bottom': 0
      })),
      transition('* => delete', animate('1s'))
    ])
  ]
})

export class CourseComponent {
  @Input() course: any;

  constructor(
    private router : Router,
    private store : Store<any>
  ) {}

  goToDetails(id: string):void {
    this.router.navigate(['details', id]);
  }

  get delete() {
    if(this.course.removed) {
      return 'delete'
    }
    return '';
  }

  get prettyCourseDuration(): string {
    const {duration} = this.course,
      hours = Math.floor(duration / 60),
      minutes = duration % 60;

    return duration ? `${hours || ''} ${hours ? 'hour' : ''}${hours > 1 ? 's' : ''} ${minutes || '0'} min.` : 'not specified';
  }

  deleteComplete(event) {
    const {toState} = event;

    if(toState === 'delete') {
      this.store.dispatch(new coursesActions.CoursesDeleted())
    }
  }

}
