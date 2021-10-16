
const quoteContainer=document.getElementById('quote-container')
const quoteText=document.getElementById('quote')
const authorText=document.getElementById('author')
const twitterBtn=document.getElementById('twitter')
const newQuoteBtn=document.getElementById('new-quote')
const loader=document.getElementById('loader')
let apiQuotes=[]
// Show loading
function loading(){
    loader.hidden=false
    quoteContainer.hidden=true
}

// Hide loading

function complete(){
    quoteContainer.hidden=false
    loader.hidden=true
}
//  Show new quote

function newQuote(){
    loading()
    // Pick a random quote from api quots array

    const quote=apiQuotes[Math.floor(Math.random() *apiQuotes.length)]
    // check if author field is blank and replace it with quote unknown
    if(!quote.author){
        authorText.textContent='Unknown'
    }else{

        authorText.textContent=quote.author
    }
    //gggg
    //Check code length to determine the styling
    if(quote.text.length>120){
        quoteText.classList.add('long-quote')
    }else{
        quoteText.classList.remove('long-quote')

    }
    quoteText.textContent=quote.text

    complete()
}
// Get quotes from API
async function getQuote(){
    loading()
    const apiUrl='https://type.fit/api/quotes'
    try {
      const response=await fetch(apiUrl) 
      apiQuotes= await response.json() 

      newQuote()
    } catch (error) {
        // Catch Error her
    }
}

// tweet a code

function tweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`

    window.open(twitterUrl, '_blank')
}

//Event listeners

newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// onload
getQuote()
