import { GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";
import { User } from "../../entities/User";
import { UserType } from "../TypeDefs/User";

export const GET_ALL_USER = {
  type: new GraphQLList(UserType),
  resolve(parent: any, args: any) {
    return User.find();
  },
};

export const GET_USER = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(parent: any, args: any) {
    const result = await User.findOneBy({ id: args.id });
    return result;
  },
};
