// ---------------------------------- Components ----------------------------------
import Layout from '../../components/layout/Layout';


// ---------------------------------- No Page Component Code ----------------------------------
export default function NoPage() {
  return (
    <Layout>
      <section className="relative z-10 bg-primary py-[121px]">
        <div className="container mx-auto">
          <div className="-mx-4 flex">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[400px] text-center">
                <h2 className="mb-2 text-[50px] font-bold leading-none dark:text-white dark sm:text-[80px] md:text-[100px]">404</h2>
                <h4 className="mb-3 text-[22px] font-semibold leading-tight dark:text-white">Oops! That page can’t be found</h4>
                <p className="mb-8 text-lg dark:text-white">The page you are looking for it maybe deleted</p>
                <a href="/" className="inline-block rounded-lg border border-gray-800 dark:border-white px-8 py-3 text-center text-base font-semibold dark:text-white transition dark:hover:bg-white hover:text-primary">Go To Home</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}