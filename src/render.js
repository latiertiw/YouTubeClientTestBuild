module.exports = function render() {
  let item = document.createElement('div');
  item.className = 'wrapper';
  document.body.appendChild(item);

  item = document.createElement('div');
  item.className = 'search-block';
  document.querySelector('body .wrapper').appendChild(item);

  item = document.createElement('div');
  item.className = 'logo';
  document.querySelector('body .wrapper .search-block').appendChild(item);

  item = document.createElement('div');
  item.className = 'image';
  document.querySelector('body .wrapper .search-block .logo').appendChild(item);

  item = document.createElement('div');
  item.className = 'title';
  document.querySelector('body .wrapper .search-block .logo').appendChild(item);

  item = document.createElement('input');
  item.className = 'search-input';
  document.querySelector('body .wrapper .search-block').appendChild(item);

  item = document.createElement('button');
  item.className = 'search-button';
  document.querySelector('body .wrapper .search-block').appendChild(item);

  item = document.createElement('div');
  item.className = 'video-block';
  document.querySelector('body .wrapper').appendChild(item);

  item = document.createElement('div');
  item.className = 'output-video-block';
  document.querySelector('body .wrapper .video-block').appendChild(item);

  item = document.createElement('iframe');
  item.height = '315';
  item.width = '560';
  item.src = '';
  document.querySelector('body .wrapper .video-block .output-video-block').appendChild(item);

  item = document.createElement('div');
  item.className = 'top-info-block';
  document.querySelector('body .wrapper .video-block').appendChild(item);

  item = document.createElement('div');
  item.className = 'info-title';
  document.querySelector('body .wrapper .video-block .top-info-block').appendChild(item);

  item = document.createElement('div');
  item.className = 'info-title-name';
  document.querySelector('body .wrapper .video-block .top-info-block .info-title').appendChild(item);

  item = document.createElement('div');
  item.className = 'info-views';
  document.querySelector('body .wrapper .video-block .top-info-block').appendChild(item);

  item = document.createElement('div');
  item.className = 'countOfViews';
  document.querySelector('body .wrapper .video-block .top-info-block .info-views').appendChild(item);

  item = document.createElement('div');
  item.className = 'image';
  document.querySelector('body .wrapper .video-block .top-info-block .info-views .countOfViews').appendChild(item);

  item = document.createElement('div');
  item.className = 'value';
  document.querySelector('body .wrapper .video-block .top-info-block .info-views .countOfViews').appendChild(item);


  item = document.createElement('div');
  item.className = 'likes';
  document.querySelector('body .wrapper .video-block .top-info-block .info-views').appendChild(item);

  item = document.createElement('div');
  item.className = 'image';
  document.querySelector('body .wrapper .video-block .top-info-block .info-views .likes').appendChild(item);

  item = document.createElement('div');
  item.className = 'value';
  document.querySelector('body .wrapper .video-block .top-info-block .info-views .likes').appendChild(item);


  item = document.createElement('div');
  item.className = 'dislikes';
  document.querySelector('body .wrapper .video-block .top-info-block .info-views').appendChild(item);

  item = document.createElement('div');
  item.className = 'image';
  document.querySelector('body .wrapper .video-block .top-info-block .info-views .dislikes').appendChild(item);

  item = document.createElement('div');
  item.className = 'value';
  document.querySelector('body .wrapper .video-block .top-info-block .info-views .dislikes').appendChild(item);


  item = document.createElement('div');
  item.className = 'bottom-info-block';
  document.querySelector('body .wrapper .video-block').appendChild(item);

  item = document.createElement('div');
  item.className = 'description';
  document.querySelector('body .wrapper .bottom-info-block').appendChild(item);

  item = document.createElement('div');
  item.className = 'channelName';
  document.querySelector('body .wrapper .bottom-info-block').appendChild(item);

  item = document.createElement('div');
  item.className = 'date';
  document.querySelector('body .wrapper .bottom-info-block').appendChild(item);


  item = document.createElement('div');
  item.className = 'search-result-block';
  document.querySelector('body .wrapper').appendChild(item);

  item = document.createElement('div');
  item.className = 'page-switcher';
  document.querySelector('body .wrapper .search-result-block').appendChild(item);

  item = document.createElement('div');
  item.className = 'page-left';
  document.querySelector('body .wrapper .search-result-block .page-switcher').appendChild(item);

  item = document.createElement('div');
  item.className = 'current-page';
  document.querySelector('body .wrapper .search-result-block .page-switcher').appendChild(item);

  item = document.createElement('div');
  item.className = 'page-right';
  document.querySelector('body .wrapper .search-result-block .page-switcher').appendChild(item);


  item = document.createElement('div');
  item.className = 'searched-videos';
  document.querySelector('body .wrapper .search-result-block').appendChild(item);


  item = document.createElement('footer');
  document.querySelector('body .wrapper').appendChild(item);
};
