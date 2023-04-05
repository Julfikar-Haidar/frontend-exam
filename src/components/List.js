import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editActive, fetchPlaceholderList, removeData, trushData } from "../features/crud/crudSlice";
const List = () => {
  const dispatch = useDispatch();
  const [post, setpost] = useState([]);
  const {  isLoading } = useSelector((state) => state.crud);

  useEffect(() => {
    dispatch(fetchPlaceholderList());
  }, [dispatch]);

useEffect(() => {
    const postData = localStorage.getItem("placeholderList");
    const jsonData = JSON.parse(postData);
    setpost(jsonData);

},[isLoading])



const handleEdit = (index) => {
  dispatch(editActive(index));
  localStorage.setItem('editIndex', index.id)

};

const handleDelete = (id) => {
  // need for server side
  dispatch(removeData(id));
  // locally reomove data
  dispatch(trushData(id))
    const postData = localStorage.getItem("placeholderList");
    const jsonData = JSON.parse(postData);
    setpost(jsonData);
  

};

  return (
    <>
      <h1 className="text-center">List</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {post?.map((item, i) => {
            return (
              <tr key={i}>
                <th scope="row">{i}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <button
                   type="button" className="btn btn-sm btn-primary"
                   onClick={() => handleEdit(item)}
                   >
                    Edit
                  </button>
                  <button 
                  type="button" className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      ​
    </>
  );
};

export default List;
