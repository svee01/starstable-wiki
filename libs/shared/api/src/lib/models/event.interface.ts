export interface Event {
  _id?: string;
  name: string;
  description: string;
  date: string;
  location: string;
  hasHappened: boolean;
  inStableId: string;
}
