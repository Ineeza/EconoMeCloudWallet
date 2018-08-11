# EconoMe Cloud Wallet

[![CircleCI](https://circleci.com/gh/Ineeza/EconoMeCloudWallet.svg?style=svg)](https://circleci.com/gh/Ineeza/EconoMeCloudWallet)

## Requirements
```
Node v8.11.3 (LTS)
```

## Getting Started
### PostgreSQL on Docker
```
POSTGRES_PORT=5432 ./bin/postgresql_on_docker
psql -h localhost -U postgres
```

### Create database and tables
```
psql -U postgres web_wallet < init.sql
```

#### Get generated login password
In project directory run node
```
const bcrypt = require('bcrypt')
const pass = 'you password goes here'
const saltRounds = 10
bcrypt.hashSync(pass, saltRounds)
```

### Development Mode
```
yarn 
yarn dev
```

### Production Mode
```
yarn build 
yarn start
```

## Testing
```
npm i mocha --save-dev
npm test

or
mkdir junit
MOCHA_FILE=junit/test-results.xml npm run test-report
```
