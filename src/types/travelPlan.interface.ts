export interface ITravelPlan {
  _id: string;
  title: string;
  destination: string;
  budgetMin: number;
  budgetMax: number;
  host?: {
    _id: string;
    name: string;
  };
}
