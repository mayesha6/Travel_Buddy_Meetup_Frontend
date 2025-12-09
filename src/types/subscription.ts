export interface ISubscription {
  _id?: string;
  name: string;
  price: number;
  durationInDays: number;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}
