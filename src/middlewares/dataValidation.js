function dataValidator(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) next(error);
    next();
  };
}

module.exports = dataValidator;
