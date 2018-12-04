/* eslint-disable no-loop-func */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-destructuring */

// import render from './render';
const render = require('./render.js');

render();

const block = document.querySelector('.search-result-block .searched-videos');
const button = document.querySelector('.search-block .search-button');
const outBlock = document.querySelector('.video-block .output-video-block iframe');
const searchInput = document.querySelector('.search-block .search-input');
const pageRight = document.querySelector('.page-switcher .page-right');
const pageLeft = document.querySelector('.page-switcher .page-left');
const numberOfPages = document.querySelector('.page-switcher .current-page');

const baseUrl = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyC0vey-MWqac8d52xu5VWF1r6q3e59xI0Q&type=video&part=snippet&maxResults=16';
const baseSUrl = 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyC0vey-MWqac8d52xu5VWF1r6q3e59xI0Q&id=';
let Url;

let bufferedVideos = [];
let pages = [];
// eslint-disable-next-line no-unused-vars
let loadedCount = 0;
let nextPageToken = '';
let lastSearch;
let currentPage = 0;
let lastWindowSizeIndex = 0;

function load() {
  Url = `${baseUrl}&pageToken=${nextPageToken}&q=${lastSearch}`;
  fetch(Url)
    .then(res => res.text())
    .then((res) => {
      const answer = JSON.parse(res);

      nextPageToken = answer.nextPageToken;

      for (let loadQuerry = 0; loadQuerry < 16; loadQuerry += 1) {
        const card = {};

        card.imageSource = answer.items[loadQuerry].snippet.thumbnails.medium.url;
        card.channelTitle = answer.items[loadQuerry].snippet.channelTitle;
        card.videoDescription = answer.items[loadQuerry].snippet.description;
        card.videoTitle = answer.items[loadQuerry].snippet.title;
        card.publishedTime = answer.items[loadQuerry].snippet.publishedAt;
        card.videoId = answer.items[loadQuerry].id.videoId;

        Url = `${baseSUrl + card.videoId}&part=snippet,statistics`;

        fetch(Url)
          .then(inres => inres.text())
          .then((inres) => {
            const inanswer = JSON.parse(inres);
            card.viewCount = inanswer.items[0].statistics.viewCount;
            card.likeCount = inanswer.items[0].statistics.likeCount;
            card.dislikeCount = inanswer.items[0].statistics.dislikeCount;

            bufferedVideos.push(card);
          });

        loadedCount += 1;
      }
    });
}

function search() {
  pageRight.addEventListener('click', nextPage);
  pageLeft.addEventListener('click', prevPage);
  window.addEventListener('resize', resize);
  bufferedVideos = [];
  pages = [];
  currentPage = 0;
  lastWindowSizeIndex = 0;

  lastSearch = searchInput.value;
  Url = `${baseUrl}&pageToken=${nextPageToken}&q=${searchInput.value}`;
  fetch(Url)
    .then(res => res.text())
    .then((res) => {
      const answer = JSON.parse(res);
      nextPageToken = answer.nextPageToken;
      answer.kind = answer.nextPageToken;
      for (let loadQuerry = 0; loadQuerry < 16; loadQuerry += 1) {
        const card = {};

        card.imageSource = answer.items[loadQuerry].snippet.thumbnails.medium.url;
        card.channelTitle = answer.items[loadQuerry].snippet.channelTitle;
        card.videoDescription = answer.items[loadQuerry].snippet.description;
        card.videoTitle = answer.items[loadQuerry].snippet.title;
        card.publishedTime = answer.items[loadQuerry].snippet.publishedAt;
        card.videoId = answer.items[loadQuerry].id.videoId;

        Url = `${baseSUrl + card.videoId}&part=snippet,statistics`;
        fetch(Url)
          .then(inres => inres.text())
          .then((inres) => {
            const inanswer = JSON.parse(inres);
            card.viewCount = inanswer.items[0].statistics.viewCount;
            card.likeCount = inanswer.items[0].statistics.likeCount;
            card.dislikeCount = inanswer.items[0].statistics.dislikeCount;
            bufferedVideos.push(card);
          });

        loadedCount += 1;
      }
      setTimeout(() => {
        resize();
      }, 1000);
      setTimeout(() => {
        mark();
      }, 1050);
    });
}

