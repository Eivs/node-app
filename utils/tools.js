/**
 * @desc Checks if it is an empty object
 */
exports.isEmptyObject = obj => Object.keys(obj).length === 0;

/**
 * @desc Regular regular check expressions
 */
exports.validatorsExp = {
  number: /^[0-9]*$/,
  numberAndCharacter: /^[0-9a-zA-Z]+$/,
  nameLength: n => new RegExp(`^[\\u4E00-\\u9FA5]{${n},}$`),
  idCard: /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/,
  backCard: /^([1-9]{1})(\d{15}|\d{18})$/,
  phone: /^1[3456789]\d{9}$/,
  email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
};

/**
 * @desc Regular regular check method
 */
exports.validatorsFun = {
  number: val => exports.validatorsExp.number.test(val),
  numberAndCharacter: val => exports.validatorsExp.numberAndCharacter.test(val),
  idCard: val => exports.validatorsExp.idCard.test(val),
  backCard: val => exports.validatorsExp.backCard.test(val),
};

/**
 * @desc
 * Mongoose only updates the version key when using save().
 * When using update(), findOneAndUpdate(), etc. Mongoose
 * will not update the version key.
 * This plugin provides a workaround to always update the version key.
*/
exports.updateVersionKey = () => {
  const update = this.getUpdate();
  if (update.__v != null) {
    delete update.__v;
  }
  const keys = ['$set', '$setOnInsert'];
  Object.keys(keys).forEach(key => {
    if (update[key] != null && update[key].__v != null) {
      delete update[key].__v;
      if (Object.keys(update[key]).length === 0) {
        delete update[key];
      }
    }
  });
  update.$inc = update.$inc || {};
  update.$inc.__v = 1;
};
