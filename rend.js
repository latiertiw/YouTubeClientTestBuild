var item=document.createElement('div');
item.className='wrapper';
document.body.appendChild(item);

    item=document.createElement('div');
    item.className='search-block';
    document.querySelector('body .wrapper').appendChild(item);

    item=document.createElement('div');
    item.className='logo';
    item.textContent='Zalupa.com'
    document.querySelector('.wrapper .search-block').appendChild(item);

    item=document.createElement('input');
    item.className='search-input';
    document.querySelector('.wrapper .search-block').appendChild(item);

    item=document.createElement('button');
    item.className='search-button';
    item.textContent='Поиск'
    document.querySelector('.wrapper .search-block').appendChild(item);



    item=document.createElement('div');
    item.className='video-block';
    document.querySelector('body .wrapper').appendChild(item);

        item=document.createElement('div');
        item.className='output-video-block';
        document.querySelector('.wrapper .video-block').appendChild(item);

        item=document.createElement('div');
        item.className='info-block';
        document.querySelector('.wrapper .video-block').appendChild(item);

            item=document.createElement('div');
            item.className='top-info-block';
            document.querySelector('.video-block .info-block').appendChild(item);

            item=document.createElement('div');
            item.className='bottom-info-block';
            document.querySelector('.video-block .info-block').appendChild(item);
            