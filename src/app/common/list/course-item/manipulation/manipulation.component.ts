import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cdp-course-manipulation',
  styleUrls: ['manipulation.component.css'],
  templateUrl: 'manipulation.component.html'
})

export class CourseManipulationComponent {
  @Input() manipulationType: string;
  @Input() courseSubscribtion: string;
  @Input() courseId: string;

  @Output('onSubscribe')
  subscribeEvent: EventEmitter<any> = new EventEmitter<any>();

  @Output('onCourseDelete')
  deleteCourse: EventEmitter<string> = new EventEmitter<string>();

  @Output('onEditCourse')
  editCourse: EventEmitter<string> = new EventEmitter<string>();

  @Output('onApproveCourse')
  approvingCourse: EventEmitter<string> = new EventEmitter<string>();

  @Output('onRejectCourse')
  rejectingCourse: EventEmitter<string> = new EventEmitter<string>();

  toggleSubscribe(id, subscribed) {
    this.subscribeEvent.emit({id, subscribed: !subscribed});
  }

  handleDelete(id) {
    this.deleteCourse.emit(id);
  }

  editHandle(id) {
    this.editCourse.emit(id);
  }

  approveHandle(id) {
    this.approvingCourse.emit(id);
  }

  rejectHandle(id) {
    this.rejectingCourse.emit(id);
  }
}
