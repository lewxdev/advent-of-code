// Find the challenge here: https://adventofcode.com/2022/day/12

type ZXCoordinate = [z: number, x: number];

interface HeightMap {
  elevations: number[][];
  poi: { initial: ZXCoordinate; target: ZXCoordinate };
  maxZ: number;
  maxX: number;
}

const buildHeightMap = (input: string): HeightMap => {
  const rows = input.trim().split("\n");
  return rows.reduce(
    (result, row, z) => ({
      ...result,
      elevations: [
        ...result.elevations,
        row.split("").reduce((acc, char, x) => {
          switch (char) {
            case "S":
              result.poi.initial = [z, x];
              return [...acc, 97];

            case "E":
              result.poi.target = [z, x];
              return [...acc, 122];

            default:
              return [...acc, char.charCodeAt(0)];
          }
        }, []),
      ],
    }),
    {
      elevations: [],
      poi: {},
      maxZ: rows.length - 1,
      maxX: rows[0].length - 1,
    } as HeightMap
  );
};

const getAvailableMovesHOF = ({ elevations, maxZ, maxX }: HeightMap) => {
  const getMoveValidityHOF =
    ([currentZ, currentX]: ZXCoordinate, prev?: ZXCoordinate) =>
    ([nextZ, nextX]: ZXCoordinate) => {
      const [prevZ, prevX] = prev ?? [];
      const elevation = elevations[currentZ][currentX];

      const isUnvisited = !prev || !(prevZ === nextZ && prevX === nextX);
      const isWithinBounds =
        nextZ >= 0 && nextZ <= maxZ && nextX >= 0 && nextX <= maxX;
      const isLowCost =
        isWithinBounds &&
        (elevation >= elevations[nextZ][nextX] ||
          elevation === elevations[nextZ][nextX] + 1);

      return isUnvisited && isLowCost;
    };

  return ([currentZ, currentX]: ZXCoordinate, prev?: ZXCoordinate) => {
    // prettier-ignore
    const moveU = [currentZ - 1, currentX],
          moveD = [currentZ + 1, currentX],
          moveR = [currentZ, currentX + 1],
          moveL = [currentZ, currentX - 1];

    return ([moveU, moveD, moveR, moveL] as ZXCoordinate[]).filter(
      getMoveValidityHOF([currentZ, currentX], prev)
    );
  };
};

exports.hillClimbingAlgorithmPart1 = (input: string) => {
  const heightMap = buildHeightMap(input);
  const getAvailableMoves = getAvailableMovesHOF(heightMap);

  const steps = (function recursiveOptionsSearch(
    path = [heightMap.poi.initial],
    options: { [path: string]: number } = {}
  ) {
    for (const option of getAvailableMoves(path.at(-1), path.at(-2))) {
      if (option.join() === heightMap.poi.target.join()) return path.length

      const optionPath = [...path, option]
      const { [path.join("->")]: parentStepCount, ...restOptions } = options

      recursiveOptionsSearch(optionPath, {
        ...restOptions,
        [optionPath.join("->")]: parentStepCount ? parentStepCount + 1 : 1
      })
    }
  })();

  return steps
};

exports.hillClimbingAlgorithmPart2 = (input: string) => {};

if (require.main === module) {
  const { testSolutions } = require("testers/javascript");
  testSolutions(__dirname, Object.values(exports));
}
