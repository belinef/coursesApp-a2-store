import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { EditableCourseAbstract } from '../abstract/editableAbstract';
import {Location} from '@angular/common';
import {AuthorsService} from "../../../core/services/authors/authors.service";
import {Store} from "@ngrx/store";
@Component({
  selector: 'cdp-course-details',
  styleUrls: ['../edit-create.component.styles.css'],
  templateUrl: '../edit-create.component.tmpl.html'
})
export class CreateComponent extends EditableCourseAbstract {
  public pageType = 'create';
  public searchedAuthors : Object = {
    list : [],
    loaded: true
  };

  constructor(
    protected activatedRoute : ActivatedRoute,
    protected location : Location,
    protected router : Router,
    protected authorsService : AuthorsService,
    protected store: Store<any>
  ) {
    super()
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
