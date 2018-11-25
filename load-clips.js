block=document.querySelector('.search-result-block .searched-videos');
button=document.querySelector('.search-block .search-button');
outBlock=document.querySelector('.video-block .output-video-block');
searchInput=document.querySelector('.search-block .search-input');
pageRight=document.querySelector('.page-switcher .page-right');
pageLeft=document.querySelector('.page-switcher .page-left');
numberOfPages=document.querySelector('.page-switcher .current-page');

let baseUrl ="https://www.googleapis.com/youtube/v3/search?key=AIzaSyC0vey-MWqac8d52xu5VWF1r6q3e59xI0Q&type=video&part=snippet&maxResults=16";
let baseSUrl='https://www.googleapis.com/youtube/v3/videos?key=AIzaSyC0vey-MWqac8d52xu5VWF1r6q3e59xI0Q&id=';
let Url;


let bufferedVideos=[];
let pages=[];
let loadedCount=0;
let nextPageToken='';
let lastSearch;
let currentPage=0;
let lastWindowSizeIndex=0;



button.addEventListener("click", search);

function load(){
    Url=baseUrl+'&pageToken='+nextPageToken+'&q='+lastSearch;
    fetch(Url)
    .then(res => res.text())
    .then(res=>{    
       let answer=JSON.parse(res);
       nextPageToken=answer.nextPageToken;
       for(let loadQuerry=0;loadQuerry<16;loadQuerry++){

        let card=new Object();

        card.imageSource=answer.items[loadQuerry].snippet.thumbnails.medium.url
        card.channelTitle=answer.items[loadQuerry].snippet.channelTitle;
        card.videoDescription=answer.items[loadQuerry].snippet.description;
        card.videoTitle=answer.items[loadQuerry].snippet.title;
        card.publishedTime=answer.items[loadQuerry].snippet.publishedAt;
        card.videoId=answer.items[loadQuerry].id.videoId;
        
            Url=baseSUrl+card.videoId+'&part=snippet,statistics';
            fetch(Url)
            .then(res => res.text())
            .then(res => {
                let answer=JSON.parse(res);
            
                card.viewCount=answer.items[0].statistics.viewCount;
                card.likeCount=answer.items[0].statistics.likeCount;
                card.dislikeCount=answer.items[0].statistics.dislikeCount;

                bufferedVideos.push(card);
        })
        
        loadedCount++;
       }
    })
}

function search(){
    pageRight.addEventListener("click", nextPage);
    pageLeft.addEventListener("click", prevPage);
    window.addEventListener('resize', resize);
    bufferedVideos=[];
    nextPageToken='';
    lastSearch=searchInput.value;
    Url=baseUrl+'&pageToken='+nextPageToken+'&q='+searchInput.value;
    fetch(Url)
    .then(res => res.text())
    .then(res=>{    
       let answer=JSON.parse(res);
       nextPageToken=answer.nextPageToken;
       for(let loadQuerry=0;loadQuerry<16;loadQuerry++){

        let card=new Object();

        card.imageSource=answer.items[loadQuerry].snippet.thumbnails.medium.url
        card.channelTitle=answer.items[loadQuerry].snippet.channelTitle;
        card.videoDescription=answer.items[loadQuerry].snippet.description;
        card.videoTitle=answer.items[loadQuerry].snippet.title;
        card.publishedTime=answer.items[loadQuerry].snippet.publishedAt;
        card.videoId=answer.items[loadQuerry].id.videoId;
        
            Url=baseSUrl+card.videoId+'&part=snippet,statistics';
            fetch(Url)
            .then(res => res.text())
            .then(res => {
                let answer=JSON.parse(res);
            
                card.viewCount=answer.items[0].statistics.viewCount;
                card.likeCount=answer.items[0].statistics.likeCount;
                card.dislikeCount=answer.items[0].statistics.dislikeCount;

                bufferedVideos.push(card);
        })
        
        loadedCount++;
       }
       setTimeout(function(){resize()},1000);
    })
   
    
    

}



function cleanSearchBlock(){
    while(block.firstChild){
        block.removeChild(block.firstChild);
    }
}

function createPages(size){
    let pagesCount=Math.ceil(bufferedVideos.length/size);
    pages=[];
    
    let placed=0;
    for(let i=0;i<pagesCount;i++){
        pages[i]=[];
        for(let j=0; j<size;j++){
            if(placed<bufferedVideos.length){
                pages[i].push(bufferedVideos[placed]);
                placed++;
            }
        }
    }
}

