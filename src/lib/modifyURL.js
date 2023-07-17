export function modifyURL(url) {
    const modifiedURL = url.replace(
      "/upload/",
      "/upload/c_fill,w_920,h_920/"
    );
    return modifiedURL;
  }