// script for p1.html

// constants
const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

// function to grab values
function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

// the story
let storyText = "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";

// variables to replace pieces of the story
let insertX = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
let insertY = ["the soup kitchen", "Disneyland", "the White House"];
let insertZ = ["spontaneously combusted", "melted into a puddle on the sidewalk", "turned into a slug and crawled away"];


// randomize button
randomize.addEventListener('click', result);

// changes the story
function result() {
  // story items
  let newStory = storyText;

  let xItem = randomValueFromArray(insertX);
  let yItem = randomValueFromArray(insertY);
  let zItem = randomValueFromArray(insertZ);


  // replaces story values
  newStory = newStory.replaceAll(":insertx:", xItem);
  newStory = newStory.replaceAll(":inserty:", yItem);
  newStory = newStory.replaceAll(":insertz:", zItem);

  // allows custom names if one is set
  if(customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replaceAll("Bob", name);
  }

  // switches it between US/UK measurements
  if(document.getElementById("uk").checked) {
     const weight = Math.round(300 * 0.071486) + " stone";
     const temperature =  Math.round((94 - 32) * (5/9)) + " centigrade";
     newStory = newStory.replaceAll("300 pounds", weight);
     newStory = newStory.replaceAll("94 fahrenheit", temperature);
  }

  // displays the new story
  story.textContent = newStory;
  story.style.visibility = 'visible';
}
