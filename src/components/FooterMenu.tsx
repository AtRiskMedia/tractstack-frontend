import { preParseAction } from "../utils/concierge/preParseAction";
import { lispLexer } from "../utils/concierge/lispLexer";
import type { MenuDatum, MenuLink } from "../types";

const FooterMenu = (props: { payload: MenuDatum; theme?: string }) => {
  //if (props.theme !== `default`) {
  //  console.log(`${theme} theme not found`)
  //  return <div />
  //}
  const thisPayload = JSON.parse(props.payload.field_options);
  const additionalLinks = thisPayload
    .filter((e: MenuLink) => !e.featured)
    .map((e: MenuLink) => {
      const item = { ...e };
      const thisPayload = lispLexer(e.actionLisp);
      const to = preParseAction(thisPayload);
      if (typeof to === `string`) {
        item.to = to;
        item.internal = true;
      } else if (typeof to === `object`) item.to = to[0];
      return item;
    });
  const featuredLinks = thisPayload
    .filter((e: MenuLink) => e.featured)
    .map((e: MenuLink) => {
      const item = { ...e };
      const thisPayload = lispLexer(e.actionLisp);
      const to = preParseAction(thisPayload);
      if (typeof to === `string`) {
        item.to = to;
        item.internal = true;
      } else if (typeof to === `object`) item.to = to[0];
      return item;
    });
  const allLinks = additionalLinks.concat(featuredLinks);

  return (
    <div className="mx-auto max-w-sm py-12">
      <nav className="flex flex-wrap justify-evenly">
        {allLinks.map((item: MenuLink) => (
          <span key={item.name} className="py-1.5">
            <a
              href={item.to}
              className="text-xl font-action leading-6 text-mydarkgrey hover:text-black"
              title={item.description}
            >
              {item.name}
            </a>
          </span>
        ))}
      </nav>
    </div>
  );
};

export default FooterMenu;
