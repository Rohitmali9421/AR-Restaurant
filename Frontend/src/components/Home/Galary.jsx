import React from 'react';

function Galary() {
  return (
    <div>
      <section className="bg-white  pb-10 md:py-20">
       
            <div className="w-full px-4 grid grid-cols-2 gap-4">
              <img
                src="https://res.cloudinary.com/dglakn1aw/image/upload/v1742204327/dineview/czzqyurdtkkcipx8mqel.jpg"
                alt="Living room furniture"
                className="h-full w-full object-cover object-center max-w-full row-span-2"
              />
              <img
                src="https://res.cloudinary.com/dglakn1aw/image/upload/v1742206085/dineview/vo9z93o8kuifhmgqbyyg.jpg"
                alt="Accessories collection"
                className="h-full w-full object-cover object-center max-w-full "
              />

              <img
                src="https://res.cloudinary.com/dglakn1aw/image/upload/v1742206741/dineview/qwhymaorukggcyeuyvhh.jpg"
                alt="Office workspace"
                className="h-full w-full object-cover object-center max-w-full"
              />
            </div>
         
      </section>
    </div>
  );
}

export default Galary;
