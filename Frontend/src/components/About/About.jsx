import React from 'react';

function About() {
    return (
        <div>
            <section className="overflow-hidden bg-[#fafafa] pb-12 lg:pb-[90px] px-4">
                <div className="container mx-auto">
                    <div className="-mx-4 flex flex-wrap items-center justify-between">
                        <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
                            <div className="mt-10 lg:mt-0">
                                <span className="mb-4 block text-lg font-semibold text-primary">
                                    Why Choose Us
                                </span>
                                <h2 className="mb-5 text-3xl font-bold text-black sm:text-[40px]/[48px]">
                                    Delight your taste buds with every bite.
                                </h2>
                                <p className="mb-5 text-base text-body-color">
                                    We bring the best dishes from your favorite restaurants
                                    straight to your door. With fast, reliable delivery, and
                                    a menu that suits every craving, satisfaction is just a tap away.
                                </p>
                                <p className="mb-8 text-base text-body-color">
                                    Whether it's a family feast, late-night snack, or a meal for one,
                                    we make it easy to order your favorite food anytime, anywhere.
                                </p>
                                <a href="/"
                                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-7 py-3 text-center text-base font-medium text-white hover:bg-opacity-90 bg-orange-500">
                                    Order Now
                                </a>
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 p-16">
                            <img src="https://res.cloudinary.com/dhturqqs5/image/upload/v1728841898/SIT%20Project/ra41jgevwiw0cwhkygox.png" alt="Delicious Food" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;
