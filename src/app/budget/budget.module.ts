import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { BudgetCreationComponent } from './budget-creation/budget-creation.component';
import { BudgetRoutingModule } from './budget-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [BudgetCreationComponent],
  imports: [
    CommonModule,
    BudgetRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class BudgetModule {}
