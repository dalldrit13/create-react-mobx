module.exports = {
  html: ({ name, desc }) => (`<!DOCTYPE html>\n<html lang="en">  <head>\n    <meta charset="utf-8" />\n    <meta name="viewport" content="minimum-scale=1.0, maximum-scale=1.0 initial-scale=1.0, user-scalable=0, width=device-width" />\n    <title>${name} | ${desc}</title>\n    <meta name="og:image" content="/images/preview.png" />\n    <meta\n      name="description"\n      content="${desc}"\n    />\n    <meta\n      name="og:description"\n      content="${desc}"\n    />\n    <meta\n      name="twitter:description"\n      content="${desc}"\n    />\n    <link rel="icon" href="/logo.svg" type="image/svg+xml" />\n  </head>\n  <body>\n    <noscript>You need to enable JavaScript to run this app.</noscript>\n    <div id="root"></div>\n    <!--App-->\n    <script type="module" src="/src/main.tsx"></script>\n    </body>\n</html>`),
  env: ({ api, app, socket }) => (`VITE_APP_URL=${app}\nVITE_APP_API_URL=${api}\nVITE_APP_SOCKET_URL=${socket}`),
  socket: ``,
  nginx: {
    start: ({ path, conf_path }) => (`#!/bin/bash\nnginx -p ${path} -c ${conf_path}`),
    stop: ({ path, conf_path, access_path, error_path }) => (`#!/bin/bash\nnginx -s stop -p ${path} -c ${conf_path}\nread -p "Clear logs? (y/n) " RESP\nif [ "$RESP" = "y" ]; then\n  echo "" > ${access_path}\n  echo "" > ${error_path}\n  echo "Cleared. All Done"\nelse\n  echo "Not cleared. All done"\nfi`),
    windows: {
      start: ({ path, conf_path }) => (`nginx -p ${path} -c ${conf_path}`),
      stop: ({ path, conf_path, access_path, error_path }) => (`nginx -s stop -p ${path} -c ${conf_path}\nset /p RESP="Would you like to clear the log files? (y/n)"\nIF %RESP%==y (ECHO "" > ${access_path} & ECHO "" > ${error_path} & ECHO "Logs Cleared") ELSE (ECHO "Done")`)
    }
  }
}