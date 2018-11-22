block=document.querySelector('.search-result-block .searched-videos');
button=document.querySelector('.search-block .search-button');
outBlock=document.querySelector('.video-block .output-video-block');
searchInput=document.querySelector('.search-block .search-input');

let baseUrl ="https://www.googleapis.com/youtube/v3/search?key=AIzaSyC0vey-MWqac8d52xu5VWF1r6q3e59xI0Q&type=video&part=snippet&maxResults=3";
let baseSUrl='https://www.googleapis.com/youtube/v3/videos?key=AIzaSyC0vey-MWqac8d52xu5VWF1r6q3e59xI0Q&id=';
let Url;
//(document.body.clientWidth);

let bufferedVideos=[];
let loadedCount=0;
let nextPageToken='';


button.addEventListener("click", search);
function search(){
    Url=baseUrl+'&pageToken='+nextPageToken+'&q='+searchInput.value;
    fetch(Url)
    .then(res => res.text())
    .then(res=>{    
       let answer=JSON.parse(res);
       nextPageToken=answer.nextPageToken;
       for(let loadQuerry=0;loadQuerry<3;loadQuerry++){

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
});
}
function cleanSearchBlock(){
    while(block.firstChild){
        block.removeChild(block.firstChild);
    }
}

function fill(){
    cleanSearchBlock();
    if(document.body.clientWidth>1000){
        add(8)
    }
    else if(document.body.clientWidth>800){add(6)}
    else if(document.body.clientWidth>730){add(4)}
    else if(document.body.clientWidth>550){add(3)}
    else{add(2)}
}


function add(count){
for(let i=0;i<count;i++){
    item=document.createElement('div');
    item.className='searched-video';
    block.appendChild(item);
}
}







window.addEventListener('resize', resize);

  function resize(){
     // console.log(document.body.clientWidth)
     cleanSearchBlock();
     if(document.body.clientWidth>1000){
         add(8)
     }
     else if(document.body.clientWidth>800){add(6)}
     else if(document.body.clientWidth>730){add(4)}
     else if(document.body.clientWidth>550){add(3)}
     else{add(2)}
  }