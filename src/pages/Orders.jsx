import React, { useEffect } from 'react';

import PageHero from '../layout/PageHero';
import OrdersList from '../components/orders/OrdersList';
import { motion } from 'framer-motion';


const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: { duration: .3 }
    },
    exit: {
      x: '-100vw',
      transition: { ease: 'easeInOut' }
    }
}


const Orders = () => {
    
//   const dispatchOrders = useDispatch();
//     useEffect(() => {
//       dispatchOrders(getOrders());
//     }, [dispatchOrders]);
    return (
        <motion.main
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <PageHero title="Commandes" />
            <div className='flex w-[85vw] my-16 mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-12 gap-y-12'>
                    <div className='mb-[20rem] md:col-span-2 lg:col-span-4'>
                        <div className='w-full flex flex-col'>
                            <OrdersList />
                        </div>
                    </div>
                </div>
            </div>
        </motion.main>
    );
};

export default Orders;