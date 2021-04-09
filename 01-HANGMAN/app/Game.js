import { Quote } from './Quote.js';

class Game {


  currentStep = 0;
  lastStep = 7;
  quotes = [
    {
      text: 'pan tadeusz',
      category: 'utwór literacacki'
    },
    {
      text: 'janko muzykant',
      category: 'utwór literacacki'
    },
    {
      text: 'akademia pana kleksa',
      category: 'film'
    },
    {
      text: 'gra o tron',
      category: 'film'
    },
    {
      text: 'ogniem i mieczem',
      category: 'film'
    },
  ]

  constructor({ lettersWrapper, categoryWrapper, wordWrapper, outputWrapper, playAgainButton }) {
    this.lettersWrapper = lettersWrapper
    this.categoryWrapper = categoryWrapper
    this.wordWrapper = wordWrapper
    this.outputWrapper = outputWrapper

    const { text, category } = this.quotes[Math.floor(Math.random() * this.quotes.length)]
    this.category = category
    this.quote = new Quote(text);
  }

  guess(letter, event) {
    event.target.disabled = true;
    if (this.quote.guess(letter)) {
      this.drawQuote()
    } else {
      this.currentStep++
      document.getElementsByClassName('step')[this.currentStep].style.opacity = 1;
      console.log(this.currentStep);
      if (this.currentStep === this.lastStep) {
        this.loosing()
      }
    }
  }

  drawLetters() {
    for (let i = 10; i < 36; i++) {
      const label = i.toString(36)
      const button = document.createElement('button')
      button.innerHTML = label
      button.addEventListener('click', event => this.guess(label, event))
      this.lettersWrapper.appendChild(button)
    }
  }

  drawQuote() {
    const content = this.quote.getContent();
    this.wordWrapper.innerHTML = content
    if (!content.includes('_')) {
      this.winning()
    }
  }

  drawCategory() {
    this.categoryWrapper.innerHTML = this.category
  }
  start() {
    document.getElementsByClassName('step')[this.currentStep].style.opacity = 1;
    this.drawLetters()
    this.drawQuote()
    this.drawCategory()
  }

  winning() {
    this.wordWrapper.innerHTML = 'GRATULACJE! WYGRYWASZ! KONIEC GRY :)'
    this.lettersWrapper.innerHTML = ''
  }

  loosing() {
    this.wordWrapper.innerHTML = 'NIESTETY PRZEGRYASZ! TO KONIEC GRY :)'
    this.lettersWrapper.innerHTML = ''
  }
}

const game = new Game({
  lettersWrapper: document.getElementById('letters'),
  categoryWrapper: document.getElementById('category'),
  wordWrapper: document.getElementById('word'),
  outputWrapper: document.getElementById('output'),
})
game.start()

