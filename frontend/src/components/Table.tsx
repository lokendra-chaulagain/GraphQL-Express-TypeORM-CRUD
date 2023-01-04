import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import AddModal from "./AddModal";

const DELETE_USER = gql`
  mutation DeleteCategory($Id: ID!) {
    deleteUser(id: $Id)
  }
`;

export default function Table({ users }: any) {
  const [deleteUser] = useMutation(DELETE_USER);

  const handleDelete = async (id: number) => {
    deleteUser({ variables: { Id: id } });
  };

  return (
    <div>
      <table className="table  table-hover">
        <thead>
          <tr>
            <th scope="col">S.N</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Age</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user: any, index: any) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td col-span="2">{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <div className="d-flex gap-3 ">
                    <AddModal />

                    <button
                      type="button"
                      className="btn btn-warning px-3  btn-sm">
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(user.id)}
                      className="btn btn-danger btn-sm">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
