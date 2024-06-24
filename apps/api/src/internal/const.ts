import { reduce, capitalize } from 'lodash';
import { Industry, Occupation } from '../services/user/entities/user.entity';

export const Industries = reduce(
  Industry,
  (accumulator, val) => {
    let display_name = capitalize(val);

    if (val === Industry.NON_PROFIT) {
      display_name = display_name
        .replace('_', '-')
        .split('-')
        .map((syl) => capitalize(syl))
        .join('-');
    }

    accumulator.push({
      value: val,
      display_name,
    });

    return accumulator;
  },
  []
);

export const OccupationList = reduce(
  Occupation,
  (accumulator, val) => {
    accumulator.push({
      value: val,
      display_name: capitalize(val),
    });

    return accumulator;
  },
  []
);
