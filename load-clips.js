block=document.querySelector('.search-result-block .searched-videos');
button=document.querySelector('.search-block .search-button');
outBlock=document.querySelector('.video-block .output-video-block iframe');
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
       setTimeout(function(){mark()},1010);
    })
   
    
    

}

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

function cleanSearchBlock(){
    while(block.firstChild){
        block.removeChild(block.firstChild);
    }

    while(numberOfPages.firstChild){
        numberOfPages.removeChild(numberOfPages.firstChild);
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

function renderPage(number,type){

    PageItem=document.createElement('div');
    PageItem.className='searched-page';

    item=block.lastElementChild;

    let urlVideoBase='https://www.youtube.com/embed/';
    for (let i=0;i<pages[number].length;i++){
        item=document.createElement('img');
        item.className='searched-video';
        
        
        let info=urlVideoBase+pages[number][i].videoId+'___'+pages[number][i].channelTitle+'___'+pages[number][i].videoDescription+'___'+pages[number][i].videoTitle+'___'+pages[number][i].publishedTime+'___'+pages[number][i].viewCount;
        item.alt=info;
        item.src=pages[number][i].imageSource;
        item.addEventListener("click", select);
        PageItem.appendChild(item);
    }
    if(type==='after'){
    block.appendChild(PageItem)
    }
    if(type==='before'){
        block.insertBefore(PageItem,block.firstChild);
    }
  
}

function nextPage(){
    lastWindowSizeIndex=0;
    currentPage += 1;
    if(currentPage>=pages.length-1){
        load();
        renderPage(currentPage,'after');
        scrollToElement(document.querySelector('.search-result-block .searched-videos').lastElementChild,1)
        setTimeout(function(){resize()},1000);
    }
    else {
        renderPage(currentPage,'after');
        scrollToElement(document.querySelector('.search-result-block .searched-videos').lastElementChild,1)
        setTimeout(function(){resize()},500);
    }
    
}

function prevPage(){
    lastWindowSizeIndex=0;
    if(currentPage !==0 ){
        currentPage -= 1;
        renderPage(currentPage,'before');
        scrollToElement(document.querySelector('.search-result-block .searched-videos').lastElementChild,0)
        scrollToElement(document.querySelector('.search-result-block .searched-videos').firstElementChild,1)
        setTimeout(function(){resize()},500);
    }
}

function resize(){

    if(currentPage<0) currentPage=0;

  /*   if(lastWindowSizeIndex!=0){
        let p1=currentPage*pages[0].length;
    }
     */
    
        
     if(document.body.clientWidth>1000 && lastWindowSizeIndex!==1 ){
        cleanSearchBlock();
        mark();
         lastWindowSizeIndex=1;
         createPages(8);


        /*  for(let i=0;p2<p1;i++){
            let p2=pages[0].length*currentPage;
         }
         currentPage=p2;
 */

         if(currentPage>=pages.length){
            currentPage=pages.length-1;
        }
         renderPage(currentPage,'after');
     }
     else if(document.body.clientWidth>800 && document.body.clientWidth<1000 && lastWindowSizeIndex!==2){
        cleanSearchBlock();
        mark();
        lastWindowSizeIndex=2;
         createPages(6);

        
         if(currentPage>=pages.length){
            currentPage=pages.length-1;
        }
         renderPage(currentPage,'after');
    }
     else if(document.body.clientWidth>730 && document.body.clientWidth<800 && lastWindowSizeIndex!==3){
        cleanSearchBlock();
        mark();
        lastWindowSizeIndex=3;
         createPages(4);
         
         if(currentPage>=pages.length){
            currentPage=pages.length-1;
        }
         renderPage(currentPage,'after');
    }
     else if(document.body.clientWidth>550 && document.body.clientWidth<730  && lastWindowSizeIndex!==4){
        cleanSearchBlock();
        mark();
        lastWindowSizeIndex=4;
         createPages(3)
         if(currentPage>=pages.length){
            currentPage=pages.length-1;
        }
         renderPage(currentPage,'after');
        }
     else if(document.body.clientWidth>200 && document.body.clientWidth<550  && lastWindowSizeIndex!==5){
        cleanSearchBlock();
        lastWindowSizeIndex=5;
         createPages(2);
         if(currentPage>=pages.length){
            currentPage=pages.length-1;
        }
         renderPage(currentPage,'after');
        }
}

function select(){
    let Info=this.alt.split('___');
    console.log(Info)
    outBlock.src=Info[0];
    document.querySelector('.top-info-block .info-title').textContent=Info[3];
    document.querySelector('.video-block .bottom-info-block ').textContent=Info[2];
    document.querySelector('.top-info-block .info-title').textContent=Info[3];
}

function init(){
var initialPoint;
var finalPoint;

block.addEventListener('touchstart', function(event) {
//event.preventDefault();
//event.stopPropagation();
initialPoint=event.changedTouches[0];
}, false);

block.addEventListener('touchend', function(event) {
//event.preventDefault();
//event.stopPropagation();
finalPoint=event.changedTouches[0];
var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
if (xAbs > 20 || yAbs > 20) {
if (xAbs > yAbs) {
if (finalPoint.pageX < initialPoint.pageX){
    nextPage()}
else{
    prevPage()}
}
}
}, false);



block.addEventListener('mousedown', function(event) {
    event.preventDefault();
    event.stopPropagation();
    initialPoint=event.pageX;
    }, false);

block.addEventListener('mouseup', function(event) {
     event.preventDefault();
     event.stopPropagation();
     finalPoint=event.pageX;
     if ((initialPoint - finalPoint)>0){
        nextPage()}
     else{
        prevPage()}
    }, false);    


    button.addEventListener("click", search);
}

function mark(){

    for(let i=0;i<pages.length;i++){
        item=document.createElement('div')
        item.className='dot';
        numberOfPages.appendChild(item);
    } 


    if(pages.length>=10){
          for(let i=0;i<pages.length;i++){
            let cur=numberOfPages.childNodes[i];
            cur.style.cssText='height:3px;width:3px';

          }
        
       
     }

     if(pages.length>=1){
        let cur=numberOfPages.childNodes[currentPage];
        cur.style.cssText='background-color: rgb(0, 204, 255);';
      }
}



init();