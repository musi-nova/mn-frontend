import { Component, AfterViewInit, ElementRef, ViewChild, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import ImageEditor from 'tui-image-editor';

@Component({
  selector: 'app-image-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.scss']
})
export class ImageEditorComponent implements OnInit {
  @ViewChild('imageEditorContainer', { static: false }) imageEditorContainer!: ElementRef;
  imageEditor!: ImageEditor;
  private isBrowser: boolean;
  TUI_selectedItem: any;
  TUI_selectedFont: any;

  imageUrls: string[] = [
    'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=2000&h=500&dpr=2',
    'https://images.pexels.com/photos/860707/pexels-photo-860707.jpeg?auto=compress&cs=tinysrgb&w=2000&h=500&dpr=2',
    'https://images.pexels.com/photos/210907/pexels-photo-210907.jpeg?auto=compress&cs=tinysrgb&w=2000&h=500&dpr=2',
    'https://images.pexels.com/photos/2601192/pexels-photo-2601192.jpeg?auto=compress&cs=tinysrgb&w=2000&h=500&dpr=2'
  ];

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      import('tui-image-editor').then((module) => {
        const ImageEditor = module.default;
        this.initializeImageEditor(ImageEditor, this.imageUrls[0]);
      });
    }
  }

  initializeImageEditor(ImageEditor: any, imageUrl: string): void {
    if (this.imageEditor) {
      this.imageEditor.destroy();
    }
    this.imageEditor = new ImageEditor(this.imageEditorContainer.nativeElement, {
      includeUI: {
        loadImage: {
          path: imageUrl,
          name: 'playlist-artwork'
        },
        theme: {
          'common.bi.image': '',
          'common.bisize.width': '0px',
          'common.bisize.height': '0px',
          'common.backgroundImage': 'none',
          'common.backgroundColor': '#fff',
          'common.border': '1px solid #c1c1c1',
          'menu.normalIcon.path': '',
          'menu.activeIcon.path': '',
          'submenu.normalIcon.path': '',
          'submenu.activeIcon.path': '',
          'submenu.backgroundColor': '#fff',
          'submenu.partition.color': '#e5e5e5',
          'submenu.normalLabel.color': '#858585',
          'submenu.normalLabel.fontWeight': 'normal',
          'submenu.activeLabel.color': '#000',
          'submenu.activeLabel.fontWeight': 'normal',
          'checkbox.border': '1px solid #ccc',
          'checkbox.backgroundColor': '#fff',
          'range.pointer.color': '#333',
          'range.bar.color': '#ccc',
          'range.subbar.color': '#606060',
          'range.value.color': '#000',
          'range.value.fontWeight': 'normal',
          'range.value.fontSize': '11px',
          'range.value.border': '1px solid #ccc',
          'range.value.backgroundColor': '#fff',
          'range.title.color': '#000',
          'range.title.fontWeight': 'lighter',
          'colorpicker.button.border': '1px solid #1e1e1e',
          'colorpicker.title.color': '#000'
        },
        initMenu: 'text',
        menuBarPosition: 'right'
      },
      cssMaxWidth: 700,
      cssMaxHeight: 500,
      selectionStyle: {
        cornerSize: 20,
        rotatingPointOffset: 70
      }
    });

    this.addFontSelector();

    this.imageEditor.on('objectActivated', props => {
      this.TUI_selectedItem = props;
      this.TUI_updateFontSelected(props);
      console.log('TUI_selectedItem', props);
    });
  }

  addFontSelector() {
    const fontArray = [
      "Arial", "Arial Black", "Caveat", "Comic Sans MS", "Courier New", "Georgia", "Impact", "Lobster Two",
      "Lucida Console", "Luckiest Guy", "Open Sans", "Pacifico", "Palatino Linotype", "Press Start 2P",
      "Roboto", "Tahoma", "Tangerine", "Times New Roman", "Tourney", "Ultra", "Verdana", "Symbol", "Webdings", "Wingdings"
    ];

    let fontSelectHTML = '<select class="form-select font-selector">';
    for (let i = 0; i < fontArray.length; i++) {
      let selected = '';
      if (i === 0) {
        selected = 'selected';
      }
      fontSelectHTML += `<option style="font-family:${fontArray[i]};" value="${fontArray[i]}" ${selected}>${fontArray[i]}</option>`;
    }
    fontSelectHTML += '</select>';

    const textMenuAlign = document.querySelector('.tui-image-editor-menu-text .tie-text-align-button');
    if (textMenuAlign) {
      textMenuAlign.insertAdjacentHTML('afterbegin', fontSelectHTML);

      document.querySelector('.font-selector')?.addEventListener('change', (event) => {
        const selectElement = event.target as HTMLSelectElement;
        this.TUI_updateFontOnText(selectElement.value);
      });
    }
  }

  TUI_updateFontOnText(font: any) {
    console.log("TUI_updateFontOnText", font, this.TUI_selectedItem?.id);

    if (!this.TUI_selectedItem) {
      console.error("No item selected or item is not on canvas.");
      return;
    }

    if (font) {
      this.TUI_selectedFont = font;
    }

    if (font && this.TUI_selectedItem) {
      this.imageEditor.changeTextStyle(this.TUI_selectedItem.id, {
        fontFamily: font,
      }).catch((err: any) => {
        console.error("Failed to change font style: ", err);
      });
    }
  }

  TUI_updateFontSelected(layer: any) {
    console.log("TUI_updateFontSelected", layer);

    if (layer.fontFamily) {
      const fontSelector = document.querySelector<HTMLInputElement>('.font-selector');
      if (fontSelector) {
        fontSelector.value = layer.fontFamily;
        this.TUI_selectedFont = layer.fontFamily;
      }
    }

    if (layer.stroke) {
      // Update stroke settings if available
      this.imageEditor.changeTextStyle(layer.id, {
      }).catch((err: any) => {
        console.error("Failed to update stroke style: ", err);
      });
    }
  }

  onImageSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const imageUrl = selectElement.value;
    import('tui-image-editor').then((module) => {
      const ImageEditor = module.default;
      this.initializeImageEditor(ImageEditor, imageUrl);
    });
  }
}