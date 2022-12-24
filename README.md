
# ReChat 
- Chat Application using ReactJS and Firebase






## Login

To login
try email :

- `test1@gmail.com` Name: Bill
- `test2@gmail.com` Name: Cleo
- `test3@gmail.com` Name: Rohan
- `test4@gmail.com` Name: Ryan
- `test5@gmail.com` Name: Alice
  and password as `123456`


## How it is stored on Database ?

- `users` to store detail of each user `{displayName,email,photoURL,uniqueID}`
- `userChats` to store detail of each user conversation with other user  `uid=[{combinedID,date,userInfo={displayName,photoURL,uid}}]`
- `chats` to store text messages between two users `combinedID={messages=[{text,SenderID,date}]}`
## Tech Stack

* **Client:** ReactJS, Redux , Hooks
* **Database:** Firebase



## Deployment

Deployed on Vercel

Link to Website : https://rechats.vercel.app/



## Running Locally
### Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
