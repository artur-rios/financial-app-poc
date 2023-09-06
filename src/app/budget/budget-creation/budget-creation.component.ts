import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-budget-creation',
  templateUrl: './budget-creation.component.html',
  styleUrls: ['./budget-creation.component.scss'],
})
export class BudgetCreationComponent {
  public availableBudgetForm: FormGroup<AvailableBudgetForm>;
  public availableBudgetSubmitted = false;
  public data: Budget = { availableBudget: 0, items: [] };
  public form: FormGroup<BudgetForm>;
  public submitted = false;

  constructor(private formBuilder: FormBuilder) {
    this.availableBudgetForm = this.formBuilder.group<AvailableBudgetForm>({
      value: new FormControl(null, [Validators.required]),
    });

    this.form = this.formBuilder.group<BudgetForm>({
      name: new FormControl('', [Validators.required]),
      value: new FormControl(null, [Validators.required]),
    });
  }

  get abf() {
    return this.availableBudgetForm.controls;
  }

  get f() {
    return this.form.controls;
  }

  public onAvailableBudgetSubmit(): void {
    this.availableBudgetSubmitted = true;

    if (this.availableBudgetForm.valid) {
      this.data = {
        ...this.data,
        availableBudget: Number(this.abf.value.value),
      };

      this.availableBudgetSubmitted = false;
    }
  }

  public onFileChange(event: any): void {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(file, 'UTF-8');
    fileReader.onload = () => {
      if (fileReader.result) {
        const dataFromFile = JSON.parse(String(fileReader.result));

        if (dataFromFile.availableBudget) {
          this.data.availableBudget = dataFromFile.availableBudget;
          this.abf.value.setValue(dataFromFile.availableBudget);
        }

        for (let item of dataFromFile.items) {
          if (this.isBudgetItem(item)) {
            this.data.items.push(item);
          }
        }
      }
    };
    fileReader.onerror = (error) => {
      //! Error treatment
      console.log('ERROR READING FILE:', error);
    };
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.form.valid) {
      let newItem: BudgetItem = {
        name: String(this.f.name.value),
        value: Number(this.f.value.value),
      };

      const itemList = [...this.data.items, newItem];

      this.data = { ...this.data, items: itemList };

      this.resetForm(this.form);
      this.submitted = false;
    }
  }

  public saveToFile(): void {
    var sJson = JSON.stringify(this.data);
    var element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/json;charset=UTF-8,' + encodeURIComponent(sJson)
    );
    element.setAttribute('download', 'budget.json');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  private isBudgetItem(obj: any): obj is BudgetItem {
    return typeof obj.name === 'string' && typeof obj.value === 'number';
  }

  private resetForm(form: FormGroup<any>): void {
    form.reset();
    Object.keys(form.controls).forEach((key) => {
      form.controls[key].setErrors(null);
    });
  }
}

interface AvailableBudgetForm {
  value: FormControl<number | null>;
}

interface BudgetForm {
  name: FormControl<string | null>;
  value: FormControl<number | null>;
}

export interface BudgetItem {
  name: string;
  value: number;
}

export interface Budget {
  availableBudget: number;
  items: Array<BudgetItem>;
}
