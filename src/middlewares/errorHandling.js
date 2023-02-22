function errorHandler(){
    return (err, req, res, next) => {
        if(err.name === 'ReferenceError') res.status(404).send("Not found");
        if(err.name === 'SequelizeForeignKeyConstraintError') res.status(403).send("Cant fulfill request");
        if(err.name === 'NotFoundError') res.status(404).send("Not found");
        if(err.name === 'TypeError') res.status(404).send("Not found");
        if(err.name === 'ValidationError') res.status(422).send(err.message);
        if(err.name === 'UnauthorizedError') res.status(401).send(err.message);
        if(err.name === 'SequelizeUniqueConstraintError') res.status(401).send("The username alread exists");
      }
}

module.exports = errorHandler;