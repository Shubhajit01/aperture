interface Font {
  fontFamily: string;
  label: string;
}

export const commonFonts: Font[] = [
  { fontFamily: "Arial, Helvetica, sans-serif", label: "Arial" },
  { fontFamily: "Verdana, Geneva, sans-serif", label: "Verdana" },
  { fontFamily: "Tahoma, Geneva, sans-serif", label: "Tahoma" },
  { fontFamily: "'Segoe UI', sans-serif", label: "Segoe UI" }, // Common Windows font
  { fontFamily: "Helvetica, Arial, sans-serif", label: "Helvetica" }, // Common macOS/iOS font
  { fontFamily: "'Times New Roman', Georgia, serif", label: "Times New Roman" },
  {
    fontFamily: "Georgia, 'Palatino Linotype', 'Book Antiqua', serif",
    label: "Georgia",
  },
  {
    fontFamily: "'Palatino Linotype', 'Book Antiqua', Georgia, serif",
    label: "Palatino Linotype",
  },
  { fontFamily: "'Courier New', monospace", label: "Courier New" },
  {
    fontFamily: "Consolas, 'Lucida Console', Monaco, monospace",
    label: "Consolas",
  }, // Common monospaces
  { fontFamily: "Impact, fantasy", label: "Impact" },
  { fontFamily: "'Arial Black', Gadget, sans-serif", label: "Arial Black" },
  { fontFamily: "'Comic Sans MS', cursive", label: "Comic Sans MS" },
  { fontFamily: "'Lucida Handwriting', cursive", label: "Lucida Handwriting" },
];
