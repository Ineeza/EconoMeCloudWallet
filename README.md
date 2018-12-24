[![CircleCI](https://circleci.com/gh/Ineeza/EconoMeCloudWallet.png?style=shield&circle-token=9015a64658bf6efb3602cddbf2eae547456731c3)](https://circleci.com/gh/Ineeza/EconoMeCloudWallet)

# EconoMe Cloud Wallet

## Requirements
```
Node: 8.14.1 (LTS)
Yarn: 1.12.3
npm: 6.4.1
```

## Getting Started
### PostgreSQL on Docker
```
POSTGRES_PORT=5432 ./bin/postgresql_on_docker
psql -h localhost -U postgres
```

### Create initial database and tables
```
createdb -U postgres econome
psql -U postgres econome < db/V1__Init.sql
```

### Genarate models from database
```
npm install -g pg@6.4.2 pg-hstore
sequelize-auto -o "./backend/model" -d econome -h localhost -u postgres -p 5432 -e postgres
```
If you want generate specific model from table,
```
sequelize-auto -o "./backend/model" -d econome -h localhost -u postgres -p 5432 -e postgres -t [tableName]
```

### Local Development mode
```
yarn
yarn local
```

### Testing

#### Check flow types
```
yarn global add flow-typed
flow-typed install
yarn flow
```

#### Create database for test
```
createdb -U postgres test_econome
psql -U postgres test_econome < db/V1__Init.sql
```

#### Run test
```
yarn test
```

### Production Mode
```
yarn install --production
yarn build
ECW_ENV=<environment name> yarn start
```

