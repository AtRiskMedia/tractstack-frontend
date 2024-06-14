export interface StylesVersion {
  v: number;
}

export type Site = {
  website: string;
  author: string;
  desc: string;
  title: string;
  ogImage?: string;
  ogLogo?: string;
};

export interface Event {
  id: string;
  type: string;
  verb: string;
  duration?: number;
  targetId?: string;
  score?: string;
  targetSlug?: string;
}
export interface Events {
  [key: string]: Event;
}
export interface EventNodes {
  [key: string]: EventNode;
}
export interface EventNode {
  type: string;
  slug?: string;
  title?: string;
  parentId?: string;
}

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
  optimizedSrc?: string;
  type?: `file--file`;
  links?: { self: object };
}

export interface PaneNode {
  type: `node--pane`;
  id: string;
  field_slug?: string;
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
  field_panes: PaneNode[];
  field_tract_stack: TractStackNode;
}
export interface StoryFragmentSiteMap extends T8kNode {
  field_slug: string;
  changed: string;
  created: string;
}

export interface TractStack extends T8kNode {
  field_slug: string;
}
export interface Pane extends T8kNode {
  field_slug: string;
  field_is_context_pane: boolean;
}
export interface ContextPaneSiteMap extends T8kNode {
  field_slug: string;
  changed: string;
  created: string;
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
  created: string;
}