function cleanSearchBlock() {
  while (block.firstChild) {
    block.removeChild(block.firstChild);
  }

  while (numberOfPages.firstChild) {
    numberOfPages.removeChild(numberOfPages.firstChild);
  }
}

function createPages(size) {
  const pagesCount = Math.ceil(bufferedVideos.length / size);
  pages = [];

  let placed = 0;
  for (let i = 0; i < pagesCount; i += 1) {
    pages[i] = [];
    for (let j = 0; j < size; j += 1) {
      if (placed < bufferedVideos.length) {
        pages[i].push(bufferedVideos[placed]);
        placed += 1;
      }
    }
  }
  return pages.length;
}

function renderPage(number, type) {
  const PageItem = document.createElement('div');
  PageItem.className = 'searched-page';

  let item = block.lastElementChild;

  const urlVideoBase = 'https://www.youtube.com/embed/';
  for (let i = 0; i < pages[number].length; i += 1) {
    item = document.createElement('div');
    item.className = 'searched-video';

    let innerItem = document.createElement('img');
    innerItem.src = pages[number][i].imageSource;
    innerItem.className = 'image';
    item.appendChild(innerItem);

    innerItem = document.createElement('div');
    innerItem.textContent = pages[number][i].videoTitle;
    innerItem.className = 'title';
    item.appendChild(innerItem);

    const info = `${urlVideoBase + pages[number][i].videoId}___${pages[number][i].channelTitle}___${
      pages[number][i].videoDescription
    }___${pages[number][i].videoTitle}___${pages[number][i].publishedTime}___${
      pages[number][i].viewCount
    }___${pages[number][i].likeCount}___${pages[number][i].dislikeCount}`;
    item.alt = info;
    item.addEventListener('click', select);
    PageItem.appendChild(item);
  }
  if (type === 'after') {
    block.appendChild(PageItem);
  }
  if (type === 'before') {
    block.insertBefore(PageItem, block.firstChild);
  }
}

function nextPage() {
  lastWindowSizeIndex = 0;
  currentPage += 1;
  if (currentPage >= pages.length - 1) {
    currentPage = pages.length - 1;
    load();
    renderPage(currentPage, 'after');
    scrollToElement(
      document.querySelector('.search-result-block .searched-videos').lastElementChild,
      1,
    );
    setTimeout(() => {
      resize();
    }, 1000);
  } else {
    renderPage(currentPage, 'after');
    scrollToElement(
      document.querySelector('.search-result-block .searched-videos').lastElementChild,
      1,
    );
    setTimeout(() => {
      resize();
    }, 500);
  }
}

function prevPage() {
  lastWindowSizeIndex = 0;
  if (currentPage !== 0) {
    currentPage -= 1;
    renderPage(currentPage, 'before');
    scrollToElement(
      document.querySelector('.search-result-block .searched-videos').lastElementChild,
      0,
    );
    scrollToElement(
      document.querySelector('.search-result-block .searched-videos').firstElementChild,
      1,
    );
    setTimeout(() => {
      resize();
    }, 500);
  }
}

function scrollToElement(theElement, par) {
  let selectedPosX = 0;
  let selectedPosY = 0;
  let Elem = theElement;

  while (Elem != null) {
    selectedPosX += Elem.offsetLeft;
    selectedPosY += Elem.offsetTop;
    Elem = Elem.offsetParent;
  }

  if (par === 1) {
    const pos = {
      behavior: 'smooth',
    };
    pos.left = selectedPosX;
    pos.top = selectedPosY;
    block.scrollTo(pos);
  } else block.scrollTo(selectedPosX, selectedPosY);
}

