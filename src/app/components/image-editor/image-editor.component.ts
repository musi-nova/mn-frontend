import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import ImageEditor from 'tui-image-editor';

@Component({
  selector: 'app-image-editor',
  standalone: true,
  imports: [],
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.scss']
})
export class ImageEditorComponent implements AfterViewInit {
  @ViewChild('imageEditorContainer', { static: false }) imageEditorContainer!: ElementRef;

  ngAfterViewInit() {
    const imageEditor = new ImageEditor(this.imageEditorContainer.nativeElement, {
      includeUI: {
        loadImage: {
          path: 'https://via.placeholder.com/800x600.png',
          name: 'SampleImage'
        },
        theme: {},
        initMenu: 'filter',
        menuBarPosition: 'bottom'
      },
      cssMaxWidth: 700,
      cssMaxHeight: 500,
      selectionStyle: {
        cornerSize: 20,
        rotatingPointOffset: 70
      }
    });
  }
}