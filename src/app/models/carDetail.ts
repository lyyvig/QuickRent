import { CarImage } from './carImage';
export interface CarDetail{
  id:number;
  brandId:number;
  brandName:string;
  colorId:number;
  colorName:string;
  description:string;
  dailyPrice:number;
  model:string;
  modelYear:number;
  images:CarImage[];
}
