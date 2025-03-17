import SubscriptionDetails from '@/components/subscriptions/SubscriptionDetails'
import React from 'react'

export default function Page({params}) {
  return <SubscriptionDetails id={params.id} />
}
