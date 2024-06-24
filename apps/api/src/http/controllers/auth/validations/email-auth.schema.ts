import { PartialInstantiable } from '../../../../utils/partial-instantiable';
import { S } from 'fluent-json-schema';

export class EmailAuthValidation extends PartialInstantiable<EmailAuthValidation> {
  email: string;
  password: string;

  static schema = S.object()
    .prop('email', S.string().format('email').required())
    .prop('password', S.string().required());
}
