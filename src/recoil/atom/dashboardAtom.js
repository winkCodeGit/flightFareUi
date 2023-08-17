import { atom } from "recoil";

export const spinner = atom({
  key: "isSpin",
  default: false,
});

export const loginApplied = atom({
  key:"isLogined",
  default:false,
});

