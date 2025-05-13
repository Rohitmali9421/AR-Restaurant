import React from 'react';
import { AiOutlineMail } from 'react-icons/ai'; // Mail icon
import { FaMapMarkerAlt } from 'react-icons/fa'; // Map marker icon
import { FaUserCircle } from 'react-icons/fa'; // User icon
import { FaShoppingCart } from 'react-icons/fa'; // Shopping cart icon

function Footer() {
  return (
    <div>
      <footer className="bg-black ">
        <div className="relative z-10 pt-20 p-4 lg:pt-[100px]">
          <div className="container mx-auto">
            <div className="-mx-4 flex flex-wrap">
              <div className="w-full px-4 md:w-1/2 lg:w-5/12 xl:w-4/12">
                <div className="mb-16 max-w-[310px]">
                  <a href="/" className="mb-9 inline-block">
                    <img src="https://res.cloudinary.com/dglakn1aw/image/upload/v1742204920/dineview/iptuuz9mo3d3r0ecnsvi.jpg" alt="logo" className="w-36" />
                  </a>
                  <p className="mb-9 flex items-center text-lg font-semibold text-white">
                    <span className="pr-3">
                      <FaMapMarkerAlt size={28} color="white" />
                    </span>
                    Our Restaurant Locations
                  </p>

                  <p className="mb-4 flex text-base text-[#cacbcf]">
                    <span className="pr-4 font-semibold"> 01. </span>
                    <span>123 zenda Street, kolhapur A, ABC 12345</span>
                  </p>
                  <p className="flex text-base text-[#cacbcf]">
                    <span className="pr-4 font-semibold"> 02. </span>
                    <span>456 kasba bawda , City B, pune 67890</span>
                  </p>
                </div>
              </div>

              <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-4/12 xl:w-2/12">
                <div className="mb-16">
                  <h3 className="pb-5 text-xl font-semibold text-white">Popular Categories</h3>
                  <span className="mb-8 block h-[3px] w-10 rounded bg-white"></span>

                  <ul className="space-y-3">
                    <li>
                      <a href="/" className="text-base text-[#cacbcf] transition-all hover:text-white hover:underline">
                        Pizzas
                      </a>
                    </li>
                    <li>
                      <a href="/" className="text-base text-[#cacbcf] transition-all hover:text-white hover:underline">
                        Burgers
                      </a>
                    </li>
                    <li>
                      <a href="/" className="text-base text-[#cacbcf] transition-all hover:text-white hover:underline">
                        Desserts
                      </a>
                    </li>
                    <li>
                      <a href="/" className="text-base text-[#cacbcf] transition-all hover:text-white hover:underline">
                        Beverages
                      </a>
                    </li>
                    <li>
                      <a href="/" className="text-base text-[#cacbcf] transition-all hover:text-white hover:underline">
                        Salads
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-3/12 xl:w-2/12">
                <div className="mb-16">
                  <h3 className="pb-5 text-xl font-semibold text-white">Useful Links</h3>
                  <span className="mb-8 block h-[3px] w-10 rounded bg-white"></span>

                  <ul className="space-y-3">
                    <li>
                      <a href="/" className="text-base text-[#cacbcf] transition-all hover:text-white hover:underline">
                        About Us
                      </a>
                    </li>
                    <li>
                      <a href="/" className="text-base text-[#cacbcf] transition-all hover:text-white hover:underline">
                        Contact Us
                      </a>
                    </li>
                    <li>
                      <a href="/" className="text-base text-[#cacbcf] transition-all hover:text-white hover:underline">
                        FAQ
                      </a>
                    </li>
                    
                  </ul>
                </div>
              </div>

              <div className="w-full px-4 md:w-1/2 lg:w-5/12 xl:w-4/12">
                <div className="mb-16">
                  <h3 className="pb-5 text-xl font-semibold text-white">Subscribe for Updates</h3>
                  <span className="mb-8 block h-[3px] w-10 rounded bg-white"></span>

                  <div>
                    <p className="mb-8 text-base text-[#cacbcf]">
                      Enter your email to get the latest updates on new dishes, special offers, and delivery news.
                    </p>
                    <form className="relative">
                      <input type="email" placeholder="Email address" className="h-[50px] w-full bg-[#1f2735] pl-5 pr-[125px] text-[#CACBCF] outline-none placeholder:text-[#CACBCF]" />
                      <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-blue-dark">
                        <AiOutlineMail size={16} />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
        </div>
      </footer>
    </div>
  );
}

export default Footer;
