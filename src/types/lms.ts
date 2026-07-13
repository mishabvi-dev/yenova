export interface CourseModule {
  id: string;
  title: string;
  type: 'video' | 'article' | 'link';
  contentUrl: string; // YouTube URL, PDF URL, or external link
  durationText?: string; // e.g. "10 mins"
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  author: string;
  modules: CourseModule[];
}
