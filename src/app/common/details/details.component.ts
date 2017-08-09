import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractCourseDetailed } from '../abstract/singleCourse';
import { AbstractApprovable } from '../abstract/abstractApprovable';
import {Store} from "@ngrx/store";
import { mixClass } from '../../util';

import {Modal} from "angular2-modal/plugins/bootstrap";

@Component({
  selector: 'cdp-course-details',
  styleUrls: ['./details.component.styles.css'],
  templateUrl: './details.component.tmpl.html'
})
export class CourseDetailsComponent extends mixClass(AbstractCourseDetailed,AbstractApprovable) {

  public pageType : string = 'details';

  constructor(
    protected activatedRoute : ActivatedRoute,
    protected router : Router,
    protected store: Store<any>,
    protected modal: Modal
  ) {
    super()
  }

  ngOnInit() {
    super.ngOnInit();
  }

  editHandle(id) {
    this.router.navigate(['edit', id])
  }
}
