async function getNewQuote() {
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const loading = document.getElementById('loading');
    const button = document.getElementById('new-quote-btn');
    
    button.disabled = true;
    loading.style.display = 'block';
    quoteText.textContent = '';
    quoteAuthor.textContent = '';
    
    try {
        const response = await fetch('/api/quote');
        if (!response.ok) {
            throw new Error('Failed to fetch quote');
        }
        const quote = await response.json();
        
        quoteText.textContent = quote.text;
        quoteAuthor.textContent = quote.author;
    } catch (error) {
        quoteText.textContent = 'Sorry, something went wrong. Please try again.';
        quoteAuthor.textContent = '';
        console.error('Error fetching quote:', error);
    } finally {
        loading.style.display = 'none';
        button.disabled = false;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    getNewQuote();
});

