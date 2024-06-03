import { getTemplates } from '@/actions/getTemplates';
import TemplatesPage from '@/components/TemplateComps/TemplatesPage/TemplatesPage';

export default async function Page() {
  const { templates, lastVisibleDoc } = await getTemplates();

  return (
    <TemplatesPage initialTemplates={templates} initialLastVisible={lastVisibleDoc} />
  );
}
