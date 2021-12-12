import { TApiAuthorizationType } from "./types";

const createAuthorization = (token: string, type: TApiAuthorizationType = 'Bearer'): Record<'Authorization', string> => {
  return { Authorization: `${ type } ${ token }` };
}

export default createAuthorization;