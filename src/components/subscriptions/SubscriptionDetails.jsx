"use client";

import { fetchSupscriptionById } from "@/Services/subscriptionService";
import { useState, useEffect } from "react";
import Card from "../ui/Card";
import { MdSubscriptions } from "react-icons/md";

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
    <>
      <div className="space-y-6">
        <Card className="p-10">
          <div className="grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-5 justify-start items-center space-x-8 space-y-4">
            <div className="flex space-x-2">
              <div>
                <MdSubscriptions size={70} />
              </div>
              <div>
                <h1 className="text-2xl">Subscription</h1>
                <p className="dark:text-gray-400">
                  <strong className="dark:text-gray-400">ID:</strong> {data.id}
                </p>
              </div>
            </div>
            <div className="bg-background p-6 rounded-md">
              <p className="text-green-800 dark:text-green-300">
                <strong className="text-black dark:text-gray-400">
                  Start Date:
                </strong>{" "}
                {new Date(data.startDate).toLocaleDateString()}
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg">
              <p className="text-red-800 dark:text-red-400">
                <strong className="text-black dark:text-gray-400">
                  End Date:
                </strong>{" "}
                {new Date(data.endDate).toLocaleDateString()}
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg">
              <p>
                <strong className="dark:text-gray-400">Monthly Cost:</strong>{" "}
                {data.costPermonth}
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg">
              <p>
                <strong className="dark:text-gray-400">Notes:</strong>{" "}
                {data.notes}
              </p>
            </div>
          </div>
        </Card>

        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4">
          {data.client && (
            <Card className="w-full md:w-1/2 p-6">
              <h1 className="text-2xl font-bold">Client</h1>
              <div className="border-t-2 dark:border-gray-300 border-black"></div>
              <p>
                <strong>ID:</strong> {data.client.id}
              </p>
              <p>
                <strong>Name:</strong> {data.client.name}
              </p>
              <p>
                <strong>Phone:</strong> {data.client.phone}
              </p>
              <p>
                <strong>isActive:</strong> {data.client.isActive}
              </p>
              <p>
                <strong>Prefex:</strong> {data.client.prefex}
              </p>
              <p>
                <strong>KeyPath:</strong> {data.client.keyPath}
              </p>
            </Card>
          )}
          {data.supscriptionAgents?.length > 0 && (
            <Card className="w-full p-6 bg-white rounded-lg shadow-lg dark:bg-darkContent">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Agents
              </h3>
              <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden dark:border-darkContent dark:bg-darkContent">
                <thead>
                  <tr className="bg-gray-100 dark:bg-background">
                    <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 dark:text-white">
                      ID
                    </th>
                    <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 dark:text-white">
                      Agent
                    </th>
                    <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 dark:text-white">
                      Percentage
                    </th>
                    <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 dark:text-white">
                      Phone
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.supscriptionAgents.map((agent, index) => (
                    <tr
                      key={index}
                      className={`border-t border-gray-200 dark:border-background hover:bg-gray-50 dark:hover:bg-gray-700`}
                    >
                      <td className="py-4 px-6 text-sm text-gray-950 dark:text-white">
                        {agent.id}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-950 dark:text-white">
                        {agent.agentName}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-950 dark:text-white">
                        {agent.agentPercentage}%
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-950 dark:text-white">
                        {agent.phone}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default SubscriptionDetails;
