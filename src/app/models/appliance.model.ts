import { ApplianceCategory } from './appliance-category.model';

export interface Appliance {
  id: number;
  name: string;
  consumptionWh: number;
  runningHoursPerDay: number;
  count: number;
  active: boolean;
  applianceCategoryId: number;
  applianceCategory?: ApplianceCategory;
}
