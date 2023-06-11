import Joi from "joi";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const frameSchema = Joi.object({
  scorecardId: Joi.string(),
  rolls: Joi.array().items(Joi.number().min(1).max(3)).required(),
});

export const addFrame = async (data) => {
  if (!data) {
    return {
      error: "Invalid data",
    };
  }

  const frameValid = frameSchema.validate(data);
  if (frameValid.error) {
    return frameValid.error;
  }

  let scorecard = null;
  if (!data.scorecardId) {
    // create new scorecard
    scorecard = await prisma.scorecard.create({ data: {} });
  } else {
    // get scorecard
    scorecard = await prisma.scorecard.findUnique({
      id: data.scorecardId,
    });
  }

  // add frame to scorecard
  const frame = await prisma.frame.create({
    data: {
      scorecard: {
        connect: {
          id: scorecard.id,
        },
      },
      rolls: {
        create: data.rolls.map((roll) => ({
          pins: roll,
        })),
      },
    },
  });

  return frame;
};
