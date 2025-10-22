import { Request } from "express";

export type ExtendedRequest = Request & {
    companyId?: string,
    verify?: boolean
}