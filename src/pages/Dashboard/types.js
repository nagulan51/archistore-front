import docx from "../../assets/img/file_type/docx.png";
import jpeg from "../../assets/img/file_type/jpeg.png";
import mp3 from "../../assets/img/file_type/mp3.png";
import mp4 from "../../assets/img/file_type/mp4.png";
import pdf from "../../assets/img/file_type/pdf.png";
import png from "../../assets/img/file_type/png.png";
import pptx from "../../assets/img/file_type/pptx.png";
import stl from "../../assets/img/file_type/stl.png";
import svg from "../../assets/img/file_type/svg.png";
import txt from "../../assets/img/file_type/txt.png";
import unknownFile from "../../assets/img/file_type/unknown.png";

// Object mapping file extensions to icons
export const fileIcons = {
  docx,
  doc: docx,
  jpeg,
  jpg: jpeg,
  mp3,
  mp4,
  pdf,
  png,
  pptx,
  ppt: pptx,
  stl,
  svg,
  txt,
  unknown: unknownFile, // Default icon for unknown file types
};
