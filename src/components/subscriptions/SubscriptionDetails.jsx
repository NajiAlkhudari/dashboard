"use client";

import { fetchSupscriptionById } from "@/Services/subscriptionService";
import { useState, useEffect } from "react";

const SubscriptionDetails = ({ id }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchSupscriptionById(id);
      if (result) {
        setData(result);
      } else {
        setError("Failed to fetch data");
      }
      setLoading(false);
    };

    if (id) {
      getData();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Subscription Details</h2>
      <p><strong>ID:</strong> {data.id}</p>
      <p><strong>Client:</strong> {data.clientName}</p>
      <p><strong>Start Date:</strong> {new Date(data.startDate).toLocaleDateString()}</p>
      <p><strong>End Date:</strong> {new Date(data.endDate).toLocaleDateString()}</p>
      <p><strong>Monthly Cost:</strong> {data.costPermonth} $</p>
      <p><strong>Notes:</strong> {data.notes}</p>


      {data.client && (
  <div>
    <h2>Client</h2>
    <p><strong>Name:</strong> {data.client.name}</p>
    <p><strong>Phone:</strong> {data.client.phone}</p>
  </div>
)}
      {data.supscriptionAgents?.length > 0 && (
        <div>
          <h3>Agents</h3>
          <ul>
            {data.supscriptionAgents.map((agent, index) => (
              <li key={index}>
                <strong>Agent:</strong> {agent.agentName} - <strong>Percentage:</strong> {agent.agentPercentage}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SubscriptionDetails;
