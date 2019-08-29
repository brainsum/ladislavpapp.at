if ('fonts' in document) {
  var firaSans = new FontFace('Fira Sans', 'url(/user/themes/ladislavpapp/fonts/fira-sans-regular-hint-all.woff2) format("woff2"), url(/user/themes/ladislavpapp/fonts/fira-sans-regular-hint-all.woff) format("woff")');
  var ptSerifRegular = new FontFace('PT Serif', 'url(/user/themes/ladislavpapp/fonts/pt-serif-regular-hint-all.woff2) format("woff2"), url(/user/themes/ladislavpapp/fonts/pt-serif-regular-hint-all.woff) format("woff")');
  var ptSerifBold = new FontFace('PT Serif', 'url(/user/themes/ladislavpapp/fonts/pt-serif-bold-hint-all.woff2) format("woff2"), url(/user/themes/ladislavpapp/fonts/pt-serif-bold-hint-all.woff) format("woff")', { weight: 700 });
  var ptSerifItalic = new FontFace('PT Serif', 'url(/user/themes/ladislavpapp/fonts/pt-serif-italic-hint-all.woff2) format("woff2"), url(/user/themes/ladislavpapp/fonts/pt-serif-italic-hint-all.woff) format("woff")');
  Promise.all([firaSans.load(), ptSerifRegular.load(), ptSerifBold.load(), ptSerifItalic.load()]).then(function (fonts) {
    fonts.forEach(function (font) {
      document.fonts.add(font);
    });
  });
}

if (!('fonts' in document) && 'head' in document) {
  // Awkwardly dump the second stage @font-face blocks in the head
  var style = document.createElement('style');
  // Note: Edge supports WOFF2
  style.innerHTML = '@font-face { font-family: "Fira Sans"; src: url(/user/themes/ladislavpapp/fonts/fira-sans-regular-hint-all.woff2) format("woff2"), url((/user/themes/ladislavpapp/fonts/fira-sans-regular-hint-all.woff) format("woff"); } @font-face { font-family: "PT Serif"; src: url(/user/themes/ladislavpapp/fonts/pt-serif-regular-hint-all.woff2) format("woff2"), url(/user/themes/ladislavpapp/fonts/pt-serif-regular-hint-all.woff) format("woff"); } @font-face { font-family: "PT Serif"; font-weight: 700; src: url(/user/themes/ladislavpapp/fonts/pt-serif-bold-hint-all.woff2) format("woff2"), url(/user/themes/ladislavpapp/fonts/pt-serif-bold-hint-all.woff) format("woff"); } @font-face { font-family: "PT Serif"; src: url(/user/themes/ladislavpapp/fonts/pt-serif-italic-hint-all.woff2) format("woff2"), url(/user/themes/ladislavpapp/fonts/pt-serif-italic-hint-all.woff) format("woff"); }';
  document.head.appendChild(style);
}
