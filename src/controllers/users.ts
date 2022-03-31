import { Request, Response } from "express";
import { BadMessage, Error, ObjectReduce, SuccessMessage } from "../models/types";
import { User } from "../models/user";
import { db } from "../index";
import { formatResp } from "../utils/firebase";
import { clubsMock } from "../mocks/clubs";
// const [users, dispatch] = usersSelector();


export const usersController = {
  signUp: async(
    { body }: Request<{}, {}, Omit<User, "id">>,res: Response<User | Error | SuccessMessage | {user: User & {id: number}} & SuccessMessage>) => {
      const {lastname, username, nickname, password ,createdAt, club} = body;
      if(!lastname || !username || !nickname || !password || !createdAt || !club )return res.json({error: "Invalid request!"}); 
      const docRef = await db.collection('users').get();
      const users = await formatResp(docRef);

      const idNewUser = Math.max(...users.map(({id}) => Number(id))) + 1;

      if(users.some(({nickname: nicknameUser}) => nicknameUser ===  nickname)) return res.json({error: "Nickname already used!"});
      if(users.some(({club: clubUser}) => clubUser ===  club)) return res.json({error: "Club already used!"});
      if(!clubsMock.some(({name: nameClub}) => nameClub === club )) return res.json({error: "Invalid club!"});

  
      const newUser = await db.collection('users').doc(String(idNewUser));

      await newUser.set(body);
  
      res.json({ message: "ok", user: {...body, id: idNewUser}});
},  
  getUsers: async(
  req: Request<{}, {}, Record<"nickname" | "name" | "username" | "club" | "createdAt", string>>,res: Response<(User & {id: string})[] | Error>) => {
  

    const docRef = await db.collection('users').get();
    const resp = formatResp(docRef);
    res.json(resp);
},
  checkUsername: async(
  {body: {nickname}}: Request<{}, {}, Record<"nickname", string>>,res: Response<User | Error | SuccessMessage | BadMessage>) => {

    const docRef = await db.collection('users').get();
    const resp = formatResp(docRef);
    
    if(!nickname) return res.json({message: "bad!"});
    if(resp.some(({nickname: nicknameUser}) => nicknameUser === nickname ))return res.json({message: "bad!"});
    
    res.json({message: "ok"});
}
}
