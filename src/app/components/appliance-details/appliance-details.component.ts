import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { concatMap, filter, Subject, takeUntil } from 'rxjs';
import { Appliance } from 'src/app/models/appliance.model';
import { ApplianceCategoryService } from 'src/app/services/appliance-category.service';
import { ApplianceService } from 'src/app/services/appliance.service';

@Component({
  selector: 'app-appliance-details',
  templateUrl: './appliance-details.component.html',
  styleUrls: ['./appliance-details.component.scss'],
})
export class ApplianceDetailsComponent implements OnInit, OnDestroy {
  public appliance: Appliance | null = null;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private applianceService: ApplianceService,
    private applianceCategoryService: ApplianceCategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
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
          concatMap((appliance) => {
            this.appliance = appliance;
            return this.applianceCategoryService.getCategory(
              appliance.applianceCategoryId
            );
          }),
          takeUntil(this.destroy$)
        )
        .subscribe((applianceCategory) => {
          if (this.appliance) {
            this.appliance.applianceCategory = applianceCategory;
          }
        });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
