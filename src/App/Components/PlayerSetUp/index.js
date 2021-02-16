// @flow

import PlayerSetUpList from "./SetUpList.js";

export type Player = {
  name: string,
  gender: "m" | "w",
  level: 0 | 1 | 2,
  id: number,
};

export default PlayerSetUpList;
