import { CarImage } from './carImage';
export interface CarDetail{
  id:number;
  brandId:number;
  brandName:string;
  colorId:number;
  colorName:string;
  description:string;
  dailyPrice:number;
  modelYear:number;
  images:CarImage[];
}
