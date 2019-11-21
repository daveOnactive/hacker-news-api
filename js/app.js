// fetch ids of top story from the api using the fetch api and async await and return only first 30 ids using the splice method
const getNewsIds = async () => {
  const endPoint = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty';
  const response = await fetch(endPoint);
  const data = await response.json();
  return data.splice(0, 30);
}

// these function will return story of any id pass as an argument using the fetch api and async await
const getNews = async (id) => {
  const endPoint = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;
  const response = await fetch(endPoint);
  const data = await response.json();
  return data;
}

// these function will return the structure of the each story using the parameters passed to it
const paintDom = (data, num) => {
  const element = `
  <div class="wrapper">
    <span class="numb">${num}.</span>
    <div class="news">
      <div class="heading">
        <i class="fas fa-caret-up"></i>
        <a href="${data.url}"<h3>${data.title}</h3></a>
      </div>
      <div class="comment">
        <p>${data.score} Points by ${data.by} 27 minutes ago | hide | ${data.descendants} comment</p>
      </div>
    </div>
  </div>`;

  return element;
}

// get the container element form the dom
const container = document.querySelector('.container');
// these a variable that will display number of each story
let num = 0;

//called the getNewsIds function that will return first 30 ids of each element
getNewsIds()
// resolve the promise and get the data(because these it a asynchronous function)
.then(data => {
  // loop the data that contains an array of 30 ids
   data.forEach((id) => {
     //called the getNews function that will return story of each id passed to it
     getNews(id)
     // resolve the promise and get the data(because these it a asynchronous function)
     .then(data => {
       // called the paintDom function that will return the structure of the each story using the parameters passed to it, which are the data from the getNews function and the num variables
       let content = paintDom(data, num += 1);

       // create a div element that we will assign the element which the paintDom function will return
       let news = document.createElement('div');
       news.innerHTML = content;

       // append the div element to the container element
       container.appendChild(news);
     })
   })
})