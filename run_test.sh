#! /bin/bash

export NODE_ENV=test

npx -y sequelize-cli db:drop
npx -y sequelize-cli db:create
npx sequelize-cli db:migrate
# npx sequelize-cli db:seed:all
npm test