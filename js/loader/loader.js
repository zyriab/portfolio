const IS_DEV="localhost"===window.location.hostname||"127.0.0.1"===window.location.hostname,CSS_PATH=IS_DEV?"css/tui.css":"css/tui.min.css",JS_PATH=IS_DEV?"js/tui.js":"js/tui.min.js";function loadDependency(e,t,n){let s=document.head,c="script"===t?document.createElement("script"):document.createElement("link");"script"===t?(c.type="text/javascript",c.src=e):(c.rel="stylesheet",c.href=e),"script"===t&&null!=n&&(c.onreadystatechange=n,c.onload=n),s.appendChild(c)}loadDependency(CSS_PATH,"link"),loadDependency(JS_PATH,"script",function(){init()});