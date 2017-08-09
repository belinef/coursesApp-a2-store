import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';


export interface ConfirmModel {
  onImageChange: Function;
  avatar: {
    original: any,
    image: string
  };
  edit: boolean
}
@Component({
  selector: 'confirm',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./avatar-manipulation.styles.css'],
  templateUrl: './avatar-manipulation.html'
})
export class ConfirmComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  onImageChange:Function = ()=> {};
  dragging: boolean = false;

  avatar: {
    original: any,
    image: string
  } = {
    original: {},
    image: ''
  };
  edit: boolean = false;
  cropperSettings:CropperSettings;
  @ViewChild('cropper', undefined) cropper:ImageCropperComponent;

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  ngOnInit() {
    //Cropper settings 2
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 200;
    this.cropperSettings.height = 200;
    this.cropperSettings.keepAspect = false;

    this.cropperSettings.croppedWidth = 200;
    this.cropperSettings.croppedHeight = 200;

    this.cropperSettings.canvasWidth = 500;
    this.cropperSettings.canvasHeight = 300;

    this.cropperSettings.minWidth = 100;
    this.cropperSettings.minHeight = 100;

    this.cropperSettings.rounded = true;
    this.cropperSettings.minWithRelativeToResolution = false;

    this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
    this.cropperSettings.noFileInput = false;


  }

  ngAfterViewInit() {
    if(this.avatar.original) {
      const image = new Image();
      image.src = this.avatar.original.src;

      this.cropper.setImage(image)
    }
  }

  cropped(bounds:Bounds) {
    console.log(bounds);
  }

  /**
   * Used to send image to second cropper
   * @param $event
   */
  fileChangeListener(e) {
    const file:File = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const pattern = /image-*/;

    if (!file || !file.type.match(pattern)) {
      return;
    }

    const image:any = new Image();
    const myReader:FileReader = new FileReader();
    myReader.onloadend = (loadEvent:any) => {
      image.src = loadEvent.target.result;
      this.cropper.setImage(image);
    };

    myReader.readAsDataURL(file);
  }

  handleDragEnter() {
    this.dragging = true;
  }

  handleDragLeave() {
    this.dragging = false;
  }

  handleDrop(e) {
    e.preventDefault();
    this.dragging = false;
    if (!this.edit) {
      this.fileChangeListener(e);
    }
  }

  confirm() {
    this.result = true;
    this.onImageChange(this.avatar);
    this.close();
  }
}
