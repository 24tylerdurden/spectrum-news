import React, { forwardRef } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ color: [] }, { background: [] }],
    ['link'],
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'color',
  'background',
  'link',
];

export const RichTextEditor = forwardRef<ReactQuill, RichTextEditorProps>(
  ({ value, onChange, placeholder, className, readOnly = false }, ref) => {
    return (
      <div className={cn('bg-background', className)}>
        <ReactQuill
          ref={ref}
          theme="snow"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          modules={modules}
          formats={formats}
          readOnly={readOnly}
          style={{
            height: '300px',
            marginBottom: '42px',
          }}
        />
      </div>
    );
  }
);

RichTextEditor.displayName = 'RichTextEditor';
