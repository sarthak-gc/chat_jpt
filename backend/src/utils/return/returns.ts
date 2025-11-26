import { Response } from "express";

export const invalidInput = (res: Response) => {
  res.status(400).json({
    status: "error",
    errorType: "InvalidInput",
    message: "Username and password are required",
  });
};

export const userNotFound = (res: Response) => {
  res.status(404).json({
    status: "error",
    errorType: "UserNotFound",
    message: "The requested user could not be found in the system.",
  });
};

export const messageNotFound = (res: Response) => {
  res.status(404).json({
    status: "error",
    errorType: "MessageNotFound",
    message: "The message you requested could not be found.",
  });
};

export const conversationNotFound = (res: Response) => {
  res.status(404).json({
    status: "error",
    errorType: "ConversationNotFound",
    message: "The requested conversation could not be found.",
  });
};
export const titlesNotFound = (res: Response) => {
  res.status(404).json({
    status: "error",
    errorType: "TitlesNotFound",
    message: "The requested titles could not be found.",
  });
};

export const success = (res: Response, message: string, data?: any) => {
  res.status(200).json({
    status: "success",
    message,
    data,
  });
};

export const userExists = (res: Response) => {
  res.status(409).json({
    status: "error",
    errorType: "UserExists",
    message: "A user with the provided information already exists.",
  });
};

export const internalError = (res: Response) => {
  res.status(500).json({
    status: "error",
    errorType: "InternalServerError",
    message:
      "An unexpected error occurred on the server. Please try again later.",
  });
};

export const tryDiffLogin = (res: Response) => {
  res.status(400).json({
    status: "error",
    errorType: "InvalidLoginTry",
    message: "Try login via google",
  });
};

export const unAuthorized = (res: Response) => {
  res.status(401).json({
    status: "error",
    errorType: "UnAuthorized",
    message: "Unable to access the conversation",
  });
};
