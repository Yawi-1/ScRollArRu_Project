// ---------------------------------- Components ----------------------------------
import Layout from '../../components/layout/Layout';


// ---------------------------------- Disclaimer Component Code ----------------------------------
export default function Disclaimer() {
  return (
    <Layout>
      <div className="md:py-8 max-w-7xl mx-auto md:px-4 p-2">
        <div className="md:p-6 p-1 bg-gray-100/80 dark:bg-neutral-800/80 border-gray-400 dark:border-gray-200 border-2 rounded-xl">

          {/* ---------------------------------- Heading ---------------------------------- */}
          <div className="text-[58px] md:text-7xl font-bold text-center">
            DISCLAIMER
          </div>

          {/* ---------------------------------- Content Starts ---------------------------------- */}
          <div className="mt-10 leading-7">
            <div className='w-full my-10'>
              <p className='font-medium text-2xl my-2 text-center md:text-justify'>
                This website is provided "as is" without any representations or warranties, express or implied. SCROLLAR4U makes no representations or warranties in relation to this website or the information and materials provided on this website.
              </p>
              <div className='text-xl font-medium text-center md:text-justify mx-1 mt-8 leading-8 md:leading-10'>
                <p className=''>
                  SCROLLAR4U does not warrant that:
                </p>
                <ul className="list-disc ml-6 mb-2 text-lg ">
                  <li>this website will be constantly available, or available at all; or</li>
                  <li>the information on this website is complete, true, accurate, or non-misleading.</li>
                </ul>
                <p>
                  Nothing on this website constitutes, or is meant to constitute, advice of any kind. If you require advice in relation to any legal, financial, or medical matter you should consult an appropriate professional.
                </p>
                <p>
                  SCROLLAR4U will not be liable to you (whether under the law of contract, the law of torts or otherwise) in relation to the contents of, or use of, or otherwise in connection with, this website:
                </p>
                <ul className="list-disc ml-6 mb-2">
                  <li>to the extent that the website is provided free-of-charge, for any direct loss;</li>
                  <li>for any indirect, special or consequential loss; or</li>
                  <li>for any business losses, loss of revenue, income, profits or anticipated savings, loss of contracts or business relationships, loss of reputation or goodwill, or loss or corruption of information or data.</li>
                </ul>
                <p>
                  By using this website, you agree that the exclusions and limitations of liability set out in this disclaimer are reasonable. If you do not think they are reasonable, you must not use this website.
                </p>
                <p>
                  If you have any questions about this disclaimer, please contact <a href="mailto:info@scrollar.com" className='text-blue-600 font-medium cursor-pointer'>info@scrollar.com</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}