import { YouTubeWrapper } from "@components/other/YouTubeWrapper";
import { BunnyVideo } from "@components/other/BunnyVideo";
import { Belief } from "@components/widgets/Belief";
import { IdentifyAs } from "@components/widgets/IdentifyAs";
import { ToggleBelief } from "@components/widgets/ToggleBelief";
import { classNames } from "../../utils/helpers";
import { lispLexer } from "../../utils/concierge/lispLexer";
import { preParseAction } from "../../utils/concierge/preParseAction";
import { preParseClicked } from "../../utils/concierge/preParseClicked";
import { preParseBunny } from "../../utils/concierge/preParseBunny";
import {
  events,
  storyFragmentBunnyWatch,
  contextBunnyWatch,
} from "../../store/events";
import type { PaneFromAstProps } from "../../types";

export default function PaneFromAst({
  payload,
  thisClassNames,
  memory,
  id,
  paneId,
  slug,
  idx,
}: PaneFromAstProps) {
  return (
    payload.ast
      /* eslint-disable @typescript-eslint/no-explicit-any */
      .filter((e: any) => !(e?.type === `text` && e?.value === `\n`))
      .map((e: any, thisIdx: number) => {
        const Tag = e?.tagName || e?.type;
        const thisId = `t8k-${id}--${Tag}-${idx}-${thisIdx}`;
        if (!Tag) return <div key={thisId} />;

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
          case `h6`:
            return (
              <Tag className={classNames(injectClassNames)} key={thisId}>
                {e?.children[0].value}
              </Tag>
            );

          case `p`:
            return (
              <p key={thisId} className={classNames(injectClassNames)}>
                {e?.children?.map((p: any, x: number) => (
                  <span key={`${thisId}-${x}`}>
                    <PaneFromAst
                      payload={{ ...payload, ast: [p] }}
                      thisClassNames={thisClassNames}
                      memory={memory}
                      id={id}
                      paneId={paneId}
                      slug={slug}
                      idx={idx + 1}
                    />
                  </span>
                ))}
              </p>
            );

          case `a`: {
            // check for buttons action payload
            // requires match on button's urlTarget === link's href
            const buttonPayload =
              typeof e?.properties?.href === `string` &&
              e?.children[0]?.type === `text` &&
              typeof e?.children[0]?.value === `string` &&
              typeof payload?.buttonData === `object` &&
              Object.keys(payload?.buttonData).length &&
              e?.properties?.href &&
              typeof payload?.buttonData[e.properties.href] !== `undefined`
                ? payload.buttonData[e.properties.href]
                : undefined;
            const isExternalUrl =
              typeof e?.properties?.href === `string` &&
              e.properties.href.substring(0, 8) === `https://`;
            if (isExternalUrl) {
              return (
                <a
                  target="_blank"
                  rel="noreferrer"
                  className={buttonPayload?.className || injectClassNames}
                  key={thisId}
                  href={e.properties.href}
                >
                  {e?.children[0].value}
                </a>
              );
            }

            if (buttonPayload) {
              // inject button with callback function, add css className
              const callbackPayload = lispLexer(buttonPayload?.callbackPayload);
              const targetUrl = preParseAction(callbackPayload);
              const bunny = preParseBunny(callbackPayload);
              const event = preParseClicked(paneId, callbackPayload);
              const pushEvent = function (): void {
                if (bunny) {
                  if (bunny.isContext)
                    contextBunnyWatch.set({ slug, t: bunny.t });
                  else storyFragmentBunnyWatch.set({ slug, t: bunny.t });
                  const targetDiv = document.getElementById(`bunny`);
                  if (targetDiv) {
                    targetDiv.scrollIntoView({ behavior: "smooth" });
                  }
                }
                if (event) events.set([...events.get(), event]);
              };
              // if this is a bunny video event, check if same page
              if (bunny && bunny.slug === slug) {
                return (
                  <button
                    className={buttonPayload.className}
                    onClick={() => pushEvent()}
                    key={thisId}
                    title={targetUrl}
                  >
                    {e?.children[0].value}
                  </button>
                );
              }
              if (targetUrl)
                return (
                  <a
                    type="button"
                    className={buttonPayload.className}
                    onClick={() => pushEvent()}
                    key={thisId}
                    href={targetUrl}
                    title={targetUrl}
                  >
                    {e?.children[0].value}
                  </a>
                );
            }

            // should not happen
            return <span key={thisId}>Missed on a href</span>;
          }

          case `img`: {
            const altText =
              e?.properties?.alt ||
              `This should be descriptive text of an image | We apologize the alt text is missing.`;
            // check for image and imageWrapper style tag

            const injectClassNamesImgWrapper =
              e?.tagName &&
              typeof thisClassNames.imgWrapper !== `undefined` &&
              typeof thisClassNames.imgWrapper === `string`
                ? thisClassNames.imgWrapper
                : e?.tagName &&
                    typeof thisClassNames.imgWrapper !== `undefined` &&
                    typeof thisClassNames.imgWrapper === `object`
                  ? thisClassNames.imgWrapper[
                      e?.tagName && typeof memory.imgWrapper !== `undefined`
                        ? memory.imgWrapper + 1
                        : 0
                    ]
                  : ``;
            const injectClassNamesImg =
              e?.tagName &&
              typeof thisClassNames.img !== `undefined` &&
              typeof thisClassNames.img === `string`
                ? thisClassNames.img
                : e?.tagName &&
                    typeof thisClassNames.img !== `undefined` &&
                    typeof thisClassNames.img === `object`
                  ? thisClassNames.img[
                      e?.tagName && typeof memory.img !== `undefined`
                        ? memory.img + 1
                        : 0
                    ]
                  : ``;
            const thisImage = payload?.imageData?.filter(
              (image: any) => image.filename === e?.properties?.src
            )[0];
            if (thisImage?.optimizedSrc || thisImage?.uri?.url) {
              const src =
                thisImage?.optimizedSrc ||
                `${import.meta.env.PUBLIC_IMAGE_URL}${thisImage.uri.url}`;
              if (src)
                return (
                  <img
                    className={classNames(
                      injectClassNames,
                      injectClassNamesImgWrapper,
                      injectClassNamesImg
                    )}
                    key={thisId}
                    src={src}
                    title={altText}
                    alt={e?.properties?.alt}
                  />
                );
            }
            break;
          }

          case `code`: {
            // if (typeof hooks.template === `undefined`) return null
            // currently only supports inject, belief, youtube and resource
            const regexpHook =
              /(identifyAs|youtube|bunny|toggle|resource|belief)\((.*?)\)/;
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
                : ``;
            //const value4 =
            //  thisHookValuesRaw && thisHookValuesRaw.length > 3
            //    ? thisHookValuesRaw[3]
            //    : ``;
            if (hook === `youtube` && value1 && value2) {
              return (
                <div key={thisId} className={injectClassNames}>
                  <YouTubeWrapper id={value1} title={value2} />
                </div>
              );
            } else if (hook === `bunny` && value1 && value2) {
              return (
                <div key={thisId} className={injectClassNames}>
                  <BunnyVideo
                    videoUrl={value1}
                    title={value2}
                    autoplay={memory.hasYTAutoplay}
                    slug={slug}
                  />
                </div>
              );
            } else if (hook === `belief` && value1 && value2) {
              return (
                <div key={thisId} className={injectClassNames}>
                  <Belief
                    value={{ slug: value1, scale: value2, extra: value3 }}
                  />
                </div>
              );
            } else if (hook === `identifyAs` && value1 && value2) {
              return (
                <div key={thisId} className={injectClassNames}>
                  <IdentifyAs
                    value={{ slug: value1, target: value2, extra: value3 }}
                  />
                </div>
              );
            } else if (hook === `toggle` && value1 && value2) {
              return (
                <div key={thisId} className={injectClassNames}>
                  <ToggleBelief belief={value1} prompt={value2} />
                </div>
              );
            }

            return (
              <div key={thisId}>
                code hook inline: {hook} {value1} {value2} {value3}
              </div>
            );

            //if (!hook) return <div key={thisId}>missing hook</div>;
            //else if (hook === `inject` && value1) {
            /*
            const InjectComponent = hooks?.templates?.injectComponent;
            if (InjectComponent)
              return <InjectComponent key={thisId} target={value1} />;
            */
            //} else if (hook === `resource` && value1 && value2) {
            /*
            //const values =
            //  value1[0] === `*` ? value1.substring(1) : value1.split(/[,]+/);
            //const resources =
            //  value1[0] === `*`
            //    ? hooks?.resourcePayload?.filter((e: any) =>
            //        values?.includes(e?.node?.categorySlug)
            //      )
            //    : hooks?.resourcePayload?.filter((e: any) =>
            //        values?.includes(e?.node?.slug)
            //      );
            //const template =
            //  hooks?.templates &&
            //  Object.prototype.hasOwnProperty.call(hooks?.templates, value2) &&
            //  hooks.templates[value2];
            //if (resources && template)
            //  return template(
            //    resources,
            //    id,
            //    "mobile",
            //    {
            //      ...hooks,
            //      concierge,
            //    },
            //    injectClassNames
            //  );
            return <div key={thisId} />;
              */
            //}
            //break;
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
                memory={{ ...memory, parent: thisIdx }}
                id={id}
                paneId={paneId}
                slug={slug}
                idx={idx + 1}
              />
            );
            return (
              <Tag key={thisId} className={classNames(injectClassNames)}>
                {child}
              </Tag>
            );
          }

          case `li`:
            return (
              <li key={thisId} className={classNames(injectClassNames)}>
                {e?.children?.map((li: any, x: number) => (
                  <span key={`${thisId}-${x}`}>
                    <PaneFromAst
                      payload={{ ...payload, ast: [li] }}
                      thisClassNames={thisClassNames}
                      memory={{ ...memory, child: thisIdx }}
                      id={id}
                      paneId={paneId}
                      slug={slug}
                      idx={idx + 1}
                    />
                  </span>
                ))}
              </li>
            );

          case `br`:
            return <br key={thisId} />;

          case `em`:
            if (typeof e?.children[0]?.value === `string`) {
              return <em key={thisId}>{e?.children[0]?.value}</em>;
            }
            return <div key={`${id}-${idx}-${thisIdx}`} />;

          case `strong`:
            if (typeof e?.children[0]?.value === `string`) {
              return <strong key={thisId}>{e?.children[0]?.value}</strong>;
            }
            break;

          default:
            console.log(`missed on Tag:`, Tag);
        }
        return <div key={thisId}>missed on {Tag}</div>;
      })
  );
}
