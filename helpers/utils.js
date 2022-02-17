import axios from "axios";
import { DyondoApi } from "../openapi-client";
import { API } from '../config';

export const createDyondoClient = (clientConfig) => {
    const axiosInstance = axios.create();
    return new DyondoApi(undefined, clientConfig.endpoint, axiosInstance);
};

export const dyondoClient = createDyondoClient({ endpoint: API });