// ---------------------------------- Components ----------------------------------
import Layout from '../../components/layout/Layout';


// ---------------------------------- Terms and Conditions Components Code ----------------------------------
export default function TermsConditions(){
  return (
    <Layout>
      <div className="md:py-8 max-w-7xl mx-auto md:px-4 p-2">
        <div className=" w-full px-6 py-8 bg-gray-100/80 dark:bg-neutral-800/80 border-gray-400 dark:border-gray-200 border shadow-lg rounded-lg">
          <h2 className="text-4xl text-center font-bold mb-4">Terms and Conditions</h2>

          {/* ---------------------------------- Content Starts ---------------------------------- */}
          <div className="text-xl p-4 px-12">
            
            <p>Welcome to <span className='font-semibold'>ScrollAR4U</span>. By using this website, you agree to these terms and conditions.</p>
            <p>This website is for general information and use only. Your use of this site is at your own risk.</p>

            <ul className="list-disc my-4 ml-8">
              <li>The content may change without notice.</li>
              <li>We use cookies to monitor browsing preferences.</li>
              <li>Your use of information on this site is entirely at your own risk.</li>
              <li>All material on this site is owned by us or licensed to us, including design, layout, and graphics.</li>
              <li>Unauthorized use may result in legal action.</li>
            </ul>

            <p>By using this site, you agree that any exclusions and limitations of liability are reasonable.</p>
            <p>We aim to limit the personal liability of our officers and employees.</p>
            <p>If any part of these terms is unenforceable, it won't affect the rest.</p>
            <p>You agree to indemnify us against any losses arising from your use of this site.</p>
            <p>These terms, along with our Privacy Policy, constitute the entire agreement between you and us.</p>
            <p>This website is owned and operated by ScrollAR4U.</p>

          </div>

        </div>
      </div>
    </Layout>
  )
}