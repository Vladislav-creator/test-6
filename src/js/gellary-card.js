function createGellaryCard(arr) {
  
 return arr.map(
      (item) => `
       <li class='gallery-item'>
       <a class="gallery__link"  href="${item.urls.regular}}">
           <img class="gallery-item__img" src='${item.urls.small}}' alt='${item.alt_description}}' class='gallery-img' />
         </a>
         </li>`).join('');
}
export { createGellaryCard };
