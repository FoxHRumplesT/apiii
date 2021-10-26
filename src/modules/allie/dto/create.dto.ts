export interface CreateDto {
  allieTypeId: number;
  name: string;
  description: string;
  imageUrl: string;
  latitude: string;
  longitude: string;
  deliveredAt?: Date;
}
