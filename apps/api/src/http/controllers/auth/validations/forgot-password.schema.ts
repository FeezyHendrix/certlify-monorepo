import S from 'fluent-json-schema';
import { PartialInstantiable } from '../../../../utils/partial-instantiable';

export class ForgotPasswordValidation extends PartialInstantiable<ForgotPasswordValidation> {
  email: string;

  static schema = S.object().prop(
    'email',
    S.string().format('email').required()
  );
}
