import { GraphQLBoolean, GraphQLID, GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } from "graphql";
import { User } from "../../entities/User";
import { MessageType } from "../TypeDefs/Message";
import { UserType } from "../TypeDefs/User";

export const CREATE_USER = {
  type: UserType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
  },
  async resolve(parent: any, args: any) {
    const { name, email, age } = args;
    const result = await User.insert({
      name,
      email,
      age,
    });

    return { ...args, id: result.identifiers[0].id };
  },
};

export const DELETE_USER = {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(parent: any, args: any) {
    const result = await User.delete({ id: args.id });
    if (result.affected! > 0) return true;
    return false;
  },
};

export const UPDATE_USER = {
  type: MessageType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    input: {
      type: new GraphQLInputObjectType({
        name: "UserInput",
        fields: () => ({
          name: { type: GraphQLString },
          email: { type: GraphQLString },
          age: { type: GraphQLInt },
        }),
      }),
    },
  },
  async resolve(parent: any, { id, input }: any) {
    const response = await User.update({ id }, input);
    if (response.affected === 0) return { message: "User not found" };

    return {
      success: true,
      message: "Update User successfully",
    };
  },
};
