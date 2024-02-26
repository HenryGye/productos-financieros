export interface Result<T> {
  code: number;
  data: T | null;
  message: string;
  success: boolean;
}