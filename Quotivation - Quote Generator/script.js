const quotes = [
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson", category: "Motivation" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill", category: "Perseverance" },
  { text: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis", category: "Inspiration" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", category: "Motivation" },
  { text: "Your time is limited, so don’t waste it living someone else’s life.", author: "Steve Jobs", category: "Life" },
  { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown", category: "Motivation" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela", category: "Perseverance" },
  { text: "Great things never come from comfort zones.", author: "Unknown", category: "Inspiration" },
  { text: "Dream it. Wish it. Do it.", author: "Unknown", category: "Motivation" },
  { text: "Stay focused and never give up.", author: "Unknown", category: "Perseverance" }
];

const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const heart = document.getElementById('heart');

let currentCategory = null;
let currentQuote = null;
const favorites = new Set();

function createCategorySelector() {
  const categories = ["All", ...new Set(quotes.map(q => q.category))];

  const overlay = document.createElement('div');
  overlay.id = 'category-overlay';
  Object.assign(overlay.style, {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'linear-gradient(-45deg, #ff9a9e, #fad0c4, #a18cd1, #fbc2eb)',
    backgroundSize: '400% 400%',
    animation: 'gradientBG 15s ease infinite',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    color: '#fff',
    fontFamily: "'Segoe UI', sans-serif",
    textAlign: 'center',
    padding: '2rem',
  });

  const prompt = document.createElement('h2');
  prompt.textContent = 'Select Quote Category';
  prompt.style.marginBottom = '1.5rem';
  prompt.style.fontSize = '2rem';

  const buttonsContainer = document.createElement('div');
  buttonsContainer.style.display = 'flex';
  buttonsContainer.style.gap = '1rem';
  buttonsContainer.style.flexWrap = 'wrap';
  buttonsContainer.style.justifyContent = 'center';

  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.textContent = cat;
    Object.assign(btn.style, {
      background: '#fff',
      color: '#222',
      fontWeight: 'bold',
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'background 0.3s',
      userSelect: 'none',
      minWidth: '120px'
    });
    btn.addEventListener('mouseenter', () => btn.style.background = '#f0f0f0');
    btn.addEventListener('mouseleave', () => btn.style.background = '#fff');

    btn.addEventListener('click', () => {
      currentCategory = cat;
      document.body.removeChild(overlay);
      showQuote();
      document.querySelector('main.card').style.display = 'block';
    });

    buttonsContainer.appendChild(btn);
  });

  overlay.appendChild(prompt);
  overlay.appendChild(buttonsContainer);
  document.body.appendChild(overlay);
}

function showQuote() {
  if (!currentCategory) return;

  const filteredQuotes = currentCategory === "All"
    ? quotes
    : quotes.filter(q => q.category === currentCategory);

  if (filteredQuotes.length === 0) {
    quoteText.textContent = "No quotes found for this category.";
    quoteAuthor.textContent = "";
    heart.classList.remove('favorited');
    return;
  }

  const index = Math.floor(Math.random() * filteredQuotes.length);
  currentQuote = filteredQuotes[index];

  quoteText.style.opacity = 0;
  quoteAuthor.style.opacity = 0;
  heart.classList.remove('favorited');

  setTimeout(() => {
    quoteText.textContent = `${currentQuote.text}`;
    quoteAuthor.textContent = `– ${currentQuote.author}`;
    quoteText.style.opacity = 1;
    quoteAuthor.style.opacity = 1;

    if (favorites.has(currentQuote.text)) {
      heart.classList.add('favorited');
    } else {
      heart.classList.remove('favorited');
    }
  }, 300);
}

heart.addEventListener('click', () => {
  if (!currentQuote) return;
  if (favorites.has(currentQuote.text)) {
    favorites.delete(currentQuote.text);
    heart.classList.remove('favorited');
  } else {
    favorites.add(currentQuote.text);
    heart.classList.add('favorited');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('main.card').style.display = 'none';
  createCategorySelector();
  setInterval(() => {
    if (currentCategory) showQuote();
  }, 5000);
});
