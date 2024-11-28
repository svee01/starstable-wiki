import { Stable } from "./stable.interface";
import { User } from "./user.interface";

export interface Character {
    id: string;
    name: string;
    ridingSkill: number;
    // user: User;
    // stable: Stable;
    userId: string;
    stableId: string;
  }
  