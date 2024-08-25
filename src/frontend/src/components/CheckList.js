import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/CheckList.css";

const CheckList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // 서버에서 체크리스트 항목을 가져오는 함수
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/checklists"
        );
        setItems(response.data);
      } catch (error) {
        console.error("There was an error fetching the checklists!", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="checklist">
      <h1>QC TEST WEB</h1>
      <div className="listBox">
        {items.map((item) => (
          <Link to={`/checklist/${item.id}`} key={item.id} className="list">
            {item.title}
          </Link>
        ))}
      </div>
      <button>새로 만들기</button>
    </div>
  );
};

export default CheckList;
