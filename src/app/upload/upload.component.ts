import {Component, OnInit} from '@angular/core';
import {MediaService} from '../services/media.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Media} from '../interface/media';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {

  file: File;
  media: Media = {
    title: '',
    description: ''
  };

  constructor(public mediaService: MediaService) {
  }

  setFile(evt) {
    console.log(evt.target.files[0]);
    this.file = evt.target.files[0];
  }

  startUpload() {
    // create FormData object
    const formData = new FormData();
    // add title and description to FormData object
    formData.append('title', this.media.title);
    formData.append('description', this.media.description);
    // add file to FormData object
    formData.append('file', this.file);
    // send FormData object to API
    this.mediaService.upload(formData).subscribe(response => {
      console.log(response);
    }, (error: HttpErrorResponse) => {
      console.log(error.error.message);
    });
  }

  ngOnInit() { }
}


