import { InvitationClass, InvitationModel } from "../models/invitations";
import { Request } from "express";
import { UserModel } from "../models/user";

const Invite = async (req: Request, friendID: string) => {
  if (!req.session.user?.id) {
    return null;
  }
  const newInvitation: InvitationClass = await InvitationModel.create({
    host: req.session.user.id,
    friend: friendID,
  });

  if (!newInvitation) {
    return null;
  } else {
    await UserModel.findOneAndUpdate(
      { _id: req.session.user.id },
      { gameStatus: 1 }
    );
    return newInvitation;
  }
};

export default Invite;
