import {
  lispLexer,
  preParseConcierge,
  concierge,
  classNames,
} from "@tractstack/helpers";
import type { FileNode, ButtonData } from "../types";

export default function PaneFromAst({
  payload,
  thisClassNames,
  hooks,
  memory,
  id,
  idx,
  flags,
}: {
  payload: {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    ast: any[];
    imageData: FileNode[];
    buttonData: { [key: string]: ButtonData };
  };
  thisClassNames: any;
  hooks: any;
  memory: any;
  id: string;
  idx: number;
  flags: {
    isBuilderPreview?: boolean;
  };
}) {
  //if (idx) {
  //  console.log(``);
  //  console.log(`-RECURSION---${idx} `);
  //  console.log(payload.ast);
  //}
  const newMemory = { ...memory };
  const interceptEditInPlace = hooks?.EditInPlace;

  return payload.ast
    .filter((e: any) => !(e?.type === `text` && e?.value === `\n`))
    .map((e: any, thisIdx: number) => {
      const Tag = e?.tagName || e?.type;
      if (!Tag) return null;

      const thisId = `t8k-${id}--${Tag}-${idx}-${thisIdx}`;
      const thisBuilderId = `${Tag}-${idx}`;

      // if string[], use idx to select correct nth style to inject
      // must increment memory index
      if (e?.tagName && typeof thisClassNames[e?.tagName] === `object`) {
        if (typeof memory[e.tagName] !== `undefined`)
          memory[e.tagName] = memory[e.tagName] + 1;
        else memory[e.tagName] = 0;
      }
      const injectClassNames =
        typeof e?.tagName === `undefined`
          ? ``
          : typeof thisClassNames[e?.tagName] === `string`
            ? thisClassNames[e?.tagName]
            : typeof thisClassNames[e?.tagName] !== `undefined` &&
                typeof thisClassNames[e?.tagName][memory[e.tagName]] !==
                  `undefined`
              ? thisClassNames[e?.tagName][memory[e.tagName]]
              : ``;

      switch (Tag) {
        case `text`:
          return `${e.value}`;

        case `h1`:
        case `h2`:
        case `h3`:
        case `h4`:
        case `h5`:
        case `h6`: {
          if (flags?.isBuilderPreview && interceptEditInPlace)
            return (
              <div
                className="builder relative z-2 border border-transparent"
                id={thisBuilderId}
                key={thisId}
              >
                {interceptEditInPlace({
                  nth: thisIdx,
                  Tag,
                  value: (
                    <div className={classNames(injectClassNames)} key={thisId}>
                      {e?.children[0].value}
                    </div>
                  ),
                  className: injectClassNames,
                })}
              </div>
            );
          return (
            <Tag className={classNames(injectClassNames)} key={thisId}>
              {e?.children[0].value}
            </Tag>
          );
        }

        case `p`: {
          if (flags?.isBuilderPreview && interceptEditInPlace)
            return (
              <div
                className="builder relative z-2 border border-transparent"
                id={thisBuilderId}
                key={thisId}
              >
                {interceptEditInPlace({
                  nth: thisIdx,
                  Tag: e?.tagName,
                  value: (
                    <p key={thisId} className={classNames(injectClassNames)}>
                      {e?.children?.map((p: any, x: number) => (
                        <span key={`${thisId}-${x}`}>
                          <PaneFromAst
                            payload={{ ...payload, ast: [p] }}
                            thisClassNames={thisClassNames}
                            hooks={hooks}
                            memory={memory}
                            id={id}
                            idx={idx + 1}
                            flags={flags}
                          />
                        </span>
                      ))}
                    </p>
                  ),
                  className: injectClassNames,
                })}
              </div>
            );

          return (
            <p key={thisId} className={classNames(injectClassNames)}>
              {e?.children?.map((p: any, x: number) => (
                <span key={`${thisId}-${x}`}>
                  <PaneFromAst
                    payload={{ ...payload, ast: [p] }}
                    thisClassNames={thisClassNames}
                    hooks={hooks}
                    memory={memory}
                    id={id}
                    idx={idx + 1}
                    flags={flags}
                  />
                </span>
              ))}
            </p>
          );
        }

        case `a`: {
          if (
            typeof e?.properties?.href === `string` &&
            e?.children[0]?.type === `text` &&
            typeof e?.children[0]?.value === `string`
          ) {
            // check for buttons action payload
            // requires match on button's urlTarget === link's href
            const isButton =
              typeof payload?.buttonData === `object` &&
              Object.keys(payload?.buttonData).length &&
              e?.properties?.href &&
              typeof payload?.buttonData[e.properties.href] !== `undefined`
                ? payload.buttonData[e.properties.href]
                : undefined;

            const isExternalUrl =
              typeof e?.properties?.href === `string` &&
              e.properties.href.substring(0, 8) === `https://`;

            if (flags?.isBuilderPreview && interceptEditInPlace) {
              return (
                <a
                  className={isButton?.className || injectClassNames}
                  key={thisId}
                  href={e.properties.href}
                >
                  {e?.children[0].value}
                </a>
              );
            } else if (flags?.isBuilderPreview)
              return (
                <button
                  type="button"
                  className={isButton?.className || injectClassNames}
                  key={thisId}
                  value={e.properties.href}
                >
                  {e?.children[0].value}
                </button>
              );
            else if (isExternalUrl) {
              return (
                <a
                  target="_blank"
                  rel="noreferrer"
                  className={isButton?.className || injectClassNames}
                  key={thisId}
                  href={e.properties.href}
                >
                  {e?.children[0].value}
                </a>
              );
            } else if (isButton) {
              // inject button with callback function, add css className
              const thisButtonPayload = lispLexer(isButton?.callbackPayload);
              const pre = preParseConcierge(thisButtonPayload, id, hooks);
              const internal = typeof pre === `string`;
              const targetUrl = internal
                ? pre
                : pre && pre?.length === 1
                  ? pre[0]
                  : null;
              console.log(targetUrl);
              const injectPayload = function (): void {
                concierge(thisButtonPayload, hooks, id, payload.parent);
              };
              return (
                <button
                  type="button"
                  className={isButton.className}
                  key={thisId}
                  onClick={injectPayload}
                >
                  {e?.children[0].value}
                </button>
              );
            }
            // else, treat at internal link to a storyfragment
            const thisPayload = lispLexer(
              `(hookGotoStoryFragment (${e?.properties?.href}))`
            );
            return (
              <button
                  className={injectClassNames}
                onClick={() => concierge(thisPayload, hooks, id)}
                key={thisId}
              >
                {e?.children[0].value}
              </button>
            );
          }
          break;
        }

        case `img`: {
          const altText =
            e?.properties?.alt ||
            `This should be descriptive text of an image | We apologize the alt text is missing.`;
          // check for image and imageWrapper style tag
          let injectClassNamesImgWrapper;
          let injectClassNamesImg;
          const injectClassNamesImgRawWrapper =
            e?.tagName && typeof thisClassNames.imgWrapper !== `undefined`
              ? thisClassNames.imgWrapper
              : ``;
          const injectClassNamesImgRaw =
            e?.tagName && typeof thisClassNames.img !== `undefined`
              ? thisClassNames.img
              : ``;
          if (
            injectClassNamesImgRawWrapper &&
            typeof injectClassNamesImgRawWrapper === `string`
          ) {
            injectClassNamesImgWrapper = injectClassNamesImgRawWrapper;
          } else if (
            e?.tagName &&
            injectClassNamesImgRawWrapper &&
            typeof injectClassNamesImgRawWrapper === `object`
          ) {
            if (e?.tagName && typeof memory.imgWrapper !== `undefined`)
              memory.imgWrapper = memory.imgWrapper + 1;
            else memory.imgWrapper = 0;
            injectClassNamesImgWrapper =
              injectClassNamesImgRawWrapper[memory.imgWrapper];
          }
          if (
            injectClassNamesImgRaw &&
            typeof injectClassNamesImgRaw === `string`
          ) {
            injectClassNamesImg = injectClassNamesImgRaw;
          } else if (
            e?.tagName &&
            injectClassNamesImgRaw &&
            typeof injectClassNamesImgRaw === `object`
          ) {
            //if (e?.tagName && typeof memory.img !== `undefined`)
            //  memory.img = memory.img + 1;
            //else memory.img = 0;
            injectClassNamesImg = injectClassNamesImgRaw[memory.img];
          }
          const pass = /\.[A-Za-z0-9]+$/;
          const extcheck = e?.properties?.src?.match(pass);

          if (e?.properties?.src === `ImagePlaceholder`) {
            // for storykeep EditInPlace interface
            const image = <span key={thisId}>[IMAGE HERE]</span>;
            if (flags?.isBuilderPreview && interceptEditInPlace)
              return (
                <div
                  className="builder relative z-2 border border-transparent"
                  id={thisBuilderId}
                  key={thisId}
                >
                  {interceptEditInPlace({
                    nth: memory.child,
                    Tag: e?.tagName,
                    value: image,
                    parent: memory.parent,
                    className: injectClassNames,
                  })}
                </div>
              );
            return image;
          } else if (
            extcheck &&
            (extcheck[0] === `.png` ||
              extcheck[0] === `.jpg` ||
              extcheck[0] === `.gif`)
          ) {
            // imageData in this case is an array ... assumes image is first element
            const thisImageDataRaw = payload?.imageData?.filter(
              (image: any) => image.filename === e?.properties?.src
            )[0];
            if (flags?.isBuilderPreview && interceptEditInPlace) {
              const image = (
                <img
                  className={classNames(
                    injectClassNames,
                    injectClassNamesImgWrapper,
                    injectClassNamesImg
                  )}
                  key={thisId}
                  src={thisImageDataRaw?.localFile?.publicURL}
                />
              );
              return (
                <div
                  className="builder relative z-2 border border-transparent"
                  id={thisBuilderId}
                  key={thisId}
                >
                  {interceptEditInPlace({
                    nth: memory.child,
                    Tag: e?.tagName,
                    value: image,
                    parent: memory.parent,
                    className: injectClassNames,
                  })}
                </div>
              );
            }
            return (
              <img
                className={classNames(
                  injectClassNames,
                  injectClassNamesImgWrapper,
                  injectClassNamesImg
                )}
                key={thisId}
                src={thisImageDataRaw?.localFile?.publicURL}
                title={altText}
                alt={e?.properties?.alt}
              />
            );
          } else if (extcheck && extcheck[0] === `.svg`) {
            const thisImageDataRaw = payload?.imageData.filter(
              (image: any) => image.filename === e?.properties?.src
            )[0];
            const image = (
              <img
                key={thisId}
                src={thisImageDataRaw?.localFile?.publicURL}
                title={altText}
                className={classNames(injectClassNames, injectClassNamesImg)}
              />
            );
            if (flags?.isBuilderPreview && interceptEditInPlace)
              return (
                <div
                  className="builder relative z-2 border border-transparent"
                  id={thisBuilderId}
                  key={thisId}
                >
                  {interceptEditInPlace({
                    nth: memory.child,
                    Tag: e?.tagName,
                    value: image,
                    parent: memory.parent,
                    className: injectClassNames,
                  })}
                </div>
              );
            return image;
          }
          break;
        }

        case `code`: {
          // if (typeof hooks.template === `undefined`) return null
          // currently only supports inject, belief, youtube and resource
          const regexpHook =
            /(identifyAs|youtube|toggle|resource|belief)\((.*?)\)/;
          const regexpValues = /((?:[^\\|]+|\\\|?)+)/g;
          const thisHookRaw = e.children[0].value.match(regexpHook);
          const hook =
            thisHookRaw && typeof thisHookRaw[1] === `string`
              ? thisHookRaw[1]
              : null;
          const thisHookPayload =
            thisHookRaw && typeof thisHookRaw[2] === `string`
              ? thisHookRaw[2]
              : null;
          const thisHookValuesRaw =
            thisHookPayload && thisHookPayload.match(regexpValues);
          const value1 =
            thisHookValuesRaw && thisHookValuesRaw.length
              ? thisHookValuesRaw[0]
              : null;
          const value2 =
            thisHookValuesRaw && thisHookValuesRaw.length > 1
              ? thisHookValuesRaw[1]
              : null;
          const value3 =
            thisHookValuesRaw && thisHookValuesRaw.length > 2
              ? thisHookValuesRaw[2]
              : null;
          const value4 =
            thisHookValuesRaw && thisHookValuesRaw.length > 3
              ? thisHookValuesRaw[3]
              : null;
          if (!hook) return <div key={thisId}>missing hook</div>;
          if (flags?.isBuilderPreview && !interceptEditInPlace)
            return (
              <div
                className="builder relative z-2 border border-transparent"
                id={thisBuilderId}
                key={thisId}
              >
                <p className={injectClassNames}>
                  Code hook: {hook} = {value1} | {value2}
                </p>
              </div>
            );
          if (
            [`belief`, `identifyAs`].includes(hook) &&
            value1 &&
            value2 &&
            flags?.isBuilderPreview &&
            interceptEditInPlace
          )
            return (
              <div
                className={classNames(
                  injectClassNames,
                  `builder relative z-2 border border-transparent`
                )}
                id={thisBuilderId}
                key={thisId}
              >
                {interceptEditInPlace({
                  nth: memory.child,
                  Tag: e?.tagName,
                  value: `Belief widget: ${value1}`,
                  parent: memory.parent,
                })}
              </div>
            );
          else if (hook === `belief` && value1 && value2) {
            const Belief = hooks.belief;
            return (
              <Belief
                key={thisId}
                value={{ slug: value1, scale: value2, extra: value3 }}
                cssClasses={injectClassNames}
                storyFragmentId={id}
              />
            );
          } else if (hook === `identifyAs` && value1 && value2) {
            const IdentifyAs = hooks.identifyAs;
            return (
              <IdentifyAs
                key={thisId}
                value={{ slug: value1, target: value2, extra: value3 }}
                cssClasses={injectClassNames}
                storyFragmentId={id}
              />
            );
          } else if (
            hook === `inject` &&
            value1 &&
            flags?.isBuilderPreview &&
            interceptEditInPlace
          )
            return (
              <div
                className={classNames(
                  injectClassNames,
                  `builder relative z-2 border border-transparent`
                )}
                id={thisBuilderId}
                key={thisId}
              >
                {interceptEditInPlace({
                  nth: memory.child,
                  Tag: e?.tagName,
                  value: `Inject component: widget ${value1}`,
                  parent: memory.parent,
                })}
              </div>
            );
          else if (hook === `inject` && value1) {
            const InjectComponent = hooks?.templates?.injectComponent;
            if (InjectComponent)
              return <InjectComponent key={thisId} target={value1} />;
          } else if (
            hook === `toggle` &&
            value1 &&
            flags?.isBuilderPreview &&
            interceptEditInPlace
          )
            return (
              <div
                className={classNames(
                  injectClassNames,
                  `builder relative z-2 border border-transparent`
                )}
                id={thisBuilderId}
                key={thisId}
              >
                {interceptEditInPlace({
                  nth: memory.child,
                  Tag: e?.tagName,
                  value: `Toggle belief: ${value1}`,
                  parent: memory.parent,
                })}
              </div>
            );
          else if (hook === `toggle` && value1 && value3 && value4) {
            const ToggleBelief = hooks?.toggle;
            return (
              <ToggleBelief
                key={thisId}
                belief={value1}
                value={value3}
                prompt={value4}
                storyFragmentId={id}
                cssClasses={injectClassNames}
              />
            );
          } else if (
            hook === `youtube` &&
            value1 &&
            value2 &&
            flags?.isBuilderPreview &&
            interceptEditInPlace
          )
            return (
              <div
                className={classNames(
                  injectClassNames,
                  `builder relative z-2 border border-transparent`
                )}
                id={thisBuilderId}
                key={thisId}
              >
                {interceptEditInPlace({
                  nth: memory.child,
                  Tag: e?.tagName,
                  value: `YouTube embed: ${value2}`,
                  parent: memory.parent,
                })}
              </div>
            );
          else if (hook === `youtube` && value1 && value2) {
            const YouTube = hooks?.youtube;
            return (
              <YouTube
                key={thisId}
                videoId={value1}
                title={value2}
                cssClasses={injectClassNames}
              />
            );
          } else if (
            hook === `resource` &&
            value1 &&
            value2 &&
            flags?.isBuilderPreview &&
            interceptEditInPlace
          )
            return (
              <div
                className={classNames(
                  injectClassNames,
                  `builder relative z-2 border border-transparent`
                )}
                id={thisBuilderId}
                key={thisId}
              >
                {interceptEditInPlace({
                  nth: memory.child,
                  Tag: e?.tagName,
                  value: `Resource embed: ${value1} | ${value2}`,
                  parent: memory.parent,
                })}
              </div>
            );
          else if (hook === `resource` && value1 && value2) {
            const values =
              value1[0] === `*` ? value1.substring(1) : value1.split(/[,]+/);
            const resources =
              value1[0] === `*`
                ? hooks?.resourcePayload?.filter((e: any) =>
                    values?.includes(e?.node?.categorySlug)
                  )
                : hooks?.resourcePayload?.filter((e: any) =>
                    values?.includes(e?.node?.slug)
                  );
            const template =
              hooks?.templates &&
              Object.prototype.hasOwnProperty.call(hooks?.templates, value2) &&
              hooks.templates[value2];
            if (resources && template)
              return template(
                resources,
                id,
                "mobile",
                {
                  ...hooks,
                  concierge,
                },
                injectClassNames
              );
            return null;
          } else return null;
          break;
        }

        case `ul`:
        case `ol`: {
          const rawElement = e?.children.filter(
            (e: any) => !(e.type === `text` && e.value === `\n`)
          );
          const child = (
            <PaneFromAst
              payload={{ ...payload, ast: rawElement }}
              thisClassNames={thisClassNames}
              hooks={hooks}
              memory={memory}
              id={id}
              idx={idx + 1}
              flags={flags}
            />
          );
          newMemory.parent = thisIdx;
          if (flags?.isBuilderPreview && interceptEditInPlace)
            return (
              <div
                key={thisId}
                id={thisBuilderId}
                className="builder relative z-2 border border-transparent"
              >
                {interceptEditInPlace({
                  nth: thisIdx,
                  parent: memory.parent,
                  Tag: e?.tagName,
                  value: (
                    <Tag key={thisId} className={classNames(injectClassNames)}>
                      {child}
                    </Tag>
                  ),
                  className: injectClassNames,
                })}
              </div>
            );
          return (
            <Tag key={thisId} className={classNames(injectClassNames)}>
              {child}
            </Tag>
          );
        }

        case `li`: {
          newMemory.child = thisIdx;
          const children = e?.children?.map((li: any) => {
            return (
              <PaneFromAst
                payload={{ ...payload, ast: [li] }}
                thisClassNames={thisClassNames}
                hooks={hooks}
                memory={memory}
                id={id}
                idx={idx + 1}
                flags={flags}
              />
            );
          });
          if (
            flags?.isBuilderPreview &&
            !!interceptEditInPlace &&
            typeof children === `object` &&
            typeof children[0] === `object` &&
            ((typeof children[0][0] === `object` &&
              children[0][0].type === `a`) ||
              typeof children[0][0] === `string`)
          ) {
            // this is text or link
            return (
              <li
                className="builder relative z-2 border border-transparent"
                id={`${Tag}-${memory.parent}-${thisIdx}`}
                key={thisId}
              >
                {interceptEditInPlace({
                  nth: thisIdx,
                  parent: memory.parent,
                  Tag: e?.tagName,
                  value: (
                    <div className={classNames(injectClassNames)} key={thisId}>
                      {children[0][0]}
                    </div>
                  ),
                  className: injectClassNames,
                })}
              </li>
            );
          } else if (
            flags?.isBuilderPreview &&
            !!interceptEditInPlace &&
            typeof children === `object` &&
            typeof children[0] === `object`
          ) {
            // this is an image; requires special treatment
            return (
              <li
                className="builder relative z-2 border border-transparent"
                id={`${Tag}-${memory.parent}-${thisIdx}`}
                key={thisId}
              >
                <div className={classNames(injectClassNames)} key={thisId}>
                  {children[0][0]}
                </div>
              </li>
            );
          }
          return (
            <li className={classNames(injectClassNames)} key={thisId}>
              {children[0][0]}
            </li>
          );
        }

        case `br`:
          return <br key={thisId} />;

        case `em`:
          if (typeof e?.children[0]?.value === `string`) {
            return <em key={thisId}>{e?.children[0]?.value}</em>;
          }
          break;
          return <div key={`${id}-${idx}-${thisIdx}`} />;

        case `strong`:
          if (typeof e?.children[0]?.value === `string`) {
            return <strong key={thisId}>{e?.children[0]?.value}</strong>;
          }
          break;

        default:
          console.log(`missed on Tag:`, Tag);
      }
    });
}
