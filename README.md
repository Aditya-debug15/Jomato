# Food Ordering portal

It has separate a common login portal for buyers and vendors, the buyer can see the available shops and their food items. The buyer can search based on an item name, can search on based upon food type (Veg / Non Veg) and price range.
**Fuzzy search has been implemented**
Buyer can also see its order, they can also add food items to their favourites and can view them later

On the other hand vendor can see their food items, edit them and can see the who all have ordered to their shop, have buttons to change the status. 

**Email response is sent to the buyer upon order acception and rejection**. On order being placed amout is deducted from the wallet and upon rejection amount is refunded back

**The website is deployed on Heroku**

Backend https://jomato69.herokuapp.com/

Frontend jomato69.surge.sh

# MERN Stack Boilerplate

## Installations

### Node

* For Linux:
```
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
```

* For Mac:
```
brew install node
```

### MongoDB

Install the community edition [here](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials).


### React

```
npm install -g create-react-app
```

* To create a new React app:
```
create-react-app name_of_app
```

* To run the app, cd into the directory and do:
```
npm start
```

## Running the boilerplate

* Run Mongo daemon:
```
sudo mongod
```
Mongo will be running on port 27017.


* Run Express Backend:
```
cd backend/
npm install
npm start
```

* Run React Frontend:
```
cd frontend
npm install/
npm start
```

Navigate to [http://localhost:3000/](http://localhost:3000/) in your browser.

