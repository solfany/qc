import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../css/ChecklistDetail.css"; // Create and import CSS for styling

const ChecklistDetail = () => {
  const { id } = useParams();
  const details = {
    1: { title: "Note 1", content: "Detailed information for Note 1" },
    2: { title: "Note 2", content: "Detailed information for Note 2" },
    3: { title: "Note 3", content: "Detailed information for Note 3" },
  };

  const detail = details[id];
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    text: "",
    category: "",
    status: "Not Started",
  });

  const handleAddItem = () => {
    setItems([...items, newItem]);
    setNewItem({ text: "", category: "", status: "Not Started" });
  };

  const handleStatusChange = (index, status) => {
    const newItems = [...items];
    newItems[index].status = status;
    setItems(newItems);
  };

  return (
    <div className="checklist-detail">
      <h1>{detail.title}</h1>
      <p>{detail.content}</p>
      <div className="checklist-form">
        <input
          type="text"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          placeholder="Category"
        />
        <input
          type="text"
          value={newItem.text}
          onChange={(e) => setNewItem({ ...newItem, text: e.target.value })}
          placeholder="Add new item"
        />

        <button onClick={handleAddItem}>Add</button>
      </div>
      <table className="checklist-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Item</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.category}</td>
              <td>{item.text}</td>
              <td>
                <select
                  value={item.status}
                  onChange={(e) => handleStatusChange(index, e.target.value)}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChecklistDetail;
