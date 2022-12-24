#! /bin/bash

export NODE_ENV=test

npx -y sequelize-cli db:drop
npx -y sequelize-cli db:create
npx -y sequelize-cli db:migrate
npx -y sequelize-cli db:seed:all

jest --detectOpenHandles
