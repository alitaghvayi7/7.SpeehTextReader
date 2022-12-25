

const data = [
    {
        image: './img/drink.jpg',
        text: "I'm Thirsty"
    },
    {
        image: './img/food.jpg',
        text: "I'm Hungry"
    },
    {
        image: './img/tired.jpg',
        text: "I'm Tired"
    },
    {
        image: './img/hurt.jpg',
        text: "I'm Hurt"
    },
    {
        image: './img/happy.jpg',
        text: "I'm Happy"
    },
    {
        image: './img/angry.jpg',
        text: "I'm Angry"
    },
    {
        image: './img/sad.jpg',
        text: "I'm Sad"
    },
    {
        image: './img/scared.jpg',
        text: "I'm Scared"
    },
    {
        image: './img/outside.jpg',
        text: 'I Want To Go Outside'
    },
    {
        image: './img/home.jpg',
        text: 'I Want To Go Home'
    },
    {
        image: './img/school.jpg',
        text: 'I Want To Go To School'
    },
    {
        image: './img/grandma.jpg',
        text: 'I Want To Go To Grandmas'
    }
];


const mainElement = document.querySelector('main');
const toggleButton = document.querySelector('#toggle');
const textBox = document.querySelector('#text-box');
const closeBoxButton = document.querySelector('#close');
const selectVoiceBox = document.querySelector('#voices');
const speechText=document.querySelector('#text');
const readTextElement = document.querySelector('#read');

const synth = window.speechSynthesis;
const utterThis = new SpeechSynthesisUtterance();
let voices = null;

window.addEventListener('load', createItems);
toggleButton.addEventListener('click', toggleTextBox);
closeBoxButton.addEventListener('click', toggleTextBox);
selectVoiceBox.addEventListener('change', changeGlobalVoice)



function generateVoices() {
    voices = synth.getVoices();
    for (let i = 0; i < voices.length; i++) {
        const option = document.createElement('option');
        option.textContent = voices[i].lang + voices[i].name;
        option.value = i;

        if (voices[i].default) {
            option.textContent += ' — DEFAULT';
        }
        selectVoiceBox.appendChild(option);
    }
}

function changeGlobalVoice() {
    const text = speechText.value.trim() || "Hello";
    utterThis.text = text;
    utterThis.voice = voices[event.target.value];
    synth.speak(utterThis)

}


function toggleTextBox() {
    textBox.classList.toggle('show')
}

function createBox(boxItem) {
    const box = document.createElement('div');
    box.className = 'box';
    const { image, text } = boxItem;

    const imageElement = document.createElement('img');
    imageElement.setAttribute('src', image);

    const textElement = document.createElement('p');
    textElement.className = 'info';
    textElement.textContent = text;

    box.appendChild(imageElement);
    box.appendChild(textElement);

    mainElement.appendChild(box);

    box.addEventListener('click',getText)

}
function getText(){
    const text= event.currentTarget.querySelector('p').textContent;
    utterThis.text = text;
    synth.speak(utterThis)
}

function createItems() {
    data.forEach(singleData => createBox(singleData));
    generateVoices();
}

