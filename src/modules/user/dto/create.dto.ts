export interface CreateDto {
  suscriptionId: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  indicator: string;
  phone: string;
  latitude?: string;
  longitude?: string;
}
