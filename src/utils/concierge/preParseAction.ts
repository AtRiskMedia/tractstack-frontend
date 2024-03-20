/* eslint-disable @typescript-eslint/no-explicit-any */
export const preParseAction = (payload: any) => {
  const thisPayload = (payload && payload[0]) || false;
  const command = (thisPayload && thisPayload[0] && thisPayload[0][0]) || null;
  const parameters =
    (thisPayload && thisPayload[0] && thisPayload[0][1]) || null;
  const parameterOne = (parameters && parameters[0]) || null;
  const parameterTwo = (parameters && parameters[1]) || null;
  const parameterThree = (parameters && parameters[2]) || null;

  switch (command) {
    case `goto`:
      switch (parameterOne) {
        case `home`:
          return `/`;
        case `concierge`:
          return `/concierge/${parameterTwo}`;
        case `context`:
          return `/context/${parameterTwo}`;
        case `product`:
          return `/products/${parameterTwo}`;
        case `storyFragment`:
          if (parameterTwo !== import.meta.env.PUBLIC_HOME)
            return `/${parameterTwo}`;
          return `/`;
        case `storyFragmentPane`:
          if (parameterThree) {
            if (parameterTwo !== import.meta.env.PUBLIC_HOME)
              return `/${parameterTwo}#${parameterThree}`;
            return `/#${parameterThree}`;
          }
          console.log(`LispActionPayload preParse misfire on goto`, parameters);
          break;
        case `url`:
          return parameterTwo;
        default:
          console.log(`LispActionPayload preParse misfire on goto`, parameters);
      }
      break;
    default:
      console.log(`LispActionPayload preParse misfire`, command, parameters);
      break;
  }
  return ``;
};
