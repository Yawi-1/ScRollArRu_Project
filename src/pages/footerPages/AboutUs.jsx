// ---------------------------------- Components ----------------------------------
import Layout from '../../components/layout/Layout';


// ---------------------------------- Assets ----------------------------------
import image from '/catPic.webp';


// ---------------------------------- About Us Component Code ----------------------------------
export default function AboutUs() {
  return (
    <Layout>
      <div className="md:py-8 max-w-7xl mx-auto md:px-4 p-2">
        <div className="md:p-6 p-2 bg-gray-100/80 dark:bg-neutral-800/80 border-gray-400 dark:border-gray-200 border-2 rounded-xl">

          <div className="text-6xl md:text-7xl font-bold text-center">
            ABOUT US
          </div>

          {/* ---------------------------------- Content Starts ---------------------------------- */}
          <div className="mt-10 leading-7">

            {/* ---------------------------------- Row 1 ---------------------------------- */}
            <div className='w-full my-10'>
              <p className='font-bold text-4xl my-2 text-center'>
                See it.&nbsp;Learn it.&nbsp;Love it.&nbsp;Learning goes beyond the classroom.
              </p>
              <div className=' mx-1 md:flex '>
                <p className='text-2xl font-medium md:w-1/2 mx-1 mt-2 leading-10 text-justify'>
                  At ScrollAR4U Technologies, we believe that education shouldn’t be confined to textbooks and lectures. We’re passionate about igniting a love of learning by making it fun, engaging, and effective for students of all ages.
                </p>
                <img src={image} className='md:w-1/2 mx-1 mt-1' />
              </div>
            </div>

            {/* ---------------------------------- Row 2 ---------------------------------- */}
            <div className='w-full my-10'>
              <p className='font-bold text-4xl my-2 text-center'>
                Empowering Education Through Augmented Reality
              </p>
              <div className='text-2xl font-medium text-center md:text-justify mx-1 mt-2 leading-10'>
                <p>
                  At ScrollAR4U Technologies, we believe that education shouldn’t be confined to textbooks and lectures. We’re passionate about igniting a love of learning by making it fun, engaging, and effective for students of all ages.
                </p>
                <p>We’re on a mission to revolutionize education with the power of Augmented Reality (AR). Our innovative technology transforms learning from passive memorization to an interactive, immersive experience.</p>
              </div>
            </div>

            {/* ---------------------------------- Row 3 ---------------------------------- */}
            <div className='w-full my-10'>
              <p className='font-bold text-4xl my-2 text-center'>
                Unlock a World of Exploration
              </p>
              <div className=' mx-1 md:flex'>
                <img src={image} className='md:w-1/2 mx-1 mt-1' />
                <p className='text-2xl font-medium md:w-1/2 mx-1 mt-2 leading-10 text-center md:text-justify'>
                  Imagine 3D models coming alive with captivating stories, educational games, and stunning animations right before your eyes.
                </p>
              </div>
              <div>

                {/* ---------------------------------- Row 4 ---------------------------------- */}
                <div className='w-full my-10'>
                  <p className='font-bold text-4xl my-2 text-center'>
                    ScrollAR4U’s AR platform fosters:
                  </p>
                  <div className='text-2xl font-medium md:text-justify text-center mx-1 mt-2 leading-10'>
                    <ul className="list-disc ml-6 mt-2">
                      <li>Interactive Learning: Get hands-on with features that encourage exploration and experimentation.</li>
                      <li>Kid-Friendly Storytelling: Delight in enchanting audio narratives that spark imagination and a love of learning.</li>
                      <li>Exciting Games: Dive into a world of fun and educational games that make concepts come alive.</li>
                      <li>3D Simulations: Step into immersive 3D simulations that transport you to different environments and scenarios for a truly hands-on learning experience.</li>
                    </ul>
                  </div>
                </div>

                {/* ---------------------------------- Row 5 ---------------------------------- */}
                <div className='w-full my-10'>
                  <p className='font-bold text-4xl my-2 text-center'>
                    The Future of Learning is Here
                  </p>
                  <div className='text-2xl font-medium text-center md:text-justify mx-1 mt-2 leading-10'>
                    <p>
                      The days of rote memorization are over. With ScrollAR4U, students can interact with what they’re learning, play educational games, and explore 3D models – all in the real world!
                    </p>
                    <p>Join us on this exciting journey to transform education and empower learners of all ages!</p>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
