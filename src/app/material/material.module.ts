import { NgModule } from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';

const materialModules = [
  MatSlideToggleModule,
  MatButtonModule,
]

@NgModule({
  declarations: [],
  imports: [
    ...materialModules
  ],
  exports
    : [
      ...materialModules
    ]
})
export class MaterialModule { }
