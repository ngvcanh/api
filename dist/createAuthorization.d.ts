import { TApiAuthorizationType } from "./types";
declare const createAuthorization: (token: string, type?: TApiAuthorizationType) => Record<'Authorization', string>;
export default createAuthorization;
