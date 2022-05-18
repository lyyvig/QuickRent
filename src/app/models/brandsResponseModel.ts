import { Brand } from './brand';
import { ResponseModel } from './responseModel';
export interface BrandsResponseModel extends ResponseModel {
  data:Brand[];
}
