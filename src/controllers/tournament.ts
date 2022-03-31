import { Request, Response } from "express";
import {
  Error,
  SuccessMessage,
} from "../models/types";
import { User } from "../models/user";
import { db } from "../index";
import { formatResp } from "../utils/firebase";
import { bergerTable } from "../utils/bergerTable";

export const tournamentController = {
  get: async (
    req: Request,
    res: Response<(User & { tournament: any[] }) | Error | SuccessMessage>
  ) => {
    const docRef = await db.collection("users").get();
    const users = await formatResp(docRef);
    console.log(bergerTable(users));
    
    res.json({ message: "ok", tournament: bergerTable(users) });
  },
};
