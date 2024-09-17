// ---------------------------------- Assets ----------------------------------
const images = [{ id: 1, src: '/public/wondersBody.webp', alt: 'Image 1' },
                { id: 2, src: '/public/jurassic.webp', alt: 'Image 2' }, 
                { id: 3, src: '/public/earthBook.webp', alt: 'Image 3' }];


// ---------------------------------- Categories Component Code ----------------------------------
export default function Categories() {
  return (
    // ---------------------------------- Image Card ----------------------------------
    <div>
      <div className="flex  justify-between space-x-2 lg:my-7 py-4 ">
        {images.map((image) => (
          <a key={image.id} href="#" className="relative ">
            <img src={image.src} alt={image.alt} className=" w-full h-auto object-cover md:border rounded-lg" />
            <div className="absolute inset-0 flex items-end justify-center">
              <button className="hidden md:block hover:bg-neutral-600 bg-neutral-800/80 border rounded-lg text-white p-2 mb-4">Explore More</button>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}