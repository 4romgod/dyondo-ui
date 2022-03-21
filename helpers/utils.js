import { API } from '../config';
import { createDyondoApiClient } from "@dyondo/client";

export const dyondoClient = createDyondoApiClient({ endpoint: API });
