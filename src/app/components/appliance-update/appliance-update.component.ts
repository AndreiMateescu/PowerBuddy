import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, first, Observable, Subject, takeUntil } from 'rxjs';
import { ApplianceCategory } from 'src/app/models/appliance-category.model';
import { Appliance } from 'src/app/models/appliance.model';
import { ApplianceCategoryService } from 'src/app/services/appliance-category.service';
import { ApplianceService } from 'src/app/services/appliance.service';

@Component({
  selector: 'app-appliance-update',
  templateUrl: './appliance-update.component.html',
  styleUrls: ['./appliance-update.component.scss'],
})
export class ApplianceUpdateComponent implements OnInit, OnDestroy {
  public form: FormGroup = new FormGroup({});
  public applianceCategories$: Observable<Array<ApplianceCategory>> =
    new Observable<[]>();

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public applianceCategoryService: ApplianceCategoryService,
    private applianceService: ApplianceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.applianceCategories$ = this.applianceCategoryService.getApplianceCategories();

    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const id = params.get('id');
      if (!id) {
        this.router.navigate(['/', 'appliances']);
        return;
      }
      this.applianceService
        .getAppliance(+id)
        .pipe(
          filter((s) => !!s),
          takeUntil(this.destroy$)
        )
        .subscribe((response) => {
          this.form.patchValue({ ...response });
        });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const appliance: Appliance = { ...this.form.value };
    this.applianceService
      .updateAppliance(this.id.value, appliance)
      .pipe(first())
      .subscribe(() => {
        alert('Appliance successfully updated!');
        this.router.navigate(['../../'], { relativeTo: this.route });
      });
  }

  onCancel(): void {
    this.router.navigate(['/', 'appliances']);
  }

  get id(): FormControl<number> {
    return this.form.get('id') as FormControl<number>;
  }

  private createForm() {
    this.form = new FormGroup({
      id: new FormControl<number>({ value: 0, disabled: true }),
      name: new FormControl<string>('', [
        Validators.required,
        Validators.maxLength(128),
      ]),
      consumptionWh: new FormControl<number>(1, [
        Validators.min(0.01),
        Validators.max(99999),
      ]),
      runningHoursPerDay: new FormControl<number>(1, [
        Validators.required,
        Validators.min(1),
        Validators.max(24),
      ]),
      count: new FormControl<number>(1, [
        Validators.required,
        Validators.min(1),
        Validators.max(999),
      ]),
      active: new FormControl<boolean>(false, [Validators.required]),
      applianceCategoryId: new FormControl<string | null>(null, [
        Validators.required,
      ]),
    });
  }
}
