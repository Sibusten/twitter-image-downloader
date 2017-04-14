// ==UserScript==
// @name        Twitter Image Downloader
// @namespace   sibusten
// @description Adds a button to download images from twitter
// @include     https://twitter.com/*
// @require     https://code.jquery.com/jquery-3.2.1.min.js
// @version     1
// @grant       none
// ==/UserScript==

current_gallery_image_url = '';

// Get the url of the currently shown gallery image
get_gallery_image_url = function(){
  return $('.Gallery-media .media-image').attr('src');
};

update_current_gallery_image_url = function(){
  // Get the new image url
  current_gallery_image_url = get_gallery_image_url()
  
  // Update the download button
  update_download_button();
};

// Add a download button to the gallery tweet if it does not already exist
update_download_button = function(){
  // If the gallery download button does not exist, create it.
  if(!$('#gallery-download').length){
    $('.GalleryTweet .tweet .content .stream-item-header .time').after('<a href="' + current_gallery_image_url + '" target="_blank"><input type="button" id="gallery-download" value="Download"></input></a>');
  }
  
  // If the download button is not pointing to the current image, update it's url
  if(!$('gallery-download').attr('href') == current_gallery_image_url){
    $('gallery-download').attr('href', current_gallery_image_url);
  }
};

$(document).ready(function(){
  // When the gallery media changes, update the url of the current image
  $('.Gallery-media').on('DOMSubtreeModified', update_current_gallery_image_url);
  
  // When the gallery tweet changes, add the download button to it
  $('.GalleryTweet').on('DOMSubtreeModified', update_download_button);
});
