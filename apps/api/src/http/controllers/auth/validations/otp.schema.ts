import { PartialInstantiable } from '../../../../utils/partial-instantiable';
import S from 'fluent-json-schema';

export class OtpValidation extends PartialInstantiable<OtpValidation> {
  otp: string;

  static schema = S.object().prop(
    'otp',
    S.string().minLength(6).maxLength(6).required()
  );
}
