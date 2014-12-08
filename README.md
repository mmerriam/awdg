## Quick Start

- Install [requirements](#requirements)
- Clone the repo
- Install [dependencies](#dependencies)
- Start app via `grunt` (if you need to work on the theme, also recomended) or `npm start`
     
        npm install
        bower install      
        grunt develop #or npm start
 
 - head over to [http://localhost:2934](http://localhost:2934) 


**all `npm start` does is run nodemon :thumbsup:

## Requirements 
- Install [Nodejs](http://nodejs.org/)
- Install Mongodb (optional) - You can get one up and running quickly over at [mongolab](https://mongolab.com/)

## Dependencies
You need nodemon, grunt and bower
- Install nodemon, grunt and bower globally 

         npm install -g bower grunt nodemon

##  Configuring your dev environment

Rename the `.env.sample` file to `.env` to change/add your own keys for **MongoDb**, **Mailchimp**, **Mandrill**, **Stripe**  and **Meetup**.

## Documentation
For project requirements head over to the awdg.org [wiki](https://github.com/AWDG/awdg.org/wiki)
