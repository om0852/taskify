import { checkSubscription } from '@/lib/subscription'
import Info from '../_components/info';
import { Separator } from '@/components/ui/separator';
import SubscriptionButton from './_components/SubscriptionButton';

const Billing = async () => {
const isPro = await checkSubscription();
  return (
    <div className='w-full'>
      <Info isPro={isPro}/>
      <Separator className='my-2'/>
      <SubscriptionButton isPro={isPro}/>
    </div>
  )
}

export default Billing
