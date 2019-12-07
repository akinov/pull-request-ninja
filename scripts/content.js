chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if (request == 'toggle') {
    toggleNinja();
  }
});

('use strict');

let isHide = false;
const dummyNames = [
  '🐶',
  '🐱',
  '🐭',
  '🐹',
  '🐰',
  '🦊',
  '🐻',
  '🐼',
  '🐨',
  '🐯',
  '🦁',
  '🐮',
  '🐷'
];
const currentUserIconUrl = $('.Header-link .avatar')[0].src;
const currentUserName = $('.header-nav-current-user strong')[0].textContent;
let iconUrls = [];
let userNames = [];

$('img.avatar[alt^="@"]').each((_, element) => {
  // @削除
  const userName = element.alt.slice(1);
  if (
    !userName ||
    currentUserName == userName ||
    userNames.indexOf(userName) >= 0
  ) {
    return;
  }
  iconUrls.push(element.src);
  userNames.push(userName);
});
toggleNinja();

function toggleNinja() {
  isHide = !isHide;

  if (isHide) {
    userNames.forEach((userName, index) => {
      $(`[href$='/${userName}']`).each((_, element) => {
        if (
          element.childElementCount > 0 &&
          element.firstElementChild.tagName == 'IMG'
        ) {
          const lastChild = element.lastElementChild;
          if (lastChild.className == 'dummnyName') {
            lastChild.style.display = 'inline';
          } else {
            const nameDom = document.createElement('span');
            nameDom.textContent = dummyNames[index];
            nameDom.className = 'dummnyName';
            element.appendChild(nameDom);
          }
          element.firstElementChild.style.display = 'none';
        } else {
          element.dataset.originalText = element.text;
          element.text = dummyNames[index];
        }
      });
    });
  } else {
    userNames.forEach((userName, _) => {
      $(`[href$='/${userName}']`).each((_, element) => {
        if (
          element.childElementCount > 0 &&
          element.firstElementChild.tagName == 'IMG'
        ) {
          element.firstElementChild.style.display = '';
          element.lastElementChild.style.display = 'none';
        } else {
          element.text = element.dataset.originalText;
        }
      });
    });
  }
}
