/** 
 This script will sync the version defined in package.json to config.xml use by Cordova
 Why? The app stores and also Mobicontrol mdm needs version numbers to be accurate to update apps
 We want one place to keep this number and package.json is it.
 Only 'npm version patch' is needed to bump the version number in  package.json and this script will set that value automatically in config.xml during
 building
 Joost
**/

var pjson = require('./package.json');
var Config = require('cordova-config');
 
// Load and parse the config.xml 
var config = new Config('config.xml');
config.setVersion(pjson.version);
 
// Write the config file 
config.writeSync();

console.log("Setting version in Cordova's config.xml to: " + pjson.version);
