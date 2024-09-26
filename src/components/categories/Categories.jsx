// ---------------------------------- Assets ----------------------------------
const images = [{ id: 1, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX-f09zAZy-Bi-f7TMJvav6JRwA8we2ijbkAN3e3sTnDzrmwjgvq-rRDy6Hf_zcE2Oelo&usqp=CAU', alt: 'Image 1' },
                { id: 2, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTktoNpsu4s9DMHTtXkuuItwSp2ArmLW4YjdA&s', alt: 'Image 2' }, 
                { id: 3, src: 'https://img.freepik.com/free-photo/creative-composition-world-book-day_23-2148883765.jpg', alt: 'Image 3' }];


// ---------------------------------- Categories Component Code ----------------------------------
export default function Categories() {
  return (
    // ---------------------------------- Image Card ----------------------------------
    <div>
    <div className="flex flex-row justify-between space-x-2 lg:my-7 py-8">
      {images.map((image) => (
        <a key={image.id} href="#" className="w-[33%] md:h-72 relative hover:scale-105 duration-700">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover md:border rounded-lg"
          />
          <div className="absolute inset-0 flex items-end justify-center">
            <button className="block hover:bg-neutral-600 bg-neutral-800/80 border rounded-lg text-white md:p-2 p-1 mb-4">
              Explore More
            </button>
          </div>
        </a>
      ))}
    </div>
  </div>
  
  );
}