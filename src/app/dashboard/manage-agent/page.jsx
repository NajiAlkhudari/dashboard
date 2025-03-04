"use client";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './loading';
import Table from '@/components/partials/Table';
import { fetchAgents } from '@/store/agentSlice';

const Page = () => {
  const dispatch = useDispatch();
  const { agents, error, loading } = useSelector((state) => state.agents);

  useEffect(() => {
    dispatch(fetchAgents());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  const columns = [
    { header: "ID", key: "id" },
    { header: "Name", key: "name" },
    { header: "Phone", key: "phone" },
    { header: "Percentage", key: "percentage" },
    { header: "Notes", key: "notes" },
    { header: "Action", key: "action" },
  ];

  return (
    <div>
 
      <Table columns={columns} data={agents} />
     
    </div>
  );
};

export default Page;
