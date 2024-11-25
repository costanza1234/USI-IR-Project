import React, { useEffect, useState } from 'react';

interface dataStructure {
  item_id: number;
  q: number | null;
}

const TestComponent: React.FC = () => {
  const [data, setData] = useState<dataStructure>({ item_id: 0, q: null });
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('fetching data');
        const res = await fetch('http://localhost:8000/items/8?test=5');
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Fetched Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default TestComponent;
