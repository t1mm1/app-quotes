'use client';

export default function Search({ handle, text, set }) {
  return (
    <form
      className="relative w-full max-w-3xl"
      onSubmit={(e) => {
        handle({ e, text });
      }}
    >
      <div className="flex gap-x-2 overflow-hidden items-center bg-white">
        <input
          id="text"
          type="text"
          placeholder="Search quotes"
          value={text}
          onChange={(e) => set(e.target.value)}
          className="flex-grow px-8 py-4 border border-gray-300 focus:outline-none bg-transparent text-gray-900 dark:text-white"
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
