import { Download, ExternalLink, X } from "lucide-react";

export default function PdfModal({ file, title, onClose }) {
  if (!file) return null;
  const src = file.data || file.url;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-lg bg-white shadow-soft">
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
          <div className="min-w-0">
            <h2 className="line-clamp-1 font-semibold text-primary">{title}</h2>
            <p className="line-clamp-1 text-xs text-muted">
              {file.name || "Notice PDF"}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {src && (
              <>
                <a
                  href={src}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-muted hover:border-primary hover:text-primary"
                  aria-label="Open PDF in new tab"
                  title="Open PDF in new tab"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href={src}
                  download={file.name || "notice.pdf"}
                  className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-muted hover:border-primary hover:text-primary"
                  aria-label="Download PDF"
                  title="Download PDF"
                >
                  <Download className="h-4 w-4" />
                </a>
              </>
            )}
            <button
              type="button"
              onClick={onClose}
              className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-muted hover:border-primary hover:text-primary"
              aria-label="Close PDF viewer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        {src ? (
          <iframe title={title} src={src} className="h-[75vh] w-full" />
        ) : (
          <div className="grid min-h-[260px] place-items-center p-6 text-center font-body text-sm text-muted">
            This PDF needs to be re-uploaded before it can be viewed.
          </div>
        )}
      </div>
    </div>
  );
}