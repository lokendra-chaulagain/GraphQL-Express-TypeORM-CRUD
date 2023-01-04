import React from "react";
import Table from "../components/Table";
import { useQuery, gql } from "@apollo/client";
import AddCard from "../components/AddCard";

const GET_ALL_USER = gql`
  query {
    getAllUser {
      id
      name
      email
      age
    }
  }
`;

function Index() {
  const { loading, error, data } = useQuery(GET_ALL_USER);
  const users = data && data.getAllUser;
  console.log(users);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div className="container">
    <div className="d-flex justify-content-center py-5 ">
    <AddCard />
    </div>
      <Table users={users} />
    </div>
  );
}

export default Index;
