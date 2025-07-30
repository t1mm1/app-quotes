'use client';

export default function Search({ handle, text, set }) {
  const isDisabled = !(text.trim().length === 0 || text.trim().length > 2);

  return (
    <form
      className="relative w-full max-w-3xl"
      onSubmit={(e) => {
        handle({ e, text });
      }}
    >
      <div className="flex gap-x-1 overflow-hidden items-center relative">
        <input
          id="text"
          type="text"
          placeholder="Please, enter 3 or more characters to search quotes"
          value={text}
          onChange={(e) => set(e.target.value)}
          className="flex-grow px-8 sm:px-8 py-4 border border-gray-300 focus:outline-none bg-transparent text-gray-900 dark:bg-white rounded-md"
        />
        <button
          type="submit"
          className={`h-full px-4 sm:px-8 py-4 rounded-md transition cursor-pointer focus:outline-none ${
            isDisabled
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
          title="Search quotes"
          tabIndex={0}
          aria-label="Search quotes"
          disabled={isDisabled}
        >
          Search
        </button>
      </div>
    </form>
  );
}
