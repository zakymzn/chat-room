import type { UploadedFile } from "../data/interfaces";

function RenderFile(file: UploadedFile) {
  if (file.type.startsWith('image/')) {
    return <img src={file.url} alt="Preview" className="w-full md:max-w-md my-2" />;
  } else if (file.type.startsWith('video/')) {
    return <video src={file.url} controls className="w-full md:max-w-md my-2">
      <source src={file.url} type={file.type} />
    </video>;
  } else if (file.type === 'application/pdf') {
    return <embed src={file.url} type="application/pdf" title="PDF Preview" className="h-64 w-full my-2" />;
  } else {
    return <p>Unsupported file type</p>;
  }
}

export default RenderFile;