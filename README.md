[![CircleCI](https://circleci.com/gh/Ineeza/EconoMeCloudWallet.png?style=shield&circle-token=9015a64658bf6efb3602cddbf2eae547456731c3)](https://circleci.com/gh/Ineeza/EconoMeCloudWallet)

# EconoMe Cloud Wallet

## Requirements
```
Node v8.11.4 (LTS)
```

## Getting Started
### PostgreSQL on Docker
```
POSTGRES_PORT=5432 ./bin/postgresql_on_docker
psql -h localhost -U postgres
```

### Create database and tables
```
createdb -U postgres econome
psql -U postgres econome < init.sql
```

### Genarate models from database
```
npm install -g pg@6.4.2 pg-hstore
sequelize-auto -o "./backend/model" -d econome -h localhost -u postgres -p 5432 -e postgres
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
yarn install --development
yarn dev
```

### Production Mode
```
yarn install --production
yarn build 
ECW_ENV=<environment name> yarn start
```

## Testing
```
npm i mocha --save-dev
npm test

or
mkdir junit
MOCHA_FILE=junit/test-results.xml npm run test-report
```
