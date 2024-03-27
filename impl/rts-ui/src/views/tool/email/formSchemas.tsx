import type { FormSchema } from '@/components/core/schema-form/';
import type { IPropTypes } from '@tinymce/tinymce-vue/lib/es2015/main/ts/components/EditorPropTypes';
import TinymceEditor from '@/components/basic/tinymce';
import Api from '@/api/';

const initOptions: IPropTypes['init'] = {
  images_upload_handler: async (blobInfo) => {
    const data = await Api.toolsUpload.uploadUpload({ file: blobInfo.blob() });
    return data.filename;
  },
};

export const sendSchemas: FormSchema<API.EmailSendDto>[] = [
  {
    field: 'subject',
    component: 'Input',
    label: 'Subject',
    required: true,
    colProps: { md: 18 },
  },
  {
    field: 'to',
    component: 'Input',
    label: 'To',
    helpMessage: 'Multiple addresses separated by commas',
    componentProps: {
      placeholder: 'Please enter your email address. Separate multiple addresses with commas.',
    },
    colProps: { md: 18 },
    rules: [{ type: 'email', required: true, message: 'please enter a valid email address' }],
  },
  {
    field: 'content',
    component: () => {
      return <TinymceEditor init={initOptions} />;
    },
    label: 'Content',
    colProps: { md: 18 },
  },
];
