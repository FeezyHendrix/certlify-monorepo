import S from 'fluent-json-schema';
import { PartialInstantiable } from '../../../../utils/partial-instantiable';

export class ResetPasswordValidation extends PartialInstantiable<ResetPasswordValidation> {
  otp: string;
  new_password: string;

  static schema = S.object()
    .prop('otp', S.string().required())
    .prop('new_password', S.string().required());
}
