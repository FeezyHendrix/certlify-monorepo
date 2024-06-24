import S from 'fluent-json-schema';
import { PartialInstantiable } from '../../../../utils/partial-instantiable';

export class ResendOtpValidations extends PartialInstantiable<ResendOtpValidations> {
  flow_key: string;

  static schema = S.object().prop('flow_key', S.string().required());
}
