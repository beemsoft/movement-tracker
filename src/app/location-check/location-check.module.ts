import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelService } from "../shared/services/label.service";
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { LocationCheckComponent } from './location-check.component';
import { LabelPipe } from '../pipes/label.pipe';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MatTableModule
  ],
  declarations: [
    LocationCheckComponent,
    LabelPipe
  ],
  exports: [LocationCheckComponent],
  providers: [
    LabelService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class LocationCheckModule {
}
