import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { SpeechRecognitionService } from 'src/app/services/speech-recognition.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent {
  recognizedText: string = '';
  recognition!: any;
  isRecognizing: boolean = false;
  selectedOption!:any;
  @ViewChild('myTextarea', { static: true }) myTextarea!: ElementRef;
  options:any = [
    { label:'english', value: 'en-US'},
    { label:'spanish', value: 'es-ES'},
    { label:'Japanese ', value: 'ja'}
  ];

  constructor(public service : SpeechRecognitionService, private renderer: Renderer2) {}
  ngOnInit() {
    this.selectedOption = this.options[0];
    this.service.setLang(this.selectedOption.value);
    this.service.init()
    this.service.textSubject.subscribe((value) => {
      this.updateTextarea(value);
    });  
  }

  updateTextarea(text: string) {
    this.renderer.setProperty(this.myTextarea.nativeElement, 'value', text);
  }

  onMicrophoneClick() {
    this.isRecognizing = !this.isRecognizing;
    if(this.isRecognizing) {
      this.service.start();
    } else {
      this.service.stop();
    }
  }  

  onSelectChange(event: any) {
     event.target.value;
     console.log(this.selectedOption);
    this.selectedOption = this.options.find((data:any) => { 
      if (data.value  === event.target.value) {
        return data;
      } 
    });
    this.service.setLang(this.selectedOption.value);
  }

}