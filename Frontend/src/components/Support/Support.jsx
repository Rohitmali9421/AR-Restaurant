import React from 'react';
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { BsGeoAlt } from 'react-icons/bs';

function Support() {
    return (
            <section className="relative px-8 z-10 overflow-hidden bg-[#fafafa] ">
                <div className="container mx-auto">
                    <h2 className="mb-6 text-[32px] font-bold uppercase text-dark sm:text-[40px] lg:text-[36px] xl:text-[40px] text-center">
                        GET IN TOUCH WITH US
                    </h2>
                    <div className="-mx-4 flex flex-wrap lg:justify-between">
                        <div className="w-full px-4 lg:w-1/2 xl:w-6/12">
                            <div className="mb-12 max-w-[570px] lg:mb-0">

                                <p className="mb-9 text-base leading-relaxed text-body-color">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eius tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                    adiqua minim veniam quis nostrud exercitation ullamco
                                </p>

                                <div className="mb-8 flex w-full max-w-[370px]">
                                    <div className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-primary/5 text-primary sm:h-[70px] sm:max-w-[70px]">
                                        <BsGeoAlt size={32} />
                                    </div>
                                    <div className="w-full">
                                        <h4 className="mb-1 text-xl font-bold text-dark">
                                            Our Location
                                        </h4>
                                        <p className="text-base text-body-color">
                                            99 k.b kolhapur maharatsra 24. India
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-8 flex w-full max-w-[370px]">
                                    <div className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-primary/5 text-primary sm:h-[70px] sm:max-w-[70px]">
                                        <AiOutlinePhone size={32} />
                                    </div>
                                    <div className="w-full">
                                        <h4 className="mb-1 text-xl font-bold text-dark">
                                            Phone Number
                                        </h4>
                                        <p className="text-base text-body-color">
                                            (+91)1234567891
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-8 flex w-full max-w-[370px]">
                                    <div className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-primary/5 text-primary sm:h-[70px] sm:max-w-[70px]">
                                        <AiOutlineMail size={32} />
                                    </div>
                                    <div className="w-full">
                                        <h4 className="mb-1 text-xl font-bold text-dark">
                                            Email Address
                                        </h4>
                                        <p className="text-base text-body-color">
                                            info@yourdomain.com
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
                            <div className="relative rounded-lg bg-[#fafafa] py-8  sm:py-12">
                                <form>
                                    <div className="mb-6">
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            className="w-full rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <input
                                            type="email"
                                            placeholder="Your Email"
                                            className="w-full rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <input
                                            type="text"
                                            placeholder="Your Phone"
                                            className="w-full rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <textarea
                                            rows="6"
                                            placeholder="Your Message"
                                            className="w-full resize-none rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary"
                                        ></textarea>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full rounded border border-primary bg-primary p-3 bg-blue-600 text-white transition hover:bg-opacity-90"
                                        >
                                            Send Message
                                        </button>
                                    </div>
                                </form>
                                <div>
                                    <span className="absolute -right-10 top-[90px] z-[-1]">
                                        {/* ..... */}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    );
}

export default Support;
