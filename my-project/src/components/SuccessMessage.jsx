function SuccessMessage() {
  return (
    <div>
      <div
        id="successModal"
        tabindex="-1"
        aria-hidden="true"
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
      >
        <div class="relative p-4 w-full max-w-md h-full md:h-auto">
          <div class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <button
              type="button"
              class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="successModal"
            >
            </button>
            <div class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
              <svg
                aria-hidden="true"
                class="w-8 h-8 text-green-500 dark:text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Success</span>
            </div>
            <p class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Successfully
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessMessage;
