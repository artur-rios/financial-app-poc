import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-budget-creation',
  templateUrl: './budget-creation.component.html',
  styleUrls: ['./budget-creation.component.scss'],
})
export class BudgetCreationComponent {
  public data: BudgetItem[] = [];
  public form: FormGroup<BudgetForm>;
  public submitted = false;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group<BudgetForm>({
      name: new FormControl('', [Validators.required]),
      value: new FormControl(null, [Validators.required]),
    });
  }

  get f() {
    return this.form.controls;
  }

  public onSubmit(): void {
    this.submitted = true;

    //! TEST
    console.log('Submitted value: ', this.form.value);

    if (this.form.valid) {
      let newItem: BudgetItem = {
        name: String(this.f.name.value),
        value: Number(this.f.value.value),
      };

      this.data = [...this.data, newItem];

      //! TEST
      console.log('Data after push: ', this.data);

      this.form.reset();
      this.submitted = false;
    }
  }

  //! TEST
  private mockData(quantity: number): void {
    quantity = Math.round(quantity);

    if (quantity <= 0) {
      quantity = 1;
    }

    for (let i = 0; i < quantity; i++) {
      this.data.push({ name: `Item ${i}`, value: 100.0 + i });
    }
  }
}

interface BudgetForm {
  name: FormControl<string | null>;
  value: FormControl<number | null>;
}

export interface BudgetItem {
  name: string;
  value: number;
}
