function dataValidator(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    // console.log({ error });
    if (error) next(error);
    next();
  };
}

module.exports = dataValidator;
