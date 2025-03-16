"use client"
import Table from '@/components/ui/Table';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Loading from './loading';
import { subscriptionService } from '@/Services/subscriptionService';

const Page = () => {

  const {subscriptions ,error , loading }= useSelector((state)=>state.subscriptions);



useEffect (()=>{
  subscriptionService.getAll();
},[]);


    if (loading) return <Loading />;
  
  const columns =[
    { header: "ID", key: "id" },
    {header : "StartDate",key:"startDate"},
    {header : "EndDate",key:"endDate"},
    {header : "CostPermonth" , key : "costPermonth"},
    {header :"ClientId" , key:"clientId" },
    {header :"AgentId" , key:"agentId" },
    {header :"AgentPercentage" , key:"agentPercentage" },
    {header :"Notes" , key:"notes" },


   

  ]
  return (
    <Table data={subscriptions} columns={columns} />
  )
}

export default Page
