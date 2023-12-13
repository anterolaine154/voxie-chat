// Filename: complexCode.js
// Description: This code demonstrates various sophisticated programming techniques and concepts in JavaScript.

'use strict';

// Import required modules
const fs = require('fs');
const https = require('https');
const readline = require('readline');

// Declare global variables
let counter = 0;
let isRunning = false;
let data = [];

// Define custom classes
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}

class Calculator {
  static add(a, b) {
    return a + b;
  }

  static multiply(a, b) {
    return a * b;
  }
}

// Define complex functions
function fetchData(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        resolve(body);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function handleData() {
  try {
    console.log(`Fetching data from external API...`);
    const responseBody = await fetchData('https://api.example.com/data');
    data = JSON.parse(responseBody);
    console.log(`Data fetched successfully!`);
  } catch (err) {
    console.error('Error fetching data:', err);
  }
}

function startProcessing() {
  isRunning = true;
  console.log('Processing started.');

  const interval = setInterval(() => {
    counter++;
    console.log(`Counter: ${counter}`);

    if (counter >= 10) {
      clearInterval(interval);
      isRunning = false;
      console.log('Processing stopped.');
    }
  }, 1000);
}

// Main program logic
function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(`Welcome to the complex code example!`);

  rl.question(`What is your name? `, (name) => {
    rl.question(`How old are you? `, (age) => {
      const person = new Person(name, age);
      person.sayHello();
      
      console.log(`Let's perform some calculations:`);
      console.log(`3 + 5 = ${Calculator.add(3, 5)}`);
      console.log(`4 * 7 = ${Calculator.multiply(4, 7)}`);

      handleData();
      startProcessing();

      rl.close();
    });
  });
}

// Entry point
main();