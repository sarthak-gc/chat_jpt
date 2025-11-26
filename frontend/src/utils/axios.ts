import a from "axios";

import { BACKEND_URL } from "./constants.ts";

const axios = a.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

export default axios;
