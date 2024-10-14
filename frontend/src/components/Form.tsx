import { useState, FormEvent, ChangeEvent } from "react";

const SummaryApp = () => {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [summaryData, setSummaryData] = useState<string>("");
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value);
    setError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSummaryData(
        "This is a long summary text to demonstrate how the text wraps within the summary section. Make sure to test with various lengths of text to see the wrapping behavior in actionThis is a long summary text to demonstrate how the text wraps within the summary section. Make sure to test with various lengths of text to see the wrapping behavior in action."
      );
      setShowSummary(true);
    } catch (error) {
      console.error("Error fetching summary:", error);
      setError("Failed to fetch summary. Please try again later.");
    }
  };

  return (
    <div className="p-4">
      <div className="text-center mb-8">
        <h2 className="text-5xl font-bold text-white">
          You are just one click away to
        </h2>
        <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#c07eff] via-[#ff729f] to-[#f5b867] leading-snug">
          scoop your summary!
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 flex justify-center space-x-4"
      >
        <input
          type="text"
          placeholder="Paste YouTube video link here"
          value={videoUrl}
          onChange={handleInputChange}
          required
          className="w-64 py-1 px-4 bg-white bg-opacity-10 backdrop-blur-md text-white text-lg rounded-md outline-none placeholder:text-gray-400 placeholder:opacity-70 placeholder:text-sm transition duration-300 border border-[#23243C]"
        />
        <button
          type="submit"
          className="py-1 px-4 text-white font-semibold rounded-md bg-gradient-to-r from-[#C07EFF] via-[#FF729F] to-[#F5B867] shadow-lg transition-transform transform duration-200 hover:scale-105 focus:outline-none focus:ring-0"
        >
          Summarize
        </button>
      </form>

      {error && <p className="mt-2 text-red-500 text-center">{error}</p>}

      {showSummary && (
        <div className="mt-12 bg-[#090A22] p-4 rounded-md text-white border border-[#23243C] flex flex-col justify-center">
          <p className="text-lg mb-2 text-center break-words">
            Your summary is ready! Here you go...
          </p>
          <hr className="border-t border-[#23243C] mb-4 -mx-4" />
          <div className="max-h-64 overflow-y-auto custom-scrollbar text-left">
            <p className="text-sm leading-6 text-[#d1d5db] break-words">
              {summaryData}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryApp;
