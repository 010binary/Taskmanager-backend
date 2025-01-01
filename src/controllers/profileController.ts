import { Request, Response } from "express";
import ProfileQuery from "@helpers/ProfileQuery";

const changestatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body.payload as { id: string };

    const result = await ProfileQuery.Status(id);

    if (!result.success) {
      res.status(400).json({ message: result.error });
      return;
    }

    res.status(200).json({
      message: "Status changed successfully",
      value: result.data.isVisible,
    });
    return;
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
    return;
  }
};

const updateprofile = async (req: Request, res: Response): Promise<void> => {
  try {
  //const { id } = req.body.payload as { id: string };
     // const { fileUrl, ...otherFields } = req.body;

    console.log("Request payload: ", req.body);
    console.log("file data: ", req.file);
    
    //const result = await ProfileQuery.Status(id);
    //
    //if (!result.success) {
    //  res.status(400).json({ message: result.error });
    //  return;
    //}
    //
    //res.status(200).json({
    //  message: "Status changed successfully",
    //  value: result.data.isVisible,
    //});
    return;
    // Update
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
    return;
  }
};

export { changestatus, updateprofile };
