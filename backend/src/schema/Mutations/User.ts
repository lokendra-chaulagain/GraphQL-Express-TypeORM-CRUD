import { GraphQLBoolean, GraphQLID, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString, graphqlSync } from "graphql";
import { User } from "../../entities/User";
import { hashPassword, comparePassword } from "../../libs/bcrypt";
import { MessageType } from "../TypeDefs/Message";
import { UserType } from "../TypeDefs/User";

export const CREATE_USER = {
  type: UserType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: any) {
    const { name, username, password } = args;

    const encryptPassword = await hashPassword(password);

    // User.create
    const result = await User.insert({
      name,
      username,
      password,
    });

    return { ...args, id: result.identifiers[0].id, password: encryptPassword };
  //return args
  },
};

export const DELETE_USER = {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(_: any, { id }: any) {
    const result = await User.delete({ id });
    if (result.affected! > 0) return true;
    return false;
  },
};

export const UPDATE_USER = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
    input: {
      type: new GraphQLInputObjectType({
        name: "UserInput",
        fields: () => ({
          name: { type: GraphQLString },
          username: { type: GraphQLString },
          oldPassword: { type: GraphQLString },
          newPassword: { type: GraphQLString },
        }),
      }),
    },
  },
  async resolve(_: any, { id, input }: any) {
    const userFound = await User.findOneBy({ id });
    if (!userFound) throw new Error("User not found");

    // Compare old password with the new password
    const isMatch = await comparePassword(userFound?.password as string, input.oldPassword);
    if (!isMatch) throw new Error("Passwords does not match");

    // Hasing the password and deleteting oldPassword and new Password
    const newPassword = await hashPassword(input.newPassword);
    delete input.oldPassword;
    delete input.newPassword;

    // Adding passsword to the input for update
    input.password = newPassword;

    const response = await User.update({ id }, input);

    if (response.affected === 0) return { message: "User not found" };

    return {
      success: true,
      message: "Update User successfully",
    };
  },
};