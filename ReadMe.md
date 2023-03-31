## About "pokemon-community-project" 

- This is a Pokemon forum built on the Express.js framework and Mongoose database. Users can create accounts, explore a Pokedex, post in the community forum, and save their favorite Pokemon and posts. pokemon-community-project offers a platform for fans to connect and share their passion.

## Configure the environment

**To configure the environment variables, you'll need to create a .env file and add the necessary variables. Follow these steps:**

- In the project's root directory, create a new file named .env.

- Open the .env file and add the following environment variables:

```
PORT=3000
SESSION_SECRET=<your_session_secret>
CLOUDINARY_NAME=<your_cloudinary_name>
CLOUDINARY_KEY=<your_cloudinary_key>
CLOUDINARY_SECRET=<your_cloudinary_secret>
```

- Replace <your_session_secret>, <your_cloudinary_name>, <your_cloudinary_key>, and <your_cloudinary_secret> with your own values.

- To obtain Cloudinary credentials, you'll need to create an account on the Cloudinary website: https://cloudinary.com/. After signing up, you can find your cloud_name, api_key, and api_secret on the dashboard.

- For the SESSION_SECRET, generate a random, unique string to be used as a secret key for your session cookies. This key helps secure your user sessions and protect against tampering.

- After setting up the environment variables in the .env file, your "pokemon-community-project" app should now be properly configured to run on your local machine.


## run the "Pokemon-community-project" app

**To run the "Pokemon-community-project" app on your computer, follow these instructions:**

- First, ensure you have Node.js installed on your computer. If you don't, download and install it from the official Node.js website: https://nodejs.org/

- Open your preferred terminal or command prompt and navigate to the project's root directory.

- Install the required dependencies by running the following command:

```
npm install
```

- Once the dependencies are installed, start the development server by running:

```
npm run dev
```

- Open your preferred web browser and visit http://localhost:3000 to access the app. 

## Demo
To explore the deployed version of the "Pokemon-community-project" app, simply visit the following link:

Demo: [Pokemon-community-project](https://pokemon-community-project.adaptable.app/)