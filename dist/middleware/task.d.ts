import type { Request, Response, NextFunction } from "express";
import { ITask } from "../models/Task";
declare global {
    namespace Express {
        interface Request {
            task: ITask;
        }
    }
}
export declare function taskExists(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function taskBelongToProject(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>>;
export declare function hasAuthorizationt(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>>;
