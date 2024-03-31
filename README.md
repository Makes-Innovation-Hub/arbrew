# [Arabrew]()

Arabrew is a real time chat website mobile first approach that should connect different cultures and should translate into the language of each user, with the help of open ai api

## [Figma Design]()

![Arabrew-Figma-31-03-2024](/README-IMAGES/Arabrew-Figma.png)

## [App Flow]()

![Arabrew-Flow-Diagram-Drawio](/README-IMAGES/Arabrew-Diagram.png)

---

### Arabrew Teaser - [https://youtu.be/NL7cNWGYQJo](https://youtu.be/NL7cNWGYQJo)

---

# [Table Of Content]()

- [Installation](#installation)
- [Mongo DB setup](#mongo-db-setup)
- [Open AI setup](#open-ai-setup)
- [Auth 0 setup](#auth-0-setup)
- [License](#license)

---

## Installation

```
git clone https://github.com/Makes-Innovation-Hub/arabrew.git
```

`server .env setup:`

```
cd arabrew
npm run generate-env
```

`PORT`: 1024 - 65535, for example 5000 | type: number

`NODE_ENVIRONMENT`: development/production for example: development | type: string

`MONGO_URI_DEVELOPMENT`: [Mongo DB setup](#mongo-db-setup)

`MONGO_URI_PRODUCTION`: [Mongo DB setup](#mongo-db-setup)

`OPEN_AI_API_KEY`: [Open AI setup](#open-ai-setup)

`ACCESS_TOKEN_SECRET`: for example MySecret

`make client .env file`:

```
cd arabrew/client
touch .env
```

`VITE_SERVER_BASE_URL`= http://localhost | type: string

`VITE_SERVER_PORT`= 1024 - 65535 for example 5000 | type: number

`VITE_AUTH0_DOMAIN`= [Auth 0 setup](#auth-0-setup)

`VITE_AUTH0_CLIENT_ID`= [Auth 0 setup](#auth-0-setup)

`install dependencies`:

```
cd arabrew
npm run install-all
```

`run server`:

```
cd arabrew
npm run dev
```

`run client`:

```
cd arabrew/client
npm run dev
```

## Mongo DB setup

- sign in to mongodb website: https://www.mongodb.com/

  ![צילום מסך 2023-06-26 ב-11 56 44](https://github.com/Makes-Innovation-Hub/arabrew/assets/53153372/205524f2-3e84-4de6-857e-87e113aef288)

- press "+ New Project" button

  ![צילום מסך 2023-06-26 ב-11 59 10](https://github.com/Makes-Innovation-Hub/arabrew/assets/53153372/07033b0d-bf7a-4894-8407-4ea7b160e4c1)

- give project name

  ![צילום מסך 2023-06-26 ב-12 02 23](https://github.com/Makes-Innovation-Hub/arabrew/assets/53153372/d76cb2ae-1380-4c07-b3fc-dd21cea54b6a)

- press "Next" button
- press "Create Project" button

![צילום מסך 2023-06-26 ב-12 05 43](https://github.com/Makes-Innovation-Hub/arabrew/assets/53153372/42c2d9e9-50cd-41f7-8210-891064e3e9b6)

- press "Add Current IP Address" button

![צילום מסך 2023-06-26 ב-12 06 48](https://github.com/Makes-Innovation-Hub/arabrew/assets/53153372/c6bd10bd-f777-4b24-8eb6-ee4fd7b53cf0)

- press green "+ Create" button

![צילום מסך 2023-06-26 ב-13 01 48](https://github.com/Makes-Innovation-Hub/arabrew/assets/53153372/29c2bae6-53d9-4af8-a5dc-0f33b86262d2)

- check M0 free option

![צילום מסך 2023-06-26 ב-12 09 56](https://github.com/Makes-Innovation-Hub/arabrew/assets/53153372/3ff5bddf-07be-47a4-8519-109f0c5610e4)

- check aws

![צילום מסך 2023-06-26 ב-12 11 57](https://github.com/Makes-Innovation-Hub/arabrew/assets/53153372/164929c2-609a-43ff-ad38-aae4e0209867)

- pick closest region

![צילום מסך 2023-06-26 ב-12 13 33](https://github.com/Makes-Innovation-Hub/arabrew/assets/53153372/dff983d7-6f9e-4e67-9b68-a3702d900c86)

- give cluster development name

![צילום מסך 2023-06-26 ב-12 14 49](https://github.com/Makes-Innovation-Hub/arabrew/assets/53153372/52ef9c3c-aee7-4481-bd28-b2371c8c24fe)

- press green "Create" button

![צילום מסך 2023-06-26 ב-12 15 58](https://github.com/Makes-Innovation-Hub/arabrew/assets/53153372/f510800a-caa7-4d22-98ba-c8a4f3afbbe6)

- check "Username and Password"

![צילום מסך 2023-06-26 ב-12 18 25](https://github.com/Makes-Innovation-Hub/arabrew/assets/53153372/dee59938-2005-4d7d-912c-6d480f53ad14)

- give Username and Password

![צילום מסך 2023-06-26 ב-12 19 39](https://github.com/Makes-Innovation-Hub/arabrew/assets/53153372/8e8124d5-9cda-4b60-8e87-bda08950acd9)

- press green "Create User" button

![צילום מסך 2023-06-26 ב-12 20 52](https://github.com/Makes-Innovation-Hub/arabrew/assets/53153372/0a07864c-1ffe-4db8-a3ab-83b6493d5e11)

- check "Cloud Environment"

![צילום מסך 2023-06-26 ב-12 24 02](https://github.com/Makes-Innovation-Hub/arabrew/assets/53153372/76367e81-c4f8-4e43-bc0d-40b330c65839)

- IP Address: 0.0.0.0/0
- Description: open for all

![צילום מסך 2023-06-26 ב-12 27 18](https://github.com/Makes-Innovation-Hub/arabrew/assets/53153372/6d23ff1a-013a-4dd0-9373-9f8efc96f54d)

- press "Add Entry" button

![צילום מסך 2023-06-26 ב-12 28 51](https://github.com/Makes-Innovation-Hub/arabrew/assets/53153372/21bf3534-38d9-45b4-be1e-a645661c7558)

- press "Finish and Close" button

![צילום מסך 2023-06-26 ב-12 32 04](https://github.com/Makes-Innovation-Hub/arabrew/assets/53153372/bce1a1e9-fd79-498e-9982-1752f2a3dade)

## Open AI setup

- open ai website: https://openai.com/
- goto menu

![צילום מסך 2023-06-26 ב-12 35 32](https://github.com/Makes-Innovation-Hub/arabrew/assets/53153372/147a8f55-f0ec-4777-951c-79c165d47f43)

- goto Log in

![צילום מסך 2023-06-26 ב-12 49 14](https://github.com/Makes-Innovation-Hub/arabrew/assets/53153372/478cbaa7-41fe-4fb2-8695-4ea5f98708ac)

- press API box

![צילום מסך 2023-06-26 ב-12 38 21](https://github.com/Makes-Innovation-Hub/arabrew/assets/53153372/d2a8afc1-8ac4-4b2a-8c61-708b87901dc5)

- upper menu right side, press "Personal"

![צילום מסך 2023-06-26 ב-12 39 33](https://github.com/Makes-Innovation-Hub/arabrew/assets/53153372/3da1f623-c923-49f5-9ce4-3a334230e352)

- press "View API keys"

![צילום מסך 2023-06-26 ב-12 50 32](https://github.com/Makes-Innovation-Hub/arabrew/assets/53153372/8b55566b-621f-4abe-a401-7ee79a4ce294)

- press "+ Create new secret key" button

![צילום מסך 2023-06-26 ב-12 44 29](https://github.com/Makes-Innovation-Hub/arabrew/assets/53153372/13a95b31-3424-40c6-8062-5f826fee3df5)

## Auth 0 setup

- goto https://auth0.com/

![צילום מסך 2023-06-26 ב-13 07 26](https://github.com/Makes-Innovation-Hub/arabrew/assets/53153372/1ceddbb9-f75c-485a-9176-ced373e2e4e6)

- press login

![צילום מסך 2023-06-26 ב-13 08 22](https://github.com/Makes-Innovation-Hub/arabrew/assets/53153372/4468738e-e75d-4065-9038-c442d989aeab)

- press "Create Application"

![צילום מסך 2023-06-26 ב-13 10 07](https://github.com/Makes-Innovation-Hub/arabrew/assets/53153372/579bc4a5-0055-480a-9ded-82524f16ba48)

- give name

![צילום מסך 2023-06-26 ב-13 11 32](https://github.com/Makes-Innovation-Hub/arabrew/assets/53153372/7b141ed2-2996-42d9-a9c0-49bc66562343)

- choose "Single Page Web Applications"

![צילום מסך 2023-06-26 ב-13 12 42](https://github.com/Makes-Innovation-Hub/arabrew/assets/53153372/2376539d-82b3-45bc-8827-edd9211711bc)

- press "Create"

![צילום מסך 2023-06-26 ב-13 13 44](https://github.com/Makes-Innovation-Hub/arabrew/assets/53153372/38bd96a5-427a-4a46-a563-27738c03f934)

- press react logo

![צילום מסך 2023-06-26 ב-13 15 12](https://github.com/Makes-Innovation-Hub/arabrew/assets/53153372/4462848d-90f8-42fe-b8c3-4a6254c77e46)

- press "Settings" tab

![צילום מסך 2023-06-26 ב-13 54 25](https://github.com/Makes-Innovation-Hub/arabrew/assets/53153372/b5f73835-b6d8-4a8a-8b2f-9eac5b0af643)

![צילום מסך 2023-06-26 ב-14 03 51](https://github.com/Makes-Innovation-Hub/arabrew/assets/53153372/e8c77e0e-0181-4456-89c5-4b13badeea04)

## License

The MIT License (MIT)

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
