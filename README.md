# Custom call API with axios

## Installation

```
npm i --save @kensoni/api
```

## Using

```js
import { createApi, apiGet } from '@kensoni/api';

const configs = {
  baseURL: '/api/v1'
}

createApi(configs);
apiGet('users/');
```

Support functions:
- apiGet()
- apiPost()
- apiPut()
- apiPatch()
- apiDelete()
- apiHead()
- createApi(configs).api()
- createApi(configs).apiInstance (API Instance from axios)
- createContentType()
- createAuthorization()

`createApi` function will make the instance of singleton class `ApiInstance`.