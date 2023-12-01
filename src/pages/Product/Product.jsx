import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useEffect } from 'react';

const Product = () => {
  const [data, setData] = useState();

  const fetchData = async () => {
    const result = await fetch('http://localhost:3005/api/v1/products/static');
    const jsonData = await result.json();
    setData(jsonData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <ProductCard data={data} />
    </div>
  );
};

export default Product;
