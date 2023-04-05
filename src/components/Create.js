import React, { useEffect, useState } from "react";
import {
  createData,
  changeData,
  fetchPlaceholderList,
} from "../features/crud/crudSlice";
import { useDispatch, useSelector } from "react-redux";

const Create = () => {
  const dispatch = useDispatch();
  const { editing } = useSelector((state) => state.crud) || {};

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editMode, setEditMode] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    dispatch(
      createData({
        name,
        email,
      })
    );
    reset();
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    dispatch(
      changeData({
        id: editing?.id,
        data: {
          name: name,
          email: email,
        },
      })
    );
    setEditMode(false);
    reset();
  };

  const reset = () => {
    setName("");
    setEmail("");
  };

  //  listen for edit mode active
  useEffect(() => {
    const { id, name, email } = editing || {};
    if (id) {
      setEditMode(true);
      setName(name);
      setEmail(email);
    } else {
      setEditMode(false);
      reset();
    }
  }, [editing]);

  return (
    <>
      <h1 className="text-center">{editMode ? "Update" : "Create"}</h1>

      <form onSubmit={editMode ? handleUpdate : handleCreate}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            placeholder="Enter a name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter description"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default Create;
