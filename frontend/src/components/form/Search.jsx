'use client';

export default function Search({ handle, set }) {
  return (
    <form className="relative w-full max-w-3xl" onSubmit={(e) => handle(e)}>
      <div className="flex items-center border border-gray-300 rounded overflow-hidden bg-white shadow-sm dark:bg-gray-800 dark:border-gray-600">
        <input
          id="text"
          type="text"
          placeholder="Search quotes"
          onChange={(e) => set(e.target.value)}
          className='flex-grow px-8 py-4 focus:outline-none bg-transparent text-gray-900 dark:text-white}'
        />
        <button
          type="submit"
          className="h-full px-8 py-4 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition cursor-pointer"
        >
          Search
        </button>
      </div>
    </form>
  );
}
