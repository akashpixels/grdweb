/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpApi } from "api/Http.api";
// import { IValidateTokenResponse } from "interfaces/ApiInterface/IAuth";
// import { AuthRequest } from "interfaces/ClientInterface/IAuth";

export const fetchLoggedInDetails = (loginPayload: any): Promise<any> =>
  httpApi
    .post<any>("BStoresWebStore/ValidateCSRToken", { ...loginPayload })
    .then(({ data }) => data);
