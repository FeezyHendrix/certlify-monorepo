import { PartialInstantiable } from '../../../../utils/partial-instantiable';
import {
  Industry,
  Occupation,
} from '../../../../services/user/entities/user.entity';
import S from 'fluent-json-schema';

export class CompleteProfileValidation extends PartialInstantiable<CompleteProfileValidation> {
  first_name: string;
  last_name: string;
  industry: Industry;
  occupation: Occupation;

  static schema = S.object()
    .prop('first_name', S.string().required())
    .prop('last_name', S.string().required())
    .prop('industry', S.string().enum(Object.values(Industry)).required())
    .prop('occupation', S.string().enum(Object.values(Occupation)).required());
}
