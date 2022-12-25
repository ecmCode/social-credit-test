import questions from './questions.json'

// Shuffle an array
export const shuffle = (array) => {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

// Evaluate the total social credit score from Perfection to Failed
export const grade = (score) => {
    switch (true) {
      case (score > 500):
        return "Very well done comrade! With this excellent result you have proven to be absolute loyal to the Glorious Supreme Leader and the Party. Now you are entitled to be the a core member of the Party." 
      case (score < 500 && score >= 300):
        return "Congrats comrade! Although there are some unexpected flaws in your thought, you have complete the test. Keep learning the Party theories and thoughts to be a good citizen."
      case (score < 300 && score >= 100):
        return "You have barely passed the test, comrade. But it is a long way ahead to becoming a valuable citizen."
      case (score < 0):
        return "In spite passing the test, you have seriously failed the Glorious Supreme Leader. You will be sent to the re-education camp in order to fully clean your criminal thought."
      default: break;
    }
}
 

export const questionlist = shuffle(questions.questions)
export const initialScore = 0;
export const loseGameScore = -100;
