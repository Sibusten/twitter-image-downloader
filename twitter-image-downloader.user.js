// ==UserScript==
// @name        Twitter Image Downloader
// @namespace   sibusten
// @description Adds a button to download images from twitter
// @include     https://twitter.com/*
// @require     https://code.jquery.com/jquery-3.2.1.min.js
// @version     1.3
// @grant       none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

var current_gallery_image_url = '';
var currently_working = false;

// Get the url of the currently shown gallery image
function get_gallery_image_url(){
  return $('.Gallery-media .media-image').attr('src');
};

update_current_gallery_image_url = function(){
  // Get the new image url
  current_gallery_image_url = get_gallery_image_url()
  
  // Update the download button
  update_download_button();
};

// Add a download button to the gallery tweet if it does not already exist
function update_download_button(){
  // Set a flag so that changes made to the element don't cause the event to trigger itself
  if(currently_working){
    return;
  }
  currently_working = true;
  
  // If the gallery download button does not exist, create it.
  if(!$('#gallery-download').length){
    $('.GalleryTweet .tweet .content .stream-item-header .time').after('<a href="' + current_gallery_image_url + '" target="_blank"><span id="gallery-download">Download</span></a>');
  }
  
  // If the download button is not pointing to the current image, update it's url
  if(!$('#gallery-download').attr('href') == current_gallery_image_url){
    $('#gallery-download').attr('href', current_gallery_image_url);
  }
  
  currently_working = false;
};

$(document).ready(function(){
  // When the gallery media changes, update the url of the current image
  $('.Gallery-media').on('DOMSubtreeModified', update_current_gallery_image_url);
  
  // When the gallery tweet changes, add the download button to it
  $('.GalleryTweet').on('DOMSubtreeModified', update_download_button);
});
