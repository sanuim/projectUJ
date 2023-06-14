import React, { useState, useEffect } from 'react';
import { ListGroup, Spinner } from 'react-bootstrap';

const ContinuousScrolling = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const generateData = () => {
    const newData = Array.from({ length: 20 }, (_, index) => ({
      id: index + 1 + (page - 1) * 20,
      title: `Item ${index + 1 + (page - 1) * 20}`,
      description: `Description for Item ${index + 1 + (page - 1) * 20}`,
    }));
    return newData;
  };

  const fetchData = () => {
    setIsLoading(true);
    const newData = generateData();
    setData((prevData) => [...prevData, ...newData]);
    setPage((prevPage) => prevPage + 1);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 200
    ) {
      fetchData();
    }
  };

  useEffect(() => {
    if (data.length >= 100) {
      setHasMore(false);
    } else {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [data]);

  return (
    <div className="text-center">
      <h2 className="my-4">Continuous Scrolling Example</h2>
      <ListGroup>
        {data.map((item) => (
          <ListGroup.Item key={item.id}>
            <strong>{item.title}</strong> - {item.description}
          </ListGroup.Item>
        ))}
      </ListGroup>
      {isLoading && (
        <div className="text-center mt-3">
          <Spinner animation="border" />
        </div>
      )}
      {!isLoading && hasMore && (
        <div className="text-center mt-3">
          <Spinner animation="grow" />
        </div>
      )}
      {!isLoading && !hasMore && (
        <div className="text-center mt-3">
          <p>End of content reached.</p>
        </div>
      )}
    </div>
  );
};

export default ContinuousScrolling;
