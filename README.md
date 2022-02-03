## TEAM WAY REST API

### Getting Started

Clone this repository

### Run

Install dependencies: 
```shell
npm install
```

Start MongoDB: 
```shell
sudo systemctl start mongod
```

Verify that MongoDB has started successfully: 
```shell
sudo systemctl status mongod
```

Start our application: 
```shell
node index.js
```

### Test Via Swagger

Note: If you dont want authentication to be enabled set DEV_APP_REQUIRES_AUTH to true in the .env file

http://localhost:5000/api-docs

### Unit/Integration Test

`npm run test`
