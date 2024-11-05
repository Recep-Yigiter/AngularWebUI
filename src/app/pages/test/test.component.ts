import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  deneme:boolean=false;
  display:any='none';
  opacity:any=1

  inputValue: string = '';
  message: string | undefined;

  onButtonClick() {
    this.message = `Girdiğiniz metin: ${this.inputValue}`;
  }

  show(){
    this.deneme=!this.deneme
    this.display='block';
    this.opacity=1
  }

  enter(){
    console.log("fh");
  }
}
