import type socialIcons from "@assets/socialIcons";

export type Site = {
  website: string;
  author: string;
  desc: string;
  title: string;
  ogImage?: string;
};

export type SocialObjects = {
  name: keyof typeof socialIcons;
  href: string;
  active: boolean;
  linkTitle: string;
}[];

// events

export interface Event {
  id: string;
  type: string;
  verb: string;
  duration?: number;
  targetId?: string;
  score?: string;
  targetSlug?: string;
}

// for drupal

export interface Path {
  alias: string;
  pid: number;
  langcode: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DrupalNode extends Record<string, any> {
  id: string;
  type: string;
  langcode: string;
  status: boolean;
  drupal_internal__nid: number;
  drupal_internal__vid: number;
  changed: string;
  created: string;
  title: string;
  default_langcode: boolean;
  sticky: boolean;
  path: Path;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DrupalFile extends Record<string, any> {
  id: string;
  type: string;
  langcode: string;
  status: boolean;
  drupal_internal__fid: number;
  changed: string;
  created: string;
  filename: string;
  uri: {
    value: string;
    url: string;
  };
  filesize: number;
  filemime: string;
  resourceIdObjMeta?: DrupalFileMeta;
  path: Path;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DrupalFileMeta extends Record<string, any> {
  alt?: string;
  title?: string;
  width: number;
  height: number;
}

export interface FileNode {
  type: `file--file`;
  id: string;
}
export interface PaneNode {
  type: `node--pane`;
  id: string;
}
interface StoryFragmentNode {
  type: `node--story_fragment`;
  id: string;
}
interface TractStackNode {
  type: `node--tractstack`;
  id: string;
  title: string;
  field_slug: string;
}
//interface MenuNode {
//  type: `node--menu`;
//  id: string;
//}
//interface MarkdownNode {
//  type: `node--markdown`;
//  id: string;
//}

// Tract Stack types

interface T8kNode {
  type: string;
  id: string;
  title: string;
  links: {
    self: {
      href: string;
    };
  };
}
export interface StoryFragment extends T8kNode {
  field_slug: string;
}
export interface TractStack extends T8kNode {
  field_slug: string;
}
export interface Pane extends T8kNode {
  field_slug: string;
}
export interface Markdown extends T8kNode {
  field_slug: string;
  field_category_slug: string | null;
}
export interface Resource extends T8kNode {
  field_slug: string;
  field_category_slug: string | null;
}
export interface Menu extends T8kNode {
  field_theme: string;
}

export interface StoryFragmentDatum extends StoryFragment {
  drupal_internal__nid: number;
  field_social_image_path: string;
  field_tailwind_background_colour: string;
  field_tract_stack: TractStackNode;
  field_panes: PaneNode[];
  field_menu: MenuDatum;
}
export interface TractStackDatum extends TractStack {
  drupal_internal__nid: number;
  field_story_fragment: StoryFragmentNode[];
}
export interface PaneDatum extends Pane {
  drupal_internal__nid: number;
  field_options: string;
  field_is_context_pane: boolean;
  field_height_ratio_desktop: string;
  field_height_ratio_tablet: string;
  field_height_ratio_mobile: string;
  field_height_offset_desktop: number;
  field_height_offset_tablet: number;
  field_height_offset_mobile: number;
  field_markdown: MarkdownDatum[];
  field_image: FileNode[];
  field_image_svg: FileNode[];
}
export interface MarkdownDatum extends Markdown {
  drupal_internal__nid: number;
  field_markdown_body: string;
  field_image: FileNode[];
  field_image_svg: FileNode[];
}
export interface ResourceDatum extends Resource {
  drupal_internal__nid: number;
  field_options: string;
  field_action_lisp: string;
  field_oneliner: string;
}
export interface MenuDatum extends Menu {
  drupal_internal__nid: number;
  field_options: string;
}

export interface StoryFragmentProps {
  title: string;
  id: string;
  slug: string;
  drupalNid: number;
  socialImagePath: string | undefined;
  tailwindBgColour: string | undefined;
  menu: MenuDatum;
  panes: PaneNode[];
  tractStackId: string;
  tractStackTitle: string;
  tractStackSlug: string;
}
