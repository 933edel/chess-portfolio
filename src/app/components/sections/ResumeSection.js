export default function ResumeSection() {
  return (
    <div className="flex flex-col h-full">
      <p className="mb-4 leading-relaxed">
        You can download my resume using the button below:
      </p>

      <a
        href="/assets/Siddharth_Resume.pdf"
        download
        className="px-4 py-2 bg-purple-700/70 rounded hover:bg-purple-600 transition text-white inline-block"
      >
        Download Resume
      </a>

      <p className="mt-6 text-sm text-gray-400">
        Note: Clicking the button will download the PDF to your device.
      </p>
    </div>
  );
}
