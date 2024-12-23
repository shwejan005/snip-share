"use client"
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { useParams } from 'next/navigation'
import React from 'react'
import Skeleton from './_components/Skeleton';
import NavigationHeader from '@/components/NavigationHeader';

function SnippetDetailPage() {
  const snippetId = useParams().id;

  const snippet = useQuery(api.snippets.getSnippetById, { snippetId: snippetId as Id<"snippets"> });
  const comments = useQuery(api.snippets.getComments, { snippetId: snippetId as Id<"snippets"> });

  if(snippet === undefined) return <Skeleton />
  return (
    <div className='min-h-screen bg-[#0a0a0f]'>
       <NavigationHeader />

    </div>
  )
}

export default SnippetDetailPage