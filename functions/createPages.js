let pages;
module.exports = function createPages(size, bufferedVideos) {
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
};
