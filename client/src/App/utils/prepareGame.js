import units from "../Data/data.json";
import { isNil } from "ramda";

import type { Player } from "./PlayerSetUp";

type Unit = {
  type: "question" | "task",
  mode: 0 | 1,
  data: {
    question?: string,
    answer?: string,
    task?: string,
    time?: number,
    penalty: number,
    reward: number,
  },
};

export const prepareGame = (players: Array<Player>) => {
  let mainPlayer = undefined;

  let randomCheck = new Map();
  players.forEach(({ name }: Player) => {
    randomCheck.set(name, 0);
  });
  const random = count => Math.floor(Math.random() * count);

  const assignRandomPlayer = () => {
    const randomIndex = random(players.length);
    let randomPlayer = players[randomIndex].name;

    const count = randomCheck.get(randomPlayer);
    let unfair = false;

    randomCheck.forEach((value: number) => {
      if (count > value + 2) {
        unfair = true;
      }
    });

    if (unfair) {
      randomPlayer = assignLeastFrequentPlayer();
    }

    if (isNil(mainPlayer)) {
      mainPlayer = players.find(player => player.name === randomPlayer);
    } else if (mainPlayer.name === randomPlayer && !isNil(mainPlayer)) {
      return assignRandomPlayer();
    }
    randomCheck.set(randomPlayer, randomCheck.get(randomPlayer) + 1);

    return randomPlayer;
  };

  const assignLeastFrequentPlayer = () => {
    const firstEntry = randomCheck.entries().next().value;
    let [leastFrequentPlayer, minVal] = firstEntry;
    randomCheck.forEach((value: number, key: string) => {
      if (value < minVal) {
        leastFrequentPlayer = key;
      }
    });
    return leastFrequentPlayer;
  };

  const addInfo = ({ level }, penalty, reward) => {
    let trink = `trink ${(level + 1) * penalty}`;
    let verteil = `verteil ${2 * (level + 1) * penalty}`;
    if (penalty === -1) {
      trink = "Ex eine volle Mische";
    }
    if (reward === -1) {
      verteil = "Bestimmte jemanden, der eine volle Mische exen muss";
    }
    return `\n${trink}\n${verteil}`;
  };

  return units.map(({ type, mode, data }: Unit) => {
    const { [type]: main, penalty, reward, time, answer } = data;
    const customizedUnit = {};
    customizedUnit.type = type;

    if (type === "question") {
      customizedUnit.answer = answer;
    }

    const customized = main.replace(/person/g, assignRandomPlayer);
    customizedUnit[type] = customized + addInfo(mainPlayer, penalty, reward);

    if (!isNil(time)) {
      customizedUnit.time = time;
    }
    mainPlayer = undefined;
    return customizedUnit;
  });
};
