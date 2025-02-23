document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
        { name: 'A', id: 1 }, { name: 'A', id: 2 },
        { name: 'B', id: 3 }, { name: 'B', id: 4 },
        { name: 'C', id: 5 }, { name: 'C', id: 6 },
        { name: 'D', id: 7 }, { name: 'D', id: 8 },
    ];

    let firstCard = null;
    let secondCard = null;
    let matchedCards = 0;

    const gameBoard = document.getElementById('game-board');

    // card-

    function shuffleCards() {
        cardArray.sort(() => 0.5 - Math.random());
    }

    function createBoard() {
        shuffleCards();
        cardArray.forEach((card) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.name = card.name;
            cardElement.addEventListener('click', flipCard);
            gameBoard.appendChild(cardElement);
        });
    }

    function flipCard() {
        if (this.classList.contains('flipped') || secondCard) return;

        this.classList.add('flipped');
        this.textContent = this.dataset.name;

        if (!firstCard) {
            firstCard = this;
        } else {
            secondCard = this;
            checkForMatch();
        }
    }

    function checkForMatch() {
        if (firstCard.dataset.name === secondCard.dataset.name) {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            matchedCards += 2;
            resetFlippedCards();
        } else {
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                firstCard.textContent = '';
                secondCard.textContent = '';
                resetFlippedCards();
            }, 1000);
        }

        if (matchedCards === cardArray.length) {
            setTimeout(() => alert('You win!'), 500);
        }
    }

    function resetFlippedCards() {
        firstCard = null;
        secondCard = null;
    }

    document.getElementById('restart').addEventListener('click', () => {
        gameBoard.innerHTML = '';
        matchedCards = 0;
        createBoard();
    });

    createBoard();
});