function resize() {
  if (currentPage < 0) currentPage = 0;

  if (document.body.clientWidth > 1000 && lastWindowSizeIndex !== 1) {
    cleanSearchBlock();
    mark();
    lastWindowSizeIndex = 1;
    createPages(8);

    if (currentPage >= pages.length) {
      currentPage = pages.length - 1;
    }
    renderPage(currentPage, 'after');
  } else if (
    document.body.clientWidth > 800
    && document.body.clientWidth < 1000
    && lastWindowSizeIndex !== 2
  ) {
    cleanSearchBlock();
    mark();
    lastWindowSizeIndex = 2;
    createPages(6);

    if (currentPage >= pages.length) {
      currentPage = pages.length - 1;
    }
    renderPage(currentPage, 'after');
  } else if (
    document.body.clientWidth > 730
    && document.body.clientWidth < 800
    && lastWindowSizeIndex !== 3
  ) {
    cleanSearchBlock();
    mark();
    lastWindowSizeIndex = 3;
    createPages(4);

    if (currentPage >= pages.length) {
      currentPage = pages.length - 1;
    }
    renderPage(currentPage, 'after');
  } else if (
    document.body.clientWidth > 550
    && document.body.clientWidth < 730
    && lastWindowSizeIndex !== 4
  ) {
    cleanSearchBlock();
    mark();
    lastWindowSizeIndex = 4;
    createPages(3);
    if (currentPage >= pages.length) {
      currentPage = pages.length - 1;
    }
    renderPage(currentPage, 'after');
  } else if (
    document.body.clientWidth > 200
    && document.body.clientWidth < 550
    && lastWindowSizeIndex !== 5
  ) {
    cleanSearchBlock();
    mark();
    lastWindowSizeIndex = 5;
    createPages(2);
    if (currentPage >= pages.length) {
      currentPage = pages.length - 1;
    }
    renderPage(currentPage, 'after');
  }
}

function select() {
  const Info = this.alt.split('___');
  outBlock.src = `${Info[0]}`;
  document.querySelector('.top-info-block .info-title').textContent = `${Info[3]}`;
  document.querySelector('.top-info-block .info-views .countOfViews .value').textContent = `${
    Info[5]
  }`;
  document.querySelector('.top-info-block .info-views .likes .value').textContent = ` ${Info[6]}`;
  document.querySelector('.top-info-block .info-views .dislikes .value').textContent = ` ${
    Info[7]
  }`;
  document.querySelector('.video-block .bottom-info-block .description').textContent = `${Info[2]}`;
  document.querySelector('.video-block .bottom-info-block .date').textContent = `${Info[4]}`;
  document.querySelector('.video-block .bottom-info-block .channelName').textContent = `${Info[1]}`;
  initStat();
}

function initPage() {
  let initialPoint;
  let finalPoint;

  block.addEventListener(
    'touchstart',
    (event) => {
      initialPoint = event.changedTouches[0];
    },
    false,
  );

  block.addEventListener(
    'touchend',
    (event) => {
      finalPoint = event.changedTouches[0];
      const xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
      const yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
      if (xAbs > 20 || yAbs > 20) {
        if (xAbs > yAbs) {
          if (finalPoint.pageX < initialPoint.pageX) {
            nextPage();
          } else {
            prevPage();
          }
        }
      }
    },
    false,
  );

  block.addEventListener(
    'mousedown',
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      initialPoint = event.pageX;
    },
    false,
  );

  block.addEventListener(
    'mouseup',
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      finalPoint = event.pageX;
      if (initialPoint - finalPoint > 10) {
        nextPage();
      } else if (initialPoint - finalPoint < -10) {
        prevPage();
      }
    },
    false,
  );

  button.addEventListener('click', search);

  $(document).ready(() => {
    $('.output-video-block').toggle(0);
    $('.search-button').click(function () {
      $('.output-video-block').slideToggle('slow');
      $(this).toggleClass('active');

      $('.search-button').off('click');
    });
  });
}

function mark() {
  for (let i = 0; i < pages.length; i += 1) {
    const item = document.createElement('div');
    item.className = 'dot';
    numberOfPages.appendChild(item);
  }

  if (pages.length >= 10) {
    for (let i = 0; i < pages.length; i += 1) {
      const cur = numberOfPages.childNodes[i];
      cur.style.cssText = 'height:3px;width:3px';
    }
  }

  if (pages.length >= 1) {
    const cur = numberOfPages.childNodes[currentPage];
    cur.style.cssText = 'background-color: rgb(0, 204, 255);';
  }
}

function initStat() {
  document.querySelector('.video-block .top-info-block').style.cssText = 'display:flex';
  document.querySelector('.video-block .bottom-info-block').style.cssText = 'display:flex';
}

initPage();
