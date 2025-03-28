
function extract(domain) {
  console.log("extracts cookies from moodle site");
  chrome.cookies.getAll( {
    domain: domain
  }, (cookies) => {
    let cookie_string = cookies.map( c => `${c.name}=${c.value}` ).join('; ');
    document.getElementById('cookie_string').value = cookie_string;
    console.log(cookie_string);
    //navigator.clipboard.writeText(cookie_string);
  });
}

function writeCookie(url, cookieString) {
  cookieString.split(';').forEach( nv => {
    let ary = nv.trim().split('=');
    let name = ary[0];
    let value = ary[1];
    chrome.cookies.set( {
      url: url,
      name: name,
      value: value,
      path: '/',
      secure: true,
      httpOnly: true
    });
  });
}

window.addEventListener('load', function() {  
  
  document.querySelector('#extract_button').addEventListener('click', () => {
    let domain = document.getElementById('domain').value;
    extract(domain);
    alert('cookie copied to clipboard');
  });
  
  document.querySelector('#write_button').addEventListener('click', () => {
    let cookieString = document.getElementById('cookie_string').value;
    let url = document.getElementById('url').value;    
    writeCookie(url, cookieString);
    alert('cookie written to browser');
  });

});

