// Define a common filter type for all filter fields
export type FilterField<T> = {
  name: string;
  value: T;
  operator?: "eq" | "gt" | "lt" | "gte" | "lte";
};
