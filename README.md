<h1 style="margin-top: 10px">Welcome to the React Vite MobX Template</h1>
This template is intended to help developers create complex web apps with built in features like state management, routing, UI components, and more. It is also designed to give structural clarity and it does not abstract much of its functionality away into the node_modules folder allowing you to remove, customize, and extend anything.

**Here is a brief summary of things needed to get started**
## Contents:
- [Getting Started](#getting-started)
- [File Structure](#structure)
- [Components](#components)
- [Styling](#styling)
- [Routing](#routing)
- [State](#state)
- [Images](#images)
- [Icons](#icons)
- [Hooks](#hooks)
- [Realtime](#realtime)
- [Libraries](#libraries)

# Getting Started
Make sure npm and node are installed

*For Reference the version of npm and node used to author this template*

_(npm -v -> 8.19.2)_

_(node -v -> 18.12.1)_

## Create a new project
```bash
npx create-react-mobx project-name
cd project-name
npm install
```

## Start the dev server
```bash
npm run dev
```
This will make the frontend accessible at http://localhost:3000

If you're developing a backend (And opted in during initialization) we setup NGINX for running a reverse proxy to simplify development. *Checkout my [ExpressJS template](https://github.com/dalldrit13/create-express_mongoose) for quickly launching a compatible server*

## Start The Proxy
```bash
npm run proxy_start
```
You can then access the frontend at http://localhost

## Stop The Proxy
```bash
npm run proxy_stop
```
**Beware if you don't run this command when you are done, the nginx process will continue to run in the background**

## Building The Project
When you are ready to deploy your project
```bash
npm run build
```
This will build to the `/dist` folder

## Preview The Build
```bash
npm run preview
```


# Structure
**Below is a breakdown of the file structure for this template**

## `/public`
Static files can be placed in the static folder (fonts, images, etc.). Images (_apart from logos_) should go in the `/public/images` folder

## `/delete`
Put files in here when you no longer need them but think you might need in the future. This removes unused files from `/src` keeping things clear and no longer tracks them in git. Every so often you can remove files from this folder when you're certain you won't need it.

## `/src/App.tsx`
Ths is the main App file. Here we load our routing system and notification toaster.

## `/src/globals.css`
Stylesheet containing styles used globally throughout the app.

See the [Styling Section](#styling) for more information

## `/env.d.ts`
This file is used to extend VITE's builtin import.meta so additional environment variables can be added here (_This is only needed to appease TypeScript_)

## `/src/main.tsx`
This is the main entrypoint for the React application and what is loaded into `index.html`. Global state context provider is loaded in here as well as global styles

## `/src/routes.tsx`
This file handles the builtin file system based routing. It should only require tweaking if you want to extend the routing system

[See Routing](#routing)

## `/src/components`
Add your apps reusable components here and/or customize the components that come with the template. You can also delete any you don't plan on using.

See the [Components Section](#components) for more info on the provided components.

## `/src/contexts`
Add any contexts your app might need in here. The index file here contains the Global State context used for accessing our MobX state anywhere in the project.

## `/src/hooks`
Add any custom hooks your app might need to this folder.

See [Custom Hooks](#hooks) for info on the custom hooks included in the template

## `/src/icons`
Custom SVG icons can be added here, and we recommend looking at the format of some of the included icons to see how props can be used to override icon styling.

See [Icons](#icons) for examples

## `/src/layouts`
This is where common layouts can be added, for example wrapping every page with a navbar and footer

## `/src/pages`
This is where pages can be added to your project and the file structure/naming in this folder will mirror the structure/paths of your application

The routing is setup similarly to NextJS file based routing. See [Routing](#routing) for more info.

## `/src/state`
This is where the state is stored. Feel free to extend this for your project.

## `/src/types`
This is where you can define common types used throughout your project

## `/src/utils`
Here you can add utility functions that are used throughout the app. 

The template comes with a few, including password strength checking and some simple regex.


# Components
The template comes with a couple preconfigured components. This is a breakdown of how to use them. Feel free to remove, extend, or delete any of them to fit your projects needs.

## Navbar
Classic Navbar with logo and dropdown menu
```ts
import Navbar from "../components/navbar"
<Navbar />
```

## Footer
Empty component. Fill this in to make whatever footer you want.
```ts
import Footer from "../components/footer"
<Footer />
```

## Chip
Chip element. Good for tagging features
```ts
import Chip from "../components/chip"
<Chip>
  Text
</Chip>
```

## Button
Simple wrapper of html button component 
```ts
Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  light?: boolean
  disabled?: boolean
  href?: string
}
// Usage
import Button from "../components/inputs/button"

<Button light onClick={}>btn text</Button>
```

## Input
Simple wrapper of html input component with a label and optional helper text
```ts
Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  multi?: boolean
  helperText?: string
  error?: boolean
  containerStyle?: React.CSSProperties
}
// Usage
import Input from "../components/inputs/input"

<Input label="email" value={val} onChange={({ target }) => setVal(target.value)} />
```

## Select
Simple wrapper of html select and option components with a label and optional helper text
```ts
Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: string[]
  helperText?: string
  error?: boolean
  containerStyle?: React.CSSProperties
}
// Usage
import Select from "../components/inputs/select"

<Select label="categories" options={["opt1", "opt2"]} value={opt} onChange={({ target }) => setOpt(target.value)} />
```

## AutoComplete
Simple wrapper of html input component with a label and optional helper text. Intended for multiple elements to be added, fireKey is what triggers elements being added. Optionally add a validate regex to prevent failed formats from adding. Elements show up as chips beneath input
```ts
Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  initialValue?: string[];
  fireKey?: string;
  validate?: RegExp;
  helperText?: string;
  error?: boolean;
  noDuplicates?: boolean;
  onUpdate(_: string[]): string[];
  containerStyle?: React.CSSProperties;
}
// Usage
import AutoComplete from "../components/inputs/autocomplete"

<AutoComplete
  label="Emails"
  validate={emailRegex}
  fireKey="Enter"
  helperText="Press space to add email"
  noDuplicates
  containerStyle={{ width: "100%" }}
  onUpdate={emails => setList({ ...list, emails })}
/>
```

## Loading
Loading indicator
```ts
Props {
  style?: React.CSSProperties
}
// Usage
import Loading from "../components/loading"

<Loading />
```

## Modal
Simple modal element, brings content to focus above regular layout
```ts
Props {
  open: boolean
  title?: string
  onClose(): React.SyntheticEvent
}
// Usage
import Modal from "../components/modal"

<Modal open={open} onClose={() => setOpen(false)} title="Modal Title">
  <Component />
</Modal>
```

## Tabs
Simple tab component
```ts
Props {
  tabs: string[]
  activeTab: number
  setActiveTab(): number
}
// Usage
import Tabs from "../components/tabs"

<Tabs tabs={["tab 1", "tab 2"]} activeTab={0} setActiveTab={(ind) => setActiveTab(ind)} />
```

## Tooltip
Popup element on hover of an element to provide more info/context
```ts
Props {
  content: any
  position?: "top-center" | "top-left" | "top-right" | "bottom-center" | "bottom-left" | "bottom-right" | "left-center" | "right-center"
}
// Usage
import Tooltip from "../components/tooltip"

<Tooltip content="Text" position="top-center">
  <Component />
</Tooltip>
```

## Progress
A simple bar to show progress as something is progressed
```ts
Props {
  progress: number
  total: number
}
// Usage
import ProgressBar from "../components/progress/bar"

<ProgressBar progress={10} total={100} />
```


# Styling
Styling is left somewhat up to you. There is a global.css file containing theming of common elements like, typography and inputs. CSS modules are supported out the box and suggestion for component specific styling is to create a folder for components of a certain element

`(i.e. components/user/card.tsx, components/user/table.tsx, etc.)`

and then add a module file for styling those elements

`(i.e. components/user/user.module.css)`

Then to use in the components
```ts
import classes from "./user.module.css"
function Component() {
  return (<div className={classes.container}></div>)
}
```
The benefit of modules is the class names are hashed by the build tool so this way you can avoid naming conflicts that can be tricky to track down.

e.g `container → container_hs61`

# Routing
Routing is setup with file based routing from the pages directory
- `/pages/blog.tsx` → http://localhost/blog
- `/pages/blog/index.tsx` → http://localhost/blog
- `/pages/blog/[slug].tsx` → http://localhost/blog/{slug}

For dynamic routes like the one above, you can access the slug within the page using useParams hook.
```ts
import { useParams } from "react-router-dom"

function Component () {
  const { slug } = useParams()
  return (
    // JSX
  )
}
```
 *Note you can name the slug anything i.e. `/pages/blog/[title].tsx` and then access it with that respective name.*

# State
Using the state anywhere in the application is fairly straightforward, you simply need to wrap the component in observer and use the custom global state hook. Any changes to state values used in this component will automatically trigger a rerender.
```TS
import { observer } from "react-mobx-lite"
import { useGlobalState } from ".../hooks"

interface Props {
  // Define props type
}

const Component = observer((props: Props) => {
  const state = useGlobalState()
  const user = state.user || {}   // Example of how you can reference attributes
  
  return (
    <div>
      {user.firstName}
    </div>
  )
})

export default Component
```
*One important thing to note is that deep changes to state, for example altering an object property in an array of objects will likely fail to cause a re-render. In this case you can get creative in adding other means to track updates*
```ts
const arrayOfObj = useMemo(state.arrayOfObj, [state.arrayOfObj_changed])
```

# Images
## Static Assets Compression
Should all be resized and compressed for optimized web loading
- [PNG Compression](https://compresspng.com/)
- [JPEG Compression](https://compressjpeg.com/)
- [SVG Compression](https://vecta.io/nano)
- [SVG Cropping](https://svgcrop.com/)
- [GIF Compression & More](https://ezgif.com)

Files can then be placed in `public/images/`

## User Upload
Image compression function is included in the frontend (Exported by utils)
```ts
import { compressPhoto } from ".../utils"
const = onUpload = ({ target }: { target: File }) => {
  compressPhoto({ target }).then(({ preview, file }) => {
    // Handle success
  }).catch(err => {
    // Handle Error
  })
}
```

# Icons
<svg style="height:20px;width:30px"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/></svg>
Check

<svg style="height:20px;width:30px"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/></svg>
Close

<svg style="height:20px;width:30px"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor" /></svg>
Delete

<svg style="height:20px;width:30px"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor" /></svg>
Edit

<svg style="height:22px;width:30px"><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor" /></svg>
Info

<svg style="height:20px;width:30px"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor"/></svg>
Menu

# Hooks
The template comes with 4 built in hooks

`useCurrentWidth`: is a debounced helper to access the current screen width (**In px**) and will update when the screen is resized. You can use this for actions such as collapsing a navigation menu. Optionally pass a number to override the debounce time in ms (150 default), but beware values too large may cause delayed render changes and too small may cause freezing when resizing.
```ts
const width = useCurrentWidth()
OR
const width = useCurrentWidth(50)
```

`useGlobalState`: is a simple abstraction to access the global state context. Note this must inside an observer in order to automatically render changes to state. If you're just using a method then observer is not needed.
```ts
import { observer } from "mobx-react-lite";
const Component = observer(() => {
  const state = useGlobalState()
  return (<>...</>)
})
export default Component
```

`usePrevious`: accepts a prop and returns the value of that prop on the previous render
```ts
const previous = usePrevious(prop)
```

`useVisible`: An easy way to use the IntersectionObserver API.
```ts
const [elRef, elVisible] = useVisible()
return (<div ref={elRef}>...</div>)
```

`useQuery`: An easy way to access query parameters as a plain json object
```ts
const [query, setQuery] = useQuery()
```

# Realtime
Coming Soon

# Libraries
## Build/bundling tool
Vite is used as the build tool [DOCUMENTATION](https://vitejs.dev/)

## State Management
Mobx is used for state management. See src/state for main store. <a href="https://mobx.js.org/react-integration.html" target="_blank">DOCUMENTATION</a>

## Realtime
socket.io [DOCUMENTATION](https://socket.io/docs/v4/)

## Notifications
React Hot Toast [DOCUMENTATION](https://react-hot-toast.com/)

## Client Side Image Compression
browser image compression [DOCUMENTATION](https://github.com/Donaldcwl/browser-image-compression#readme)