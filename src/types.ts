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
  id: string;
  filename: string;
  uri: {
    value: string;
    url: string;
  };
  type?: `file--file`;
  links?: { self: object };
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
  changed: string;
}
export interface TractStackDatum extends TractStack {
  drupal_internal__nid: number;
  field_story_fragment: StoryFragmentNode[];
}
export interface PaneDatumProps {
  title: string;
  id: string;
  slug: string;
  drupalNid: number;
  optionsPayload: PaneOptionsPayload;
  isContextPane: boolean;
  heightRatioDesktop: string;
  heightRatioTablet: string;
  heightRatioMobile: string;
  heightOffsetDesktop: number;
  heightOffsetTablet: number;
  heightOffsetMobile: number;
  markdown: MarkdownPaneProps[];
  files: FileNode[];
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
  field_image: DrupalFile[];
  field_image_svg: DrupalFile[];
}
export interface MarkdownDatum extends Markdown {
  drupal_internal__nid: number;
  field_markdown_body: string;
  field_image: DrupalFile[];
  field_image_svg: DrupalFile[];
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

export interface ContentMap {
  id: string;
  slug: string;
  parentId: string;
  parentSlug: string;
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
  panesPayload: PaneDatumProps[];
  tractStackId: string;
  tractStackTitle: string;
  tractStackSlug: string;
  changed: number;
  contentMap: ContentMap[];
}

// axios sync to concierge
import type { IContentMapDict } from "@tractstack/types";

export interface IEventStream {
  duration: number;
  id: string;
  type: string;
  verb: string;
  targetId?: string;
  score?: string;
  title?: string;
  targetSlug?: string;
  isContextPane?: string;
}
export interface IEventStreamDict {
  [key: string]: IEventStream;
}

export interface IAxiosClientProps {
  options: any;
  getCurrentAccessToken: any;
  refreshTokenUrl: string | undefined;
  setRefreshedTokens: any;
  getAuthData: any;
  logout: any;
}

export interface IAxiosRegisterProps {
  referrer: IReferrer;
  fingerprint?: string;
  codeword?: string | undefined;
  email?: string | undefined;
  encryptedEmail?: string | undefined;
  encryptedCode?: string | undefined;
}

export interface IAxiosPushProps {
  eventStream: IEventStreamDict;
  contentMap: IContentMapDict;
  referrer?: IReferrer;
  tractStackId?: string;
}

export interface IAxiosProfileProps {
  profile: {
    bio: string;
    codeword: string;
    email: string;
    firstname: string;
    init: boolean;
    persona: string;
  };
}

export interface ITokens {
  encryptedCode: string | null;
  encryptedEmail: string | null;
}

export interface IAuthStorePayload {
  firstname: string | null;
  encryptedEmail: string | null;
  encryptedCode: string | null;
  email: string;
  contactPersona: string;
  shortBio: string;
  authenticated: boolean;
  knownLead: boolean;
  badLogin: boolean;
}

export interface IAuthStoreLoginResponse {
  tokens: string;
  jwt: string | null;
  auth: boolean;
  knownLead: boolean;
  firstname: string | null;
  fingerprint: string;
  encryptedEmail: string | null;
  encryptedCode: string | null;
  beliefs: object | null;
}

export interface IReferrer {
  httpReferrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}

export interface Impression {
  [key: string]: {
    id: string;
    title: string;
    body: string;
    buttonText: string;
    actionsLisp: string;
    parentId: string;
  };
}

export interface CodeHook {
  target: string;
  url: string | undefined;
  height: string | undefined;
  width: string | undefined;
}

export interface PaneRenderProps {
  payload: PaneDatumProps;
}

export interface Beliefs {
  [key: string]: string | string[];
}

export interface MarkdownPaneProps {
  id: string;
  drupalNid: number;
  title: string;
  body: string;
  htmlAst: any;
  slug: string;
}
export interface PaneFragmentDatum {
  id: string;
  hiddenViewports: string;
}
export interface BgColourDatum extends PaneFragmentDatum {
  internal: {
    type: `bgColour`;
  };
  bgColour: string;
}
export interface BgPaneDatum extends PaneFragmentDatum {
  internal: {
    type: `bgPane`;
  };
  shape?: string;
  shapeDesktop?: string;
  shapeTablet?: string;
  shapeMobile?: string;
  optionsPayload: {
    artpack?: {
      [key: string]: {
        image: string;
        collection: string;
        filetype: string;
        mode: string;
        objectFit: string;
        svgFill?: string;
      };
    };
    classNamesPayload?: {
      [key: string]: {
        classes: {
          [key: string]: {
            [key: string]: string[];
          };
        };
      };
    };
    classNamesParent?: {
      [key: string]: string;
    };
  };
}
export interface MarkdownPaneDatum extends PaneFragmentDatum {
  internal: {
    type: `markdown`;
  };
  imageMaskShape: string;
  imageMaskShapeDesktop?: string;
  imageMaskShapeTablet?: string;
  imageMaskShapeMobile?: string;
  textShapeOutside: string;
  textShapeOutsideDesktop?: string;
  textShapeOutsideTablet?: string;
  textShapeOutsideMobile?: string;
  optionsPayload: {
    classNamesParent?: {
      [key: string]: string;
    };
    classNamesModal?: {
      [key: string]: string;
    };
    classNames?: {
      [key: string]: {
        [key: string]: string | string[];
      };
    };
    buttons?: {
      [key: string]: {
        urlTarget: string;
        callbackPayload: string;
        className: string;
        classNamesPayload: {
          [key: string]: {
            classes: {
              [key: string]: string[] | number[];
            };
          };
        };
      };
    };
  };
  isModal: boolean;
  markdownId?: string;
  markdownBody?: string;
}

export interface PaneOptionsPayload {
  id: string;
  paneFragmentsPayload: BgPaneDatum[] | BgColourDatum[] | MarkdownPaneDatum[];
  impressions: Impression[];
  codeHook: CodeHook;
  hiddenPane: boolean;
  overflowHidden: boolean;
  maxHScreen: boolean;
  heldBeliefs: Beliefs[];
  withheldBeliefs: Beliefs[];
}

export interface ButtonData {
  urlTarget: string;
  callbackPayload: string;
  className: string;
  classNamesPayload: {
    [key: string]: {
      classes: {
        [key: string]: string[] | number[];
      };
    };
  };
}

export interface PaneFromAstProps {
  payload: {
    ast: any[];
    imageData: FileNode[];
    buttonData: { [key: string]: ButtonData };
  };
  thisClassNames: any;
  memory: any;
  id: string;
  idx: number;
}

export interface PaneFileNodes {
  id: string;
  files: FileNode[];
}
