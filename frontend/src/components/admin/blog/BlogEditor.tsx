import { useMemo } from "react";
import styled from "styled-components";
import { Editor } from "@tinymce/tinymce-react";
import { apiPost } from "../../../lib/api";
import "tinymce/tinymce";
import "tinymce/icons/default";
import "tinymce/models/dom";
import "tinymce/plugins/advlist";
import "tinymce/plugins/anchor";
import "tinymce/plugins/autolink";
import "tinymce/plugins/charmap";
import "tinymce/plugins/code";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/image";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/media";
import "tinymce/plugins/preview";
import "tinymce/plugins/quickbars";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/table";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/visualchars";
import "tinymce/plugins/wordcount";
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/themes/silver";

const EditorWrap = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
`;

const EditorHost = styled.div`
  .tox {
    border: 0;
    font-family: inherit;
  }

  .tox .tox-toolbar,
  .tox .tox-toolbar__primary,
  .tox .tox-toolbar__overflow,
  .tox .tox-toolbar-overlord {
    background: ${({ theme }) => theme.colors.backgroundSoft};
  }

  .tox .tox-edit-area__iframe {
    background: ${({ theme }) => theme.colors.surface};
  }
`;

type BlogEditorProps = {
  value: string;
  onChange: (nextValue: string) => void;
};

type BlogImageUploadResponse = {
  uploadUrl: string;
  storageKey: string;
  fileUrl: string;
};

export function BlogEditor({ value, onChange }: BlogEditorProps) {
  const initialValue = useMemo(() => value || "", [value]);

  function setSelectedImageWidth(editor: any, width: string | null) {
    const node = editor.selection.getNode();

    if (!node || node.nodeName !== "IMG") {
      editor.notificationManager.open({
        text: "Selecione uma imagem para redimensionar.",
        type: "warning",
      });
      return;
    }

    if (!width) {
      editor.dom.setStyle(node, "width", null);
      editor.dom.setStyle(node, "max-width", "100%");
      editor.dom.setStyle(node, "height", "auto");
      return;
    }

    editor.dom.setStyle(node, "width", width);
    editor.dom.setStyle(node, "max-width", "100%");
    editor.dom.setStyle(node, "height", "auto");
  }

  async function uploadImage(blobInfo: { blob: () => Blob }) {
    const blob = blobInfo.blob();
    const file = blob as File;
    const fallbackName = `blog-image-${Date.now()}.png`;
    const fileName = file.name?.trim() ? file.name : fallbackName;
    const fileType = blob.type || "image/png";

    const upload = await apiPost<BlogImageUploadResponse>("/blog/upload-url", {
      fileName,
      fileType,
    });

    const uploadResponse = await fetch(upload.uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": fileType,
      },
      body: blob,
    });

    if (!uploadResponse.ok) {
      throw new Error("Não foi possível enviar a imagem para o armazenamento.");
    }

    return upload.fileUrl;
  }

  return (
    <EditorWrap>
      <EditorHost>
        <Editor
          value={initialValue}
          onEditorChange={(content) => onChange(content)}
          licenseKey="gpl"
          init={{
            promotion: false,
            branding: false,
            menubar: "file edit view insert format tools table",
            placeholder: "Escreva aqui o conteúdo da publicação...",
            min_height: 420,
            resize: true,
            plugins: [
              "advlist",
              "anchor",
              "autolink",
              "charmap",
              "code",
              "fullscreen",
              "image",
              "insertdatetime",
              "link",
              "lists",
              "media",
              "preview",
              "quickbars",
              "searchreplace",
              "table",
              "visualblocks",
              "visualchars",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table | img25 img50 img75 img100 imgauto | removeformat code fullscreen preview",
            block_formats:
              "Parágrafo=p; Título 2=h2; Título 3=h3; Título 4=h4; Citação=blockquote",
            font_size_formats: "12px 14px 16px 18px 20px 24px 28px 32px",
            image_title: true,
            image_caption: true,
            image_advtab: true,
            image_dimensions: true,
            object_resizing: true,
            quickbars_image_toolbar:
              "alignleft aligncenter alignright | imageoptions",
            automatic_uploads: true,
            paste_data_images: true,
            file_picker_types: "image",
            images_upload_handler: uploadImage,
            convert_urls: false,
            content_style:
              "body { font-family: 'Georgia', 'Merriweather', serif; font-size: 16px; line-height: 1.8; color: #1f1f1f; margin: 1rem; } h2,h3,h4 { line-height: 1.25; margin: 1.6rem 0 0.8rem; } p { margin: 0 0 1rem; } blockquote { border-left: 3px solid #8c6b3f; margin: 1.2rem 0; padding: 0.8rem 1rem; background: #f9f6ef; } img,iframe { max-width: 100%; border-radius: 8px; margin: 1rem 0; }",
            link_default_target: "_blank",
            link_title: false,
            media_live_embeds: true,
            setup: (editor) => {
              editor.ui.registry.addButton("img25", {
                text: "Img 25%",
                tooltip: "Imagem 25%",
                onAction: () => setSelectedImageWidth(editor, "25%"),
              });

              editor.ui.registry.addButton("img50", {
                text: "Img 50%",
                tooltip: "Imagem 50%",
                onAction: () => setSelectedImageWidth(editor, "50%"),
              });

              editor.ui.registry.addButton("img75", {
                text: "Img 75%",
                tooltip: "Imagem 75%",
                onAction: () => setSelectedImageWidth(editor, "75%"),
              });

              editor.ui.registry.addButton("img100", {
                text: "Img 100%",
                tooltip: "Imagem 100%",
                onAction: () => setSelectedImageWidth(editor, "100%"),
              });

              editor.ui.registry.addButton("imgauto", {
                text: "Img Auto",
                tooltip: "Imagem tamanho automático",
                onAction: () => setSelectedImageWidth(editor, null),
              });
            },
          }}
        />
      </EditorHost>
    </EditorWrap>
  );
}
