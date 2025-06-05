This project was created using [the official Next.js docs](https://nextjs.org/docs/app/getting-started/installation) over App Router configuration. Tailwinds and Typescript are configured by Next.js. Shadcn and TRPC are both installed and configured manually.

## Getting Started

Install depencencies. This projects uses **npm** and will show installation and command execution with it, but other package managers of your choice should work just fine:

```bash
npm install
```

Then, manually build and run the application with:

```bash
npm run build
```

```bash
npm run start
```

Alternativley, you can run the development server:

```bash
npm run dev
```

Next, open [http://localhost:3000](http://localhost:3000) with your browser to test the application.

## API

Included in the repository there is a postman collection (_vidext-tech-test.postman_collection.json_) ready to test the available API points. Since the app doesn't use superjson or other [Data Transformers](https://trpc.io/docs/server/data-transformers) you may test it with other API platforms of your choice.

The following endpoints are available:

- `http://localhost:3000/api/trpc/getSnapshot` - Requests the stored snapshot, returns an empty object if none is present.
- `http://localhost:3000/api/trpc/setSnapshot` - Creates an entry in the table or overwrites the stored snapshot if one exists.
- `http://localhost:3000/api/trpc/deleteSnapshot` - Deletes the stored snapshot. This action, instead of setting a deletedAt to a Date, is destructive and will remove the stored data. Only usable from an API platform.

<details>
  <summary>An example of a JSON object to pass to the setSnapshot endpoint</summary>

```json
{
  "document": {
    "store": {
      "document:document": {
        "gridSize": 10,
        "name": "",
        "meta": {},
        "id": "document:document",
        "typeName": "document"
      },
      "page:page": {
        "meta": {},
        "id": "page:page",
        "name": "Page 1",
        "index": "a1",
        "typeName": "page"
      },
      "shape:54YaWz4ExdonjIiO3Wu1z": {
        "x": 286.21875,
        "y": 148.30078125,
        "rotation": 0,
        "isLocked": false,
        "opacity": 1,
        "meta": {},
        "id": "shape:54YaWz4ExdonjIiO3Wu1z",
        "type": "geo",
        "props": {
          "w": 859.05078125,
          "h": 428.89453124999994,
          "geo": "rectangle",
          "color": "black",
          "labelColor": "black",
          "fill": "none",
          "dash": "draw",
          "size": "m",
          "font": "draw",
          "align": "middle",
          "verticalAlign": "middle",
          "growY": 0,
          "url": "",
          "scale": 1,
          "richText": {
            "type": "doc",
            "content": [
              {
                "type": "paragraph",
                "attrs": {
                  "dir": "auto"
                },
                "content": [
                  {
                    "type": "text",
                    "text": "A rectangle with text created using the API"
                  }
                ]
              }
            ]
          }
        },
        "parentId": "page:page",
        "index": "a1",
        "typeName": "shape"
      }
    },
    "schema": {
      "schemaVersion": 2,
      "sequences": {
        "com.tldraw.store": 4,
        "com.tldraw.asset": 1,
        "com.tldraw.camera": 1,
        "com.tldraw.document": 2,
        "com.tldraw.instance": 25,
        "com.tldraw.instance_page_state": 5,
        "com.tldraw.page": 1,
        "com.tldraw.instance_presence": 6,
        "com.tldraw.pointer": 1,
        "com.tldraw.shape": 4,
        "com.tldraw.asset.bookmark": 2,
        "com.tldraw.asset.image": 5,
        "com.tldraw.asset.video": 5,
        "com.tldraw.shape.arrow": 6,
        "com.tldraw.shape.bookmark": 2,
        "com.tldraw.shape.draw": 2,
        "com.tldraw.shape.embed": 4,
        "com.tldraw.shape.frame": 1,
        "com.tldraw.shape.geo": 10,
        "com.tldraw.shape.group": 0,
        "com.tldraw.shape.highlight": 1,
        "com.tldraw.shape.image": 5,
        "com.tldraw.shape.line": 5,
        "com.tldraw.shape.note": 9,
        "com.tldraw.shape.text": 3,
        "com.tldraw.shape.video": 3,
        "com.tldraw.binding.arrow": 1
      }
    }
  },
  "session": {
    "version": 0,
    "currentPageId": "page:page",
    "exportBackground": true,
    "isFocusMode": false,
    "isDebugMode": false,
    "isToolLocked": false,
    "isGridMode": false,
    "pageStates": [
      {
        "pageId": "page:page",
        "camera": {
          "x": 0,
          "y": 0,
          "z": 1
        },
        "selectedShapeIds": [],
        "focusedGroupId": null
      }
    ]
  }
}
```

</details>
<br>

## Observations

To keep it as simple as possible, the application uses a local SQLite Database that is created on project innitialization. A single table is used to store and retrieve the user snapshot and session for the editor with a hard coded ID for said purpose. A throttled function will perdiodically send requests to update the data.

### Future of the app

While the app accomplishes the Functional and Technical requirements, after playing around with tldraw there's a lot of place for improvement that, I had more time for, I would've love to implement.

- Proper users, with login and register functions that could be expanded again later and made more robuts using a library like [https://next-auth.js.org/](NextAuth.js)

- [@tldraw/sync](https://tldraw.dev/docs/sync) for multiplayer purposes. Adding proper user properties like independent storage on the backend and being able to share with others and using sockets to sync data to give a more solid and actually scalable experience over a proper database like PostgreSQL.

- [@tldraw/ai](https://github.com/tldraw/ai/tree/5740fcc4ccb30fac062d86f0b130078dbcebba7a) I saw powerful usage connecting to the tldraw sdk with AI tools, specifically [this post by Google](https://ai.google.dev/showcase/tldraw?hl=es-419) using their Gemini LLM. I think this is extremly interesting but time constraints made me take the decision to no proceed with it and deliver an half baked implementation.

- Proper testing using [jest](https://jestjs.io/es-ES/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/). The most time consuming task but the one task that will always return time by solving problems before they happen.
