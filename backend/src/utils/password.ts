import bcrypt from "bcrypt";
import { saltRound } from "../constant";


export const hashPass = async (password: string): Promise<string | undefined> => {
  try {
    
    const hashPas: string = await bcrypt.hash(password, saltRound);

    return hashPas;
  } catch (error: any) {
    console.log(error);
  }
};

export const verifyPass = async (
  password: string,
  hash: string,
): Promise<boolean | string | undefined> => {
  try {
    const compare = await bcrypt.compare(password, hash);

    if (!compare) {
      const error: string = "Invalid password";
      return error;
    }

    return compare;
  } catch (error: any) {
    console.log(error);
    
  }
};