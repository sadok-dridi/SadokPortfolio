import { notFound } from 'next/navigation';
import { getProjectBySlug, getAllProjectSlugs, projects } from '@/data/projects';
import { readFileSync } from 'fs';
import sizeOf from 'image-size';
import path from 'path';
import CaseStudyClient from './CaseStudyClient';

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  
  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: `${project.title} | Sadok`,
    description: project.description,
  };
}

function getImageDimensions(src: string) {
  const filePath = path.join(process.cwd(), 'public', src);
  try {
    const buffer = readFileSync(filePath);
    const { width, height } = sizeOf(buffer);
    return { width, height };
  } catch {
    return { width: 1905, height: 1000 };
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const galleryPhotos = project.images.map((src) => {
    const { width, height } = getImageDimensions(src);
    return { src, width, height, alt: `${project.title} screenshot` };
  });

  // Get next project for navigation
  const currentIndex = projects.findIndex(p => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return <CaseStudyClient project={project} nextProject={nextProject} galleryPhotos={galleryPhotos} />;
}
