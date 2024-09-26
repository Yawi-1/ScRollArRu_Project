export default function Spinner() {
  return (
    <div className="fixed inset-0 w-full h-screen flex items-center justify-center z-10 bg-black/50">
      <div className="h-12 w-12  rounded-full border-4 border-t-blue-400  animate-spin flex items-center justify-center">
      </div>
    </div>
  )
}
