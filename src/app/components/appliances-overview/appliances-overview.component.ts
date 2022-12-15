import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, filter, first, Subject, takeUntil } from 'rxjs';
import { ApplianceCategory } from 'src/app/models/appliance-category.model';
import { Appliance } from 'src/app/models/appliance.model';
import { QueryCriteria } from 'src/app/models/query-criteria.model';
import { ApplianceCategoryService } from 'src/app/services/appliance-category.service';
import { ApplianceService } from 'src/app/services/appliance.service';

@Component({
  selector: 'app-appliances-overview',
  templateUrl: './appliances-overview.component.html',
  styleUrls: ['./appliances-overview.component.scss'],
})
export class AppliancesOverviewComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[] = [
    'id',
    'name',
    'consumptionWh',
    'applianceCategory',
    'runningHoursPerDay',
    'active',
    'count',
    'actions',
  ];
  public dataSource = new MatTableDataSource<Appliance>();
  public appliancesCount = 0;
  public appliances: Array<Appliance> = [];

  private destroy$: Subject<boolean> = new Subject<boolean>();
  private queryCriteria: QueryCriteria = { offset: 0, pageSize: 10 };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private applianceService: ApplianceService,
    private applianceCategoryService: ApplianceCategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAppliances();
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onUpdateButtonClick(id: number) {
    this.router.navigate([id, 'update'], { relativeTo: this.route });
  }

  onDeleteButtonClick(id: number) {
    if (confirm('Are you sure you want to delete this appliance?')) {
      this.applianceService
        .deleteAppliance(id)
        .pipe(first())
        .subscribe(() => {
          alert('Application successfully deleted!');
          this.getAppliances();
        });
    }
  }

  onNavigateToDetails(row: Appliance) {
    this.router.navigate([row.id], { relativeTo: this.route });
  }

  onPageChanged(event: PageEvent) {
    this.queryCriteria.offset = event.pageIndex * event.pageSize;
    this.queryCriteria.pageSize = event.pageSize;
    this.getAppliances();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getAppliances() {
    this.getAggregatedData().subscribe(
      ([appliancesResult, applianceCategories]) => {
        const rows = appliancesResult.appliances;
        this.appliancesCount = appliancesResult.totalCount;
        this.matchApplianceCategory(rows, applianceCategories);
        this.appliances = rows;
      }
    );
  }

  private getAggregatedData() {
    return combineLatest([
      this.applianceService.getAppliances(this.queryCriteria),
      this.applianceCategoryService.getApplianceCategories(),
    ]).pipe(
      filter((s) => !!s[0] && !!s[1]),
      takeUntil(this.destroy$)
    );
  }

  private matchApplianceCategory(
    rows: Appliance[],
    applianceCategories: ApplianceCategory[]
  ) {
    rows.forEach((appliance) => {
      const applianceCategory = applianceCategories.find(
        (e) => e.id == appliance.applianceCategoryId
      );
      appliance.applianceCategory = applianceCategory;
    });
  }
}
