import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberInputDirective } from './number-input.directive';
import { CurrencyInputDirective } from './currency-input.directive';



@NgModule({
  declarations: [NumberInputDirective,CurrencyInputDirective],
  imports: [],
  exports:[NumberInputDirective,CurrencyInputDirective]
})
export class DirectiveModule { }
