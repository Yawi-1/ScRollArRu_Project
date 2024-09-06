
// ---------------------------------- Components ----------------------------------
import Layout from '../../components/layout/Layout';


// ---------------------------------- Privacy Policy Component Code ----------------------------------
export default function PrivacyPolicy() {
  {/* ---------------------------------- Policy Validity Date ---------------------------------- */}
  const date = "July 31, 2025";

  return (
    <Layout>
      <div className='md:py-8 max-w-7xl mx-auto md:px-4 p-2'>
        <div className="md:p-6 p-2 bg-gray-100/80 dark:bg-neutral-800/80 border-gray-400 dark:border-gray-200 border-2 rounded-xl">
          
          {/* ---------------------------------- Heading ---------------------------------- */}
          <div className="text-6xl md:text-7xl font-bold text-center">
            PRIVACY POLICY
          </div>

          {/* ---------------------------------- Content Starts ---------------------------------- */}
          <div className="mt-10 leading-7">
            <div className='w-full my-10'>

              {/* ---------------------------------- Row 1 ---------------------------------- */}
              <p className='font-bold text-4xl my-2 text-center'>
                Welcome to <span className='font-semibold'>ScrollAR4U</span>
              </p>

              {/* ---------------------------------- Row 2 ---------------------------------- */}
              <div className='text-xl font-medium text-center md:text-justify mx-1 mt-2 leading-10'>
                <p className='my-2'>This Privacy Policy outlines how we collect, use, and protect your personal information when you visit our website.</p>
                <p className='my-2'>We may collect personal information such as your name, email address, and browsing behavior to improve our services and provide you with a better user experience.</p>
                <p className='my-2'>Your information is securely stored and will not be shared with third parties without your consent, except as required by law.</p>
                <p className='my-2'>We use cookies to analyze website traffic and optimize your browsing experience. You can choose to disable cookies in your browser settings.</p>
                <p className='my-2'>By using our website, you consent to our Privacy Policy and agree to the collection and use of your information as described herein.</p>
                <p className='my-2'>If you have any questions or concerns about our Privacy Policy, please contact us.</p>
                <p className='my-2'>This Privacy Policy is effective as of {date} and may be updated periodically. Please check this page for any updates.</p>
                <p className='my-2'>This website is owned and operated by ScrollAR4U.</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}