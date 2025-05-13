import React from 'react';
import { FiShoppingCart, FiUsers, FiClipboard, FiBarChart2 } from 'react-icons/fi'; // Import icons
import { Link } from 'react-router-dom';

function Dashboard() {
    return (
        <div className='w-full p-6 bg-gray-50 min-h-screen'>
            {/* Header */}
            <div className='w-full mb-8'>
                <h1 className='font-semibold text-3xl my-2'>Admin Dashboard</h1>
                <p className='font-semibold text-gray-600'>Welcome to your food ordering system dashboard. Here’s an overview of your platform.</p>
            </div>

            {/* Statistics Overview */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                {/* Total Orders */}
                <div className='p-6 bg-white rounded-lg shadow-md flex items-center space-x-4'>
                    <FiShoppingCart className='text-blue-600 w-12 h-12' />
                    <div>
                        <h2 className='text-lg font-semibold'>Total Orders</h2>
                        <p className='text-2xl font-bold'>1,245</p>
                    </div>
                </div>

                {/* Menu Items */}
                <div className='p-6 bg-white rounded-lg shadow-md flex items-center space-x-4'>
                    <FiClipboard className='text-green-600 w-12 h-12' />
                    <div>
                        <h2 className='text-lg font-semibold'>Menu Items</h2>
                        <p className='text-2xl font-bold'>82</p>
                    </div>
                </div>

                {/* Customers */}
                <div className='p-6 bg-white rounded-lg shadow-md flex items-center space-x-4'>
                    <FiUsers className='text-purple-600 w-12 h-12' />
                    <div>
                        <h2 className='text-lg font-semibold'>Customers</h2>
                        <p className='text-2xl font-bold'>3,671</p>
                    </div>
                </div>

                {/* Revenue */}
                <div className='p-6 bg-white rounded-lg shadow-md flex items-center space-x-4'>
                    <FiBarChart2 className='text-yellow-500 w-12 h-12' />
                    <div>
                        <h2 className='text-lg font-semibold'>Revenue</h2>
                        <p className='text-2xl font-bold'>$25,320</p>
                    </div>
                </div>
            </div>

           
        </div>
    );
}

export default Dashboard;
