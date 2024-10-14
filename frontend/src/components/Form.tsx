import axios, { AxiosError } from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

const Form = () => {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [summaryData, setSummaryData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value);
    setError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSummaryData("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api-summary-scoop.onrender.com/api/summarize",
        { videoUrl }
      );
      setLoading(false);
      setError("");
      setSummaryData(response.data.summary);
    } catch (error: unknown) {
      setLoading(false);

      if (error instanceof AxiosError) {
        setError(error.response?.data.error);
      } else {
        setError("Something went wrong. Please try again later.");
      }
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
          className="w-64 px-4 bg-white bg-opacity-10 backdrop-blur-md text-white rounded-md outline-none placeholder:text-gray-400 placeholder:opacity-70 placeholder:text-sm text-xs"
        />
        <button
          type="submit"
          className="py-1 px-4 text-white font-semibold rounded-md bg-gradient-to-r from-[#C07EFF] via-[#FF729F] to-[#F5B867] hover:scale-105 focus:outline-none"
          disabled={loading}
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>
      </form>

      {error && <p className="mt-2 text-red-500 text-center">{error}</p>}

      {summaryData && (
        <div className="mt-12 bg-[#090A22] p-4 rounded-md text-white border border-[#23243C] justify-center">
          <p className="text-lg mb-2 text-center">
            Your summary is ready! Here you go...
          </p>
          <hr className="border-t border-[#23243C] mb-4 mx-[-16px]" />
          <div className="max-h-64 overflow-y-auto custom-scrollbar text-left">
            <p className="text-sm text-[#d1d5db] break-words">{summaryData}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
