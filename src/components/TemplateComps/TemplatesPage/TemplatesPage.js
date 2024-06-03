'use client'
// components/TemplatesPage.js
import { useState, useEffect } from 'react';
import TemplateCard from '@/components/TemplateComps/Card/TemplateCard';
import { Button, Typography, Spinner, Input } from '@material-tailwind/react';
import { getTemplates } from '@/actions/getTemplates';

const TemplatesPage = ({ initialTemplates, initialLastVisible }) => {
  const [templates, setTemplates] = useState(initialTemplates);
  const [displayedTemplates, setDisplayedTemplates] = useState(initialTemplates); // State for filtered templates
  const [lastVisible, setLastVisible] = useState(initialLastVisible);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const loadMore = async () => {
    if (!lastVisible || !hasMore) {
      console.log("no more");
      return;
    };

    setLoading(true);
    const { templates: newTemplates, lastVisibleDoc } = await getTemplates(lastVisible);
    setTemplates(prevTemplates => [...prevTemplates, ...newTemplates]);
    setDisplayedTemplates(prevTemplates => [...prevTemplates, ...newTemplates]); // Update displayed templates
    setLastVisible(lastVisibleDoc);
    setLoading(false);
    if (!lastVisibleDoc) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    if (!initialTemplates.length) {
      loadMore();
    }
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setDisplayedTemplates(templates);
    } else {
      setDisplayedTemplates(
        templates.filter(template => 
          template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          template.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
          template.author.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, templates]);

  return (
    <section className="grid h-screen place-items-center" style={{ paddingLeft: '65px', overflowY: 'scroll', paddingTop: '86px', paddingBottom:'50px' }}>
      <Typography variant="h6" className="mb-2">
        Be Creative
      </Typography>
      <Typography variant="h1" className="mb-2">
        Board Templates
      </Typography>
      <Typography variant="lead" color="gray" className="max-w-3xl mb-12 text-center text-gray-500">
        Find some pre-built boards for specific needs to help you get started!😊
      </Typography>
      <div className="mb-24">
        <Input
          type="text"
          label="Search templates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md "
        />
      </div>
      <div className="container my-auto grid grid-cols-2 gap-x-8 gap-y-16 items-start lg:grid-cols-4" style={{ padding: '25px' }}>
        {displayedTemplates.map(({ id, img, tag, title, author }) => (
          <TemplateCard key={id} img={img} tag={tag} title={title} author={author} id={id} />
        ))}
      </div>
      {loading && <Spinner />}
      {hasMore && (
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
      )}
    </section>
  );
};

export default TemplatesPage;
