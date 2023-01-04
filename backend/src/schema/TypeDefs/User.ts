import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } from "graphql";

export const UserType = new GraphQLObjectType({
  name: "User",
  description: "User Type Definition",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});
