import {Validator, Pattern} from './base';

export const isRequired = (errMsg, required = true) => {
  var validator = new Validator('required', required, errMsg);
  validator.evaluate = (value) => {
    let required = Validator.prototype.evaluate.call(validator, value);
    return !required || (value != undefined && value != '' && /.+/.test(value));
  }
  return validator;
}

export const isNumber = (errMsg) => {
  return new Pattern(/^\d+$/, errMsg);
}

export const isString = (errMsg) => {
  return new Pattern(/^\D+$/, errMsg);
}

export const isEmail = (errMsg) => {
  return new Pattern(/^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/, errMsg);
}

export const length = (strlength, errMsg) => {
  var validator = new Validator('length', strlength, errMsg);
  validator.evaluate = (value) => {
    return value && value.length >= validator.expression;
  }
  return validator;
}

export const range = (errMsg, ...range) => {
  range = range.reduce((prev, cur) => prev.concat(cur), []);
  if (!(range.constructor === Array && range.length === 2 && range[0] < range[1]))
    throw new TypeError('Invalid type for range, it should be array')
  var validator = new Validator('range', range, errMsg);
  validator.evaluate = (value) => {
    return value && value >= validator.expression[0] && value <= validator.expression[1];
  }
  return validator;
}

//the same as reserved keyword 'enum', 'options' is an array of possible values
//and the value to be evaluated should be one of enum
export const options = (errMsg, ...options) => {
  options = options.reduce((prev, cur) => prev.concat(cur), []);
  var validator = new Validator('options', options, errMsg);
  validator.evaluate = (value) => {
    return value && validator.expression.indexOf(value) !== -1;
  }
  return validator;
}

//with this validator, you can provide your customized regexp for mathc whatever you want
export const match = (regExp, errMsg) => {
  return new Pattern(regExp, errMsg);
}