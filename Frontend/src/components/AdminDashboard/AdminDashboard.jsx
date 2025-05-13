import React, { useEffect, useState } from 'react';
import { FaBars } from "react-icons/fa";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { LiaCreativeCommonsSampling } from "react-icons/lia";
import { GiNotebook } from "react-icons/gi";
import { BiSolidCoupon } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';

function AdminDashboard() {
    const [admin, setAdmin] = useState(0);
    const [menu, toggleMenu] = useState(false);
    const [loader, setLoader] = useState(true);

    const handleMenuToggle = () => {
        toggleMenu(!menu);
    };



    return (
        <>
            <div className={`${menu ? "" : "-translate-x-full"} fixed top-0 left-0 z-40 w-64 h-screen transition-transform md:translate-x-0 bg-white`}>
                <div className='px-4 flex justify-between items-center h-20 border-b'>
                    <Link to="/">
                        <div className='flex items-center'>
                            <img className='w-32' src="https://res.cloudinary.com/dglakn1aw/image/upload/v1742204920/dineview/iptuuz9mo3d3r0ecnsvi.jpg" alt="" />
                        </div>
                    </Link>
                    <IoIosArrowDropleftCircle className='md:hidden block text-blue-500 text-xl' onClick={handleMenuToggle} />
                </div>
                <div className='flex flex-col justify-between px-4 h-full'>
                    <ul>
                        <Link to="/admin" onClick={handleMenuToggle}>
                            <li className='flex items-center my-3 bg-transparent hover:bg-blue-50 rounded-md px-4 py-2'>
                                <MdDashboard className='text-xl text-blue-500 mr-3' />
                                <h1 className='font-bold'>Dashboard</h1>
                            </li>
                        </Link>
                        <Link to="/admin/products" onClick={handleMenuToggle}>
                            <li className='flex items-center my-3 hover:bg-blue-50 rounded-md px-4 py-2'>
                                <FaBoxOpen className='text-xl text-blue-500 mr-3' />
                                <h1 className='font-bold'>Menu</h1>
                            </li>
                        </Link>
                        <Link to="/admin/category" onClick={handleMenuToggle}>
                            <li className='flex items-center my-3 hover:bg-blue-50 rounded-md px-4 py-2'>
                                <IoMdCart className='text-xl text-blue-500 mr-3' />
                                <h1 className='font-bold'>Category</h1>
                            </li>
                        </Link>
                        <Link to="/admin/orders">
                            <li className='flex items-center my-3 hover:bg-blue-50 rounded-md px-4 py-2'>
                                <GiNotebook className='text-xl text-blue-500 mr-3' />
                                <h1 className='font-bold'>Orders</h1>
                            </li>
                        </Link>
                       
                    </ul>
                    <ul className='mb-32'>
                        <li className='flex items-center my-3 hover:bg-blue-50 rounded-md px-4 py-2'>
                            <BiLogOut className='text-xl text-red-600 mr-3' />
                            <h1 className='font-bold'>Logout</h1>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="w-full bg-blue-50 md:pl-64">
                <nav className='w-full h-20 bg-white border flex items-center justify-between'>

                    <div className='flex items-center'>
                        <FaBars className='md:hidden block text-2xl m-4' onClick={handleMenuToggle} />
                        <img className='h-8 md:hidden block' src="https://res.cloudinary.com/dhturqqs5/image/upload/v1728842111/SIT%20Project/vf7v4ggt9bzkhpfxvrhr.png" alt="" />
                    </div>
                    <div className='h-10 w-10 mx-6 bg-orange-400 rounded-full'>

                    </div>
                </nav>
                <Outlet />
            </div>
        </>
    );
}

export default AdminDashboard;
