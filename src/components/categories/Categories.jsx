// ---------------------------------- Assets ----------------------------------
const images = [{ id: 1, src: 'https://via.placeholder.com/400x300?text=Image+1', alt: 'Image 1' },
                { id: 2, src: 'https://via.placeholder.com/400x300?text=Image+2', alt: 'Image 2' }, 
                { id: 3, src: 'https://via.placeholder.com/400x300?text=Image+3', alt: 'Image 3' }];


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