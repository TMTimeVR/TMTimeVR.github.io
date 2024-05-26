const jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "Parallel lines have so much in common. It's a shame they'll never meet.",
    "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    "I'm reading a book on anti-gravity. It's impossible to put down!",
    "I told my computer I needed a break. Now it won't stop sending me vacation ads.",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "I'm on a whiskey diet. I've lost three days already!",
    "I'm friends with 25 letters of the alphabet. I don't know why.",
    "I used to play piano by ear, but now I use my hands.",
    "I asked the librarian if the library had any books on paranoia. She whispered, 'They're right behind you!'",
    "I would tell you a joke about UDP, but you might not get it.",
    "Why was the math book sad? Because it had too many problems.",
    "I'm trying to organize a hide and seek competition, but it's difficult to find good players, you know?",
    "Why did the bicycle fall over? Because it was two-tired!",
    "I'm reading a horror story in Braille. Something bad is about to happen... I can feel it.",
    "I told my wife she should embrace her mistakes. She gave me a hug.",
    "Why did the tomato turn red? Because it saw the salad dressing!",
    "I used to be a baker, but I couldn't make enough dough.",
    "Why don't skeletons fight each other? They don't have the guts!",
    "I'm reading a book on the history of glue. I just can't seem to put it down.",
    "I told my wife she was average. She was mean!",
    "Why don't seagulls fly over the bay? Because then they'd be bagels!",
    "What do you call fake spaghetti? An impasta!",
    "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
    "I'm reading a book about anti-gravity. It's impossible to put down!",
    "Why don't some couples go to the gym? Because some relationships don't work out.",
    "I told my wife she was average. She was mean!",
    "I bought some shoes from a drug dealer. I don't know what he laced them with, but I was tripping all day.",
    "Why don't programmers like nature? It has too many bugs.",
    "Why did the scarecrow become a successful neurosurgeon? He was outstanding in his field.",
    "I would tell you a chemistry joke, but I know I wouldn't get a reaction.",
    "What do you get when you cross a snowman with a vampire? Frostbite.",
    "What do you call cheese that isn't yours? Nacho cheese.",
    "Why don't elephants use computers? They're afraid of the mouse.",
    "Why can't your nose be 12 inches long? Because then it would be a foot.",
    "I told my wife she should embrace her mistakes. She gave me a hug.",
    "Why did the tomato turn red? Because it saw the salad dressing!",
    "I'm reading a book on the history of glue. I just can't seem to put it down.",
    "I'm reading a horror story in Braille. Something bad is about to happen... I can feel it.",
    "Why do cows have hooves instead of feet? Because they lactose.",
    "Why don't sharks eat clowns? Because they taste funny.",
    "What did the left eye say to the right eye? Between you and me, something smells.",
    "Why don't scientists trust atoms? Because they make up everything!",
    "What do you call fake spaghetti? An impasta!",
    "I used to play piano by ear, but now I use my hands.",
    "I'm reading a book about anti-gravity. It's impossible to put down!",
    "I'm on a whiskey diet. I've lost three days already!",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "What did one ocean say to the other ocean? Nothing, they just waved.",
    "Why don't seagulls fly over the bay? Because then they'd be bagels!",
    "Why don't some couples go to the gym? Because some relationships don't work out.",
    "What do you call cheese that isn't yours? Nacho cheese.",
    "Why don't programmers like nature? It has too many bugs.",
    "Why did the bicycle fall over? Because it was two-tired!",
    "Why was the math book sad? Because it had too many problems.",
    "Why don't scientists trust atoms? Because they make up everything!",
    "What do you get when you cross a snowman with a vampire? Frostbite.",
    "Why did the scarecrow become a successful neurosurgeon? He was outstanding in his field.",
    "I asked the librarian if the library had any books on paranoia. She whispered, 'They're right behind you!'",
    "Why don't skeletons fight each other? They don't have the guts.",
    "I told my computer I needed a break. Now it won't stop sending me vacation ads.",
    "Why do cows have hooves instead of feet? Because they lactose.",
    "Why don't sharks eat clowns? Because they taste funny.",
    "What did the left eye say to the right eye? Between you and me, something smells.",
    "I bought some shoes from a drug dealer. I don't know what he laced them with, but I was tripping all day.",
    "I would tell you a chemistry joke, but I know I wouldn't get a reaction.",
    "Why can't your nose be 12 inches long? Because then it would be a foot.",
    "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
    "I'm reading a book on the history of glue. I just can't seem to put it down.",
    "Why did the tomato turn red? Because it saw the salad dressing!",
    "Why don't seagulls fly over the bay? Because then they'd be bagels!",
    "What do you call fake spaghetti? An impasta!",
    "Why don't elephants use computers? They're afraid of the mouse.",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "What did one ocean say to the other ocean? Nothing, they just waved.",
    "Why don't programmers like nature? It has too many bugs.",
    "Why don't some couples go to the gym? Because some relationships don't work out.",
    "Why did the bicycle fall over? Because it was two-tired!",
    "What do you call cheese that isn't yours? Nacho cheese.",
    "Why don't scientists trust atoms? Because they make up everything!",
    "What do you get when you cross a snowman with a vampire? Frostbite.",
    "Why did the scarecrow become a successful neurosurgeon? He was outstanding in his field.",
    "I told my computer I needed a break. Now it won't stop sending me vacation ads.",
    "I used to be a baker, but I couldn't make enough dough.",
    "I would tell you a joke about UDP, but you might not get it."
];

function getRandomJoke() {
    return jokes[Math.floor(Math.random() * jokes.length)];
}

function displayJoke() {
    const jokeDisplay = document.getElementById("jokeDisplay");
    jokeDisplay.textContent = getRandomJoke();
}

let countdown = 10;
function updateCountdown() {
    const countdownDisplay = document.getElementById("countdownDisplay");
    countdownDisplay.textContent = `Next joke in ${countdown} seconds...`;
    countdown--;
    if (countdown < 0) {
        countdown = 10;
        displayJoke();
    }
}

displayJoke(); // Display joke immediately on page load
setInterval(updateCountdown, 1000); // Update countdown every second
