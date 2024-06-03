// components/TemplatesPage.js
'use client';

import { useState } from 'react';
import TemplateCard from '@/components/TemplateComps/Card/TemplateCard';
import { Button, Typography, Spinner } from '@material-tailwind/react';
import { getTemplates } from '@/actions/getTemplates';

const TemplatesPage = ({ initialTemplates, initialLastVisible }) => {
  const [templates, setTemplates] = useState(initialTemplates);
  const [lastVisible, setLastVisible] = useState(initialLastVisible);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    if (!lastVisible) return;

    setLoading(true);
    const { templates: newTemplates, lastVisibleDoc } = await getTemplates(lastVisible);
    setTemplates([...templates, ...newTemplates]);
    setLastVisible(lastVisibleDoc);
    setLoading(false);
  };

  return (
    <section className="grid h-screen place-items-center" style={{ paddingLeft: '65px', overflowY: 'scroll', paddingTop: '86px' }}>
      <Typography variant="h6" className="mb-2">
        Be Creative
      </Typography>
      <Typography variant="h1" className="mb-2">
        Board Templates
      </Typography>
      <Typography variant="lead" color="gray" className="max-w-3xl mb-36 text-center text-gray-500">
        Find some pre-built boards for specific needs to help you get started!😊
      </Typography>
      <div className="container my-auto grid grid-cols-2 gap-x-8 gap-y-16 items-start lg:grid-cols-4" style={{ padding: '25px' }}>
        {templates.map(({ id, img, tag, title, author }) => (
          <TemplateCard key={id} img={img} tag={tag} title={title} author={author} id={id} />
        ))}
      </div>
      {loading && <Spinner />}
      <Button
        variant="text"
        size="lg"
        color="gray"
        className="flex items-center gap-2 mt-24"
        onClick={loadMore}
        disabled={loading || !lastVisible}
      >
        VIEW MORE
      </Button>
    </section>
  );
};

export default TemplatesPage;
