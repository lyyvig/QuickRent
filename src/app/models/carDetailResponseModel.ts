import { ResponseModel } from './responseModel';
import { CarDetail } from './carDetail';
export interface CarDetailResponseModel extends ResponseModel {
  data:CarDetail[];
}