export interface StoryFragmentFullDatum extends T8kNode {
  field_slug: string;
  field_panes: PaneFullDatum[];
  field_tract_stack: TractStackNode;
  drupal_internal__nid: number;
  field_social_image_path: string;
  field_tailwind_background_colour: string;
  field_menu: MenuDatum;
  changed: string;
  created: string;
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
export interface PaneFullDatum extends Pane {
  drupal_internal__nid: number;
  field_options: string;
  field_is_context_pane: boolean;
  field_height_ratio_desktop: string;
  field_height_ratio_tablet: string;
  field_height_ratio_mobile: string;
  field_height_offset_desktop: number;
  field_height_offset_tablet: number;
  field_height_offset_mobile: number;
  field_markdown: MarkdownFullDatum[];
  field_image: FileNode[];
  field_image_svg: FileNode[];
}

export interface ContextPaneDatum extends PaneDatum {
  changed: string;
  created: string;
}
export interface ContextPaneFullDatum extends PaneFullDatum {
  changed: string;
  created: string;
}

export interface MarkdownDatum extends Markdown {
  drupal_internal__nid: number;
  field_markdown_body: string;
  field_image: DrupalFile[];
  field_image_svg: DrupalFile[];
}
export interface MarkdownFullDatum extends Markdown {
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

export interface ResourceDatumProps {
  title: string;
  slug: string;
  category: string | null;
  actionLisp: string;
  oneliner: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  optionsPayload: any;
  timeString?: string;
  dateString?: string;
  venue?: string;
}

export interface ResourceDatumEventProps {
  title: string;
  slug: string;
  category: string | null;
  actionLisp: string;
  oneliner: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  optionsPayload: any;
  timeString: string;
  dateString: string;
  venue: string;
}

export interface StoryFragmentProps {
  title: string;
  id: string;
  slug: string;
  socialImagePath: string | undefined;
  tailwindBgColour: string | undefined;
  menu: MenuDatum;
  panes: PaneNode[];
  panesPayload: PaneDatumProps[];
  impressions: ImpressionDatum[];
  tractStackId: string;
  tractStackTitle: string;
  tractStackSlug: string;
  changed: Date;
  created: Date;
}

export interface ContextPaneProps {
  title: string;
  id: string;
  slug: string;
  panePayload: PaneDatumProps;
  impressions: ImpressionDatum[];
  changed: Date;
  created: Date;
}

// axios sync to concierge

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
  getCurrentRefreshToken: any;
  refreshTokenUrl: string | undefined;
  setRefreshedTokens: any;
  getAuthData: any;
  logout: any;
}

export interface IAxiosRegisterProps {
  referrer: Referrer;
  fingerprint?: string;
  codeword?: string | undefined;
  email?: string | undefined;
  encryptedEmail?: string | undefined;
  encryptedCode?: string | undefined;
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
  refreshToken: string | null;
  jwt: string | null;
  auth: boolean;
  knownLead: boolean;
  neo4jEnabled: boolean;
  firstname: string | null;
  fingerprint: string;
  encryptedEmail: string | null;
  encryptedCode: string | null;
  beliefs: object | null;
}

export interface Referrer {
  httpReferrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}

export interface ImpressionsDatum {
  [key: string]: ImpressionDatum;
}
export interface ImpressionDatum {
  id: string;
  title: string;
  body: string;
  buttonText: string;
  actionsLisp: string;
  parentId: string;
}

export interface CodeHookDatum {
  target: string;
  url: string | undefined;
  options: string | undefined;
  height: string | undefined;
  width: string | undefined;
}

export interface PaneRenderProps {
  payload: PaneDatumProps;
}

export interface BeliefDatum {
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
    modal?: {
      [key: string]: {
        zoomFactor: number;
        paddingLeft: number;
        paddingTop: number;
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
  impressions: ImpressionsDatum;
  codeHook: CodeHookDatum;
  hiddenPane: boolean;
  overflowHidden: boolean;
  maxHScreen: boolean;
  heldBeliefs: BeliefDatum[];
  withheldBeliefs: BeliefDatum[];
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
  paneId: string;
  idx: number;
}

export interface PaneFileNode {
  id: string;
  files: FileNode[];
}

export interface OptimizedImagePre {
  id: string;
  filename: string;
  url: string;
}
export interface OptimizedImage {
  id: string;
  src: string;
}

export interface BeliefOptionDatum {
  id: number;
  slug: string;
  name: string;
  color: string;
}

export type BeliefStore = {
  id: string;
  slug: string;
  verb: string;
  object?: string;
};

export interface Current {
  id: string;
  slug: string;
  title: string;
  parentId?: string;
  parentSlug?: string;
  parentTitle?: string;
}

export interface StoryStep {
  id: string;
  slug: string;
  title: string;
  type: string;
}

export type EventStream = {
  id: string;
  type: string;
  verb: string;
  targetId?: string;
  parentId?: string;
  duration?: number;
  score?: string;
  title?: string;
  targetSlug?: string;
  isContextPane?: string;
};

export type ContentMap = {
  id: string;
  slug: string;
  title: string;
  type: string;
  parentId?: string;
  parentSlug?: string;
  parentTitle?: string;
  panes?: string[];
  isContextPane?: boolean;
};

export type PanesVisible = {
  [key: string]: number | null;
};

export interface ICodeHookIframe {
  target: string;
  url: string;
  height?: number;
  width?: number;
}
export interface ICodeHookShopify {
  id: string;
  target: string;
}
export interface ICodeHook {
  name: string;
  target: string;
}

export interface MenuLink {
  name: string;
  description: string;
  featured: boolean;
  actionLisp: string;
  to: string;
  internal: boolean;
}

export type GraphNode = {
  id?: string;
  startNodeId?: number;
  endNodeId?: number;
  labels?: string[];
  type?: string;
  properties?: {
    name?: string;
    created_at?: number;
    visit_id?: string;
    object_type?: string;
    object_name?: string;
    object?: string;
    fingerprint_id?: string;
    belief_id?: string;
    pageRank?: number;
  };
};
export interface GraphNodes {
  [key: string]: GraphNode | null;
}
export type GraphNodeDatum = {
  id: string;
  title: string;
  label: string;
  color: string;
  value?: number;
};
export type GraphRelationshipDatum = {
  from?: number;
  to?: number;
  label: string;
  font: { align: string; size: string };
  arrows: {
    to: {
      enabled: boolean;
      type: string;
    };
  };
};

export interface GraphPayload {
  payload: {
    nodes: GraphNodeDatum[];
    edges: GraphRelationshipDatum[];
  };
}

export interface ContactPersona {
  id: string;
  description: string;
  title: string;
  disabled?: boolean;
}
