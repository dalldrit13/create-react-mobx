#!/usr/bin/env node

// Usage: npx react-mobx-template

const readline = require("readline")
const fs = require("fs")
const path = require("path")
const { spawnSync } = require("child_process")
const file_templates = require("./file_templates")

const isWindows = process.platform === "win32"

const r1 = readline.createInterface({
  input: process.stdin, //eslint-disable-line no-undef
  output: process.stdout //eslint-disable-line no-undef
});

function question(text) {
  return new Promise(resolve => {
    r1.question(text, resolve)
  })
}

function close(str) {
  if (str) {
    console.log(str)
  } else {
    console.log('\n\n', 'All set')
  }
  r1.close()
}

r1.on('close', () => {
  process.exit(0); //eslint-disable-line no-undef
});

const currentDir = process.cwd()
function getPath(relative) {
  return path.resolve(currentDir, relative)
}

async function main() {
  const projectName = process.argv[2]

  if (!projectName) {
    close("You must provide a project name")
  } else if (fs.existsSync(getPath(`./${projectName}`))) {
    close("Already a folder with this name")
  }

  var pkg = require(getPath("./template/package.json"))

  // What is the name of the project
  const name = await question(`Let's get your project setup! What is the title?\n`)
  if (!name) close("Invalid Name")
  
  // Collect project description
  const desc = await question(`Give ${name} a brief description\n`)
  if (!desc) close('Invalid Description')
  
  // Should initialize project with git
  var git_init = await question("Would you like to intialize git? This will overwrite any existing git folder for this project (y/n)\n")  
  if (git_init !== 'y' && git_init !== 'n') close("Invalid option")
  git_init = git_init === 'y'
  
  // Create NGINX configuration for reverse proxy
  var nginx_init = await question("Do you plan on developing a backend as well? We'll create an nginx proxy to simplify development (y/n)\n")
  if (nginx_init !== 'y' && nginx_init !== 'n') close("Invalid option")
  nginx_init = nginx_init === 'y'

  // Review Information
  console.log({ name, desc, git_init, nginx_init })
  const go = await question("Review the above summary\n\nInitialize? (y/n)")
  if (go !== 'y') return close("Aborting")
  
  // Update package json with new name and scripts
  pkg.name = name.toLowerCase().replace(/ /g, "-").replace(/[^a-z0-9-]/g, "")
  if (nginx_init) {
    if (isWindows) {
      pkg.scripts.proxy_start = getPath(`./${projectName}/nginx/start.bat`)
      pkg.scripts.proxy_stop = getPath(`./${projectName}/nginx/stop.bat`)
    } else {
      pkg.scripts.proxy_start = getPath(`./${projectName}/nginx/start.sh`)
      pkg.scripts.proxy_stop = getPath(`./${projectName}/nginx/stop.sh`)
    }
  }
  fs.cpSync(getPath('./template'), getPath(`./${projectName}`), { recursive: true, force: true })
  fs.writeFileSync(getPath(`./${projectName}/package.json`), JSON.stringify(pkg, null, 4))
  
  // Create env files
  let port = nginx_init ? '' : ':3000'
  let api_port = nginx_init ? '' : ':8080'
  fs.writeFileSync(getPath(`./${projectName}/.env.local`), file_templates.env({ app: `http://localhost${port}`, api: `http://localhost${api_port}/v1/`, socket: `ws://localhost${api_port}` }))
  fs.writeFileSync(getPath(`./${projectName}/.env.staging`), file_templates.env({ app: 'https://', api: 'https://', socket: 'wss://' }))
  fs.writeFileSync(getPath(`./${projectName}/.env.production`), file_templates.env({ app: 'https://', api: 'https://', socket: 'wss://' }))
  
  // Update index.html with name and description
  fs.writeFileSync(getPath(`./${projectName}/index.html`), file_templates.html({ name, desc }))
  
  // Setup NGINX
  if (nginx_init) {
    if (!fs.existsSync(getPath(`./${projectName}/nginx`))) {
      fs.cpSync(getPath('nginx'), getPath(`./${projectName}/nginx`), { recursive: true, force: true })
      if (isWindows) {
        fs.writeFileSync(getPath(`./${projectName}/nginx/start.bat`), file_templates.nginx.windows.start({ path: getPath(`./${projectName}/nginx`), conf_path: getPath(`./${projectName}/nginx/nginx.conf`) }))
        fs.writeFileSync(getPath(`./${projectName}/nginx/stop.bat`), file_templates.nginx.windows.stop({ path: getPath(`./${projectName}/nginx`), conf_path: getPath(`./${projectName}/nginx/nginx.conf`), access_path: getPath(`./${projectName}/nginx/access.log`), error_path: getPath(`./${projectName}/nginx/error.log`) }))
      } else {
        fs.writeFileSync(getPath(`./${projectName}/nginx/start.sh`), file_templates.nginx.start({ path: getPath(`./${projectName}/nginx`), conf_path: getPath(`./${projectName}/nginx/nginx.conf`) }))
        fs.chmodSync(getPath(`./${projectName}/nginx/start.sh`), "755")
        fs.writeFileSync(getPath(`./${projectName}/nginx/stop.sh`), file_templates.nginx.stop({ path: getPath(`./${projectName}/nginx`), conf_path: getPath(`./${projectName}/nginx/nginx.conf`), access_path: getPath(`./${projectName}/nginx/access.log`), error_path: getPath(`./${projectName}/nginx/error.log`) }))  
        fs.chmodSync(getPath(`./${projectName}/nginx/stop.sh`), "755")
      }
    }
  }
 

  // Create delete folder
  if (!fs.existsSync(getPath(`./${projectName}/delete`))) {
    fs.mkdirSync(getPath(`./${projectName}/delete`))
  }

  // Intialize git repo
  if (git_init) {
    spawnSync("git", ['init'], { cwd: getPath(`./${projectName}`) })
  } 

  close()
}

main()
