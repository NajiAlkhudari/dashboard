import SubscriptionDetails from '@/components/subscriptions/SubscriptionDetails'
import React from 'react'

export default function Page({params}) {
  const { id } = React.use(params)

  return <SubscriptionDetails id={id} />;}
