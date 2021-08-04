node-backed
A sample node js api for finding cars and accounts for a dealership,its used here to demonstrate the steps to extend API/ML with your own rest api.

Steps
Note
Only rest api with https support can be deployed behind API/ML, make sure to enable https support in your rest api.
This sample express app, has https enabled already.

PART I: Download & Build on local
Method 1: From github

1) Clone the repository, install node packages and verify routes locally
//on local
git clone https://github.com/shruti950/node-backend
cd node-backend
npm install
npm start
Open your local browser and verify the sample-node-api is working by accessing:
http://localhost:9000/
