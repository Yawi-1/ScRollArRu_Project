// ---------------------------------- Components ----------------------------------
import Layout from '../../components/layout/Layout';


// ---------------------------------- Refund Policy Component Code ----------------------------------
export default function RefundPolicy(){
  return (
    <Layout>
        <div className="md:py-8 max-w-7xl mx-auto md:px-4 p-2">
          <div className="bg-gray-100/80 dark:bg-neutral-800/80 shadow-xl sm:rounded-xl border border-gray-400 dark:border-gray-200">
            <div className="p-6 sm:px-20">

              {/* ---------------------------------- Heading ---------------------------------- */}
              <div className="text-3xl text-center font-bold leading-9">
                Refund Policy
              </div>

              {/* ---------------------------------- Content Starts ---------------------------------- */}
              <div className="mt-6 text-xl leading-7">
                <p>
                  At ScrollAR4U Technologies, we strive to ensure that every customer is satisfied with our products and services. If you are not entirely satisfied with your purchase, we're here to help.
                </p>
                <p className="mt-4">
                  <span className="font-bold">Digital Products:</span> Due to the nature of digital products, we generally do not offer a refund once the purchase is made. However, we may consider refunds on a case-by-case basis if the product is faulty or does not meet its description as advertised.
                </p>
                <p className="mt-4">
                  <span className="font-bold">Physical Products:</span> If you have purchased a physical product from us and find it defective or not as described, please contact us within  7 days of receiving the product. We will arrange for a return and refund or replacement based on our assessment of the issue.
                </p>
                <p className="mt-4">
                  Please note that all refunds are subject to inspection and approval by our team. We reserve the right to refuse a refund if the product is found to be in good working condition or if the issue is deemed to be due to misuse or mishandling.
                </p>
                <p className="mt-4">
                  If you have any questions about our refund policy, please contact <a href="mailto:info@scrollar.com" className='text-blue-600 font-medium cursor-pointer'>info@scrollar.com</a>. We are here to assist you and ensure your satisfaction with our products and services.
                </p>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}