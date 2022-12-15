import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { formControlHasError } from 'src/app/common/form-helpers';
import { ApplianceCategory } from 'src/app/models/appliance-category.model';

@Component({
  selector: 'app-appliance-shared',
  templateUrl: './appliance-shared.component.html',
  styleUrls: ['./appliance-shared.component.scss'],
})
export class ApplianceSharedComponent {
  @Input() form!: FormGroup;
  @Input() applianceCategories: Array<ApplianceCategory> = [];

  public formControlHasError = formControlHasError;

  get name(): FormControl<string> {
    return this.form.get('name') as FormControl<string>;
  }

  get consumptionWh(): FormControl<number> {
    return this.form.get('consumptionWh') as FormControl<number>;
  }

  get runningHoursPerDay(): FormControl<number> {
    return this.form.get('runningHoursPerDay') as FormControl<number>;
  }

  get count(): FormControl<number> {
    return this.form.get('count') as FormControl<number>;
  }

  get applianceCategoryId(): FormControl<string> {
    return this.form.get('applianceCategoryId') as FormControl<string>;
  }

  get active(): FormControl<boolean> {
    return this.form.get('active') as FormControl<boolean>;
  }
}
