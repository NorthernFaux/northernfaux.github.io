// script for p2.html

const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames and alternative text */
const imageInfo = [["pic1.jpg", "A butterfly on a leaf"], ["pic2.jpg", "Closeup of a human eye"], ["pic3.jpg", "Rock that looks like a wave"], ["pic4.jpg", "Purple and white flowers"], ["pic5.jpg", "Ancient Egyptian artwork in a tomb"]]

/* Looping through images */

const newImage = document.createElement('img');
newImage.setAttribute('src', xxx);
newImage.setAttribute('alt', xxx);
thumbBar.appendChild(newImage);

/* Wiring up the Darken/Lighten button */
