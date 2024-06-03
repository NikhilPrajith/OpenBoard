'use client'
import React from "react";
import Image from "next/image";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { Avatar } from "@/primitives/Avatar";
import styles from "./TemplatesCard.module.css";
import { useRouter } from 'next/navigation';
import { useBoard } from "@/context/BoardContext";

interface TemplateCardProps {
  img: string;
  tag: string;
  title: string;
  author: { name: string; img: string };
  id: string;
}

export function TemplateCard({
  img,
  tag,
  title,
  author,
  id,
}: TemplateCardProps) {
  const router = useRouter();
  const {documentName,
    setDocumentName,
  } = useBoard()
  const handleClick = () => {
    setDocumentName(title);
    router.push(`/templates/canvas?documentId=${id}`);
  };

  return (
    <Card shadow={false} className={styles.container} onClick={handleClick} role="button">
      <CardHeader>
        <Image
          width={768}
          height={500}
          src={img}
          alt={title}
          className="max-h-44 h-full w-full scale-110 object-cover"
        />
      </CardHeader>
      <CardBody className="p-6">
        <Typography variant="small" color="color(srgb 0.8975 0.7331 0.9688)" className="mb-2 !font-medium">
          {tag}
        </Typography>
        <Typography
          as="span"
          variant="h5"
          color="blue-gray"
          className="mb-2 normal-case transition-colors hover:text-gray-900"
        >
          {title}
        </Typography>

        <div className="flex items-center gap-2">
          <Avatar
            name={author.name}
            size={20}
            src={author.img}
            alt={author.name}
          />
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-0.5 !font-medium"
            >
              {author.name}
            </Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default TemplateCard;
