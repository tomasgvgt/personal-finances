function errorHandler(){
    return (err, req, res, next) => {
        console.log('______');
        console.log(err.name);
        console.log('______');
        if(err.name === 'ReferenceError') res.status(404).send("Not found");
        if(err.name === 'NotFoundError') res.status(404).send("Not found");
        if(err.name === 'TypeError') res.status(404).send("Not found");
        if(err.name === 'ValidationError') res.status(422).send(err.message);

      }
}

module.exports = errorHandler;