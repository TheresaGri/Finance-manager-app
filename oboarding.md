Our project has the following folder structure

backend
data - where all the data is stored
routes - where our server side code and endpoints for our transactions and categories are (GET, POST, PATCH, DELETE)
server.js - the central hub of our backend where the server and routes are set up

frontend
src - central folder of our application
src/api - where our api calls are stored
src/assets - where images and other potential assets are stored
src/components - where our generic components (Button, Text, Input etc.) is stored
src/features - where all the features of our application are stored
src/features/createCategory - where our component for creating a new category and css for our transactions is stored
src/features/createTransaction - where our component for creating a new transaction and css is stored
src/features/editTransaction - where our component for editing a transaction and css is stored
src/features/pieChart - where the logic of our pie chart is stored
src/features/statistics - where our logic for sum of all expenses/income is stored
src/features/transaction - where our transaction component is stored
src/features/transaction list - central hub of our frontend where all features and components are orchestrated
src/util - where our utility (types) is stored