function renderPage(number){

    otem=document.createElement('div');
    otem.className='searched-page';
   // block.appendChild(item);

    item=block.lastElementChild;

    let urlVideoBase='https://www.youtube.com/embed/';
    for (let i=0;i<pages[number].length;i++){
        item=document.createElement('img');
        item.className='searched-video';
        
        item.alt=urlVideoBase+ pages[number][i].videoId;
        item.src=pages[number][i].imageSource;
        item.addEventListener("click", select);
        otem.appendChild(item);
    }
    block.appendChild(otem)
  
}

function nextPage(){
    lastWindowSizeIndex=0;
    currentPage += 1;
    if(currentPage>=pages.length-1){
        load();
        scrollToElement(document.querySelector('.search-result-block .searched-videos').lastElementChild,1)
        setTimeout(function(){resize()},1000);
        setTimeout(()=>{scrollToElement(document.querySelector('.search-result-block .searched-videos').childNodes[document.querySelector('.search-result-block .searched-videos').childNodes.length - 2],0)},1001) 
    }
    else {
        scrollToElement(document.querySelector('.search-result-block .searched-videos').lastElementChild,1)
        setTimeout(function(){resize()},500);
        setTimeout(()=>{scrollToElement(document.querySelector('.search-result-block .searched-videos').childNodes[document.querySelector('.search-result-block .searched-videos').childNodes.length - 2],0)},501) 
    }
    
}

function prevPage(){
    lastWindowSizeIndex=0;
    if(currentPage !==0 ){
        currentPage -= 1;
    }
    scrollToElement(document.querySelector('.search-result-block .searched-videos').firstElementChild,1)
    setTimeout(function(){resize()},500);
    setTimeout(()=>{scrollToElement(document.querySelector('.search-result-block .searched-videos').childNodes[document.querySelector('.search-result-block .searched-videos').childNodes.length - 2],0)},501) 
}

function resize(){
    if(currentPage<0) currentPage=0;
     numberOfPages.textContent=currentPage+1;
        
     if(document.body.clientWidth>1000 && lastWindowSizeIndex!==1 ){
        cleanSearchBlock();
         lastWindowSizeIndex=1;
         createPages(8);
         if(currentPage>=pages.length){
            currentPage=pages.length-1;
        }
         renderPage(currentPage);
     }
     else if(document.body.clientWidth>800 && document.body.clientWidth<1000 && lastWindowSizeIndex!==2){
        cleanSearchBlock();
        lastWindowSizeIndex=2;
         createPages(6);
         if(currentPage>=pages.length){
            currentPage=pages.length-1;
        }
         renderPage(currentPage);
    }
     else if(document.body.clientWidth>730 && document.body.clientWidth<800 && lastWindowSizeIndex!==3){
        cleanSearchBlock();
        lastWindowSizeIndex=3;
         createPages(4);
         if(currentPage>=pages.length){
            currentPage=pages.length-1;
        }
         renderPage(currentPage);
    }
     else if(document.body.clientWidth>550 && document.body.clientWidth<730  && lastWindowSizeIndex!==4){
        cleanSearchBlock();
        lastWindowSizeIndex=4;
         createPages(3)
         if(currentPage>=pages.length){
            currentPage=pages.length-1;
        }
         renderPage(currentPage);
        }
     else if(document.body.clientWidth>200 && document.body.clientWidth<550  && lastWindowSizeIndex!==5){
        cleanSearchBlock();
        lastWindowSizeIndex=5;
         createPages(2);
         if(currentPage>=pages.length){
            currentPage=pages.length-1;
        }
        
        if(currentPage>0){
        renderPage(currentPage-1);
        }
         renderPage(currentPage);
        renderPage(currentPage+1);
        }
}



function select(){
    outBlock.src=this.alt;
}




var initialPoint;
var finalPoint;

block.addEventListener('touchstart', function(event) {
event.preventDefault();
event.stopPropagation();
initialPoint=event.changedTouches[0];
}, false);

block.addEventListener('touchend', function(event) {
event.preventDefault();
event.stopPropagation();
finalPoint=event.changedTouches[0];
var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
if (xAbs > 20 || yAbs > 20) {
if (xAbs > yAbs) {
if (finalPoint.pageX < initialPoint.pageX){
    nextPage()
/*СВАЙП ВЛЕВО*/}
else{

    prevPage()
/*СВАЙП ВПРАВО*/}
}
}
}, false);


function scrollToElement(theElement,par) {

    
    var selectedPosX = 0;
    var selectedPosY = 0;
  
    while (theElement != null) {
        selectedPosX += theElement.offsetLeft;
        selectedPosY += theElement.offsetTop;
        theElement = theElement.offsetParent;
    }

    if(par==1){
    pos={
        behavior: "smooth"
    }
    pos.left=selectedPosX;
    pos.top=selectedPosY;
    block.scrollTo(pos);
    }

    else block.scrollTo(selectedPosX,selectedPosY);

}



